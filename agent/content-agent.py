#!/usr/bin/env python3
"""
Touchdown Tennessee — Content Agent
Runs once daily. Pulls ESPN data, checks existing articles to avoid
duplication, and falls back to historical/analytical content when
there's nothing new to cover.
"""

import os
import json
import requests
import anthropic
from datetime import datetime, timezone
from pathlib import Path

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

CONTENT_DIR = Path(__file__).parent.parent / "content" / "articles"
CONTENT_DIR.mkdir(parents=True, exist_ok=True)

# ── WRITERS ──────────────────────────────────────────────────────────────────

WRITERS = {
    "huck_denton": {
        "name": "Huck Denton",
        "voice": """
You are Huck Denton — a Tennessee lifer who grew up in Maryville and has watched Vols
football for 40 years. Deadpan, specific, never easily impressed. You tell stories
sideways — start with a detail before getting to the point. Dry humor, zero hype,
deep institutional knowledge. Short sentences. Specific details. Never generic.
        """
    },
    "cal_merritt": {
        "name": "Cal Merritt",
        "voice": """
You are Cal Merritt — former walk-on linebacker, now watches more film than anyone
in the press box. Direct, confident, occasionally funny. You cite specific plays and
numbers. No patience for vague takes. Clear, punchy, analytical. Sometimes a dry
one-liner at the end.
        """
    },
    "ned_bowman": {
        "name": "Ned Bowman",
        "voice": """
You are Ned Bowman — a veteran SEC media personality in the mold of Paul Finebaum.
30 years covering SEC football. Provocative but not reckless. You ask the uncomfortable
question. Conversational, punchy, opinionated. The kind of take that makes people
call in to argue.
        """
    },
    "ray_pickard": {
        "name": "Ray Pickard",
        "voice": """
You are Ray Pickard — covered the Titans since they were still figuring out Nashville.
Gruff, honest, allergic to spin. Trust the players more than the front office.
Short sentences. Don't bury the lead. Direct, working-class, no-nonsense.
        """
    },
}

DESK_WRITERS = {
    "vols": ["huck_denton", "cal_merritt", "ned_bowman"],
    "titans": ["ray_pickard", "cal_merritt", "ned_bowman"],
}

# ── HISTORICAL TOPICS (fallback when no news) ─────────────────────────────

VOLS_HISTORICAL_TOPICS = [
    "The 1998 National Championship season — what made that team different",
    "Peyton Manning's four years at Tennessee — the legacy he left",
    "The history of the Third Saturday in October rivalry with Alabama",
    "General Robert Neyland's coaching philosophy and how it still influences Tennessee football",
    "The legend of Johnny Majors and his return to Tennessee as head coach",
    "Condredge Holloway — Tennessee's first Black starting quarterback and what he faced",
    "The Vol Walk tradition — how it started and what it means to the program",
    "Tennessee's greatest NFL draft classes — which decade produced the most talent",
    "The history of Rocky Top — how a song became an identity",
    "Doug Dickey vs. Bill Battle — the coaching transition that changed the program",
    "Tennessee's undefeated 1951 season under General Neyland",
    "Heath Shuler — the greatest NFL bust to come out of Knoxville",
    "How Tennessee's checker end zone became one of college football's iconic images",
    "The 2001 Peach Bowl — Tennessee's last great bowl win before the drought",
    "Alvin Harper, Carl Pickens, and the great Tennessee wide receiver tradition",
]

TITANS_HISTORICAL_TOPICS = [
    "The Music City Miracle — the play, the call, and what it meant for Nashville",
    "Steve McNair's MVP season and why he was the right quarterback for that team",
    "Eddie George — the Heisman winner who became the heart of the Titans",
    "How Nashville became an NFL city — the story of the Oilers' move from Houston",
    "The 1999 Super Bowl run — how far the Titans came and how close they got",
    "Frank Wycheck — the tight end who threw the most famous lateral in NFL history",
    "Jeff Fisher's tenure — what he built and why it eventually fell apart",
    "Kevin Dyson at the one-yard line — the play that ended it all",
    "The Titans' drafting history — hits, misses, and what they reveal about the front office",
    "Mike Munchak — Hall of Fame lineman, underwhelming head coach",
    "Derrick Henry's record-breaking 2020 season and what it said about the Titans' identity",
    "The Bud Adams era — the owner who brought football to Tennessee",
    "Tennessee's passion for the Titans vs the Vols — which fanbase runs deeper",
    "Marcus Mariota — the promise, the injuries, and the quiet exit",
    "Nissan Stadium's history and the long-overdue new stadium project",
]

import random

# ── ESPN DATA ─────────────────────────────────────────────────────────────

def fetch_espn_scores(sport="football", league="college-football"):
    url = f"https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard"
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        events = r.json().get("events", [])
        return [e for e in events if "tennessee" in e.get("name", "").lower()]
    except Exception as e:
        print(f"ESPN fetch error: {e}")
        return []

def fetch_espn_news(league="college-football"):
    url = f"https://site.api.espn.com/apis/site/v2/sports/football/{league}/news"
    try:
        r = requests.get(url, params={"limit": 10}, timeout=10)
        r.raise_for_status()
        articles = r.json().get("articles", [])
        return [
            {"headline": a.get("headline"), "description": a.get("description")}
            for a in articles
            if "tennessee" in (a.get("headline", "") + a.get("description", "")).lower()
        ][:3]
    except Exception as e:
        print(f"ESPN news fetch error: {e}")
        return []

# ── EXISTING ARTICLE TITLES (dedup check) ────────────────────────────────

def get_existing_titles():
    titles = []
    for f in CONTENT_DIR.glob("*.md"):
        if f.name == ".gitkeep":
            continue
        try:
            text = f.read_text(encoding="utf-8")
            for line in text.split("\n"):
                if line.startswith("title:"):
                    title = line.replace("title:", "").strip().strip('"')
                    titles.append(title.lower())
                    break
        except Exception:
            pass
    return titles

# ── ARTICLE GENERATION ────────────────────────────────────────────────────

OUTPUT_FORMAT = """
Return ONLY valid JSON with these exact fields — no preamble, no markdown fences:
{
  "title": "Punchy headline under 12 words",
  "deck": "One sentence summary, 20-30 words",
  "body": "Full article in markdown, 350-500 words, use ## subheadings",
  "slug": "url-friendly-slug",
  "desk": "vols or titans",
  "tags": ["tag1", "tag2", "tag3"]
}

Style rules:
- Lead with noun + verb. Never start with "It was" or "In a game that"
- One sentence = one job. Short paragraphs.
- Concrete over clever. Active verbs.
- End with a small truth or the next question.
"""

def generate_article(desk: str, context: dict, topic_type: str = "news") -> dict:
    import random
    writer_key = random.choice(DESK_WRITERS[desk])
    writer = WRITERS[writer_key]

    if topic_type == "historical":
        topic = context.get("topic", "Tennessee football history")
        prompt = f"""
You are {writer['name']} writing for Touchdown Tennessee ({desk.upper()} DESK).

{writer['voice']}

Write a feature piece about this historical topic:
"{topic}"

This is NOT a news article. This is editorial — a historical analysis, a retrospective,
a piece that puts something in context. Write it like a long memory with a point.
The reader knows the basics. Give them something they haven't thought about.

{OUTPUT_FORMAT}
"""
    else:
        prompt = f"""
You are {writer['name']} writing for Touchdown Tennessee ({desk.upper()} DESK).

{writer['voice']}

Current data:
{json.dumps(context, indent=2)}

Write one article about the most interesting item in this data.
If it's a score, lead with the result and analysis.
If it's news, write an analysis piece.

{OUTPUT_FORMAT}
"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    result = json.loads(raw)
    result["author"] = writer["name"]
    return result

def is_duplicate(title: str, existing_titles: list) -> bool:
    """Check if a similar article already exists."""
    title_lower = title.lower()
    # Check for key word overlap
    title_words = set(title_lower.split()) - {"the", "a", "an", "is", "in", "of", "and", "for", "to", "how", "why", "what"}
    for existing in existing_titles:
        existing_words = set(existing.split()) - {"the", "a", "an", "is", "in", "of", "and", "for", "to", "how", "why", "what"}
        overlap = title_words & existing_words
        if len(overlap) >= 3:
            return True
    return False

def write_article(article: dict) -> str:
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    timestamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    slug = article.get("slug", "article").lower().replace(" ", "-")[:80]
    filename = f"{date_str}-{slug}.md"

    author = article.get("author", "Staff Writer")
    frontmatter = f"""---
title: "{article['title']}"
deck: "{article['deck']}"
date: "{timestamp}"
desk: "{article['desk']}"
author: "{author}"
tags: {json.dumps(article.get('tags', []))}
---

"""
    content = frontmatter + article.get("body", "")
    filepath = CONTENT_DIR / filename
    filepath.write_text(content, encoding="utf-8")
    print(f"Written: {filepath}")
    return filename

# ── MAIN ─────────────────────────────────────────────────────────────────

def main():
    print(f"[{datetime.now()}] TDT Content Agent starting...")
    existing_titles = get_existing_titles()
    print(f"Found {len(existing_titles)} existing articles")

    # ── VOLS ──
    print("\n--- VOLS ---")
    vols_scores = fetch_espn_scores("football", "college-football")
    vols_news = fetch_espn_news("college-football")

    try:
        if vols_news or vols_scores:
            context = {"desk": "vols", "scores": vols_scores, "news": vols_news, "date": datetime.now(timezone.utc).isoformat()}
            article = generate_article("vols", context, "news")

            if is_duplicate(article["title"], existing_titles):
                print(f"Duplicate detected: '{article['title']}' — switching to historical")
                topic = random.choice(VOLS_HISTORICAL_TOPICS)
                article = generate_article("vols", {"topic": topic}, "historical")

            filename = write_article(article)
            print(f"Vols article: {filename}")
        else:
            print("No news — going historical")
            topic = random.choice(VOLS_HISTORICAL_TOPICS)
            article = generate_article("vols", {"topic": topic}, "historical")
            filename = write_article(article)
            print(f"Vols historical: {filename}")
    except Exception as e:
        print(f"Vols error: {e}")

    # ── TITANS ──
    print("\n--- TITANS ---")
    titans_scores = fetch_espn_scores("football", "nfl")
    titans_news = fetch_espn_news("nfl")
    titans_news = [n for n in titans_news if "titan" in (n.get("headline","") + n.get("description","")).lower()]

    try:
        if titans_news or titans_scores:
            context = {"desk": "titans", "scores": titans_scores, "news": titans_news, "date": datetime.now(timezone.utc).isoformat()}
            article = generate_article("titans", context, "news")

            if is_duplicate(article["title"], existing_titles):
                print(f"Duplicate detected: '{article['title']}' — switching to historical")
                topic = random.choice(TITANS_HISTORICAL_TOPICS)
                article = generate_article("titans", {"topic": topic}, "historical")

            filename = write_article(article)
            print(f"Titans article: {filename}")
        else:
            print("No news — going historical")
            topic = random.choice(TITANS_HISTORICAL_TOPICS)
            article = generate_article("titans", {"topic": topic}, "historical")
            filename = write_article(article)
            print(f"Titans historical: {filename}")
    except Exception as e:
        print(f"Titans error: {e}")

    print(f"\n[{datetime.now()}] Agent complete.")

if __name__ == "__main__":
    main()

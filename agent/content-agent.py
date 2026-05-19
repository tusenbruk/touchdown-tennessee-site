#!/usr/bin/env python3
"""
Touchdown Tennessee — Content Agent
Fetches live scores/news from ESPN, generates articles via Claude API,
writes markdown files to /content for Vercel to deploy.
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

WRITERS = {
    "huck_denton": {
        "name": "Huck Denton",
        "bio": "Maryville native. Has watched Tennessee football since Majors. Doesn't panic, doesn't celebrate early.",
        "voice": """
You are Huck Denton — a Tennessee lifer who grew up in Maryville and has watched Vols football
for 40 years. You know every recruit, every coordinator change, every heartbreak since 1990.
You are deadpan, specific, and never easily impressed. You tell stories sideways — you'll start
with a detail about a Tuesday practice before getting to the point. Dry humor, zero hype,
deep institutional knowledge. You sound like someone who has seen too much to get excited
but still shows up every Saturday. Short sentences. Specific details. Never generic.
        """
    },
    "cal_merritt": {
        "name": "Cal Merritt",
        "bio": "Former walk-on. Now watches more film than anyone in the press box.",
        "voice": """
You are Cal Merritt — you played college ball as a walk-on linebacker, didn't make it past
training camp, and now channel all of that into film study and analytics. You are direct,
confident, occasionally funny, and you cite specific plays and numbers. You have no patience
for vague takes. You back everything up. You're the guy at the bar who actually knows what
a Cover 2 shell looks like and why it matters. Clear, punchy, analytical. Sometimes a dry
one-liner at the end. Never preachy.
        """
    },
    "ned_bowman": {
        "name": "Ned Bowman",
        "bio": "Has strong opinions. Will share them whether you asked or not.",
        "voice": """
You are Ned Bowman — a veteran SEC media personality in the mold of Paul Finebaum.
You have been covering SEC football for 30 years and you have heard every excuse, every
spin, every press conference non-answer. You are provocative but not reckless — you make
a strong argument and defend it. You love a good caller analogy. You ask the uncomfortable
question other writers won't. You're not a troll — you genuinely care about Tennessee football
— but you will absolutely call out the coaching staff, the AD, or the fan base when warranted.
Conversational, punchy, opinionated. The kind of take that makes people call in to argue.
        """
    },
    "ray_pickard": {
        "name": "Ray Pickard",
        "bio": "Nashville born. Titans beat since 2003. Skeptical of management. Loyal to the fanbase.",
        "voice": """
You are Ray Pickard — you've covered the Titans since they were still figuring out Nashville.
You've seen the Music City Miracle in person. You are gruff, honest, and allergic to corporate
spin. You trust the players more than the front office. You write short sentences. You don't
bury the lead. You feel like a guy who files copy from a folding table in the press box and
has seen three ownership groups come and go. Direct, working-class, no-nonsense. The fan
can tell you respect them.
        """
    },
}

# Writer assignment by desk
DESK_WRITERS = {
    "vols": ["huck_denton", "cal_merritt", "ned_bowman"],
    "titans": ["ray_pickard", "cal_merritt", "ned_bowman"],
}

EDITORIAL_VOICE = """
Format: Return valid JSON only with these fields:
{
  "title": "Article headline — punchy, specific, under 12 words",
  "deck": "One sentence summary, 20-30 words, italic-worthy",
  "body": "Full article body in markdown. 300-500 words. Use ## for subheadings if needed.",
  "slug": "url-friendly-slug-from-title",
  "desk": "vols or titans",
  "tags": ["tag1", "tag2"]
}

Style rules for all writers:
- Lead with noun + verb. No "It was a..." or "In a game that..."
- One sentence = one job. Short paragraphs.
- Concrete over clever. Active verbs. Few adjectives.
- No filler phrases. No grand wrap-ups.
- End with a small truth or the next question.
"""


def fetch_espn_scores(sport="football", league="college-football"):
    """Fetch live/recent scores from ESPN API."""
    url = f"https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard"
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        data = r.json()
        events = data.get("events", [])
        tennessee_games = []
        for event in events:
            name = event.get("name", "").lower()
            if "tennessee" in name:
                tennessee_games.append({
                    "name": event.get("name"),
                    "date": event.get("date"),
                    "status": event.get("status", {}).get("type", {}).get("description"),
                    "competitions": event.get("competitions", [{}])[0],
                })
        return tennessee_games
    except Exception as e:
        print(f"ESPN fetch error: {e}")
        return []


def fetch_espn_news(team="tennessee-volunteers"):
    """Fetch latest news for a team."""
    url = f"https://site.api.espn.com/apis/site/v2/sports/football/college-football/news"
    try:
        r = requests.get(url, params={"limit": 5}, timeout=10)
        r.raise_for_status()
        articles = r.json().get("articles", [])
        return [
            {"headline": a.get("headline"), "description": a.get("description"), "published": a.get("published")}
            for a in articles
            if "tennessee" in (a.get("headline", "") + a.get("description", "")).lower()
        ][:3]
    except Exception as e:
        print(f"ESPN news fetch error: {e}")
        return []


def fetch_titans_news():
    """Fetch Titans news."""
    url = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news"
    try:
        r = requests.get(url, params={"limit": 10}, timeout=10)
        r.raise_for_status()
        articles = r.json().get("articles", [])
        return [
            {"headline": a.get("headline"), "description": a.get("description"), "published": a.get("published")}
            for a in articles
            if "titan" in (a.get("headline", "") + a.get("description", "")).lower()
        ][:3]
    except Exception as e:
        print(f"Titans news fetch error: {e}")
        return []


def generate_article(context: dict, desk: str) -> dict:
    """Generate an article using Claude API with a specific writer voice."""
    import random
    writer_key = random.choice(DESK_WRITERS[desk])
    writer = WRITERS[writer_key]

    prompt = f"""
You are {writer['name']} writing for Touchdown Tennessee ({desk.upper()} DESK).

YOUR VOICE AND PERSONALITY:
{writer['voice']}

Here is the latest data to write about:
{json.dumps(context, indent=2)}

Write one article based on the most interesting/newsworthy item in this data.
If there are recent scores, lead with the result and analysis.
If it's news/roster/recruiting, write an analysis piece.
If there's nothing current, write a preview or analytical take on the upcoming schedule.

{EDITORIAL_VOICE}
"""
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text.strip()
    # Strip markdown code fences if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    result = json.loads(raw)
    result["author"] = writer["name"]
    return result


def write_article(article: dict):
    """Write article as markdown file."""
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    timestamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    slug = article.get("slug", "article").lower().replace(" ", "-")
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
    body = article.get("body", "")
    content = frontmatter + body

    filepath = CONTENT_DIR / filename
    filepath.write_text(content, encoding="utf-8")
    print(f"Written: {filepath}")
    return filename


def main():
    print(f"[{datetime.now()}] Touchdown Tennessee agent starting...")

    # --- VOLS ---
    print("Fetching Vols data...")
    vols_scores = fetch_espn_scores("football", "college-football")
    vols_news = fetch_espn_news()

    vols_context = {
        "desk": "vols",
        "recent_scores": vols_scores,
        "recent_news": vols_news,
        "current_date": datetime.now(timezone.utc).isoformat(),
    }

    if vols_news or vols_scores:
        print("Generating Vols article...")
        try:
            vols_article = generate_article(vols_context, "vols")
            vols_article["desk"] = "vols"
            filename = write_article(vols_article)
            print(f"Vols article written: {filename}")
        except Exception as e:
            print(f"Vols article error: {e}")
    else:
        print("No Vols data found — skipping.")

    # --- TITANS ---
    print("Fetching Titans data...")
    titans_scores = fetch_espn_scores("football", "nfl")
    titans_news = fetch_titans_news()

    titans_context = {
        "desk": "titans",
        "recent_scores": [g for g in titans_scores if "titan" in g.get("name", "").lower()],
        "recent_news": titans_news,
        "current_date": datetime.now(timezone.utc).isoformat(),
    }

    if titans_news or titans_scores:
        print("Generating Titans article...")
        try:
            titans_article = generate_article(titans_context, "titans")
            titans_article["desk"] = "titans"
            filename = write_article(titans_article)
            print(f"Titans article written: {filename}")
        except Exception as e:
            print(f"Titans article error: {e}")
    else:
        print("No Titans data found — skipping.")

    print(f"[{datetime.now()}] Agent complete.")


if __name__ == "__main__":
    main()

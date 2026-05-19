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

EDITORIAL_VOICE = """
You write for Touchdown Tennessee, an independent editorial sports media brand covering
the University of Tennessee Volunteers and the Tennessee Titans.

Voice: Sharp, direct, insider-knowledgeable. Not a homer — you call it straight.
Tone: Like a good sportswriter at a serious regional paper. David Coggins meets beat reporter.
Style rules:
- Lead with noun + verb. No "It was a..." or "In a game that..."
- One sentence = one job. Short paragraphs.
- Concrete over clever. Active verbs. Few adjectives.
- No filler phrases. No grand wrap-ups.
- End with a small truth or the next question.

Format: Return valid JSON only with these fields:
{
  "title": "Article headline — punchy, specific, under 12 words",
  "deck": "One sentence summary, 20-30 words, italic-worthy",
  "body": "Full article body in markdown. 300-500 words. Use ## for subheadings if needed.",
  "slug": "url-friendly-slug-from-title",
  "desk": "vols or titans",
  "tags": ["tag1", "tag2"]
}
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
    """Generate an article using Claude API."""
    prompt = f"""
You are writing for Touchdown Tennessee ({desk.upper()} DESK).

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

    return json.loads(raw)


def write_article(article: dict):
    """Write article as markdown file."""
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    timestamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    slug = article.get("slug", "article").lower().replace(" ", "-")
    filename = f"{date_str}-{slug}.md"

    frontmatter = f"""---
title: "{article['title']}"
deck: "{article['deck']}"
date: "{timestamp}"
desk: "{article['desk']}"
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

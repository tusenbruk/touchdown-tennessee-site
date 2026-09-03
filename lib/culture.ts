export const THIS_SATURDAY = {
  label: "This Saturday",
  line: "Tennessee vs Furman · Sep 5 · 3:30 ET · Knoxville",
  note: "Kickoff week. The noise starts here.",
};

export const DAYS_THAT_MATTER = [
  {
    year: "1998",
    opponent: "Florida",
    detail: "Knoxville, overtime, 20–17.",
    why: "The one grandparents still narrate.",
  },
  {
    year: "1999",
    opponent: "Fiesta Bowl",
    detail: "Beat Florida State 23–16.",
    why: "National title night.",
  },
  {
    year: "2007",
    opponent: "Georgia",
    detail: "Knoxville, 35–14.",
    why: "",
  },
  {
    year: "2016",
    opponent: "Florida",
    detail: "Knoxville, 38–28.",
    why: "First win over Florida in that building since 2004.",
  },
  {
    year: "2022",
    opponent: "Alabama",
    detail: "Knoxville, 52–49.",
    why: "The night the long losing streak ended.",
  },
  {
    year: "2024",
    opponent: "Alabama",
    detail: "Knoxville, 24–17.",
    why: "The recent one people still clip.",
  },
] as const;

export const SLATE_2026 = [
  { date: "Sep 5", opponent: "Furman", where: "Knoxville", time: "3:30 ET", featured: true },
  { date: "Sep 12", opponent: "Georgia Tech", where: "Atlanta", time: "7:00 ET", featured: false },
  { date: "Sep 19", opponent: "Kennesaw State", where: "Knoxville", time: "7:45 ET", featured: false },
  { date: "Sep 26", opponent: "Texas", where: "Knoxville", time: "", featured: false },
  { date: "Oct 3", opponent: "Auburn", where: "Knoxville", time: "", featured: false },
  { date: "Oct 10", opponent: "Arkansas", where: "Fayetteville", time: "", featured: false },
  { date: "Oct 17", opponent: "Alabama", where: "Knoxville", time: "", featured: false },
  { date: "Oct 24", opponent: "South Carolina", where: "Columbia", time: "", featured: false },
  { date: "Oct 31", opponent: "Open date", where: "", time: "", featured: false },
  { date: "Nov 7", opponent: "Kentucky", where: "Knoxville", time: "", featured: false },
  { date: "Nov 14", opponent: "Texas A&M", where: "College Station", time: "", featured: false },
  { date: "Nov 21", opponent: "LSU", where: "Knoxville", time: "", featured: false },
  { date: "Nov 28", opponent: "Vanderbilt", where: "Nashville", time: "", featured: false },
] as const;

export const PHOTOS = [
  {
    src: "/photos/neyland-2010.jpg",
    alt: "Stadium exterior in Knoxville, 2010",
    width: 1280,
    height: 960,
    author: "Ecansler",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    filePage: "https://commons.wikimedia.org/wiki/File:Neyland_Stadium_2010.JPG",
    caption: "Knoxville, 2010.",
  },
  {
    src: "/photos/neyland-night.jpg",
    alt: "Night game in Knoxville, October 2005",
    width: 1600,
    height: 1200,
    author: "Randall Stewart / Berniestew",
    license: "Public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    filePage: "https://commons.wikimedia.org/wiki/File:Neyland_Stadium_night.jpg",
    caption: "Night game, October 2005.",
  },
  {
    src: "/photos/neyland-aerial.jpg",
    alt: "Aerial view of the stadium and the river",
    width: 720,
    height: 508,
    author: "Neomrbungle",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    filePage: "https://commons.wikimedia.org/wiki/File:Neyland_aerial_view_of_checkerboard.jpg",
    caption: "Aerial, river and stands. Editorial documentary photo.",
  },
  {
    src: "/photos/neyland-2024.jpg",
    alt: "Stadium before a 2024 game",
    width: 1051,
    height: 801,
    author: "CaptainTeebs",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    filePage: "https://commons.wikimedia.org/wiki/File:Neyland_Stadium_Checkered,_2024.jpg",
    caption: "Before a 2024 game. Editorial documentary photo.",
  },
] as const;

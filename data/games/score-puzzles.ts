// Saturday Score puzzle bank. Facts drawn from stable historical record;
// sources are canonical references for spot-checking.
export interface ScorePuzzle {
  id: string;                 // "p001"...
  answer: string;             // display answer, e.g. "Peyton Manning"
  aliases: string[];          // lowercase accepted guesses (substrings matched against normalized guess)
  kind: "person" | "game" | "season" | "place" | "tradition";
  clues: [string, string, string, string, string]; // hardest first
  explanation: string;        // 2-3 sentences shown after the game
  source: { label: string; url: string };
  checkedDate: "2026-08-21";
}

export const SCORE_PUZZLES: ScorePuzzle[] = [
  {
    id: "p001",
    answer: "Peyton Manning",
    aliases: ["peyton", "manning"],
    kind: "person",
    clues: [
      "He closed his college career with a Southeastern Conference championship in the 1997 season.",
      "A campus street beside the stadium was later renamed in his honor.",
      "He passed up the 1997 NFL Draft to return as a senior, then finished second in that year's Heisman vote.",
      "This No. 16 quarterback rewrote the school passing records from 1994-97, then went first overall in 1998.",
      "The Vols legend later won Super Bowls with the Colts and Broncos; his father is Archie, his brother Eli.",
    ],
    explanation:
      "Peyton Manning started at quarterback for Tennessee from 1994-97, winning the 1997 SEC title and finishing as Heisman runner-up before the Colts took him No. 1 overall in 1998. Knoxville honored him by renaming a street near the stadium Peyton Manning Pass.",
    source: { label: "Pro Football Hall of Fame", url: "https://www.profootballhof.com/players/peyton-manning/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p002",
    answer: "Reggie White",
    aliases: ["reggie white", "reggie"],
    kind: "person",
    clues: [
      "Before the NFL he spent the 1984 and 1985 seasons with the USFL's Memphis Showboats.",
      "A Chattanooga native, he was named SEC Player of the Year as a senior defensive lineman in 1983.",
      "His No. 92 is retired by the Vols, and his teenage ordination inspired a famous nickname.",
      "His 1993 free-agency signing with Green Bay changed the NFL, and he won Super Bowl XXXI there.",
      "This Hall of Fame defensive end, nicknamed for his ordained ministry, retired as the NFL's career sack leader.",
    ],
    explanation:
      "Reggie White, the 'Minister of Defense,' starred at Tennessee from 1980-83 before Hall of Fame runs with the Eagles and Packers. An ordained minister from Chattanooga, he retired as the NFL's all-time sack leader and had his No. 92 retired by the Vols.",
    source: { label: "Pro Football Hall of Fame", url: "https://www.profootballhof.com/players/reggie-white/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p003",
    answer: "General Robert Neyland",
    aliases: ["neyland", "general neyland", "robert neyland"],
    kind: "person",
    clues: [
      "A West Point graduate, he served in the Army Corps of Engineers and twice left coaching for military duty.",
      "Hired in 1926, he led the Vols across three separate stints around his Army service.",
      "His 1939 squad remains the last major-college team to hold every regular-season opponent scoreless.",
      "His seven game maxims are still recited by Tennessee teams before kickoff.",
      "The general won his final national title in 1951, and in 1962 Tennessee's stadium was renamed in his honor.",
    ],
    explanation:
      "Gen. Robert Neyland coached Tennessee in three stints between 1926 and 1952, winning 173 games and national championships, the last in 1951. His famous game maxims are still read before Vols games, and the stadium was renamed for him in 1962.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/coaches/robert-neyland-1.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p004",
    answer: "Johnny Majors",
    aliases: ["majors", "johnny majors"],
    kind: "person",
    clues: [
      "Before his most famous coaching job, he spent five seasons rebuilding Iowa State.",
      "He grew up in tiny Huntland, Tennessee, in a family where his father coached football.",
      "He coached Pittsburgh to the 1976 national championship behind Heisman winner Tony Dorsett.",
      "As a Vols single-wing tailback, he finished second in the 1956 Heisman voting to Paul Hornung.",
      "He came home to coach his alma mater from 1977-92, winning three SEC titles before Phillip Fulmer replaced him.",
    ],
    explanation:
      "Johnny Majors was Heisman runner-up as a Tennessee tailback in 1956, won the 1976 national title as Pittsburgh's coach, then returned to lead the Vols from 1977-92. His teams won SEC championships in 1985, 1989, and 1990.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/coaches/johnny-majors-1.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p005",
    answer: "Phillip Fulmer",
    aliases: ["fulmer", "phillip fulmer", "phil fulmer"],
    kind: "person",
    clues: [
      "He played offensive line for the Vols in the early 1970s before joining the coaching staff.",
      "The Winchester, Tennessee native spent most of four decades with one program as player, assistant, and coach.",
      "He first led the Vols as interim coach in 1992 while his predecessor recovered from heart surgery.",
      "He won 152 games from 1992-2008 and later returned as the university's athletic director.",
      "This coach guided the 13-0 Vols to the 1998 national championship, the first BCS title.",
    ],
    explanation:
      "Phillip Fulmer played guard at Tennessee, then served as head coach from 1992-2008, going 152-52 and winning the 1998 national championship. The Winchester native later served as UT's athletic director and is in the College Football Hall of Fame.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/coaches/phillip-fulmer-1.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p006",
    answer: "Condredge Holloway",
    aliases: ["holloway", "condredge"],
    kind: "person",
    clues: [
      "The Montreal Expos drafted him in the first round in 1971 — as a shortstop.",
      "He starred for over a decade in the CFL, winning the league's Most Outstanding Player award with Toronto in 1982.",
      "The Huntsville, Alabama native left his home state when told he couldn't play his position there.",
      "His scrambling from 1972-74 earned him the nickname 'the Artful Dodger.'",
      "In 1972 this Vol became the first African American to start at quarterback in the SEC.",
    ],
    explanation:
      "Condredge Holloway became the SEC's first African American starting quarterback at Tennessee in 1972. The elusive 'Artful Dodger' from Huntsville went on to a decorated CFL career, winning the league's Most Outstanding Player award in 1982 with Toronto.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/players/condredge-holloway-1.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p007",
    answer: "Tee Martin",
    aliases: ["tee martin", "tee"],
    kind: "person",
    clues: [
      "This Mobile, Alabama product later coached in college football, including a stint as USC's offensive coordinator.",
      "In 1998 he set an NCAA record by completing 23 consecutive passes in a blowout of South Carolina.",
      "He took over for a No. 1 overall draft pick and did the one thing his predecessor never could.",
      "His deep strike to Peerless Price helped seal the Fiesta Bowl win over Florida State.",
      "This quarterback went 13-0 as Peyton Manning's successor, winning the 1998 national championship.",
    ],
    explanation:
      "Tee Martin succeeded Peyton Manning in 1998 and led Tennessee to a perfect 13-0 season and the first BCS national championship. Along the way he set an NCAA record with 23 straight completions against South Carolina, and he later became a college coach.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/players/tee-martin-1.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p008",
    answer: "John Ward",
    aliases: ["john ward", "ward", "voice of the vols"],
    kind: "person",
    clues: [
      "On Tennessee basketball broadcasts, his one-word call for a made shot was 'Bottom!'",
      "For decades he shared the radio booth with color analyst Bill Anderson.",
      "He retired on top, signing off after calling the Vols' national championship win in January 1999.",
      "Generations knew his signature lines: 'It's football time in Tennessee!' and 'Give him six!'",
      "This beloved radio play-by-play man's famous touchdown call gave this very website its name.",
    ],
    explanation:
      "John Ward, the 'Voice of the Vols,' called Tennessee football and basketball on radio for three decades, retiring after the 1998 national championship season. His calls — 'Give him six, touchdown Tennessee!' and 'It's football time in Tennessee!' — are part of program lore.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p009",
    answer: "Eddie George",
    aliases: ["eddie george", "eddie"],
    kind: "person",
    clues: [
      "He later played Billy Flynn in 'Chicago' on Broadway and became a college head coach in Nashville.",
      "Famously durable, he never missed a start in his eight seasons with the franchise.",
      "He won the 1995 Heisman Trophy at Ohio State, then went to Houston in the first round.",
      "The 1996 Offensive Rookie of the Year carried the load on the Titans' 1999 Super Bowl run.",
      "This No. 27 workhorse back topped 10,000 career rushing yards, nearly all of them for the Oilers and Titans.",
    ],
    explanation:
      "Eddie George won the 1995 Heisman at Ohio State, then anchored the Oilers/Titans backfield from 1996-2003 without missing a start, surpassing 10,000 career rushing yards. The Titans retired his No. 27, and he later coached Tennessee State and performed on Broadway.",
    source: { label: "Pro Football Reference", url: "https://www.pro-football-reference.com/players/G/GeorEd00.htm" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p010",
    answer: "Steve McNair",
    aliases: ["mcnair", "steve mcnair", "air mcnair"],
    kind: "person",
    clues: [
      "He threw for over 14,000 yards at an I-AA school and won the 1994 Walter Payton Award.",
      "The Oilers drafted him third overall in 1995 and moved to Tennessee with him two years later.",
      "In 2003 he shared the NFL MVP award with Peyton Manning.",
      "Behind him the Titans went 13-3 in 1999 and reached the franchise's only Super Bowl.",
      "This Alcorn State legend's final completion in Super Bowl XXXIV ended one yard shy of a tying score.",
    ],
    explanation:
      "Steve McNair starred at Alcorn State, went third overall to the Oilers in 1995, and led the Titans to Super Bowl XXXIV, where the final play ended a yard short. He shared the 2003 NFL MVP award with Peyton Manning, and the Titans retired his No. 9.",
    source: { label: "Pro Football Reference", url: "https://www.pro-football-reference.com/players/M/McNaSt00.htm" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p011",
    answer: "Earl Campbell",
    aliases: ["earl campbell", "earl"],
    kind: "person",
    clues: [
      "The Texas legislature named him an Official State Hero, an honor shared with Davy Crockett and Sam Houston.",
      "He won the 1977 Heisman at Texas, then went first overall to Houston in 1978.",
      "His 81-yard burst against Miami on Monday Night Football in 1978 became a 'Luv Ya Blue' signature moment.",
      "He led the NFL in rushing in each of his first three seasons, peaking at 1,934 yards in 1980.",
      "The bruising 'Tyler Rose' powered the Oilers' late-'70s teams and entered the Hall of Fame in 1991.",
    ],
    explanation:
      "Earl Campbell, the 'Tyler Rose,' won the 1977 Heisman at Texas and led the NFL in rushing in each of his first three Oilers seasons. The battering-ram back defined the 'Luv Ya Blue' era in Houston and was enshrined in Canton in 1991.",
    source: { label: "Pro Football Hall of Fame", url: "https://www.profootballhof.com/players/earl-campbell/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p012",
    answer: "Warren Moon",
    aliases: ["warren moon", "moon"],
    kind: "person",
    clues: [
      "He was Rose Bowl MVP for Washington in 1978, yet no NFL team drafted him.",
      "He won five straight Grey Cups in Edmonton before coming back to the United States in 1984.",
      "Houston made him one of football's highest-paid players and built the run-and-shoot around him.",
      "He led the NFL in passing yards in both 1990 and 1991 with the Oilers.",
      "In 2006 this Oilers great became the first Black quarterback inducted into the Pro Football Hall of Fame.",
    ],
    explanation:
      "Undrafted despite a Rose Bowl MVP performance, Warren Moon won five consecutive Grey Cups in the CFL before signing with the Oilers in 1984. He piloted Houston's run-and-shoot to back-to-back NFL passing titles and in 2006 became the first Black quarterback in the Pro Football Hall of Fame.",
    source: { label: "Pro Football Hall of Fame", url: "https://www.profootballhof.com/players/warren-moon/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p013",
    answer: "The Music City Miracle",
    aliases: ["music city miracle", "music city", "home run throwback"],
    kind: "game",
    clues: [
      "The Titans had practiced the play all season under a baseball-flavored code name.",
      "Lorenzo Neal fielded the kickoff and handed it off behind the wall of blockers.",
      "Officials reviewed whether Frank Wycheck's throw across the field went forward; the play stood.",
      "Kevin Dyson raced 75 yards down the sideline with 16 seconds left to stun the Bills, 22-16.",
      "This January 2000 wild-card kickoff return in Nashville is remembered by an alliterative nickname.",
    ],
    explanation:
      "In the January 2000 AFC wild-card game, the Titans ran 'Home Run Throwback': Lorenzo Neal handed the kickoff to Frank Wycheck, whose cross-field lateral sent Kevin Dyson 75 yards for the winning score against Buffalo, 22-16. The Music City Miracle launched the Titans' run to Super Bowl XXXIV.",
    source: { label: "Pro Football Reference box score", url: "https://www.pro-football-reference.com/boxscores/200001080oti.htm" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p014",
    answer: "Super Bowl XXXIV",
    aliases: ["super bowl xxxiv", "super bowl 34", "titans rams", "rams titans"],
    kind: "game",
    clues: [
      "The losing team erased a 16-0 deficit to tie the game in the fourth quarter.",
      "Kurt Warner threw for a then-record 414 yards and took home MVP honors.",
      "A 73-yard catch-and-run by Isaac Bruce broke the tie with under two minutes to play.",
      "Mike Jones' game-ending stop of Kevin Dyson is remembered simply as 'The Tackle.'",
      "The Titans fell a yard short against the Rams, 23-16, in this January 2000 championship game.",
    ],
    explanation:
      "In Super Bowl XXXIV in Atlanta, the Titans rallied from 16-0 down to tie the Rams before Kurt Warner and Isaac Bruce connected on a 73-yard touchdown. Steve McNair's final drive ended with Kevin Dyson tackled at the one-yard line as time expired, a 23-16 St. Louis win.",
    source: { label: "Pro Football Reference box score", url: "https://www.pro-football-reference.com/boxscores/200001300ram.htm" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p015",
    answer: "The 1998 National Championship Season",
    aliases: ["1998"],
    kind: "season",
    clues: [
      "It opened months after a legendary quarterback's departure, with a September overtime escape against Florida.",
      "Clint Stoerner's stumble and fumble in November kept the perfect run alive against Arkansas.",
      "Captain Al Wilson led a ferocious defense through an unbeaten SEC schedule.",
      "It ended in the Arizona desert with a 23-16 win over Florida State in the first BCS title game.",
      "Tee Martin's first year as starter delivered a 13-0 record and Tennessee's first national title since 1951.",
    ],
    explanation:
      "The 1998 Vols went 13-0, surviving Florida in overtime and Arkansas on the Stoerner fumble before beating Florida State in the Fiesta Bowl, the first BCS championship game. It was Tennessee's first national title since 1951, won the year after Peyton Manning left.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/schools/tennessee/1998.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p016",
    answer: "The 1985 Sugar Vols",
    aliases: ["sugar vols", "1985"],
    kind: "season",
    clues: [
      "The season pivoted when star quarterback Tony Robinson went down injured against Alabama.",
      "Backup Daryl Dickey stepped in and steered the team the rest of the way.",
      "They won the SEC and drew a heavily favored, second-ranked Miami team on New Year's night.",
      "Their 35-7 rout of Vinny Testaverde's Hurricanes remains one of the program's greatest bowl wins.",
      "Johnny Majors' mid-'80s SEC champions earned a sweet nickname from that New Orleans triumph.",
    ],
    explanation:
      "The 1985 Vols lost star quarterback Tony Robinson to injury but rode backup Daryl Dickey to the SEC title. Their stunning 35-7 demolition of No. 2 Miami in the Sugar Bowl earned that team its enduring nickname: the Sugar Vols.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/schools/tennessee/1985.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p017",
    answer: "The Miracle at South Bend",
    aliases: ["south bend", "notre dame", "miracle at south bend"],
    kind: "game",
    clues: [
      "In November 1991 the Vols visited a stadium overlooked by a famous mural nicknamed for a touchdown signal.",
      "The hosts, coached by Lou Holtz, built a 31-7 lead before the comeback began.",
      "Tennessee roared all the way back to win by a single point, 35-34.",
      "A failed field-goal attempt in the final seconds preserved the road upset.",
      "The Vols' 1991 stunner over the Fighting Irish earned a heavenly nickname tied to an Indiana city.",
    ],
    explanation:
      "On November 9, 1991, Tennessee fell behind Lou Holtz's Notre Dame team 31-7, then mounted one of the great comebacks in school history to win 35-34. A failed Irish field-goal try in the closing seconds sealed what Vols fans call the Miracle at South Bend.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/schools/tennessee/1991-schedule.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p018",
    answer: "The 1951 National Championship Season",
    aliases: ["1951"],
    kind: "season",
    clues: [
      "Because final polls closed before the bowls, a 28-13 Sugar Bowl loss to Maryland didn't cost them the crown.",
      "Single-wing tailback Hank Lauricella finished second in that year's Heisman voting.",
      "The Vols went 10-0 in the regular season and finished No. 1 in the AP poll.",
      "It was the last championship team of the program's legendary general.",
      "Neyland's unbeaten Vols were voted national champions the year before his 1952 farewell — name the year.",
    ],
    explanation:
      "The 1951 Vols went 10-0 behind Heisman runner-up Hank Lauricella and finished No. 1 in the final AP poll, which was taken before the bowls. It was Gen. Robert Neyland's final national championship, and it stood as Tennessee's most recent title until 1998.",
    source: { label: "Sports Reference CFB", url: "https://www.sports-reference.com/cfb/schools/tennessee/1951.html" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p019",
    answer: "Neyland Stadium",
    aliases: ["neyland"],
    kind: "place",
    clues: [
      "It opened in 1921 as Shields-Watkins Field, honoring the couple whose gift made it possible.",
      "The playing surface inside still carries that original Shields-Watkins name.",
      "Expanded over and over since the 1920s, it has ranked among the largest stadiums in the world.",
      "It sits right on the banks of the Tennessee River in Knoxville.",
      "Since 1962, the Vols' 100,000-seat home has borne the name of the program's greatest coach.",
    ],
    explanation:
      "Tennessee's home field opened in 1921 as Shields-Watkins Field and was renamed Neyland Stadium in 1962 for Gen. Robert Neyland. Expanded many times, the riverside giant has held more than 100,000 fans and remains one of the largest stadiums in college football.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p020",
    answer: "The Vol Navy",
    aliases: ["vol navy"],
    kind: "tradition",
    clues: [
      "Broadcaster George Mooney is credited with starting it in the early 1960s to skip game-day traffic.",
      "On big fall Saturdays, hundreds of its members raft up side by side for the weekend.",
      "It exists because the stadium sits just a short walk from a navigable waterway.",
      "Fans arrive by pontoon, cruiser, and houseboat, docking near the stadium before kickoff.",
      "This flotilla of orange-clad boaters on the Tennessee River carries a nautical, fleet-like name.",
    ],
    explanation:
      "The Vol Navy traces to the early 1960s, when broadcaster George Mooney began boating to games to avoid Knoxville traffic. Today hundreds of boats tie up along the Tennessee River near Neyland Stadium on football Saturdays, one of the sport's most distinctive tailgates.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p021",
    answer: "The Checkerboard End Zones",
    aliases: ["checkerboard", "checkered end zones"],
    kind: "tradition",
    clues: [
      "Coach Doug Dickey brought the design to Knoxville in the 1960s; it disappeared during the artificial-turf era.",
      "The pattern returned to the stadium in 1989 and has been repainted ever since.",
      "Fans have recreated the look in the stands by coordinating which color each section wears.",
      "Alternating orange and white squares fill both ends of the field.",
      "Each Tennessee end zone is painted like a board-game grid of orange and white.",
    ],
    explanation:
      "Doug Dickey introduced the orange-and-white checkerboard end zones in the 1960s; they vanished in the artificial-turf years and returned for good in 1989. Fans now mirror the pattern in the stands by 'checkering' Neyland Stadium for marquee games.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p022",
    answer: "Rocky Top",
    aliases: ["rocky top"],
    kind: "tradition",
    clues: [
      "Boudleaux and Felice Bryant wrote it in a matter of minutes at a Gatlinburg hotel in 1967.",
      "The Osborne Brothers recorded it first, and it later became an official Tennessee state song.",
      "It is not the university's official fight song — that's 'Down the Field' — though Saturdays suggest otherwise.",
      "The Pride of the Southland Band adopted it in the early 1970s and now plays it dozens of times per game.",
      "This bluegrass tune about a beloved mountain home blares after every Vols score.",
    ],
    explanation:
      "'Rocky Top' was written by Boudleaux and Felice Bryant in Gatlinburg in 1967 and first recorded by the Osborne Brothers. The Pride of the Southland Band began playing it in the early 1970s, and the state-song bluegrass number became Tennessee's unofficial anthem.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p023",
    answer: "Smokey",
    aliases: ["smokey", "smoky"],
    kind: "tradition",
    clues: [
      "He won a 1953 halftime contest when the Rev. Bill Brooks' entry howled back at the cheering student crowd.",
      "His successors carry the same name with Roman numerals, like a royal line.",
      "His breed was later designated Tennessee's official state dog.",
      "The floppy-eared Bluetick Coonhound patrols the sidelines at every Vols home game.",
      "Tennessee's live hound mascot takes his name from the haze over the state's most famous mountains.",
    ],
    explanation:
      "Smokey, Tennessee's Bluetick Coonhound mascot, was chosen at a 1953 halftime contest when Rev. Bill Brooks' dog howled along with the roaring crowd. A line of Smokeys bearing Roman numerals has led the Vols ever since, named for the Great Smoky Mountains.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
  {
    id: "p024",
    answer: "Running Through the T",
    aliases: ["through the t", "run the t", "power t"],
    kind: "tradition",
    clues: [
      "Like the end-zone paint scheme, it dates to Doug Dickey's tenure in the mid-1960s.",
      "The Pride of the Southland Band rehearses its pregame formation with drill-team precision.",
      "Moments before kickoff, 100,000 fans roar as the band splits open a corridor on the field.",
      "Players sprint from the tunnel through a giant letter formed by the marching band.",
      "Tennessee's team takes the field by dashing through the same letter that appears on their helmets.",
    ],
    explanation:
      "Since the Doug Dickey era in the mid-1960s, the Pride of the Southland Band has formed a giant Power T on the field before kickoff. The Vols sprint through the opening in one of college football's most famous entrances.",
    source: { label: "Tennessee Athletics", url: "https://utsports.com/" },
    checkedDate: "2026-08-21",
  },
];
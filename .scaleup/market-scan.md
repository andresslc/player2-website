# Market scan: Player Two: Growth House website

Read date for every site below: **19 Oct 2026** (all pages are home pages unless stated).
Scope: layout, section order and conversion patterns only. Identity (colours, Chunk, mascot, wordmark) is locked and not discussed except where a layout choice collides with it.
This file is internal. It names competitors and holds no client material. Do not publish it.

Plain-language key: "above the fold" means what shows before scrolling. "Hero" is that first screen. "Proof" means customer results, reviews, logos or testimonials.

---

## 0. What was and was not done (read this first)

| Item | Status |
|---|---|
| `dembrandt` (real colours and type off a page) | Installed on demand through npm (v0.39.2) and run on 5 sites. Never run with its DESIGN.md export. |
| `impeccable detect` (flags design and build faults) | Installed on demand through npm (v4.7.0). Run on 5 sites. Mobile-width pass (390x844) on 2 only. |
| Terms-of-service check | Done for every site before any tool run. Result in the sample table. |
| robots.txt | Read for every site. All allowed home-page access. Housecall Pro asks for a 10-second crawl delay, and I spaced its loads at least 12 seconds apart. |
| Bot-block handling | Jobber returned 403 to a plain request. I recorded it as a gap and did not retry with another identity. |
| Eyeballing | No value in section 4 is eyeballed. Every token is tagged with its method. |

**Disclosure the client should weigh.** For every site I first fetched the page HTML with one plain HTTP request (an identifying user-agent, robots.txt-permitted) and read its structure, headings and button text. BaaDigi's terms bar "automated tools, bots, or scrapers" without written permission. Finish Work Studio's terms bar scraping the site's "code, copy, or design" without written permission. A single page fetch may sit inside those clauses. I used it only to read structure, ran no tool against either site, took no palette or type from them, and reproduce none of their copy. If the client wants a stricter line, drop those two from the evidence and the counts below fall from n=4 to n=2 for direct competitors. I will not repeat the fetch.

---

## 1. Sample

8 sites in the counted sample. All read on 19 Oct 2026.

| # | Site | Group | Why picked | URL | How read | Access notes |
|---|---|---|---|---|---|---|
| 1 | BaaDigi | Direct | Named in client doc. Sells to contractors, free site check as entry, ships free tools and a game | https://www.baadigi.com/ (plus /tools/contractor-tycoon) | Manual structure read via one HTTP fetch per page. **No automated extraction** (terms bar scrapers) | Fetched fine. No tokens extracted. |
| 2 | Fire Fuel SEO | Direct | Named in client doc. Home-service agency, free call as entry | https://firefuelseo.com/ | Single HTTP fetch for structure. Automated: dembrandt (desktop), impeccable (desktop and 390px mobile) | Terms had no scraping clause. robots.txt allows. |
| 3 | TradeOps Consulting | Direct | Named in client doc. Home-service "systems" pitch, free audit as entry | https://tradeopsconsulting.com/ | Single HTTP fetch for structure. Automated: dembrandt, impeccable (desktop and mobile) | Terms allow bots "as permitted by robots.txt", and robots.txt allows. One embedded widget (iframe) I could not read. |
| 4 | Finish Work Studio | Direct (closest offer overlap) | Named in client doc. Sells missed-call text-back, review requests, Google profile work and a site, with a free audit as entry | https://www.finishworkstudio.com/ | Manual structure read via one HTTP fetch. **No automated extraction** (terms bar scraping) | Fetched fine. No tokens extracted. |
| 5 | Housecall Pro | Category leader | Software sold to the same owner-operators, includes a landscaping segment | https://www.housecallpro.com/ | Single HTTP fetch. Automated: dembrandt, impeccable (desktop) | No scraping clause found in /terms/. Crawl delay honoured. Two cookie/modal prompts in the page source (see section 3). |
| 6 | Podium | Category leader | Software for local-business lead capture and reviews. Overlaps with Respawn Protocol territory | https://www.podium.com/ | Single HTTP fetch. Automated: dembrandt. **impeccable timed out twice (30 s navigation limit), so no result** | Terms page I retrieved had no scraping language, but it is a 1.5 MB multi-document page and may not have rendered fully. Treat the terms check as weak. |
| 7 | PostHog | Adjacent | A B2B tool with a strongly playful, mascot-led brand that still reads as serious. Used only as a "personality without toy" reference | https://posthog.com/ | Single HTTP fetch. Automated: dembrandt, impeccable (desktop) | No scraping clause found. Not a pixel or game theme. |
| 8 | LocaliQ Website Grader | Adjacent | The page is the diagnostic. A local-business marketing score is the whole conversion device | https://localiq.com/seo-website-grader/ | Manual structure read via one HTTP fetch. No tools run | I could not find its terms page (two guessed URLs returned 404), so I did not automate. |

### Gaps, exclusions and things I looked at but did not count

| Item | What happened | Effect on the evidence |
|---|---|---|
| Jobber (getjobber.com) | 403 on a plain request. robots.txt itself was served. | **Gap.** Third category leader missing. Not worked around. |
| Land-book, Lapa Ninja (galleries) | 403 to my fetch tool | **Gap.** Could not browse pixel or retro galleries directly. |
| Godly | A search returned nothing usable | Gap. |
| Pixel or game-themed B2B/service site | I did not find a verified example. Third-party lists (a Colorlib roundup) named agencies with retro styling, but I did not read them and cannot vouch for them | **Gap.** The "dial the theme" argument rests on reasoning and is labelled a hypothesis in section 5. The only in-category game I found is BaaDigi's tool (see 2.9), and I read its landing page, not the game itself. |
| ADAPTIVE Automations | Search found a business address and descriptions, and only GoHighLevel funnel preview pages. No site of its own that I could confirm | **Excluded.** I did not read the preview pages, since I cannot confirm they are the company's site. |
| Sprout Sage Solutions | sproutsage.com now redirects to a 3-section waitlist page for a customer-history CRM-style product (no services, no flat pricing) | **Excluded.** The client doc's description (flat-priced services shop) did not hold on what is live. Whether the company changed or this is a different business is unknown. |
| basement.studio | Read static text only. Agency with a playful menu. No terms page found | Not counted. Evidence too thin. |

The client doc's description of Finish Work Studio (tiered packages, free audit) did hold. BaaDigi, Fire Fuel and TradeOps all exist and ship what the doc implied, with differences noted below.

---

## 2. Recurring patterns, with counts

Counts name their sample. "Direct 4" means BaaDigi, Fire Fuel, TradeOps, Finish Work Studio. "All 8" means the whole counted sample. "Scanned" means sites where I ran a tool.

### 2.1 Primary call to action

| Pattern | Count | Reading |
|---|---|---|
| Home page leads with a free audit, check or consultation as the main button | **4 of 4 direct** (3 named audit or check, 1 named strategy session) | Table stakes in this niche |
| That main offer is a conversation with a person, not a scan | 1 of 4 direct (Fire Fuel). Finish Work offers a 30-minute call as a second button | A scan or audit beats a call as the headline in 3 of 4 |
| Same offer repeated down the page (below the headline, outside the footer) | 4 of 4 direct: 3, 7, 4 and 11 repeats (BaaDigi, Fire Fuel, TradeOps, Finish Work) | Repetition is the norm |
| Header carries its own action button | 4 of 4 direct | |
| Leaders and adjacent lead with "free trial", "get a demo" or "get started free" | 3 of 3 (Housecall Pro, Podium, PostHog) | Software language. Player Two is selling a service, so these are not the model |
| Phone number visible in the header | 2 of 4 direct (BaaDigi, Fire Fuel) | Page-source order only, not a visual check |
| Hero has a primary and a secondary button | 2 of 4 direct (Fire Fuel, Finish Work) | |
| Entry form length seen | Fire Fuel's closing form has 7 fields including a text-message consent box. BaaDigi's hero check asks for a website address | Observation only. I have no conversion data, so I cannot say which converts better |

### 2.2 Hero structure

| Pattern | Count |
|---|---|
| Small label above the headline (a kicker or status line) | 2 of 4 direct (Fire Fuel's label, Finish Work's launch-status line) |
| Headline names the customer type (home service, HVAC and plumbing) | 2 of 4 direct (Fire Fuel, TradeOps) |
| Headline names the outcome and the method in one line | 2 of 4 direct (BaaDigi, Finish Work) |
| Proof inside the hero (rating, named result chips) | 1 of 4 direct (BaaDigi) |
| Trade picker in the hero or first tool | 2 of 8 (Housecall Pro hero pills for 9 trades, BaaDigi's tool picker for 8). Fire Fuel has an industry grid further down, which makes 3 of 8 with a trade picker or grid anywhere on the home page |
| Giant, tight-set headline | Fire Fuel: 86 px, weight 900, uppercase (dembrandt). Whether that works is taste, not structure |

### 2.3 Proof handling

| Pattern | Count |
|---|---|
| Named client results in the first two blocks | 2 of 4 direct (BaaDigi, Fire Fuel). Both use percentages or lead counts I did not verify and do not repeat here |
| A trust line or review link in the first two blocks | 3 of 4 direct (adds Finish Work) |
| Testimonials or results block somewhere on the home page | 4 of 4 direct. TradeOps' reviews load in an embedded widget I could not read |
| A results range stated with no named client on the page | 1 of 4 direct (TradeOps) |
| Scale numbers as the main proof (customer counts, stat tiles) | 3 of 3 non-direct (Housecall Pro, Podium, PostHog) |
| Honest handling of thin proof | 1 of 4 direct (Finish Work): its projects block marks work as "in progress" and says verified results appear only once clients confirm them |

Finish Work is the closest thing in the sample to what Player Two must do. It is also a direct competitor with an almost identical early-stage problem, and it handles it by being explicit rather than hiding it.

### 2.4 Offer and pricing presentation

| Pattern | Count |
|---|---|
| Dollar prices shown on the home page | 2 of 4 direct (BaaDigi, Finish Work) |
| A dedicated pricing or plans route in the main menu | 4 of 4 direct (BaaDigi "Pricing & Plans", Fire Fuel "Investment & Pricing", TradeOps "Our Plans", Finish Work "Packages") |
| Tiered package cards | 2 of 4 direct (BaaDigi: 4 levels. Finish Work: 3 tiers, one marked "most chosen") |
| Tiers named as levels or stages | 1 of 4 direct (BaaDigi, "Level 1" to "Level 4") |
| Offer organised around services rather than tiers | 2 of 4 direct (Fire Fuel's 6 services, TradeOps' 3 layers) |
| Paid audit offered next to the free one | 1 of 4 direct (BaaDigi). It also shows a price and a paid-audit scope on the home page |

Player Two has no price release (intake flag 2). That puts it on the Fire Fuel and TradeOps side of this split (route in the menu, no number on the home page) until David signs off.

### 2.5 Process section

| Pattern | Count |
|---|---|
| A process or stages block on the home page | 4 of 4 direct |
| Steps in that block | 3 steps (BaaDigi, TradeOps), 4 steps (Fire Fuel, Finish Work). Finish Work links to a longer 7-stage page |
| Timeline framing (30, 60, 90 days) | 1 of 4 (Fire Fuel) |

Player Two's process has 5 steps (Recon Call, Plan, Roadmap, Build, Check-In). That is longer than any block on the four direct home pages (maximum 4). It is a chance to look different or a reason to compress it. See section 6.

### 2.6 Calculators, audits and tools

| Pattern | Count |
|---|---|
| Any interactive tool or diagnostic on the site | 3 of 4 direct (BaaDigi, TradeOps, Finish Work). Fire Fuel has only a "see where you rank" form at the foot of the page |
| Tool embedded on the home page itself | 2 of 4 direct (BaaDigi: AI-search check form with a trade picker. Finish Work: missed-call calculator) |
| Tools only reachable from the menu | 1 of 4 direct (TradeOps: two calculators under Resources) |
| Number of free tools in BaaDigi's menu | at least 10, plus a game |
| Page whose entire job is a diagnostic | 1 of 8 (LocaliQ's grader) |

**Finish Work's missed-call calculator is the nearest thing to the Leak Report in the sample.** What I can say about how it is built, in my words:
- It sits roughly mid-page after the hero, a trust line and a seven-item list of "leaks". It is not in the hero.
- It takes 5 numeric inputs: missed calls per month, average job value, close rate, and two "advanced" assumptions that start at preset values.
- It labels itself a planning estimate, states that the presets are hypothetical starting points, and names the third-party studies behind each leak with a year. It also gives a worked example.

For Player Two this confirms two flags. The calculator pattern is not new in the niche, so it cannot be the claim by itself. And third-party statistics must be verified and cited on the page (flag 4), since the closest competitor does exactly that.

### 2.7 Navigation

| Pattern | Count |
|---|---|
| Lean main menu, 5 items plus a button | 1 of 4 direct (Fire Fuel) |
| Large menu | BaaDigi's header holds 40 links (includes a tools section and dropdowns). I did not check which are hidden until hover |
| Menu has a "Results" or "Reviews" item | 2 of 4 direct (Fire Fuel, Finish Work) |
| Career or "about" links in header | 2 of 4 direct (TradeOps, Finish Work) |

### 2.8 Section order on the home page (as read)

| Site | Order, top to bottom |
|---|---|
| BaaDigi | Hero with site check and proof chips, then "you were invisible" problem, AI citation tool, paid audit, four tiers, how it works, dashboard, industries, FAQ, closing check |
| Fire Fuel | Hero, 2 named results, problem, 6 services, 4-step build, 30/60/90 plan, reporting, 9 industries, founder message, fit check, FAQ, rank-check form |
| TradeOps | Hero, 9-item pain list, 3-layer system, reviews, benefits for owners and for investors, result range, 3 phases, "us versus other agencies" comparison, closing audit |
| Finish Work | Themed hero, local trust line, 7 leaks, calculator, solution blocks, projects, testimonials, 3 packages, 4-step timeline, closing audit, FAQ |

Pattern: problem or pain before solution in 4 of 4. Pricing or plans before the closing call to action in 2 of 4 (BaaDigi, Finish Work). FAQ in the last third in 3 of 4 (BaaDigi, Fire Fuel, Finish Work). A "us versus others" comparison in 1 of 4 (TradeOps).

### 2.9 Theme and metaphor

This matters because the client's audit says nobody in the category owns the game theme. What I found, on home pages only:

| Site | Metaphor in use |
|---|---|
| Finish Work | Space-launch: a "go for launch" status line with coordinates, a "countdown" for the process |
| BaaDigi | Levels 1 to 4 for tiers, "scoreboard" for results, and a free browser game for contractors (landing page read, game not played) |
| Fire Fuel | Fire in the name and colour. No metaphor structure |
| TradeOps | None |

So 3 of 4 direct competitors use some metaphor vocabulary, and 1 of 4 ships a game. **0 of 4 use pixel art or a retro-game look as brand identity.** The claim "nobody owns it" holds for the visual identity of the theme. It does not hold for game vocabulary. BaaDigi already uses levels and a game as a lead tool.

### 2.10 Page length and mobile

| Site | Visible words on the home page (static HTML, approximate) | Number of H2 headings |
|---|---|---|
| TradeOps | 737 | 9 |
| Housecall Pro | 1,208 | 7 |
| PostHog | 1,190 | 9 |
| Podium | 1,660 | 5 |
| Fire Fuel | 1,977 | 11 |
| BaaDigi | 2,574 | 8 |
| LocaliQ grader page | 2,708 | 2 |
| Finish Work | 2,754 | 11 |

Direct 4 range from 737 to 2,754 words, median about 2,275. Counts come from fetched HTML. Lazy-loaded content may be missing, so treat them as rough. The client's draft public copy is about 1,000 words, shorter than three of the four direct pages.

Mobile: only checked by running impeccable at 390x844 on 2 sites (Fire Fuel, TradeOps). Both had body text running to within 8 to 10 px of the screen edge. Fire Fuel also had 11.84 px body text. I did not test any site on a real phone, so I cannot say how any of these feel to use on one.

---

## 3. Patterns to avoid, with reasons

### 3.1 Faults found by `impeccable detect`

| Site (scanned) | Findings | Notable items |
|---|---|---|
| Fire Fuel | 47 desktop, 38 at mobile width | White text on its orange main button at 3.4:1 (needs 4.5:1). 11 low-contrast items in total. 6 small labels above headings, 4 icon tiles above headings, an eyebrow chip, a glow effect on a button, 6 lines longer than about 80 characters |
| TradeOps | 10 desktop, 4 mobile | 8 headings flagged for large italic serif on the home page. A 10 px label on its main audit button. Tight line spacing |
| Housecall Pro | 1 (advisory only) | One low-contrast disclaimer line (4.2:1) |
| PostHog | 19 | 7 low-contrast warnings, nested cards, a blinking text cursor in the first screen, a skipped heading level |
| Podium | **No result.** Tool timed out twice at 30 s | This is a tool failure, not a verdict |
| BaaDigi, Finish Work, LocaliQ | Not run | Terms bar it, or terms not found |

How to read this. Some rules flag build faults (low contrast, tiny text, long lines). Others are style opinions about common templates, which impeccable labels "slop". A count is not a quality score. What it supports: **2 of the 2 direct competitors I could scan have contrast or text-size faults on their main button area**, and the biggest competitor in the sample (Housecall Pro) is nearly clean. A clean, readable, high-contrast page is therefore not the norm among the small agencies.

### 3.2 Patterns I recommend Player Two does not copy

| Pattern | Seen at | Why avoid |
|---|---|---|
| Pale text or white text on a mid-tone button | Fire Fuel (3.4:1) | Fails the standard and is hard to read outdoors. Applies directly to Player Two: white on leaf green is 2.49:1 (section 4.3) |
| Results with no client attached | TradeOps (a stated range), plus numeric chips elsewhere | Player Two has no proof. Any number without a source will read as invented. Intake flag 1 forbids it |
| Stat tiles and customer-count claims as the main proof | Podium, Housecall Pro, PostHog (3 of 3) | These rely on scale Player Two does not have |
| Giant 40-link header menus | BaaDigi (40 links) | A burned-out owner wants one clear action. Hypothesis, no data |
| A home page that packs in every service and tool | BaaDigi (2,574 words, 10+ tools) | Dilutes the single offer. Hypothesis |
| Marketing-template stack of small label, huge headline, icon tiles | Fire Fuel (6 small labels, 4 icon tiles flagged) | Looks like every other agency page, which defeats differentiation |
| Italic serif display headline on dark | TradeOps | Does not suit a heavy slab display face already locked in Chunk |
| Pop-up and exit prompts | Housecall Pro (a gift-card prompt and a "stay on this page" prompt appear in page source, not seen live) | Reads as pressure. Counter to the "no pitch" promise |
| Glow shadows on buttons | Fire Fuel | Template look, adds nothing |
| Long entry forms with text-message consent up front | Fire Fuel closing form (7 fields) | Hypothesis: more friction at the first step. Needs a test, not a rule |

### 3.3 Table stakes or chance to differentiate? (client's call)

| Shared pattern | Count | My read, labelled as opinion |
|---|---|---|
| Free audit, check or call as the headline action | 4 of 4 direct | Table stakes. Not having one would look odd. Differentiate in the framing (no pitch, a plain report), not in having one |
| Problem before solution | 4 of 4 | Table stakes |
| Process block of 3 to 4 steps | 4 of 4 | Table stakes in kind. Player Two's 5 steps could be a chance or a burden |
| Repeating the main action down the page | 4 of 4 | Table stakes |
| Calculator or diagnostic on the site | 3 of 4 (2 of 4 on the home page) | Contested. Owning it in the hero is open (none of the 4 puts a tool in the hero) |
| Prices on the home page | 2 of 4 | Open. Needs David's decision first |
| Scale-number proof | 3 of 3 non-direct | Not available to Player Two |
| Blue or orange as the main accent | See section 4 | Green and cream are unclaimed in my extracted set (n=5) |
| Serious corporate look with no personality | Most of the direct four, in my reading | I cannot measure this. Flagged as an impression, not a count |

---

## 4. Extracted tokens, with sources

Purpose: show what Player Two will look different from. Not a palette to copy.

### 4.1 Competitor colour and type

Method for every row: `dembrandt` v0.39.2, `--json-only`, home page, desktop 1920x1080 viewport, run 19 Oct 2026 against the live site. BaaDigi and Finish Work are **not extracted** because their terms bar it. Values for Fire Fuel, TradeOps, Housecall Pro, Podium and PostHog are exactly what the tool returned.

| Site | Background | Text | Main accent(s) (usage count) | Display type (size, weight) | Body type (size, weight) |
|---|---|---|---|---|---|
| Fire Fuel | `#ffffff` | `#1c0d0a` | `#ff4500` orange (63) | Montserrat Variable, 86.4 px, 900, uppercase | Noto Sans Variable, 16 px, 400 |
| TradeOps | `#000000` dominant (159 uses), `#ffffff` | `#484a61` | `#3a7dff` blue (2) | Inter Tight 65 px / 500, and Instrument Serif (24 uses) | Inter Tight, 16 and 18 px, 400 |
| Housecall Pro | `#f5f5f5` and white | `#13191e` | `#0065c1` blue (22), `#ff9b24` orange (10), navy `#002942` | Manrope, 80 px, 700 and 800 | Open Sans, 16 px, 400 |
| Podium | `#18181c` near-black, `#ffffff` | black | `#7d9ef0` light blue (22) | Graphik (Medium and Semibold), 52 px | Graphik Regular 14 px, Semibold 18 px |
| PostHog | `#eeefe9` warm off-white | `#111111` | `#eb9d2a` amber, `#f54e00` orange, `#2f80fa` blue | RoundHog (custom family), 36 px, 800 | RoundHog, 16 and 18 px, 500 |

What the table supports, counted over the 5 extracted sites:
- **Main accent family:** blue in 3 of 5 (TradeOps, Housecall Pro, Podium), orange or amber in 3 of 5 (Fire Fuel, Housecall Pro, PostHog; Housecall Pro has both). **Green: 0 of 5.**
- **Dark page background:** 2 of 5 (TradeOps, Podium).
- **Cream or warm off-white background:** 1 of 5 (PostHog, `#eeefe9`, close to Player Two's `#ece8d8`). The cream alone is not unique, so the green and the slab type matter more.
- **Slab display type:** 0 of 5. Heavy geometric sans in 2 (Fire Fuel, Housecall Pro), italic serif in 1 (TradeOps).
- **Body type:** a plain sans in 5 of 5.

Not covered: BaaDigi and Finish Work (2 of the 4 direct competitors) have no extracted tokens. Any claim about "every competitor's palette" would be unsupported.

### 4.2 Body-type candidates for Player Two (not decided)

Player Two has no body face. These are candidates only. I checked the licence from the package metadata of the matching `@fontsource` npm packages on 19 Oct 2026, which lists OFL-1.1 (SIL Open Font License, which allows web embedding and self-hosting). I did not see them next to Chunk, so I cannot tell you which pairing looks right.

| Candidate | Licence (source) | Notes (structure only) |
|---|---|---|
| Source Sans 3 | OFL-1.1 (fontsource v5.3.1) | Neutral, compact, very readable |
| Public Sans | OFL-1.1 (fontsource v5.3.0) | Neutral, wide weight range |
| Atkinson Hyperlegible | OFL-1.1 (fontsource v5.3.0) | Designed for readability and distinct letter shapes |
| DM Sans | OFL-1.1 (fontsource v5.3.0) | Rounder, friendlier |
| Work Sans | OFL-1.1 (fontsource v5.3.0) | Slightly warm, sturdy |
| IBM Plex Sans | OFL-1.1 (fontsource v5.3.0) | A faint technical flavour, which could echo the game or terminal theme |
| Inter | OFL-1.1 (fontsource v5.3.0) | Very common. Used as a headline face at TradeOps, so it is the least distinctive |

> **Correction (19 Oct 2026, design-context stage):** the paragraph below is wrong. The supplied font file's own metadata reads "© Matsero. All Rights Reserved" and "Chunk is a trademark of Matsero" (v1.000, 2025). It is a commercial font, not the League of Moveable Type OFL release, and it is a heavy display sans, not a slab. See DESIGN.md, Typography.

**Chunk licence, still open (intake flag 6).** A web search describes "Chunk" (a heavy slab by Meredith Mandel, League of Moveable Type) as licensed under the OFL. But the supplied folder (`Chunk.otf`, `.ttf`, `.woff`, `.woff2`) contains no licence file, and I cannot confirm the supplied files are that exact release. Treat as probably fine, unconfirmed.

### 4.3 Contrast of the locked palette (computed by me, not extracted)

Method: WCAG 2.x relative-luminance formula applied to the hex values in the intake file, calculated 19 Oct 2026. These are my arithmetic, not a tool's reading of a page. A ratio of 4.5 or more is the usual bar for body text, and 3 or more for large text. I include them because layout decisions (which colour a button can be) depend on them.

| Pair (text on background) | Ratio | Use |
|---|---|---|
| Ink `#273835` on cream `#ece8d8` | 10.04 | Body text. Safe |
| Forest `#1f6a56` on cream | 5.25 | Text and links. Safe |
| Cream on forest | 5.25 | Reversed text on forest. Safe |
| Ink on leaf `#55b948` | 4.94 | Button label on a leaf-green button. Passes |
| Leaf on ink | 4.94 | Green accents on a dark band. Passes |
| Ink on yellow `#fec00e` | 7.49 | Strong. Yellow works only on dark |
| **Leaf on cream** | **2.03** | **Fails.** Not for text or for text-on-cream icons that carry meaning |
| **White or cream text on leaf** | **2.49 / 2.03** | **Fails.** Same mistake as Fire Fuel's button |
| Yellow on cream | 1.34 | Fails. Decoration only |
| Dark tan `#ba8d62` on cream | 2.42 | Fails. Decoration only |
| Forest on cream-2 `#ded7bc` | 4.47 | Just misses 4.5. Avoid for small text |

---

## 5. Design directions (all inside the locked identity)

Three directions. Each is an argument, not a mock-up. None changes colours, logo or Chunk. The theme dial used below:

| Dial | What it means |
|---|---|
| 0 | Game names only (offer names), nothing visual |
| 1 | Mascot as a small spot illustration, pixel-style button corners |
| 2 | Process and results shown as game devices (level map, score screen), plain text elsewhere |
| 3 | Full environment: pixel scenes, sprite behaviour, game-style headings throughout |

Rules that hold in every direction (hypotheses about reading behaviour, not tested):
- Anything the owner must act on (button, phone, form) uses plain words. The game name goes second.
- Every game-named offer carries a plain subtitle in the same view.
- No sound. No auto-playing motion. Respect the reduced-motion setting.
- No invented proof. No prices without David's release.
- No Scale Up Labs branding anywhere (intake flag 10).
- On leaf green, use ink text, never white or cream (section 4.3).

### Direction A: "Plain Numbers" (credibility-first, theme dialled down)

**Theme level:** 1.

**Argument.** Owners who are burned out judge a stranger on clarity in a few seconds (hypothesis). The evidence for staying plain: 4 of 4 direct competitors use the same free-audit hero and the same problem-first order (so the structure is familiar and safe). 2 of 2 scanned direct competitors had contrast or text-size faults on their main action area (so being clean and readable is itself a visible difference). And the proof gap is real: with no results, a loud theme has nothing credible next to it.

**Page structure, top to bottom.**
1. Header: wordmark badge, 4 links at most, one button (Recon Call).
2. Hero: plain headline about the leak (missed calls, slow quotes). One supporting sentence about diagnose first. Buttons: Recon Call (primary), Leak Report (secondary). Frog sits small beside the badge, not in the hero image.
3. "Where the money leaks": the four leaks the doc names, as plain symptoms in owner language.
4. Leak Report calculator, as its own full-width band right after the leaks (3 to 5 inputs). Result labelled as an estimate.
5. How it works: 5 steps in a single row, plain names first, game names as small tags.
6. What we fix: five offers as cards, plain title first (for example, "Stop losing missed calls"), then the game name.
7. "Why the order matters" (the doc's diagnose-first point), kept short.
8. About the team: small, honest, names pending (client to supply).
9. FAQ.
10. Closing Recon Call band.

**Hero treatment.** Cream background, ink Chunk headline, one forest or leaf button with ink text. No illustration beyond the badge.

**Where the Leak Report sits.** Section 4, second action on the page.

**Having no proof.** There is no proof section at all on the live page. The page leans on process clarity and on a "what we do and don't do" list (any guarantee wording needs David's sign-off, flag 3). The build keeps an empty slot in the template, hidden until real, client-approved results exist. Finish Work's honest "verified results appear once approved" wording is a precedent if a visible note is ever wanted.

**Density and motion.** Medium-low. About 900 to 1,200 words, which is below 3 of the 4 direct pages. Motion only on hover and focus.

**Body-type candidates.** Source Sans 3, Public Sans, Atkinson Hyperlegible.

**What it trades away.**
- The only thing nobody else owns becomes a whisper. At level 1, a visitor could confuse it with the other plain free-audit pages (4 of 4 share that hero).
- Less to remember and share.
- Weakest fit if the client wants the retro identity to carry the brand.

### Direction B: "Co-op Mode" (leans into the theme)

**Theme level:** 3, held in check by plain subtitles.

**Argument.** 0 of 4 direct competitors use pixel art or a retro-game look as identity, and 4 of 4 share near-identical heroes and sections (section 2.1, 2.8). A themed page is the clearest way to stand apart. The client's own copy already has a story that fits (Player 1 and Player 2, press start). BaaDigi's game shows that a game can be a credible lead tool in this niche, though I have not seen how it performs or how it is received.

**Page structure.**
1. Header with a progress-style strip of the five steps.
2. Hero: badge and frog large, game headline, plain subtitle, "Press Start" style button labelled with the real action (Book a Recon Call, free, no pitch).
3. "Player 1 / Player 2" story, short.
4. Level map: the 5-step process as a path (Recon Call to Check-In), each stop with a plain sentence.
5. Leak Report as "Level 1": the calculator framed as a scan, results on a "score screen" (leaks found, estimated dollars, labelled as an estimate).
6. Five offers as cartridge-style cards, plain subtitle on each.
7. "Why the order matters" as a locked/unlocked device.
8. FAQ, then closing Press Start band.

**Hero treatment.** Large badge and mascot, yellow sparkles on dark ink bands (yellow only works on dark), pixel-stepped edges on cards.

**Where the Leak Report sits.** Section 5, framed as the first level.

**Having no proof.** The theme itself becomes the carrier: playful and confident, with the process visible. The risk is that without proof, a heavy theme can look like a hobby project to a cautious owner (hypothesis). No stat tiles, no fake logos.

**Density and motion.** Medium. Sparkle and sprite motion at a few moments (hero, calculator result), all disabled under reduced-motion. No sound.

**Body-type candidates.** DM Sans, Work Sans, IBM Plex Sans.

**What it trades away.**
- Speed of trust. An owner who is already skeptical sees the theme before the plain offer.
- Mobile readability and page weight (pixel art and animation).
- Maintenance. A themed system is harder for a small part-time team to extend.
- The theme can drift into toy territory if each new section adds more game language.

### Direction C: "Diagnostic-First" (the calculator is the page; theme at the tool and the process)

**Theme level:** 2.

**Argument.** The Leak Report is the one thing the doc recommends as a lead magnet, and it gives a visitor something concrete with no proof needed. In the sample, 2 of 4 direct competitors put a diagnostic on their home page, but **0 of 4 put it in the hero**. Finish Work's calculator sits after a trust line and a seven-item list. It shows the pattern is accepted in the niche, and the hero slot is open. Using the game theme on the tool and the process, and plain language elsewhere, is a middle path: the theme appears where it does a job.

**Page structure.**
1. Header: badge, 3 to 4 links, Recon Call button.
2. Hero: a short plain headline, and the Leak Report calculator itself (3 inputs: missed calls a month, average job value, quote follow-up habit). Result appears in place as an estimate.
3. After the result: the Recon Call button, carrying the numbers forward into the booking (needs spec-app).
4. "What these leaks are": 4 symptoms, plain.
5. Process: 5 steps as a level map (theme level 2).
6. Five offers, plain title first, game name second.
7. "Why the order matters", FAQ, closing Recon Call band.

**Hero treatment.** Cream background, ink headline, the calculator in a bordered card. The frog acts as a small guide in the card ("scanning" then "found X"). Leaf green button with ink label.

**Where the Leak Report sits.** The hero.

**Having no proof.** The tool is the proof of seriousness (hypothesis): it shows the owner their own numbers. All assumptions are shown on the page, as Finish Work does. Any third-party statistic behind the model is verified and sourced first (flag 4). No client results are shown.

**Density and motion.** Low to medium. Motion only on calculator state change.

**Body-type candidates.** Atkinson Hyperlegible, Source Sans 3, Inter (Inter least distinctive).

**What it trades away.**
- The whole hero depends on the calculator being trusted. If the estimate feels made up, the hero fails.
- It needs the calculator to be built before launch (flag 9), which is real work for a small part-time team.
- A tool-led hero pushes the story and the theme further down the page.
- The Recon Call becomes a second step, not the first thing seen.

### Side-by-side

| | A: Plain Numbers | B: Co-op Mode | C: Diagnostic-First |
|---|---|---|---|
| Theme dial | 1 | 3 | 2 |
| Leak Report position | Section 4 | Section 5 as "Level 1" | Hero |
| Handles no proof by | Plain process, hidden proof slot | Personality and process | The tool itself |
| Build effort (my estimate) | Lowest | Highest (art, motion) | Medium to high (the calculator) |
| Best if the owner is | Very skeptical | Open to a story | Wants numbers first |
| Biggest risk | Looks like the other four | Reads as a toy | Calculator mistrusted |

### Recommendation (a recommendation, not a decision)

**I recommend Direction C, with Direction A as the fallback.** My reasons, with their limits:
- It answers the proof gap with something an owner can use, not a promise. That is a hypothesis; no one has tested it with an owner.
- The hero slot for a diagnostic is open in this sample (0 of 4 direct). My sample is only four direct sites, and I read home pages only.
- It spends the theme where it earns something (the tool and the process) and keeps plain words on actions. That matches the client's own brand audit concern.
- A and C share almost the same page below the hero. If the calculator is not ready at launch, the build falls back to A by moving the calculator down a section. That is a cheap fall-back for a small team.

Choose B if the client's priority is being remembered and shared over being trusted quickly. I would not choose it for launch with no proof. That is my judgement, not a finding.

---

## 6. What needs the client's decision

| # | Decision | Why it matters | Owner |
|---|---|---|---|
| 1 | Pick a direction (A, B, C, or a mix) | Sets the whole page structure | Client |
| 2 | Is the free-audit hero a table-stakes necessity or something to rework? 4 of 4 direct have it | Section 3.3 | Client |
| 3 | Is the 5-step process kept, or compressed to 3 or 4 like all four direct competitors? | Section 2.5 | Client |
| 4 | Lead action: the Recon Call, the Leak Report, or both, and which is primary | Directions differ | Client |
| 5 | Whether any prices or "from" figures show on the home page. 2 of 4 direct do | Needs sign-off. I quote no prices | David |
| 6 | Whether any guarantee wording appears | Flag 3. Needs sign-off | David |
| 7 | How the Leak Report estimate is built, which assumptions are shown, and whether any outside statistic is cited | Flag 4 and 9. Stats must be verified. Output labelled as an estimate | David and the build team |
| 8 | What to show in place of proof at launch (nothing, a process note, a hidden slot), and who approves the first real result | Flag 1 | Client |
| 9 | Is the Chunk licence confirmed for web use? And which body face | Flag 6 | Client |
| 10 | How the name is written in text (the logo says "PLAYER TWO / GROWTH HOUSE", the copy says "Player 2: Growth House") | Flag 5 | Client |
| 11 | Contact details, booking link and Recon Call scheduler | Flag 7. All placeholders | Client |
| 12 | Whether to keep the evidence from BaaDigi and Finish Work, given the terms note in section 0 | Compliance judgement | Client |
| 13 | Whether to add Jobber as a third leader by someone reading it in a normal browser | Gap in the sample | Client |
| 14 | If this work implies a CRM record for the project, create it. I could not confirm one exists (intake). If it is not in the CRM, it did not happen | Process | Team |

---

## 7. The honest limit

I read structure reliably and taste poorly. I can report that 4 of 4 direct competitors lead with a free audit, that 0 of 5 extracted palettes use green, and that two competitors have contrast faults on their buttons. I cannot tell you which of these sites looks expensive, which feels trustworthy to a landscaping owner, whether a pixel frog reads as charming or childish to a tradesperson, or whether Chunk and any of the body faces look right together. Those are human judgements, and I recommend showing the three directions to a few real owners before committing.

Other limits:
- The sample is small (4 direct, 2 leaders, 2 adjacent). Counts describe these 8 pages, not the market.
- Home pages only. Pricing, service and tool pages were not read, except one BaaDigi tool landing page.
- Two direct competitors and one adjacent site were read without tools. Only 2 of the 8 sites got a mobile-width tool check, and no site was tested on a real phone.
- Static page fetches miss content loaded later by scripts.
- I have no conversion, traffic or revenue data for any site, so I cannot say that any pattern works. A pattern being common is not evidence that it converts.
- Competitor result figures are not verified by me and are deliberately not repeated.
- Tools were installed on demand and run once or twice per site. `impeccable` timed out on Podium both times.

---
version: alpha
name: Player Two Growth House
description: >-
  Approved by the client on 2026-10-19. Marketing site for a diagnose-first growth
  partner to owner-run local service businesses. Direction: a mix of
  market-scan A (Plain Numbers) and B (Co-op Mode). It looks like a game and
  talks like a contractor. Colours come from the client's brand board; the
  type scale, spacing, radii, body and HUD faces and the error colour are
  proposals.
colors:
  ink: "#273835"
  forest: "#1f6a56"
  leaf: "#55b948"
  cream: "#ece8d8"
  cream-2: "#ded7bc"
  tan: "#d6ab7b"
  tan-dark: "#ba8d62"
  spark: "#fec00e"
  error: "#a8321e"
  primary: "#273835"
  secondary: "#1f6a56"
  tertiary: "#55b948"
  surface: "#ece8d8"
  surface-raised: "#ded7bc"
  surface-dark: "#273835"
  on-surface: "#273835"
  on-surface-dark: "#ece8d8"
  link: "#1f6a56"
typography:
  headline-display:
    fontFamily: Chunk
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Chunk
    fontSize: 44px
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: -0.005em
  headline-md:
    fontFamily: Chunk
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.1
  headline-sm:
    fontFamily: Chunk
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.15
  title-md:
    fontFamily: Chunk
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.2
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.5
  label-lg:
    fontFamily: Chunk
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.01em
  label-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
  hud-md:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  hud-score:
    fontFamily: IBM Plex Mono
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em
rounded:
  none: 0px
  sm: 6px
  md: 12px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  gutter: 16px
  gutter-lg: 32px
  container-max: 1180px
  prose-max: 680px
  stroke: 3px
  stroke-heavy: 4px
  shadow-offset: 6px
  pixel: 4px
  tap-min: 48px
components:
  button-primary:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 18px
    height: 56px
  button-primary-hover:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 18px
    height: 56px
  button-secondary-hover:
    backgroundColor: "{colors.cream-2}"
    textColor: "{colors.ink}"
  button-on-dark:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 56px
  button-on-dark-hover:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.ink}"
  card-cartridge:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-cartridge-stripe:
    backgroundColor: "{colors.leaf}"
    height: 14px
  card-leak:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 24px
  band-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
    padding: 96px
  band-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    padding: 96px
  level-node:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    typography: "{typography.hud-md}"
    size: 56px
  level-node-current:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.ink}"
    size: 56px
  hud-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.leaf}"
    typography: "{typography.hud-md}"
    rounded: "{rounded.sm}"
    padding: 6px
  hud-tag-light:
    backgroundColor: "{colors.cream-2}"
    textColor: "{colors.ink}"
    typography: "{typography.hud-md}"
    rounded: "{rounded.sm}"
    padding: 6px
  calculator-panel:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  score-screen:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    typography: "{typography.hud-score}"
    rounded: "{rounded.lg}"
    padding: 32px
  score-screen-figure:
    textColor: "{colors.spark}"
    typography: "{typography.hud-score}"
  score-screen-label:
    textColor: "{colors.leaf}"
    typography: "{typography.hud-md}"
  input-field:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 52px
    padding: 14px
  input-field-error:
    textColor: "{colors.error}"
    typography: "{typography.label-md}"
  header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 88px
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
    padding: 64px
  faq-item:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
    padding: 20px
  pixel-icon:
    backgroundColor: "{colors.tan}"
    textColor: "{colors.ink}"
    size: 32px
  pixel-icon-shade:
    backgroundColor: "{colors.tan-dark}"
    size: 4px
  link:
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
---

# Player Two: Growth House

> **Status: APPROVED by the client on 19 Oct 2026** (reply: "approve"). The open gaps at the end of this file are still open; approval covers the direction, tokens and components.
> Values marked **locked** come from the client's brand board (`Player Two.pdf`, read 19 Oct 2026). Values marked **proposed** are ours and are open to change.
> Supporting evidence: `.scaleup/intake.md` and `.scaleup/market-scan.md`.
> Linted with `@google/design.md@0.4.0` (pinned; the spec is alpha). The exported Tailwind theme, not this file, is the build's input.
> Visual sample for review: `.scaleup/design-preview.png` (rendered 19 Oct 2026; the copy is placeholder and the "$X,XXX" figure is a dummy, not an estimate).

## Overview

**The one rule: it looks like a game and talks like a contractor.**

The client chose a mix of two directions from the market scan (19 Oct 2026). This file reads that mix as follows (our interpretation, to be confirmed at review):

| Taken from A: Plain Numbers | Taken from B: Co-op Mode |
|---|---|
| Page structure and section order | The look: a large badge and frog in the hero, dark bands with yellow sparkles |
| Plain-language headlines, buttons and form labels | The 5-step process drawn as a level map |
| The Leak Report calculator as its own section, not in the hero | Offers drawn as game-cartridge cards |
| No proof section until real, client-approved results exist | The calculator result shown as a score screen |
| Short page, about 900 to 1,200 words | Small, purposeful motion at a few moments |

**Who it's for.** Owner-operators of local service businesses: landscaping, painting, childcare, home services. The owner is usually the one who answers the phone, quotes the job and signs the cheque. They are busy and wary of agencies, and they often read on a phone between jobs. Speaking to them plainly is the brand's strongest asset. The game theme is what makes the site memorable, and it should never cost the owner clarity.

**How it should feel.** Like a reliable co-op partner. It should be warm, confident and a little playful, and never cute, loud or salesy. It should never feel like a toy.

**Theme dial.** Visually it sits around level 2 of 3. Verbally it sits at 1.
- Game devices (the level map, cartridge cards, score screen, HUD tags, sparkles) carry the theme.
- Every heading, button and form label that asks the owner to do something is in plain words. A game name can sit beside it as a small tag, and never instead of it.
- Every game-named offer has a plain-English title shown at the same time.

**Brand assets** (in `brand/logo/`, exported 19 Oct 2026 from the client's PDF with the artboard background removed, checked in headless Chrome):

| File | Use |
|---|---|
| `wordmark-color.svg` (aspect 1.91:1) | Header on cream, and the footer on ink. Primary logo |
| `wordmark-mono.svg` (1.93:1) | Light backgrounds only. Its outer outline is ink, so it disappears on ink |
| `badge-color.svg` (1:1) | Hero artwork, social image, favicon source |
| `badge-mono.svg` (1:1) | One-colour uses: print, stamps, watermark |

Logo rules (proposed):
- Minimum clear space is the height of the "GROWTH HOUSE" pill.
- Minimum width is 140px for the wordmark and 56px for the badge.
- Never recolour, stretch or add effects.
- No Scale Up Labs branding anywhere on this site.

## Colors

The palette is **locked**. All nine brand values are exact vector fills from the brand board. Only `error` is proposed, because the brand kit has no warning colour.

- **Ink (#273835):** a deep green-charcoal. All body text, outlines, sticker strokes and hard shadows, plus the dark bands. It is the brand's black.
- **Forest (#1f6a56):** links, the level-map path and nodes, and the secondary dark band. It is the ring colour on the badge.
- **Leaf (#55b948):** the action colour. Primary buttons, the current step and cartridge stripes. **It is never used for text on cream, and nothing white or cream sits on it.**
- **Cream (#ece8d8):** the page. Cards, the calculator panel and inputs.
- **Cream-2 (#ded7bc):** raised or recessed surfaces such as leak cards and light HUD tags.
- **Tan (#d6ab7b) and Tan-dark (#ba8d62):** decoration only, as in the soil and pot pixels in the mascot. Never used for text.
- **Spark (#fec00e):** the 4-point sparkle motif and the hover or "selected" state of buttons. As text, only on ink.
- **Error (#a8321e), proposed:** form errors, always on cream.

**Contrast, measured with the WCAG 2.x formula (19 Oct 2026):**

| Text on background | Ratio | Rule |
|---|---|---|
| Ink on cream | 10.04 | Body text. Default |
| Ink on cream-2 | 8.54 | OK for all text |
| Ink on spark | 7.49 | Hover state of buttons |
| Error on cream | 5.45 | Form errors |
| Ink on tan | 5.85 | OK, but tan is decoration only |
| Forest on cream / cream on forest | 5.25 | Links; text on forest bands |
| Ink on leaf / leaf on ink | 4.94 | Button labels; HUD tags and score labels on ink |
| Forest on cream-2 | 4.47 | **Fails** for small text. Large text only |
| Spark on forest | 3.92 | Large text or graphics only |
| Leaf on forest | 2.59 | **Fails.** Graphics only |
| White on leaf | 2.49 | **Fails.** Never |
| Dark tan on cream | 2.42 | **Fails.** Decoration only |
| Leaf on cream | 2.03 | **Fails.** No leaf text or meaning-carrying leaf icons on cream |
| Forest on ink | 1.91 | **Fails.** Level nodes on ink need a cream outline |
| Error on ink | 1.84 | **Fails.** That's why the calculator inputs sit on a cream panel |
| Spark on cream | 1.34 | **Fails.** Sparkles on cream are decoration only, and need an ink outline to be visible |

**Colour mode.** Light only (proposed). The brand is cream-led, and dark ink bands give the page its rhythm. We won't add an automatic dark theme unless the client asks.

## Typography

Three faces, each with one job:

| Face | Job | Status |
|---|---|---|
| **Chunk** (Matsero) | Headlines, offer names, button labels. The brand voice | Locked by the client, but **licence unconfirmed** (see below) |
| **Source Sans 3** | Body copy, form labels, FAQ answers. Talks like a contractor | Proposed. OFL-1.1 (`@fontsource/source-sans-3` v5.3.1, checked 19 Oct 2026) |
| **IBM Plex Mono** | HUD tags, step numbers, score-screen figures and labels. Looks like a game | Proposed. OFL-1.1 (`@fontsource/ibm-plex-mono` v5.3.0, checked 19 Oct 2026) |

**Chunk.** A heavy, single-weight display sans with soft, slightly flared shapes. It is **not a slab**, as the market scan described it. It reads well in mixed case, which we use for headlines; capitals are for the logo only. It includes lowercase, numerals, `$ % & ?` and Spanish accents (á é ñ), checked against the font file.

> **Licence warning.** The supplied font files say "© Matsero. All Rights Reserved" and "Chunk is a trademark of Matsero" (version 1.000, 2025). This is a commercial font, not the free League of Moveable Type "Chunk Five". **We can't publish the site with this font until the client confirms they hold a licence that covers web embedding.** Until then the font files stay out of the repo, and the build loads them from a local path with a fallback stack (`"Chunk", "Arial Black", system-ui, sans-serif`). If a licence can't be obtained, the client needs to choose a replacement display face.

**Scale (proposed).** These are the desktop sizes. Below 640px, multiply by these factors: display ×0.6 (to about 38px), lg ×0.7, md ×0.8, sm and title ×0.9. Body never drops below 16px, and the default body size is 18px, because the readers are often on phones outdoors. Implement with `clamp()`.

**Rules.**
- At most three levels of headline per view.
- HUD text is uppercase with 0.08em tracking, and **never longer than about four words**: tags like "STEP 2 · THE PLAN", "LEVEL 1", "LEAKS FOUND".
- Nothing important is said only in HUD text.
- Body text stays within `prose-max` (680px, about 70 characters).
- No italics for emphasis; use `body-strong`.
- No fake pixel fonts for body or headlines. The pixel look lives in the art, not the type.

## Layout

**Grid.** A single fluid column on phones with a 16px side gutter. On desktop, a 12-column grid up to `container-max` (1180px) with 32px gutters. Breakpoints (proposed): 640px, 1024px, 1280px. The page never scrolls sideways.

**Spacing.** An 8px scale with a 4px half-step (`xs` to `3xl`). Sections are 96px apart on desktop and 64px on phones. Inside cards, 24px. Tap targets are at least 48px (`tap-min`).

**Home page, top to bottom.** These are design blocks only; routes and functions belong to `spec-app`.

| # | Block | Background | Treatment |
|---|---|---|---|
| 1 | Header | Cream | Colour wordmark, up to 4 links, one primary button "Book a free Recon Call" |
| 2 | Hero | Cream | A plain headline about the money leaking out of the business (the client's own words, final copy at spec), one supporting line about diagnosing first, primary button for the Recon Call, secondary button that scrolls to the Leak Report. The badge sits large on the right on desktop, with spark sparkles. On phones the badge goes **below** the buttons at about 60% width. A small HUD tag above the headline can carry "PRESS START" flavour |
| 3 | Where the money leaks | Cream | Four `card-leak` cards, each a symptom the owner will recognise, in plain words: missed calls, quotes going cold, reviews never asked for, past customers never contacted |
| 4 | Leak Report | **Ink band** | Plain heading. `calculator-panel` (cream) holds the inputs, and a `score-screen` shows the result as an estimate, with assumptions visible. See Components |
| 5 | How it works | Cream | The 5 steps as a level map (Recon Call, Plan, Roadmap, Build, Check-In), each with a plain sentence |
| 6 | What we fix | Cream-2 | Five `card-cartridge` offers, plain title first and game name second |
| 7 | Why the order matters | Forest band | Short. Shows the sequencing rule with a locked/unlocked device: the retention offer stays locked until the front-door leaks are fixed |
| 8 | Who we are | Cream | Small and honest. Names and photos are **placeholders** until the client supplies them |
| 9 | FAQ | Cream | `faq-item` accordion |
| 10 | Closing | **Ink band** | HUD line "PRESS START FOR PLAYER TWO" plus a plain primary button "Book a free Recon Call" |
| 11 | Footer | Ink | Colour wordmark and contact details. **All contact details are placeholders** |

Deliberately absent: testimonials, client logos, results numbers, stat tiles, prices and guarantee wording. Each one returns only when it is real and signed off (see Do's and Don'ts).

## Elevation & Depth

**Flat with sticker depth, taken from the logo.** The wordmark is built as a sticker: a thick ink outline, a thin cream inner line, and a solid ink block offset beneath it. The site borrows that, and nothing else:

- **Outline:** cards, buttons, inputs and the calculator panel get a `stroke` (3px) ink border. Heavy elements like the hero badge frame and score screen get `stroke-heavy` (4px).
- **Hard shadow:** raised elements (buttons, cartridge cards, calculator panel) get a solid ink shadow offset by `shadow-offset` (6px) down and to the right, with no blur: `6px 6px 0 #273835`.
- **Press state:** on press, the element moves 3px down and right and the shadow shrinks to 3px, like a physical button.
- **Bands:** depth between sections comes from alternating cream, cream-2, forest and ink, not from shadows.
- **No soft drop shadows, glows, gradients or glass effects.** The market scan flagged glow effects on competitors' buttons as template clichés.

## Shapes

- **Sticker-rounded** for everything the owner touches: `full` pills for buttons and tags, `lg` (20px) for cards, `xl` (28px) for the calculator panel, `md` (12px) for inputs and FAQ items.
- **Pixel-stepped** only on game devices: level-map nodes, the cartridge stripe's end cap, the score screen frame, and small pixel icons. Steps use the `pixel` unit (4px). A pixel corner is a stair of 4px squares, not a bevel.
- **The 4-point sparkle**, the cut-out inside the "O" of TWO and the stars on the badge, is the only ornament. Use it at most once per block, in spark yellow on ink or forest, or in ink outline on cream.
- **The cartridge**, the shape to the right of "TWO" in the wordmark, is the source shape for offer cards: a rounded card with a leaf stripe across the top and an ink rule beneath it.

## Components

**Buttons.**
- **Primary:** leaf fill, ink label in Chunk, full pill, 3px ink border, 6px hard shadow, 56px tall. Hover and keyboard focus turn it **spark yellow**, like a highlighted menu item.
- **Secondary:** cream fill, same outline.
- One primary button per view.
- Labels are plain verbs: "Book a free Recon Call", "Get my Leak Report". Never "Press Start" alone.

**Focus.** Every interactive element shows a visible focus ring:
- On cream: 3px ink outline plus a 3px cream gap.
- On ink or forest: 3px spark outline.
- Never remove the outline without replacing it.

**Pixel icons (`pixel-icon`).** 32px icons drawn on the 4px `pixel` grid, in ink outline with leaf, tan and tan-dark fills, matching the mascot's pixel art. They're decoration next to words, never the only carrier of meaning.

**Leak cards (`card-leak`).** A cream-2 card with a small pixel icon (to be produced; see gaps), a Chunk `title-md` symptom and one `body-md` sentence. There's no game language on these cards; this is where the owner should recognise their own problem.

**Leak Report calculator.** This is the B-flavoured centrepiece, inside an ink band.
- **Panel:** `calculator-panel` (cream, 28px radius, ink outline and shadow) holds 3 to 5 inputs, with labels in `label-md` and help text in `body-sm`. Errors are red text on cream, with an icon and words, never colour alone.
- **Result:** a `score-screen` (ink, pixel-stepped frame) with HUD labels in leaf ("LEAKS FOUND", "EST. MONTHLY") and figures in spark `hud-score`. Figures count up once over about 600ms; under reduced motion they appear instantly.
- **Labelling:** every figure is labelled **"Estimate"**, and the assumptions behind it are shown on the page.
- **Data:** inputs, formula and any cited statistic are **open for `spec-app`** and need sign-off. Any third-party statistic is verified and cited first (intake flag 4).
- **After the result:** one primary button, "Book a free Recon Call", sits right under it.

**Level map (How it works).**
- **Desktop:** a horizontal path of 5 `level-node`s joined by a 4px forest track.
- **Phones:** vertical, with nodes on the left.
- **Each node** shows a HUD step number ("01" to "05"), with a plain step name and a sentence beside it.
- **The first node** uses `level-node-current` (leaf) to show "you start here".
- **On ink bands,** nodes need a cream outline (forest on ink is 1.91:1).

**Offer cards (`card-cartridge`).**
- Each card has a leaf stripe across the top and a 3px ink outline with a hard shadow.
- Inside, top to bottom: a plain outcome title in `headline-sm` (for example "Stop losing missed calls"), then a `hud-tag-light` with the game name ("THE RESPAWN PROTOCOL"), then 3 or 4 short bullets of what's included, then one plain line on what it does for the owner.
- **No prices.**
- Debug Mode and Cheat Codes are shown as "scoped after diagnosis", not as packages.

**HUD tags.** Small pills in Plex Mono uppercase: `hud-tag` on dark, `hud-tag-light` on cream. They label, and never instruct.

**Header.** Cream, 88px on desktop and 80px on phones, so the wordmark fits at its 140px minimum width (about 73px tall). Sticky on scroll, with a 3px ink bottom rule once scrolled. On phones: the wordmark, a menu button (48px target), and the primary button kept visible. The 19 Oct visual sample clipped the logo in a 76px header, so 76px is too short.

**FAQ.** An accordion of `faq-item`s with a Chunk question, a Source Sans answer, and a plus or minus icon with an accessible name. Uses native `<details>` or an equivalent pattern that keeps its state for screen readers.

**Inputs.** Cream fill, 3px ink border, 52px tall, with the label always visible above (never placeholder-only). Error state: red helper text and an icon below the field, and the border stays ink.

## Motion

Small and purposeful (proposed):
- Sparkles twinkle **once** on load in the hero.
- Calculator figures count up once when the result appears.
- Buttons get a 3px press translate.
- The FAQ opens over 150 to 200ms.
- **Nothing loops forever, nothing autoplays with sound, and there is no sound at all.**
- Under `prefers-reduced-motion: reduce`, all of the above become instant.
- No scroll-jacking, parallax or entrance animations on every section.

## Do's and Don'ts

- Do put plain words first on anything the owner acts on. The game name goes second, as a tag.
- Do use ink text on leaf buttons. Never white or cream text on leaf (2.49:1 and 2.03:1).
- Do keep one primary action per view, and repeat the Recon Call button at the hero, after the calculator, and at the close.
- Do label every calculator figure as an estimate and show its assumptions.
- Do keep sparkles to one per block, and the badge to the hero and footer.
- Don't show testimonials, client names or logos, results, percentages or stat tiles until they're real, documented and approved by the client they belong to (intake flag 1).
- Don't show prices, "from" prices or guarantee wording until David signs off (intake flags 2 and 3).
- Don't cite third-party statistics without verifying them and naming the source on the page (intake flag 4).
- Don't use pop-ups, exit-intent prompts, countdown timers or fake urgency. They contradict the "no pitch, no pressure" promise.
- Don't use jargon on the page: no CRM, pipeline, attribution, funnel, EBITDA, CAC or LTV. Say "cost to win a customer", not "CAC".
- Don't use soft shadows, glows, gradients, stock photos of handshakes, or generic icon-tile grids.
- Don't let the theme spread. If a new section needs a game device, it replaces an existing one; it isn't added on top.
- Don't ship Chunk to production without a confirmed web licence.
- Don't put Scale Up Labs branding anywhere on this site.

## Open gaps (not decisions, for `spec-app` and the client)

| Gap | Why it matters |
|---|---|
| **Chunk web licence** | Blocks public launch, not the build |
| ~~How the name is written in text~~ | **Decided 19 Oct 2026: "Player Two Growth House"** in body text. Logo artwork unchanged. HUD taglines like "PRESS START FOR PLAYER TWO" stay as game lines |
| Thin grid lines through the "PLAYER TWO" letters in both wordmarks | They're in the original PDF too. Intentional texture or leftover construction guides? Designer to confirm, or supply a clean export |
| A standalone mascot (frog without the badge ring), the sprout icon, and four pixel icons for the leak cards | Not in the brand kit. Ask the designer, or we extract and draw them for sign-off |
| Favicon and social sharing image | Not in the kit. Proposed source: `badge-color.svg` |
| Leak Report inputs, formula, assumptions, outputs and where results go | `spec-app`. Needs sign-off |
| What happens after "Book a free Recon Call" (scheduler, form, CRM) | `spec-app`. Booking link and contact details unknown |
| Empty, loading, error and success states for the calculator and any form | `spec-app` |
| Hover and focus states beyond buttons, links and inputs | Defined here at component level only |
| Pages beyond the home page (offer detail, privacy, terms) | `spec-app` |
| Real copy for every block | Draft from the client's public section at spec. Owner-language review needed |
| Spanish version | Not in scope unless specified (intake flag 8) |

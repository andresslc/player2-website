# Intake - Player Two: Growth House website

Status: **confirmed by user 2026-10-19** ("go"). Case 4 with locked brand kit; market-scan next.

## Case

**Case 4, zero design, with a locked brand kit.**

The identity already exists. There are no website layouts. The brand board is the source for the identity, and the layout has to be designed from scratch.

## Evidence

| Check | Finding |
|---|---|
| `DESIGN.md` at repo root | Not present |
| `.jsx` / `.tsx` / `.vue` components | None. Repo holds only the initial commit |
| Design images / Figma URL | `Player Two.pdf` is a 4-page Adobe Illustrator brand board (1080x1080 artboards): primary wordmark (colour + mono), circular badge with a pixel-art frog-and-sprout mascot (colour + mono). **Logos only, no page layouts.** No Figma or Stitch file. |
| Live URL | None given |
| Google Drive | Searched for "Player 2", "Player Two", "Growth House", "Respawn Protocol". No results (2026-10-19) |
| CRM record | Could not confirm a CRM record for this project. Flagged to user |

### Why it's Case 4 and not Case 2

The Case 2 route (Stitch/Figma to DESIGN.md) assumes there are screen designs to extract. Here there is a logo kit and a font, and nothing to say how a page should look. Extracting tokens from the PDF fixes colour, type and mascot. The market scan still has to justify the layout, section patterns and anti-references.

## Source material (not copied into repo)

| File | What it is | Use |
|---|---|---|
| `~/Downloads/Player Two.pdf` | Brand board: wordmark, badge, mascot, colour + mono | Identity tokens, logo assets |
| `~/Downloads/chunk-2026-04-07-06-20-20-utc/` | `Chunk` font (otf, ttf, woff, woff2). The PDF's live text is set in `Chunk-Regular` | Display typeface |
| `~/Downloads/WTF is Player 2_ Growth House?.docx` | ~11.9k words: internal Master Playbook (Parts 1-9), public-facing site copy draft ("Insert Coin. Unlock Growth."), internal competitive teardown + 90-day GTM (dated 2026-09-19), internal brand/messaging audit | Positioning, offer structure, draft copy |

The docx is mostly **internal**: the team structure, the legal/banking setup, the team's skill gaps, the competitor teardown, the pricing benchmarks and the GTM plan. Only the public-facing section (from "🎮 PLAYER 2: GROWTH HOUSE" to "READY TO PLAY?") and the audit's *recommended* copy can go on the site. The source files were left out of the repo on purpose, for confidentiality.

## Brand tokens observed in the PDF (vector fills, exact)

| Hex | Where it appears |
|---|---|
| `#273835` | Ink / outlines / mono logo (dark green-charcoal) |
| `#1f6a56` | Forest green: badge ring, outer stroke |
| `#55b948` | Leaf green: mascot, cartridge accent |
| `#ece8d8` | Cream: artboard background, knockout text |
| `#ded7bc` | Darker cream: mono-mascot shading |
| `#d6ab7b` / `#ba8d62` | Tan: soil / pot |
| `#fec00e` | Yellow: sparkle stars on the colour badge |

Contrast ratios have not been checked yet. That happens in design-context.

## Route (confirmed)

1. `market-scan`. Required for Case 4. Scope: layout, section patterns and conversion patterns on sites selling growth systems to local service businesses. Identity is out of scope because it is locked. The docx already covers competitor *messaging* (BaaDigi, Fire Fuel SEO, TradeOps, Finish Work Studio, ADAPTIVE Automations, Sprout Sage), so the scan should cover their visual and structural side.
2. `design-context` via `impeccable document --seed`, seeded with the locked tokens above and the Chunk font, not invented ones.
3. `spec-app` -> `build` -> `verify` -> `handover`.

## Flags carried forward (do not lose these)

| # | Flag | Owner / gate |
|---|---|---|
| 1 | **No proof exists.** No case studies, testimonials, client names, metrics or logos. The docx says so repeatedly. The site must not show any; use placeholders | Hard rule |
| 2 | **No prices on the site.** The docx's dollar figures are competitor benchmarks, labelled "not quotes". Publishing starting prices was recommended but needs sign-off | David sign-off |
| 3 | **Guarantee** ("we keep working free until it does") is a recommendation that depends on whether the team can honour it. Don't publish without sign-off | David sign-off |
| 4 | **Third-party stats** (MIT/InsideSales "21x", 411 Locals 37.8%, BrightLocal 45%, Journal of Marketing referral study). The docx itself flags these as industry-repeated and says to verify before citing. If used, cite the source on the page and verify first | Verify before use |
| 5 | **Name inconsistency.** The logo reads "PLAYER TWO / GROWTH HOUSE", the copy reads "Player 2: Growth House". Need a decision on how the name is written in text | User |
| 6 | **Font licence.** The supplied `Chunk` files say "© Matsero. All Rights Reserved" and "Chunk is a trademark of Matsero" (v1.000, 2025; read from the font's name table on 19 Oct 2026). **It is a commercial font, not the OFL "Chunk Five".** It needs a web-embedding licence before public launch. The font files are not committed. Body and HUD faces are proposed in DESIGN.md (OFL) | User. **Blocks launch** |
| 7 | **Unknown contact details.** Domain, email, phone, booking link and Recon Call scheduler are not in the source. Placeholder all of them | User |
| 8 | **Language.** English by default (target market reads as US: US LLC plan, US clients). Spanish only if specified | Default |
| 9 | **"Leak Report" / "Unlocked Growth" diagnostic calculator** is recommended as the lead magnet. It's a scope decision for spec-app, and any dollar output it produces is an estimate and must be labelled as one | spec-app |
| 10 | **No Scale Up Labs branding** inside the Player Two site | Hard rule |

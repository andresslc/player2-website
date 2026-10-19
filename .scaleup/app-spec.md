# Functional spec: Player Two Growth House website

Status: **written 19 Oct 2026 from the user interview. Awaiting user review.**
Inputs: `.scaleup/intake.md` (case and flags), `.scaleup/market-scan.md`, `DESIGN.md` (approved 19 Oct 2026: look, components and home-page block order).
This file decides what the site *does*. How it looks is DESIGN.md's job and isn't repeated here.

## Decisions from the interview (19 Oct 2026)

| Topic | Decision | Source |
|---|---|---|
| Login | **None.** Public marketing site only. No accounts, no admin, no client portal | User |
| Recon Call booking | **Calendly or Cal.com** (which one is still open), opened from every "Book a free Recon Call" button | User |
| After the Leak Report | Result shows **instantly with no email required**. Below it: "Book a free Recon Call", plus an **optional** "Email me this report" box | User |
| Where leads go | **Email inbox.** The owner gets their report by email, and the team inbox gets a copy. No CRM connection at launch | User |
| Leak Report dollar figures | **Missed calls and cold quotes only.** No review requests and no repeat or referral asks appear as yes/no checklist items with **no dollar figure** | User |
| Pages at launch | Home, Privacy, Terms (plus the system 404 page) | User |
| Offer names | Kept as in DESIGN.md: plain title first, game name as a small tag | User ("leave them as they are") |
| Name in body text | **"Player Two Growth House"**. The logo artwork is unchanged | User |
| Stack | **Next.js (App Router) + TypeScript + Tailwind on Vercel.** No database and no Supabase, because nothing logs in and nothing is stored | User |
| Language | English only | Intake default |

## Route table

| Path | Access | What it is | Maps to |
|---|---|---|---|
| `/` | Public | The whole marketing page, blocks 1 to 11 | DESIGN.md, Layout, home-page table |
| `/privacy` | Public | Privacy policy. **Text supplied by the client or their lawyer.** Builds with a clearly marked placeholder | DESIGN.md typography and prose width, no special blocks |
| `/terms` | Public | Terms of use. Same rule as Privacy | Same |
| `/api/leak-report` | Public, POST only | Server route. Validates the optional email request and sends two emails. Stores nothing | None (no UI) |
| 404 (`not-found`) | Public | Plain message, the badge, a link home and the Recon Call button | DESIGN.md components |
| `/sitemap.xml`, `/robots.txt` | Public | Generated. Lists `/`, `/privacy`, `/terms` | None |
| Booking | External | Calendly or Cal.com, opened as that provider's **popup embed** from each booking button. With scripts blocked, the button is a normal link that opens the booking page in a new tab | None |

**In-page anchors on `/`:** `#how-it-works`, `#what-we-fix`, `#leak-report`, `#faq`. These are the 4 header links, matching DESIGN.md's "4 links at most".

## User types

| User | Can do |
|---|---|
| Visitor (the business owner) | Read the page, use the Leak Report, optionally email the report to themselves, book a Recon Call through the booking tool |
| Player Two team | Receive the lead-copy emails in the team inbox, and receive bookings in Calendly or Cal.com. **Nothing to log in to on this site** |

## Auth

There is no authentication: no accounts, sessions, roles or protected routes. The `supabase-auth-scaffold` skill doesn't apply. If a client portal is wanted later, it is a new project phase with its own spec.

## The Leak Report

### Inputs (all entered by the owner)

| # | Field | Type and validation | Notes |
|---|---|---|---|
| 1 | Type of business | Select: Landscaping, Painting, Childcare, Cleaning, Other home service | Changes **wording only**, never the maths (e.g. Childcare shows "enrolment" instead of "job") |
| 2 | Calls from possible new customers that go unanswered, in a typical week | Whole number, 0 to 500 | |
| 3 | Quotes or estimates you send in a typical month | Whole number, 0 to 1,000 | Childcare wording: "tours or enquiries you follow up" (copy to confirm) |
| 4 | Out of 10 quotes, how many get a follow-up from you? | Whole number, 0 to 10 | |
| 5 | Out of 10 quotes, how many do you usually win? | Whole number, 0 to 10 | |
| 6 | Average value of a new customer's first job | Dollars, 1 to 1,000,000, whole dollars | Childcare: "first month's fee" |
| 7 | Do you ask every customer for a review? | Yes / No | Checklist only, no dollars |
| 8 | Do you contact past customers when it's time for the next job? | Yes / No | Checklist only, no dollars |

**No default or preset values** in fields 2 to 6. Empty fields mean no result, so the tool never shows a number the owner didn't supply. Placeholder text shows the expected format only, never a suggested number.

### Formulas (DRAFT, needs David's sign-off, see below)

These use only the owner's inputs and fixed arithmetic. There are no third-party statistics.

| Output | Formula | Plain-English label (draft) |
|---|---|---|
| Missed-call money at stake per month | `unansweredPerWeek × (52 ÷ 12) × (winsOutOf10 ÷ 10) × avgFirstJob` | "If those callers had asked for a quote and you'd won them at your usual rate" |
| Cold-quote money at stake per month | `quotesPerMonth × ((10 − followedUpOutOf10) ÷ 10) × (winsOutOf10 ÷ 10) × avgFirstJob` | "Quotes nobody chased, valued at your usual win rate" |
| Total per month | sum of the two | "Estimated money at stake each month" |
| Total per year | monthly total × 12 | "…and each year" |
| Leaks found | count of: unanswered calls > 0; follow-up < 10 of 10; review answer = No; past-customer answer = No | Shown as "Leaks found: N of 4" |

Rules:
- Every figure is labelled **"Estimate"**. The assumptions behind it are always printed under the score screen, in the words of the label column above.
- Figures are rounded to the nearest $10. If either dollar figure is $0, that line still shows, with "$0, no leak found here".
- The wording says **"at stake"**, not "lost". Some of those callers and quotes would never have become jobs, and the page says so.
- The maths lives in one pure function (`lib/leakReport.ts`) with unit tests. The page and the email both use it, so they can never disagree.

### States

| State | What the owner sees |
|---|---|
| Empty (first view) | Inputs plus a score screen showing "Fill in your numbers to see your Leak Report". No figures, no fake numbers |
| Partly filled | Same as empty. The button is enabled. Pressing it highlights the missing fields with errors |
| Invalid input | Inline red error under the field, on cream (DESIGN.md), in words, with focus moved to the first error. No result is shown |
| Result | Score screen counts up once (or appears instantly under reduced motion). The result region is announced to screen readers with `aria-live="polite"`. Below it: "Book a free Recon Call" and "Email me this report" |
| Inputs changed after a result | The result updates on the next button press, not on every keystroke |

### "Email me this report" (optional)

| Field | Rule |
|---|---|
| Email | Required for this form, validated on client and server |
| First name | Optional |
| Business name | Optional |
| Consent line | Text under the button (not a pre-ticked box): sending the report means Player Two Growth House receives a copy and may reply by email, with a link to `/privacy`. **Wording needs the client's (or lawyer's) approval** |
| Honeypot | Hidden field. If it's filled, the server returns a normal success and sends nothing |
| Time check | A submission less than 3 seconds after the result appeared is treated as a bot |

The server (`/api/leak-report`) recomputes the result from the raw inputs, never trusting figures from the browser, and sends two emails through **Resend**:
1. **To the owner:** their numbers, the estimates with the same labels and assumptions, and the Recon Call link.
2. **To the team inbox (`LEADS_TO_EMAIL`):** the same, plus email, name, business, trade and timestamp.

It returns success only if both sends succeed.

| Email form state | What the owner sees |
|---|---|
| Sending | Button shows a busy state and is disabled. The on-screen result stays |
| Sent | Inline message: report sent to `<email>`, check spam, plus the booking button again |
| Failed (server or provider error) | Inline message: couldn't send right now, your result is still on screen, try again or book a call. The result is never cleared |
| Not configured (no API key, during development) | The route returns a clear "email not configured" error and the form shows the failure state. It is never a fake success |

**No phone number field**, on purpose: collecting phones for texting needs SMS consent wording (TCPA) and isn't needed at launch.

## Data the site handles

The site has no database. Nothing is stored on the site; data passes through and is gone.

| Entity | Fields | Lives where | Retention |
|---|---|---|---|
| LeakReportInput | trade, unansweredPerWeek, quotesPerMonth, followedUpOutOf10, winsOutOf10, avgFirstJob, asksForReviews, contactsPastCustomers | Browser memory only, unless emailed | Gone on page close |
| LeakReportResult | missedCallMonthly, coldQuoteMonthly, totalMonthly, totalYearly, leaksFound (0 to 4) | Computed, never stored | n/a |
| ReportEmailRequest | email, firstName?, businessName?, input (above), submittedAt | Request body, then in the two emails only | Whatever the team inbox and Resend keep. **Privacy policy must say so** |
| Booking | Whatever Calendly or Cal.com collects | The booking provider | The provider's policy. **Privacy policy must cover the embed** |

**Configuration (environment variables, set in Vercel):**

| Variable | What |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL |
| `NEXT_PUBLIC_BOOKING_URL` | The Calendly or Cal.com booking link |
| `NEXT_PUBLIC_BOOKING_PROVIDER` | `calendly` or `cal` |
| `RESEND_API_KEY` | Email service key (server only) |
| `EMAIL_FROM` | The sending address on a domain verified in Resend |
| `LEADS_TO_EMAIL` | Team inbox for lead copies |

If `NEXT_PUBLIC_BOOKING_URL` is missing, booking buttons still render, but they point to `#booking-not-configured`, a visible notice that exists only when the variable is unset. **Launch is blocked until it's set.**

## Content rules for the build

- **Copy source:** the client's public section of the docx ("Insert Coin. Unlock Growth." through "Ready to play?") and the brand audit's recommended lines, rewritten into DESIGN.md's blocks. The internal parts of the docx (team, legal, pricing benchmarks, competitor teardown, growth plan) never appear.
- **No** prices, guarantee wording, testimonials, client names or logos, results or percentages, or third-party statistics.
- "Who we are" ships with **placeholder** names and photos. The build marks them so they can't be mistaken for real content.
- Footer contact details are **placeholders** until the client supplies them.
- **No Scale Up Labs branding** anywhere, including meta tags and the footer.
- **Search and AI-answer basics:** page title and description, Open Graph image (from the badge), and JSON-LD `ProfessionalService` with **only known facts**: name, URL, description. No address, phone or ratings until they're real.
- **Fonts:** Chunk is loaded from a local path that isn't committed, with a fallback stack. The site must render acceptably on the fallback (see DESIGN.md).

## Definition of done (what stage 4 tests in a real browser)

| # | Flow or check | Pass means |
|---|---|---|
| 1 | Home renders at 390px, 768px and 1280px | All 11 DESIGN.md blocks present in order, no horizontal scroll, no console errors, no failed requests other than intentionally missing fonts |
| 2 | Header links | Each of the 4 links scrolls to its section, and the sticky header doesn't cover the heading |
| 3 | Booking buttons (header, hero, after result, closing) | Each opens the booking popup when configured. With scripts blocked, it opens the booking page in a new tab. When unconfigured, it shows the "not configured" notice |
| 4 | "Get my Leak Report" (hero secondary button) | Scrolls to the Leak Report and focuses the first field |
| 5 | Leak Report, happy path | A known input set produces the figures the unit tests expect, every figure says "Estimate", assumptions are printed, and "Leaks found" is correct |
| 6 | Leak Report, errors | Empty, negative, decimal-where-whole, out-of-range and non-numeric inputs each show the right inline error, focus moves to the first error, and no result shows |
| 7 | Leak Report by keyboard only | Every field, the button, and the result's follow-up actions can be reached and used with Tab, Enter and Space, with visible focus throughout |
| 8 | Leak Report formula unit tests | Pass, including the $0 cases and rounding |
| 9 | Email the report, happy path (test inbox) | The owner email and the team email both arrive, their figures match the screen, and a success message shows |
| 10 | Email the report, failures | Invalid email shows an inline error. Provider failure or a missing key shows the failure message with the result kept. A filled honeypot sends nothing but shows success |
| 11 | FAQ | Opens and closes by mouse and keyboard, and its state is announced |
| 12 | `/privacy`, `/terms`, 404 | Load, are linked from the footer and email form, and the 404 has a way home |
| 13 | Reduced motion | With the reduced-motion setting on, nothing animates |
| 14 | Accessibility floor | Automated check (axe) finds no serious or critical issues on `/`, `/privacy`, `/terms`. Contrast follows DESIGN.md |
| 15 | Content guardrails | A scan of rendered text finds no `$` figures outside the Leak Report, no guarantee wording, no testimonials, and no "Scale Up" anywhere |
| 16 | Metadata | Title, description, OG image, favicon and JSON-LD are present, and the JSON-LD holds only known facts |

## Needs David's sign-off (do not ship without it)

| # | Item | Default until signed off |
|---|---|---|
| D1 | **The Leak Report formulas, labels and assumption wording** above, including "money at stake" framing and rounding | Built as drafted, marked DRAFT in the build log. Not launched until approved |
| D2 | Whether any default values ever pre-fill the calculator | None |
| D3 | Prices or "from" prices anywhere on the site | None shown |
| D4 | Guarantee wording of any kind | None shown |
| D5 | Any third-party statistic on the page | None. The calculator needs none |
| D6 | Any client result, testimonial or case study | None, until real, documented and approved by that client |

## Open questions for the client (not David)

| # | Question | Blocks |
|---|---|---|
| C1 | **Chunk web-font licence** from Matsero | **Launch** |
| C2 | Calendly or Cal.com, and the booking link | **Launch** (build uses the placeholder notice) |
| C3 | Domain name, and who owns the Vercel account (it should be the client) | **Launch** |
| C4 | Resend account, verified sending domain, and the team inbox address for leads | **Launch** of the email feature |
| C5 | Privacy policy and Terms text, plus approval of the consent line under the email form | **Launch** |
| C6 | Footer contact details (email, phone if any, service area) | Launch |
| C7 | "Who we are": names, roles and photos, or drop the block | Launch, or remove |
| C8 | Standalone frog, sprout icon, 4 leak-card pixel icons, favicon, OG image; designer to confirm the grid lines in the wordmark | Polish. The build can extract or draw drafts for approval |
| C9 | Analytics: none (default), or a cookie-free option like Vercel Web Analytics | No |
| C10 | Approval of all page copy before launch | **Launch** |
| C11 | Childcare wording for the calculator ("enrolment", "first month's fee", "tours or enquiries") | No. Draft wording ships for review |

## CRM note

Leads land in an email inbox and bookings land in Calendly or Cal.com. **Neither is the CRM.** Under house rules, if it's not in the CRM it didn't happen. Until a connection to GoHighLevel exists, someone has to log each lead and booking in GHL by hand. Both providers can connect to GHL later, through native integrations or Zapier/n8n, without changing this site. I still couldn't confirm a CRM record exists for this project itself.

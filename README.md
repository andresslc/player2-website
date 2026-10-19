# Player Two Growth House website

Next.js 16 (App Router) + TypeScript + Tailwind 4, deployed on Vercel. No database and no logins.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional in development
npm run dev                   # http://localhost:3000
npm test                      # formula, validation, email and API tests
npm run build                 # production build
```

## Where things live

| What | Where |
|---|---|
| Every word on the site | `content/site.ts` (gaps show as yellow `[NEEDED: …]` boxes) |
| Design system (colours, type, spacing, components) | `DESIGN.md`, the source of truth |
| Generated styling layer | `app/tokens.css`, `lib/tokens.json`. Regenerate with `npm run tokens`; never edit by hand |
| Leak Report maths and validation | `lib/leakReport.ts` (one module for page, API and emails) |
| Emails | `lib/email.ts`, sent by `app/api/leak-report/route.ts` through Resend |
| Logos | `brand/logo/` (source), `public/brand/` (served) |

## Configuration

See `.env.example`. Without `NEXT_PUBLIC_BOOKING_URL`, a yellow notice explains that booking isn't connected. Without the Resend variables, "Email me this report" shows an honest failure message.

## Fonts

Source Sans 3 and IBM Plex Mono are self-hosted (OFL). **Chunk is a commercial font and is not in this repository.** For local work, copy `Chunk.woff2` into `public/fonts/chunk/`. Only add it to the deployed site once a web licence is confirmed. Until then the fallback in `DESIGN.md` renders.

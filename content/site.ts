// Every word on the site lives here, so the client can review and change copy in one file.
//
// Source: the public section of the client's doc ("Insert Coin. Unlock Growth." through
// "Ready to play?") and the recommended lines in its brand audit, fitted to DESIGN.md's blocks.
// ALL COPY IS DRAFT until the client approves it (app-spec C10).
//
// A Slot is either real copy (a string) or a visible gap ({ needed: "..." }). Gaps render as
// highlighted placeholders and are listed in .scaleup/build-log.md. Never replace one with a
// guess: no invented names, numbers, prices, results or contact details.
import tokens from "@/lib/tokens.json";

export type Slot = string | { needed: string };

export const site = {
  name: "Player Two Growth House",
  tagline: "Insert Coin. Unlock Growth.",
  themeColor: tokens.colors.cream,
  meta: {
    title: "Player Two Growth House: find the money your business is leaking",
    description:
      "We find the parts of your business that are quietly costing you money, like missed calls and quotes nobody chased, then build the system that fixes them. Diagnose first, build second.",
  },
  bookCta: "Book a free Recon Call",
  // Phones only, in the header, where the full label cannot fit beside the logo (build log).
  bookCtaShort: "Book a call",

  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "What we fix", href: "#what-we-fix" },
    { label: "Leak Report", href: "#leak-report" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    hud: "Insert coin · Unlock growth",
    headline: "You're not short on leads. You're leaking the ones you already paid for.",
    lede: "We find the parts of your business that are quietly costing you money, and we fix them with operations, marketing and AI, whichever combination actually gets the job done.",
    secondaryCta: "Get my Leak Report",
    reassurance: "One conversation. No pitch, no pressure.",
  },

  leaks: {
    heading: "It's not missing. It's locked.",
    intro:
      "Most businesses already have value sitting inside them that isn't being used. Nobody has stopped to look for it, so it looks like \"that's just how it goes.\"",
    items: [
      {
        icon: "phone",
        title: "Missed calls go to voicemail",
        body: "A missed call is a customer you already spent money to attract. If nobody gets back to them, they call the next name on the list.",
      },
      {
        icon: "quote",
        title: "Quotes go cold",
        body: "You did the visit and sent the price. Without a follow-up, a good quote can sit there until the customer forgets or picks someone else.",
      },
      {
        icon: "star",
        title: "Reviews never get asked for",
        body: "Happy customers often don't think to leave a review unless someone asks after the job.",
      },
      {
        icon: "mail",
        title: "Past customers never hear from you",
        body: "A customer who never hears from you after the first job is one you'll pay to win all over again.",
      },
    ],
  },

  leakReport: {
    hud: "Level 1 · Leak Report",
    heading: "See what's slipping through each month",
    intro:
      "Put in your own numbers and see what's at stake from missed calls and quotes nobody chased. You don't need to give us your email to see the result.",
    submit: "Show my Leak Report",
    emptyScreen: "Fill in your numbers to see your Leak Report.",
    labels: {
      trade: "Type of business",
      unansweredPerWeek: "Calls from possible new customers that go unanswered in a typical week",
      followedUpOutOf10: "Out of 10 quotes, how many get a follow-up from you?",
      winsOutOf10: "Out of 10 quotes, how many do you usually win?",
      asksForReviews: "Do you ask every customer for a review?",
      contactsPastCustomers: "Do you contact past customers when it's time for the next job?",
    },
    hints: {
      unansweredPerWeek: "Include calls that went to voicemail and nobody returned.",
      avgFirstJob: "Whole dollars.",
    },
    result: {
      hudTotal: "Est. money at stake / month",
      hudYearly: "Per year",
      hudMissed: "Missed calls",
      hudQuotes: "Cold quotes",
      hudLeaks: "Leaks found",
      estimateLabel: "Estimate",
      zeroLine: "$0, no leak found here",
      assumptionsHeading: "How we got this number",
      checklistReviews: "Review requests",
      checklistPastCustomers: "Past-customer follow-up",
      checklistLeak: "Leak",
      checklistOk: "OK",
      nextStepHeading: "Want to know which leak to fix first?",
      nextStepBody: "That's what the Recon Call is for. We go through your numbers with you before we suggest anything.",
    },
    email: {
      heading: "Email me this report",
      emailLabel: "Your email",
      firstNameLabel: "First name (optional)",
      businessLabel: "Business name (optional)",
      submit: "Email me this report",
      sending: "Sending…",
      // Consent wording needs client or lawyer approval (app-spec C5).
      consent:
        "When you send this, Player Two Growth House gets a copy of your report and may reply by email.",
      privacyLink: "Privacy Policy",
      sent: (email: string) => `Report sent to ${email}. If you don't see it in a few minutes, check your spam folder.`,
      failed: "We couldn't send your report right now. Your result is still on screen. Try again, or book a call.",
      invalidEmail: "Enter a valid email address.",
    },
  },

  howItWorks: {
    heading: "Five steps. You always know which one we're on.",
    steps: [
      {
        name: "The Recon Call",
        body: "A real conversation about how your business works: where customers come from, what's falling through the cracks, what you've already tried. No pitch, just questions.",
      },
      {
        name: "The Plan",
        body: "Based on what we find, a plan specific to your business, not a template we use on everyone.",
      },
      {
        name: "The Roadmap",
        body: "A clear list of exactly what we're building, in what order, and why. No surprises, no vague \"ongoing marketing.\"",
      },
      { name: "The Build", body: "We execute. You watch it happen." },
      {
        name: "The Check-In",
        body: "We show you what actually changed, in numbers you understand, not vanity metrics.",
      },
    ],
    closer: "You're the expert on your business. We're the ones who find and fix what's costing you money.",
  },

  offers: {
    heading: "Everything we build moves one of two numbers",
    intro:
      "What it costs you to get a customer, and what that customer is worth once you have them.",
    whatItDoes: "What it does for you",
    items: [
      {
        game: "The Respawn Protocol",
        title: "Stop losing customers you already paid for",
        bullets: [
          "Your Google listing cleaned up so people actually find you",
          "Missed a call? They get an instant text back instead of calling your competitor",
          "Automatic review requests after every job",
          "A booking link so people don't have to wait for a callback",
        ],
        outcome: "You stop throwing away leads you already paid to generate, without spending more on ads.",
        note: "Start here",
      },
      {
        game: "Spawn Points",
        title: "More doors for customers to walk through",
        bullets: [
          "A simple, mobile-friendly page where people can request a quote",
          "Automatic follow-up on every quote so it never goes cold",
          "Every inquiry, from Instagram, Facebook or your site, in one place",
        ],
        outcome: "More leads coming in, and a system that makes sure none of them slip away.",
        note: null,
      },
      {
        game: "The Save File",
        title: "Turn one-time customers into repeat ones",
        bullets: [
          "Automatic reminders when it's time to come back: seasonal cleanups, re-enrollment, touch-ups",
          "Automatic referral requests from happy customers",
          "A simple monthly report so you can see exactly what it's producing",
        ],
        outcome: "Each customer becomes worth more over time, and referrals do some of your marketing for you.",
        note: null,
      },
      {
        game: "Debug Mode",
        title: "Find what's actually broken inside the business",
        bullets: [
          "A full walkthrough of how the business runs day to day",
          "Scheduling, hand-offs, wasted time and unclear processes",
          "A plain-language report on what to fix first",
        ],
        outcome: "Finds money you're losing to inefficiency, not just to weak marketing.",
        note: "On its own, or as the first step",
      },
      {
        game: "Cheat Codes",
        title: "AI and automation, applied to a real problem",
        bullets: [
          "A custom automation for a job you do by hand every week",
          "An AI assistant for handling customer questions",
          "Built only once we know exactly what's slowing you down",
        ],
        outcome: "Lowers what it costs you to serve each customer, without hiring anyone new.",
        note: "Built after we diagnose",
      },
    ],
  },

  order: {
    heading: "We fix the front door first.",
    body: "We don't sell you The Save File if you're still losing customers at the front door. A repeat-customer campaign can't help while new callers are going to voicemail. We diagnose first, and recommend what your business actually needs, not what's easiest to sell.",
    locks: [
      { game: "The Respawn Protocol", plain: "Stop the leaks at the front door", state: "unlocked", stateLabel: "Start here" },
      { game: "Spawn Points", plain: "Open more ways in", state: "next", stateLabel: "Next" },
      { game: "The Save File", plain: "Bring customers back", state: "locked", stateLabel: "Unlocks once the front door holds" },
    ],
  },

  about: {
    heading: "You're Player One. We're Player Two.",
    paragraphs: [
      "You built this business. You're the one grinding it out every day, and you're the reason it's still standing.",
      "The problem isn't you. It's that most businesses are playing without a Player Two: the partner watching your back, spotting the traps you can't see because you're too busy running the level.",
      "That's us. A small, hands-on team that finds the parts of your business quietly costing you money, and fixes them.",
    ],
    team: { needed: "Team names, roles and photos, or remove this block (app-spec C7)" } as Slot,
  },

  faq: {
    heading: "Questions owners ask us",
    items: [
      {
        q: "What actually happens on a Recon Call?",
        a: "We learn how your business actually works: where your customers come from, what's falling through the cracks, and what you've already tried. No pitch, just questions. We don't recommend anything until we understand the business.",
      },
      {
        q: "Are you going to try to sell me a package?",
        a: "No. We don't show up with a pre-made package and try to make your business fit it. What we suggest comes from what we find, and it's written down so you know exactly what you'd be paying for.",
      },
      {
        q: "What does the Leak Report number mean?",
        a: "It's an estimate built only from the numbers you type in. It shows what's at stake from missed calls and quotes nobody followed up, at your usual win rate. Not every caller would have become a job, so treat it as a starting point for the conversation, not a promise.",
      },
      {
        q: "Is this an AI thing?",
        a: "Only where it helps. AI is a tool we use on a specific problem we've already found, not something we sell because it's fashionable. Most businesses need their calls, quotes and follow-ups fixed first.",
      },
      {
        q: "How much does it cost?",
        a: { needed: "Pricing answer: needs David's sign-off (app-spec D3)" } as Slot,
      },
      {
        q: "How will I know it's working?",
        a: "At the Check-In we show you what actually changed, in numbers you understand. Ongoing work comes with a simple monthly report so you can see what the system is producing.",
      },
    ] as { q: string; a: Slot }[],
  },

  closing: {
    hud: "Press start for Player Two",
    heading: "You've been playing this level solo.",
    body: "Every decision, every fire, every missed call, on you. It's time for co-op. One Recon Call is the first move: no pitch, no pressure, just us learning what's locked inside your business before we tell you anything about fixing it.",
  },

  footer: {
    contactHeading: "Get in touch",
    contact: [
      { needed: "Contact email (app-spec C6)" },
      { needed: "Phone, if any (app-spec C6)" },
      { needed: "Service area (app-spec C6)" },
    ] as Slot[],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
    copyright: "© Player Two Growth House",
  },

  legal: {
    privacy: {
      title: "Privacy Policy",
      body: { needed: "Privacy Policy text from the client or their lawyer. Must cover the emailed Leak Report (Resend) and the booking embed (app-spec C5)" } as Slot,
    },
    terms: {
      title: "Terms of Use",
      body: { needed: "Terms of Use text from the client or their lawyer (app-spec C5)" } as Slot,
    },
  },

  bookingNotice: {
    heading: "Booking isn't connected yet",
    body: "The Recon Call booking link hasn't been set up. Set NEXT_PUBLIC_BOOKING_URL to the Calendly or Cal.com link. This notice only appears until it is.",
  },

  notFound: {
    hud: "Game over? Not quite.",
    heading: "This page doesn't exist.",
    body: "The link may be old or mistyped. Head back to the start, or book a Recon Call.",
    home: "Back to the home page",
  },
} as const;

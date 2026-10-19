// Leak Report: validation and the estimate. One pure module, shared by the page, the API route
// and both emails, so the three can never disagree (.scaleup/app-spec.md, "The Leak Report").
//
// DRAFT FORMULAS - need David's sign-off before launch (app-spec D1). They use only the owner's
// own numbers and fixed arithmetic; there are no third-party statistics anywhere in here.

export const TRADES = ["landscaping", "painting", "childcare", "cleaning", "other"] as const;
export type Trade = (typeof TRADES)[number];

export const TRADE_LABELS: Record<Trade, string> = {
  landscaping: "Landscaping",
  painting: "Painting",
  childcare: "Childcare",
  cleaning: "Cleaning",
  other: "Other home service",
};

export type LeakReportInput = {
  trade: Trade;
  unansweredPerWeek: number;
  quotesPerMonth: number;
  followedUpOutOf10: number;
  winsOutOf10: number;
  avgFirstJob: number;
  asksForReviews: boolean;
  contactsPastCustomers: boolean;
};

export type LeakReportResult = {
  missedCallMonthly: number;
  coldQuoteMonthly: number;
  totalMonthly: number;
  totalYearly: number;
  leaksFound: number;
  leaks: {
    missedCalls: boolean;
    coldQuotes: boolean;
    noReviewAsk: boolean;
    noPastCustomerContact: boolean;
  };
};

export type FieldName = Exclude<keyof LeakReportInput, never>;
export type RawInput = Partial<Record<FieldName, string>>;
export type FieldErrors = Partial<Record<FieldName, string>>;

const WEEKS_PER_MONTH = 52 / 12;

type NumberRule = { min: number; max: number; money?: boolean };

export const NUMBER_RULES: Record<
  "unansweredPerWeek" | "quotesPerMonth" | "followedUpOutOf10" | "winsOutOf10" | "avgFirstJob",
  NumberRule
> = {
  unansweredPerWeek: { min: 0, max: 500 },
  quotesPerMonth: { min: 0, max: 1000 },
  followedUpOutOf10: { min: 0, max: 10 },
  winsOutOf10: { min: 0, max: 10 },
  avgFirstJob: { min: 1, max: 1_000_000, money: true },
};

// Field order, used to move focus to the first error.
export const FIELD_ORDER: FieldName[] = [
  "trade",
  "unansweredPerWeek",
  "quotesPerMonth",
  "followedUpOutOf10",
  "winsOutOf10",
  "avgFirstJob",
  "asksForReviews",
  "contactsPastCustomers",
];

const formatWhole = (n: number) => new Intl.NumberFormat("en-US").format(n);

function parseWhole(raw: string | undefined, rule: NumberRule): { value?: number; error?: string } {
  const cleaned = (raw ?? "").trim().replace(rule.money ? /[$,\s]/g : /[,\s]/g, "");
  if (cleaned === "") return { error: "Enter a number." };
  if (!/^-?\d*\.?\d+$/.test(cleaned)) return { error: "Use numbers only." };
  const value = Number(cleaned);
  if (!Number.isInteger(value)) {
    return { error: rule.money ? "Use whole dollars, no cents." : "Use a whole number." };
  }
  if (value < rule.min || value > rule.max) {
    return {
      error: `Enter a number from ${rule.money ? "$" : ""}${formatWhole(rule.min)} to ${rule.money ? "$" : ""}${formatWhole(rule.max)}.`,
    };
  }
  return { value };
}

function parseYesNo(raw: string | undefined): { value?: boolean; error?: string } {
  if (raw === "yes") return { value: true };
  if (raw === "no") return { value: false };
  return { error: "Choose yes or no." };
}

export function validate(raw: RawInput): { input?: LeakReportInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const trade = TRADES.find((t) => t === raw.trade);
  if (!trade) errors.trade = "Choose the type of business.";

  const numbers = {} as Record<keyof typeof NUMBER_RULES, number>;
  for (const key of Object.keys(NUMBER_RULES) as (keyof typeof NUMBER_RULES)[]) {
    const parsed = parseWhole(raw[key], NUMBER_RULES[key]);
    if (parsed.error) errors[key] = parsed.error;
    else numbers[key] = parsed.value as number;
  }

  const reviews = parseYesNo(raw.asksForReviews);
  if (reviews.error) errors.asksForReviews = reviews.error;
  const pastCustomers = parseYesNo(raw.contactsPastCustomers);
  if (pastCustomers.error) errors.contactsPastCustomers = pastCustomers.error;

  if (Object.keys(errors).length > 0 || !trade) return { errors };
  return {
    errors,
    input: {
      trade,
      ...numbers,
      asksForReviews: reviews.value as boolean,
      contactsPastCustomers: pastCustomers.value as boolean,
    },
  };
}

// Rounded to the nearest $10 (app-spec).
const roundTo10 = (n: number) => Math.round(n / 10) * 10;

export function computeLeakReport(input: LeakReportInput): LeakReportResult {
  const winRate = input.winsOutOf10 / 10;
  const unchasedShare = (10 - input.followedUpOutOf10) / 10;

  const missedCallMonthly = roundTo10(input.unansweredPerWeek * WEEKS_PER_MONTH * winRate * input.avgFirstJob);
  const coldQuoteMonthly = roundTo10(input.quotesPerMonth * unchasedShare * winRate * input.avgFirstJob);
  const totalMonthly = missedCallMonthly + coldQuoteMonthly;

  const leaks = {
    missedCalls: input.unansweredPerWeek > 0,
    coldQuotes: input.followedUpOutOf10 < 10,
    noReviewAsk: !input.asksForReviews,
    noPastCustomerContact: !input.contactsPastCustomers,
  };

  return {
    missedCallMonthly,
    coldQuoteMonthly,
    totalMonthly,
    totalYearly: totalMonthly * 12,
    leaksFound: Object.values(leaks).filter(Boolean).length,
    leaks,
  };
}

export const formatMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// Wording that changes with the trade. Maths never changes (app-spec).
export function tradeWords(trade: Trade | undefined) {
  if (trade === "childcare") {
    return {
      job: "enrollment",
      quoteSingular: "tour",
      quotes: "Tours or inquiries you follow up in a typical month",
      quotesShort: "tours or inquiries",
      firstJob: "Average first month's fee for a new family",
    };
  }
  return {
    job: "job",
    quoteSingular: "quote",
    quotes: "Quotes or estimates you send in a typical month",
    quotesShort: "quotes",
    firstJob: "Average value of a new customer's first job",
  };
}

// The assumptions printed under every result, on the page and in both emails (app-spec: always shown).
export function assumptionLines(trade: Trade) {
  const w = tradeWords(trade);
  return [
    `Missed calls: if those callers had asked for a ${w.quoteSingular} and you'd won them at your usual rate.`,
    `Cold ${w.quotesShort}: ${w.quotesShort} nobody chased, valued at your usual win rate.`,
    `"At stake" is not the same as "lost". Some of those callers and ${w.quotesShort} would never have become ${w.job}s.`,
    "Built only from the numbers you entered. A month is counted as 52 ÷ 12 weeks, and figures are rounded to the nearest $10.",
  ];
}

import { describe, expect, it } from "vitest";
import { computeLeakReport, formatMoney, validate, type LeakReportInput, type RawInput } from "./leakReport";

const base: LeakReportInput = {
  trade: "landscaping",
  unansweredPerWeek: 5,
  quotesPerMonth: 20,
  followedUpOutOf10: 4,
  winsOutOf10: 3,
  avgFirstJob: 400,
  asksForReviews: true,
  contactsPastCustomers: true,
};

const raw: RawInput = {
  trade: "landscaping",
  unansweredPerWeek: "5",
  quotesPerMonth: "20",
  followedUpOutOf10: "4",
  winsOutOf10: "3",
  avgFirstJob: "400",
  asksForReviews: "yes",
  contactsPastCustomers: "yes",
};

describe("computeLeakReport", () => {
  it("matches the worked example in the spec review (made-up inputs)", () => {
    const r = computeLeakReport(base);
    // 5 x 52/12 x 0.3 x 400 = 2600; 20 x 0.6 x 0.3 x 400 = 1440
    expect(r.missedCallMonthly).toBe(2600);
    expect(r.coldQuoteMonthly).toBe(1440);
    expect(r.totalMonthly).toBe(4040);
    expect(r.totalYearly).toBe(48480);
  });

  it("rounds each line to the nearest $10", () => {
    // 3 x 52/12 x 0.7 x 333 = 3030.3
    const r = computeLeakReport({ ...base, unansweredPerWeek: 3, winsOutOf10: 7, avgFirstJob: 333, quotesPerMonth: 0 });
    expect(r.missedCallMonthly).toBe(3030);
    expect(r.coldQuoteMonthly).toBe(0);
  });

  it("returns $0 lines when there is no leak", () => {
    const r = computeLeakReport({ ...base, unansweredPerWeek: 0, followedUpOutOf10: 10 });
    expect(r.missedCallMonthly).toBe(0);
    expect(r.coldQuoteMonthly).toBe(0);
    expect(r.totalMonthly).toBe(0);
    expect(r.leaksFound).toBe(0);
  });

  it("returns $0 when the owner wins nothing", () => {
    const r = computeLeakReport({ ...base, winsOutOf10: 0 });
    expect(r.totalMonthly).toBe(0);
  });

  it("counts leaks found out of 4", () => {
    expect(computeLeakReport(base).leaksFound).toBe(2);
    expect(computeLeakReport({ ...base, asksForReviews: false, contactsPastCustomers: false }).leaksFound).toBe(4);
  });

  it("never changes the maths for a different trade", () => {
    expect(computeLeakReport({ ...base, trade: "childcare" })).toEqual(computeLeakReport(base));
  });
});

describe("validate", () => {
  it("accepts a complete, valid set and strips $ and commas from money", () => {
    const { input, errors } = validate({ ...raw, avgFirstJob: "$1,200" });
    expect(errors).toEqual({});
    expect(input?.avgFirstJob).toBe(1200);
  });

  it("flags empty fields", () => {
    const { input, errors } = validate({});
    expect(input).toBeUndefined();
    expect(Object.keys(errors).sort()).toEqual(
      [
        "asksForReviews",
        "avgFirstJob",
        "contactsPastCustomers",
        "followedUpOutOf10",
        "quotesPerMonth",
        "trade",
        "unansweredPerWeek",
        "winsOutOf10",
      ].sort(),
    );
  });

  it.each([
    ["unansweredPerWeek", "-2", "Enter a number from 0 to 500."],
    ["unansweredPerWeek", "2.5", "Use a whole number."],
    ["unansweredPerWeek", "five", "Use numbers only."],
    ["unansweredPerWeek", "501", "Enter a number from 0 to 500."],
    ["winsOutOf10", "11", "Enter a number from 0 to 10."],
    ["avgFirstJob", "399.99", "Use whole dollars, no cents."],
    ["avgFirstJob", "0", "Enter a number from $1 to $1,000,000."],
    ["quotesPerMonth", "1e3", "Use numbers only."],
  ] as const)("rejects %s = %s", (field, value, message) => {
    const { input, errors } = validate({ ...raw, [field]: value });
    expect(input).toBeUndefined();
    expect(errors[field]).toBe(message);
  });

  it("rejects an unknown trade", () => {
    expect(validate({ ...raw, trade: "plumbing" }).errors.trade).toBe("Choose the type of business.");
  });
});

describe("formatMoney", () => {
  it("formats whole US dollars", () => {
    expect(formatMoney(48480)).toBe("$48,480");
  });
});

import { describe, expect, it } from "vitest";
import { ownerEmail, teamEmail } from "./email";
import { computeLeakReport, type LeakReportInput } from "./leakReport";

const input: LeakReportInput = {
  trade: "painting",
  unansweredPerWeek: 5,
  quotesPerMonth: 20,
  followedUpOutOf10: 4,
  winsOutOf10: 3,
  avgFirstJob: 400,
  asksForReviews: false,
  contactsPastCustomers: true,
};
const result = computeLeakReport(input);

describe("ownerEmail", () => {
  const mail = ownerEmail(input, result, { email: "owner@example.com", firstName: "Sam" }, "https://calendly.com/example/recon");

  it("carries the same figures as the page, labelled as an estimate", () => {
    for (const body of [mail.html, mail.text]) {
      expect(body).toContain("$4,040");
      expect(body).toContain("$48,480");
      expect(body).toContain("$2,600");
      expect(body).toContain("$1,440");
      expect(body).toContain("Estimate");
    }
    expect(mail.text).toContain('"At stake" is not the same as "lost"');
    expect(mail.html).toContain("&quot;At stake&quot; is not the same as &quot;lost&quot;");
  });

  it("includes the booking link only when configured", () => {
    expect(mail.html).toContain("https://calendly.com/example/recon");
    expect(ownerEmail(input, result, { email: "o@example.com" }).html).not.toContain("Book a free Recon Call</a>");
  });

  it("contains no third-party statistics or prices beyond the owner's own figures", () => {
    expect(mail.text).not.toMatch(/%|MIT|study|guarantee/i);
  });
});

describe("teamEmail", () => {
  it("escapes anything the visitor typed", () => {
    const mail = teamEmail(input, result, { email: "x@example.com", businessName: "<script>alert(1)</script>" }, new Date(0));
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });

  it("reminds the team to log the lead in the CRM", () => {
    const mail = teamEmail(input, result, { email: "x@example.com" }, new Date(0));
    expect(mail.text).toContain("CRM");
    expect(mail.subject).toBe("New Leak Report: x@example.com");
  });
});

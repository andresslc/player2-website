import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/leak-report/route";

const input = {
  trade: "landscaping",
  unansweredPerWeek: "5",
  quotesPerMonth: "20",
  followedUpOutOf10: "4",
  winsOutOf10: "3",
  avgFirstJob: "400",
  asksForReviews: "no",
  contactsPastCustomers: "yes",
};

const request = (body: Record<string, unknown>) =>
  new Request("http://localhost/api/leak-report", { method: "POST", body: JSON.stringify(body) });

const valid = { input, email: "owner@example.com", firstName: "Sam", website: "", elapsedMs: 5000 };

describe("POST /api/leak-report (Resend stubbed)", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("EMAIL_FROM", "Reports <reports@example.com>");
    vi.stubEnv("LEADS_TO_EMAIL", "team@example.com");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends the team copy first, then the owner's report, and succeeds", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [team, owner] = fetchMock.mock.calls.map(([, init]) => JSON.parse(init.body));
    expect(team.to).toEqual(["team@example.com"]);
    expect(team.reply_to).toBe("owner@example.com");
    expect(owner.to).toEqual(["owner@example.com"]);
    expect(owner.reply_to).toBe("team@example.com");
    expect(owner.text).toContain("$4,040");
  });

  it("recomputes from raw inputs and ignores any figures sent by the browser", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    await POST(request({ ...valid, result: { totalMonthly: 999999 } }));
    const owner = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(owner.text).not.toContain("999,999");
    expect(owner.text).toContain("$4,040");
  });

  it("returns a failure (and never emails the owner) when the team send fails", async () => {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 500 }));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns a failure when the owner send fails", async () => {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 200 })).mockResolvedValueOnce(new Response("{}", { status: 422 }));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
  });

  it("sends nothing for a filled honeypot but looks successful", async () => {
    const res = await POST(request({ ...valid, website: "spam" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

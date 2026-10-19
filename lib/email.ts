// The two Leak Report emails (app-spec "Email me this report") and the Resend call.
// Colours come from lib/tokens.json (generated from DESIGN.md): email clients ignore CSS variables.
import tokens from "@/lib/tokens.json";
import { site } from "@/content/site";
import {
  assumptionLines,
  formatMoney,
  TRADE_LABELS,
  tradeWords,
  type LeakReportInput,
  type LeakReportResult,
} from "@/lib/leakReport";

const c = tokens.colors;

export type Contact = { email: string; firstName?: string; businessName?: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] as string);

function figureRows(input: LeakReportInput, result: LeakReportResult) {
  const w = tradeWords(input.trade);
  const line = (n: number) => (n === 0 ? site.leakReport.result.zeroLine : formatMoney(n));
  return [
    ["Missed calls", line(result.missedCallMonthly)],
    [`Cold ${w.quotesShort}`, line(result.coldQuoteMonthly)],
    ["Review requests", input.asksForReviews ? "OK" : "Leak"],
    ["Past-customer follow-up", input.contactsPastCustomers ? "OK" : "Leak"],
    ["Leaks found", `${result.leaksFound} of 4`],
  ];
}

function inputRows(input: LeakReportInput) {
  const w = tradeWords(input.trade);
  return [
    ["Type of business", TRADE_LABELS[input.trade]],
    ["Unanswered new-customer calls per week", String(input.unansweredPerWeek)],
    [w.quotes, String(input.quotesPerMonth)],
    [`Out of 10 ${w.quotesShort}, followed up`, String(input.followedUpOutOf10)],
    [`Out of 10 ${w.quotesShort}, won`, String(input.winsOutOf10)],
    [w.firstJob, formatMoney(input.avgFirstJob)],
    ["Asks every customer for a review", input.asksForReviews ? "Yes" : "No"],
    ["Contacts past customers", input.contactsPastCustomers ? "Yes" : "No"],
  ];
}

const table = (rows: string[][]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:8px 0 16px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;border-top:1px solid ${c["cream-2"]};color:${c.ink}">${escapeHtml(k)}</td><td align="right" style="padding:8px 0;border-top:1px solid ${c["cream-2"]};color:${c.ink};font-weight:700">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

function layout(title: string, body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:24px;background:${c.cream};color:${c.ink};font-family:-apple-system,'Segoe UI',Arial,sans-serif;font-size:16px;line-height:1.5">
<div style="max-width:560px;margin:0 auto;background:${c.cream};border:3px solid ${c.ink};border-radius:20px;padding:24px">
${body}
<p style="margin:24px 0 0;font-size:13px;color:${c.forest}">${escapeHtml(site.name)} · ${escapeHtml(site.tagline)}</p>
</div></body></html>`;
}

function resultBlock(input: LeakReportInput, result: LeakReportResult) {
  return `<div style="background:${c.ink};color:${c.cream};border-radius:12px;padding:20px;margin:16px 0">
<p style="margin:0;color:${c.leaf};font-family:Menlo,Consolas,monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase">Estimated money at stake each month</p>
<p style="margin:8px 0 4px;color:${c.spark};font-family:Menlo,Consolas,monospace;font-size:36px;font-weight:700">${formatMoney(result.totalMonthly)}</p>
<p style="margin:0;color:${c.cream}">Estimate · ${formatMoney(result.totalYearly)} a year</p>
</div>
${table(figureRows(input, result))}
<p style="margin:16px 0 4px;font-weight:700">How we got this number</p>
<ul style="margin:0;padding-left:20px">${assumptionLines(input.trade)
    .map((a) => `<li style="margin:4px 0">${escapeHtml(a)}</li>`)
    .join("")}</ul>`;
}

function resultText(input: LeakReportInput, result: LeakReportResult) {
  return [
    `Estimated money at stake each month: ${formatMoney(result.totalMonthly)} (estimate; ${formatMoney(result.totalYearly)} a year)`,
    ...figureRows(input, result).map(([k, v]) => `- ${k}: ${v}`),
    "",
    "How we got this number:",
    ...assumptionLines(input.trade).map((a) => `- ${a}`),
  ].join("\n");
}

export function ownerEmail(input: LeakReportInput, result: LeakReportResult, contact: Contact, bookingUrl?: string) {
  const hello = contact.firstName ? `Hi ${contact.firstName},` : "Hi,";
  const cta = bookingUrl
    ? `<p style="margin:24px 0"><a href="${escapeHtml(bookingUrl)}" style="display:inline-block;background:${c.leaf};color:${c.ink};border:3px solid ${c.ink};border-radius:999px;padding:12px 24px;font-weight:700;text-decoration:none">${escapeHtml(site.bookCta)}</a></p>`
    : "";
  const html = layout(
    "Your Leak Report",
    `<h1 style="margin:0 0 8px;font-size:26px;line-height:1.15">Your Leak Report</h1>
<p style="margin:0 0 8px">${escapeHtml(hello)} here are the numbers you entered on our site, and what they add up to.</p>
${resultBlock(input, result)}
<p style="margin:16px 0 4px;font-weight:700">${escapeHtml(site.leakReport.result.nextStepHeading)}</p>
<p style="margin:0">${escapeHtml(site.leakReport.result.nextStepBody)}</p>
${cta}
<p style="margin:16px 0 4px;font-weight:700">What you entered</p>
${table(inputRows(input))}
<p style="margin:16px 0 0;font-size:14px">You asked for this report on our website. Reply to this email if you have questions.</p>`,
  );
  const text = [
    "Your Leak Report",
    "",
    `${hello} here are the numbers you entered on our site, and what they add up to.`,
    "",
    resultText(input, result),
    "",
    site.leakReport.result.nextStepHeading,
    site.leakReport.result.nextStepBody,
    bookingUrl ? `${site.bookCta}: ${bookingUrl}` : "",
    "",
    "What you entered:",
    ...inputRows(input).map(([k, v]) => `- ${k}: ${v}`),
    "",
    "You asked for this report on our website. Reply to this email if you have questions.",
  ].join("\n");
  return { subject: "Your Leak Report", html, text };
}

export function teamEmail(input: LeakReportInput, result: LeakReportResult, contact: Contact, submittedAt: Date) {
  const who = [contact.firstName, contact.businessName].filter(Boolean).join(", ") || contact.email;
  const lead: string[][] = [
    ["Email", contact.email],
    ["First name", contact.firstName || "(not given)"],
    ["Business", contact.businessName || "(not given)"],
    ["Type of business", TRADE_LABELS[input.trade]],
    ["Submitted", submittedAt.toISOString()],
  ];
  const html = layout(
    "New Leak Report",
    `<h1 style="margin:0 0 8px;font-size:24px;line-height:1.15">New Leak Report: ${escapeHtml(who)}</h1>
<p style="margin:0 0 8px">Someone emailed themselves a Leak Report from the website. Add them to the CRM: if it's not in the CRM, it didn't happen.</p>
${table(lead)}
${resultBlock(input, result)}
<p style="margin:16px 0 4px;font-weight:700">What they entered</p>
${table(inputRows(input))}`,
  );
  const text = [
    `New Leak Report: ${who}`,
    "Add them to the CRM: if it's not in the CRM, it didn't happen.",
    "",
    ...lead.map(([k, v]) => `- ${k}: ${v}`),
    "",
    resultText(input, result),
    "",
    "What they entered:",
    ...inputRows(input).map(([k, v]) => `- ${k}: ${v}`),
  ].join("\n");
  return { subject: `New Leak Report: ${who}`, html, text };
}

export async function sendEmail(
  apiKey: string,
  message: { from: string; to: string; replyTo?: string; subject: string; html: string; text: string },
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

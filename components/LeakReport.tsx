"use client";

// The Leak Report (app-spec "The Leak Report"; DESIGN.md Components "Leak Report calculator").
// Inputs sit on a cream panel so error text is always red on cream; the result is a score screen.
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import type { BookingConfig } from "@/lib/env";
import {
  assumptionLines,
  computeLeakReport,
  FIELD_ORDER,
  formatMoney,
  TRADE_LABELS,
  TRADES,
  tradeWords,
  validate,
  type FieldErrors,
  type FieldName,
  type LeakReportResult,
  type RawInput,
  type Trade,
} from "@/lib/leakReport";
import { BookingButton } from "@/components/Booking";
import { Button, cx } from "@/components/primitives";

const copy = site.leakReport;

const inputClass =
  "type-body-md h-control-md w-full rounded-md border-stroke border-ink bg-cream px-md text-ink aria-[invalid=true]:border-error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="type-label-md mt-xs flex items-center gap-xs text-error">
      <span aria-hidden="true" className="inline-grid size-md place-items-center rounded-full bg-error text-cream">
        !
      </span>
      {message}
    </p>
  );
}

function NumberField({
  name,
  label,
  hint,
  value,
  error,
  prefix,
  onChange,
}: {
  name: FieldName;
  label: string;
  hint?: string;
  value: string;
  error?: string;
  prefix?: string;
  onChange: (name: FieldName, value: string) => void;
}) {
  const describedBy = [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean).join(" ");
  return (
    <div>
      <label htmlFor={name} className="type-label-md block">
        {label}
      </label>
      {hint ? (
        <p id={`${name}-hint`} className="type-body-sm mt-xs">
          {hint}
        </p>
      ) : null}
      <div className="relative mt-sm">
        {prefix ? (
          <span aria-hidden="true" className="type-body-md pointer-events-none absolute top-1/2 left-md -translate-y-1/2">
            {prefix}
          </span>
        ) : null}
        <input
          id={name}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(e) => onChange(name, e.target.value)}
          className={cx(inputClass, prefix && "pl-xl")}
        />
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

function YesNoField({
  name,
  legend,
  value,
  error,
  onChange,
}: {
  name: FieldName;
  legend: string;
  value: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="type-label-md">{legend}</legend>
      <div className="mt-sm flex gap-sm">
        {(["yes", "no"] as const).map((option) => (
          <label
            key={option}
            className="type-label-md flex min-h-tap-min flex-1 cursor-pointer items-center gap-sm rounded-md border-stroke border-ink bg-cream px-md has-checked:bg-cream-2 has-focus-visible:outline-stroke has-focus-visible:outline-ink"
          >
            <input
              id={option === "yes" ? name : undefined}
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(name, option)}
              className="size-md accent-ink"
            />
            {option === "yes" ? "Yes" : "No"}
          </label>
        ))}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
}

// DESIGN.md Motion: figures count up once (about 600ms); instant under reduced motion.
function useCountUp(target: number | null, durationMs = 600) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (target === null || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setShown(Math.round((target * (1 - Math.pow(1 - t, 3))) / 10) * 10);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, reduce]);
  return target === null || reduce ? (target ?? 0) : shown;
}

function ScreenRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-md border-t-stroke border-dashed border-forest py-sm">
      <dt className="type-hud-md text-leaf">{label}</dt>
      <dd className="type-hud-md text-right text-cream">{children}</dd>
    </div>
  );
}

function ScoreScreen({ result, trade }: { result: LeakReportResult | null; trade: Trade | undefined }) {
  const animated = useCountUp(result ? result.totalMonthly : null);
  const line = (n: number) => (n === 0 ? copy.result.zeroLine : formatMoney(n));
  return (
    <div className="pixel-corners bg-leaf p-stroke-heavy">
      <div className="pixel-corners min-h-full bg-ink p-lg text-cream sm:p-xl">
        <div aria-live="polite" aria-atomic="true">
          {!result ? (
            <p className="type-hud-md py-xl text-center text-leaf">{copy.emptyScreen}</p>
          ) : (
            <>
              <p className="type-hud-md text-leaf">{copy.result.hudTotal}</p>
              <p className="type-hud-score mt-sm text-spark" aria-hidden="true">
                {formatMoney(animated)}
              </p>
              <p className="sr-only">
                {copy.result.estimateLabel}: {formatMoney(result.totalMonthly)} at stake each month,{" "}
                {formatMoney(result.totalYearly)} a year.
              </p>
              <p className="mt-sm flex flex-wrap items-center gap-sm">
                <span className="type-hud-md rounded-sm bg-spark px-sm py-xs text-ink">{copy.result.estimateLabel}</span>
                <span className="type-hud-md text-cream">
                  {copy.result.hudYearly}: {formatMoney(result.totalYearly)}
                </span>
              </p>
              <dl className="mt-lg">
                <ScreenRow label={copy.result.hudMissed}>{line(result.missedCallMonthly)}</ScreenRow>
                <ScreenRow label={`Cold ${tradeWords(trade).quotesShort}`}>{line(result.coldQuoteMonthly)}</ScreenRow>
                <ScreenRow label={copy.result.checklistReviews}>
                  {result.leaks.noReviewAsk ? copy.result.checklistLeak : copy.result.checklistOk}
                </ScreenRow>
                <ScreenRow label={copy.result.checklistPastCustomers}>
                  {result.leaks.noPastCustomerContact ? copy.result.checklistLeak : copy.result.checklistOk}
                </ScreenRow>
                <ScreenRow label={copy.result.hudLeaks}>{`${result.leaksFound} of 4`}</ScreenRow>
              </dl>
            </>
          )}
        </div>
        {result && trade ? (
          <div className="mt-lg">
            <h3 className="type-label-md text-cream">{copy.result.assumptionsHeading}</h3>
            <ul className="type-body-sm mt-sm list-disc space-y-xs pl-lg text-cream marker:text-leaf">
              {assumptionLines(trade).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type EmailState = { status: "idle" | "sending" | "sent" | "failed"; sentTo?: string; error?: string };

function EmailReport({ raw, shownAt }: { raw: RawInput; shownAt: number }) {
  const e = copy.email;
  const [state, setState] = useState<EmailState>({ status: "idle" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(address)) {
      setEmailError(e.invalidEmail);
      emailRef.current?.focus();
      return;
    }
    setEmailError(undefined);
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/leak-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: raw,
          email: address,
          firstName: String(form.get("firstName") ?? ""),
          businessName: String(form.get("businessName") ?? ""),
          website: String(form.get("website") ?? ""),
          elapsedMs: Date.now() - shownAt,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState({ status: "sent", sentTo: address });
    } catch {
      setState({ status: "failed" });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="on-light rounded-xl border-stroke border-cream bg-cream p-lg text-ink sm:p-xl">
      <h3 className="type-headline-sm">{e.heading}</h3>
      <div className="mt-md grid gap-md sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="report-email" className="type-label-md block">
            {e.emailLabel}
          </label>
          <input
            ref={emailRef}
            id="report-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "report-email-error" : undefined}
            className={cx(inputClass, "mt-sm")}
          />
          <FieldError id="report-email-error" message={emailError} />
        </div>
        <div>
          <label htmlFor="report-first-name" className="type-label-md block">
            {e.firstNameLabel}
          </label>
          <input id="report-first-name" name="firstName" type="text" autoComplete="given-name" className={cx(inputClass, "mt-sm")} />
        </div>
        <div>
          <label htmlFor="report-business" className="type-label-md block">
            {e.businessLabel}
          </label>
          <input id="report-business" name="businessName" type="text" autoComplete="organization" className={cx(inputClass, "mt-sm")} />
        </div>
        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[100vw] h-px w-px overflow-hidden">
          <label htmlFor="report-website">Website</label>
          <input id="report-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <p className="type-body-sm mt-md">
        {e.consent}{" "}
        <a href="/privacy" className="font-bold">
          {e.privacyLink}
        </a>
        .
      </p>
      <Button type="submit" className="mt-md" disabled={state.status === "sending"} aria-disabled={state.status === "sending"}>
        {state.status === "sending" ? e.sending : e.submit}
      </Button>
      <div aria-live="polite" className="mt-md empty:hidden">
        {state.status === "sent" && state.sentTo ? (
          <p className="type-label-md rounded-md border-stroke border-forest bg-cream-2 p-md">{e.sent(state.sentTo)}</p>
        ) : null}
        {state.status === "failed" ? <p className="type-label-md rounded-md border-stroke border-error p-md text-error">{e.failed}</p> : null}
      </div>
    </form>
  );
}

const emptyRaw: RawInput = {
  trade: "",
  unansweredPerWeek: "",
  quotesPerMonth: "",
  followedUpOutOf10: "",
  winsOutOf10: "",
  avgFirstJob: "",
  asksForReviews: "",
  contactsPastCustomers: "",
};

export function LeakReport({ booking }: { booking: BookingConfig }) {
  const [raw, setRaw] = useState<RawInput>(emptyRaw);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<{ value: LeakReportResult; raw: RawInput; shownAt: number } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const trade = TRADES.find((t) => t === raw.trade);
  const words = tradeWords(trade);

  const update = (name: FieldName, value: string) => {
    setRaw((r) => ({ ...r, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { input, errors: found } = validate(raw);
    setErrors(found);
    if (!input) {
      const first = FIELD_ORDER.find((f) => found[f]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setResult({ value: computeLeakReport(input), raw: { ...raw }, shownAt: Date.now() });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: "nearest" }));
  }

  return (
    <div className="mt-xl grid items-start gap-xl md:grid-cols-2">
      <form
        onSubmit={submit}
        noValidate
        aria-label="Leak Report"
        className="on-light rounded-xl border-stroke border-cream bg-cream p-lg text-ink shadow-sticker-forest sm:p-xl"
      >
        <div className="grid gap-lg">
          <div>
            <label htmlFor="trade" className="type-label-md block">
              {copy.labels.trade}
            </label>
            <select
              id="trade"
              name="trade"
              value={raw.trade}
              onChange={(e) => update("trade", e.target.value)}
              aria-invalid={errors.trade ? true : undefined}
              aria-describedby={errors.trade ? "trade-error" : undefined}
              className={cx(inputClass, "mt-sm")}
            >
              <option value="">Choose one</option>
              {TRADES.map((t) => (
                <option key={t} value={t}>
                  {TRADE_LABELS[t]}
                </option>
              ))}
            </select>
            <FieldError id="trade-error" message={errors.trade} />
          </div>
          <NumberField
            name="unansweredPerWeek"
            label={copy.labels.unansweredPerWeek}
            hint={copy.hints.unansweredPerWeek}
            value={raw.unansweredPerWeek ?? ""}
            error={errors.unansweredPerWeek}
            onChange={update}
          />
          <NumberField name="quotesPerMonth" label={words.quotes} value={raw.quotesPerMonth ?? ""} error={errors.quotesPerMonth} onChange={update} />
          <NumberField
            name="followedUpOutOf10"
            label={copy.labels.followedUpOutOf10.replace("quotes", words.quotesShort)}
            value={raw.followedUpOutOf10 ?? ""}
            error={errors.followedUpOutOf10}
            onChange={update}
          />
          <NumberField
            name="winsOutOf10"
            label={copy.labels.winsOutOf10.replace("quotes", words.quotesShort)}
            value={raw.winsOutOf10 ?? ""}
            error={errors.winsOutOf10}
            onChange={update}
          />
          <NumberField
            name="avgFirstJob"
            label={words.firstJob}
            hint={copy.hints.avgFirstJob}
            prefix="$"
            value={raw.avgFirstJob ?? ""}
            error={errors.avgFirstJob}
            onChange={update}
          />
          <YesNoField name="asksForReviews" legend={copy.labels.asksForReviews} value={raw.asksForReviews ?? ""} error={errors.asksForReviews} onChange={update} />
          <YesNoField
            name="contactsPastCustomers"
            legend={copy.labels.contactsPastCustomers}
            value={raw.contactsPastCustomers ?? ""}
            error={errors.contactsPastCustomers}
            onChange={update}
          />
          <Button type="submit">{copy.submit}</Button>
        </div>
      </form>

      <div ref={resultRef} className="grid gap-lg md:sticky md:top-[calc(var(--spacing-header)+var(--spacing-lg))]">
        <ScoreScreen result={result?.value ?? null} trade={(result?.raw.trade as Trade | undefined) ?? trade} />
        {result ? (
          <>
            <div>
              <h3 className="type-headline-sm">{copy.result.nextStepHeading}</h3>
              <p className="type-body-md mt-sm">{copy.result.nextStepBody}</p>
              <BookingButton booking={booking} className="mt-md">
                {site.bookCta}
              </BookingButton>
            </div>
            <EmailReport key={result.shownAt} raw={result.raw} shownAt={result.shownAt} />
          </>
        ) : null}
      </div>
    </div>
  );
}

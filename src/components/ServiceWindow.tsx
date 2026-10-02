import { useEffect, useState, type ReactNode } from "react";
import {
  FREE_SERVICE_PER_NUMBER,
  MARKETS,
  META_LINKS,
  NONPROFIT_FREE_UNTIL,
  PAYMENT_METHOD_DEADLINE,
  fmtINR,
  fmtNum,
  serviceBreakdown,
} from "../data/rates";
import { Reveal, prefersReducedMotion } from "../lib/motion";
import { cn } from "../utils/cn";
import { Btn, IcArrow, IcCheck, IcChevron, IcExternal, IcX, SectionHead } from "./ui";

/* ---------- month model: Oct (31d) + Nov (30d) ---------- */
const OCT = 31;
const NOV = 30;
const SPAN = OCT + NOV;
const SPEED = 4.2; // days per second

const shortNum = (n: number): string =>
  n >= 1_000_000
    ? `${(n / 1e6).toLocaleString("en-IN", { maximumFractionDigits: 1 })}M`
    : n >= 1000
      ? `${(n / 1000).toLocaleString("en-IN", { maximumFractionDigits: 1 })}K`
      : `${n}`;

const PRESETS = [800, 1000, 5000, 40_000, 250_000, 1_000_000];
const posFor = (v: number) => (Math.log10(v) - 2) * 200;
const volFor = (p: number) => Math.round(10 ** (2 + p / 200));

function dateLabel(d: number) {
  const day = Math.min(SPAN - 0.001, Math.max(0, d));
  return day < OCT ? `Oct ${Math.floor(day) + 1}, 2026` : `Nov ${Math.floor(day - OCT) + 1}, 2026`;
}

/* ---------- comparison table (mirrors Meta's own change table) ---------- */
const CHANGES: { what: string; before: boolean; after: boolean; note?: string }[] = [
  { what: "1:1 service messages within the monthly free tier", before: false, after: false, note: "first 1,000 / number / month" },
  { what: "Group service messages within the monthly free tier", before: false, after: false, note: "shares the same 1,000" },
  { what: "1:1 service messages after the free tier is used", before: false, after: true, note: "market service rate" },
  { what: "Group service messages after the free tier is used", before: false, after: true, note: "market service rate" },
  { what: "Utility templates sent inside an open 24h window", before: false, after: true, note: "no free tier" },
  { what: "Reaction messages", before: false, after: false, note: "don't count toward the 1,000" },
  { what: "Anything inside a 72h free entry point window", before: false, after: false, note: "except Meta Business Agent tokens" },
];

function Pill({ charged }: { charged: boolean }) {
  return charged ? (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-citron/40 bg-citron/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-citron">
      <span className="h-1.5 w-1.5 rounded-full bg-citron" /> CHARGED
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald/35 bg-emerald/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-emerald">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> FREE
    </span>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5 19.5 12 7 19.5V4.5Z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5h3.4v15H7V4.5Zm6.6 0H17v15h-3.4v-15Z" />
    </svg>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss">{children}</p>
);

export default function ServiceWindow() {
  const reduced = prefersReducedMotion();
  const [mid, setMid] = useState("in");
  const [numbers, setNumbers] = useState(1);
  const [pos, setPos] = useState(Math.round(posFor(5000)));
  const [day, setDay] = useState(reduced ? OCT - 0.01 : 0);
  const [playing, setPlaying] = useState(!reduced);

  const m = MARKETS.find((x) => x.id === mid)!;
  const volume = volFor(pos);
  const monthly = serviceBreakdown(m, volume, numbers);
  const A = monthly.allowance;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setDay((d) => (d + dt * SPEED >= SPAN ? 0 : d + dt * SPEED));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  /* live month state */
  const inNov = day >= OCT;
  const daysInMonth = inNov ? NOV : OCT;
  const dayInMonth = inNov ? day - OCT : day;
  const delivered = Math.floor((volume * dayInMonth) / daysInMonth);
  const freeUsed = Math.min(delivered, A);
  const billed = Math.max(0, delivered - A);
  const costSoFar = billed * m.service;
  const overAllowance = volume > A;
  const crossFrac = overAllowance ? A / volume : 1; // fraction of month when the 1,001st msg lands
  const crossDay = Math.min(daysInMonth, Math.ceil(crossFrac * daysInMonth));
  const justReset = inNov && dayInMonth < 2.2;
  const unused = Math.max(0, A - volume);

  const R = 54;
  const C = 2 * Math.PI * R;
  const ring = A > 0 ? freeUsed / A : 0;

  const months = [
    { key: "oct", label: "OCTOBER", start: 0, days: OCT },
    { key: "nov", label: "NOVEMBER", start: OCT, days: NOV },
  ];

  const countries = MARKETS.filter((x) => x.group === "Country");
  const regions = MARKETS.filter((x) => x.group !== "Country");

  return (
    <section id="service" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-citron/[0.045] blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHead
              eyebrow="The big change · 01 Oct 2026"
              title={
                <>
                  Service replies get a meter.
                  <br />
                  <span className="text-mint">The first 1,000 a month don't.</span>
                </>
              }
              sub="Free-form replies inside the 24-hour customer service window have been free since November 2024. From 1 October 2026, the Cloud API charges them per delivered message at each market's service rate — after a free tier of 1,000 service messages per business phone number, every month."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-stretch overflow-hidden rounded-xl border border-mint/15 bg-ink-900/70 font-mono text-[11px]">
              <div className="px-4 py-3">
                <p className="tracking-[0.18em] text-moss/70">THROUGH 30 SEP</p>
                <p className="mt-1 text-base font-semibold text-fog/80">Service · ₹0</p>
              </div>
              <div className="flex items-center border-x border-mint/10 px-3 text-mint">
                <IcArrow className="h-4 w-4" />
              </div>
              <div className="bg-citron/[0.06] px-4 py-3">
                <p className="tracking-[0.18em] text-citron/80">FROM 01 OCT</p>
                <p className="mt-1 text-base font-semibold text-citron">1K free · then {fmtINR(m.service)}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* ================= allowance clock ================= */}
          <Reveal>
            <div className="rounded-[20px] border border-mint/15 bg-gradient-to-b from-ink-850 to-ink-900 p-5 shadow-[0_40px_110px_rgba(0,0,0,0.45)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Label>Allowance clock · per business number</Label>
                  <p key={dateLabel(day)} className="anim-value mt-1.5 font-display text-lg font-semibold tracking-tight text-fog">
                    {dateLabel(day)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {justReset && (
                    <span className="anim-pop rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-mint">
                      RESET · NO ROLL-OVER
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause the month animation" : "Play the month animation"}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-mint/25 bg-ink-950/60 text-mint transition-all duration-300 hover:scale-105 hover:border-emerald/60 hover:bg-emerald/15"
                  >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                  </button>
                </div>
              </div>

              <div className="mt-7 grid items-center gap-7 sm:grid-cols-[150px_1fr]">
                {/* ring */}
                <div className="relative mx-auto h-[150px] w-[150px]">
                  <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(123,241,191,0.1)" strokeWidth="10" />
                    <circle
                      cx="64"
                      cy="64"
                      r={R}
                      fill="none"
                      stroke={ring >= 1 ? "#dff26e" : "#2bd98c"}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={C * (1 - ring)}
                      style={{ transition: "stroke 0.4s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className={cn("font-mono text-2xl font-semibold tabular-nums", ring >= 1 ? "text-citron" : "text-fog")}>
                      {shortNum(freeUsed)}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-moss">/ {shortNum(A)} FREE</p>
                  </div>
                </div>

                {/* live counters */}
                <dl className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-mint/10 bg-ink-950/60 p-3.5">
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-moss/75">Delivered this month</dt>
                    <dd className="mt-1 font-mono text-lg font-semibold tabular-nums text-fog">{fmtNum(delivered)}</dd>
                  </div>
                  <div className="rounded-lg border border-mint/10 bg-ink-950/60 p-3.5">
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-moss/75">Free tier left</dt>
                    <dd className={cn("mt-1 font-mono text-lg font-semibold tabular-nums", A - freeUsed > 0 ? "text-emerald" : "text-moss/60")}>
                      {fmtNum(A - freeUsed)}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-mint/10 bg-ink-950/60 p-3.5">
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-moss/75">Billable so far</dt>
                    <dd className={cn("mt-1 font-mono text-lg font-semibold tabular-nums", billed > 0 ? "text-citron" : "text-moss/60")}>
                      {fmtNum(billed)}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-mint/10 bg-ink-950/60 p-3.5">
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-moss/75">Charged so far</dt>
                    <dd className={cn("mt-1 font-mono text-lg font-semibold tabular-nums", costSoFar > 0 ? "text-citron" : "text-mint")}>
                      {fmtINR(costSoFar, 2)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* month tracks */}
              <div className="mt-8 space-y-6">
                {months.map((mo) => {
                  const local = Math.max(0, Math.min(mo.days, day - mo.start));
                  const elapsed = local / mo.days;
                  const freeW = Math.min(elapsed, crossFrac);
                  const paidW = Math.max(0, elapsed - crossFrac);
                  const active = day >= mo.start && day < mo.start + mo.days;
                  return (
                    <div key={mo.key}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className={cn("font-mono text-[10px] font-semibold tracking-[0.22em]", active ? "text-fog" : "text-moss/60")}>
                          {mo.label} 2026
                        </span>
                        <span className="font-mono text-[10px] text-moss/70">
                          {overAllowance ? (
                            <>
                              billing from <span className="text-citron">{mo.label.slice(0, 3)} {crossDay}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-emerald">{fmtNum(unused)}</span> unused expire
                            </>
                          )}
                        </span>
                      </div>
                      <div className="relative mt-2.5 h-3.5 overflow-hidden rounded-full bg-ink-700/60">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-jade to-emerald"
                          style={{ width: `${freeW * 100}%` }}
                        />
                        <div
                          className="absolute inset-y-0 bg-gradient-to-r from-citron/80 to-citron"
                          style={{ left: `${crossFrac * 100}%`, width: `${paidW * 100}%` }}
                        />
                        {overAllowance && (
                          <span
                            className="absolute inset-y-0 w-0.5 bg-fog/80"
                            style={{ left: `${crossFrac * 100}%` }}
                            aria-hidden
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <label className="mt-6 block">
                <span className="sr-only">Scrub through October and November 2026</span>
                <input
                  type="range"
                  min={0}
                  max={SPAN - 0.01}
                  step={0.05}
                  value={day}
                  onChange={(e) => {
                    setPlaying(false);
                    setDay(Number(e.target.value));
                  }}
                  className="rp-range"
                  style={{ ["--fill" as string]: `${(day / SPAN) * 100}%` }}
                />
              </label>
              <div className="mt-2 flex justify-between font-mono text-[9px] tracking-wider text-moss/60">
                <span>01 OCT</span>
                <span className="text-mint/80">01 NOV · RESET</span>
                <span>30 NOV</span>
              </div>

              <div className="mt-6 rounded-lg border border-mint/10 bg-ink-950/60 px-4 py-3 text-[13px] leading-relaxed text-moss">
                {overAllowance ? (
                  <>
                    At {fmtNum(volume)} service messages a month, the{" "}
                    <span className="font-semibold text-fog">{fmtNum(A + 1)}st</span> message lands around day{" "}
                    {crossDay} — every delivered reply after that is charged at{" "}
                    <span className="font-mono text-citron">{fmtINR(m.service)}</span>. On the 1st, the count resets to zero.
                  </>
                ) : (
                  <>
                    At {fmtNum(volume)} a month you stay inside the free tier —{" "}
                    <span className="font-semibold text-emerald">₹0 billed</span>. The {fmtNum(unused)} unused messages
                    don't carry into next month.
                  </>
                )}
              </div>
            </div>
          </Reveal>

          {/* ================= controls + cost ================= */}
          <Reveal delay={140} dir="right">
            <div className="relative overflow-hidden rounded-[20px] border border-mint/15 bg-ink-950/70 p-5 backdrop-blur-sm sm:p-7">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-citron/[0.08] blur-[80px]" />
              <div className="relative">
                <Label>Market of your customers</Label>
                <div className="relative mt-3">
                  <select
                    value={mid}
                    onChange={(e) => setMid(e.target.value)}
                    aria-label="Market for service messages"
                    className="w-full cursor-pointer appearance-none rounded-lg border border-mint/20 bg-ink-950/80 px-4 py-3 pr-10 text-sm font-medium text-fog transition-colors hover:border-mint/40 focus:border-emerald"
                  >
                    <optgroup label="Countries">
                      {countries.map((x) => (
                        <option key={x.id} value={x.id}>{x.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Regions & other">
                      {regions.map((x) => (
                        <option key={x.id} value={x.id}>{x.name}</option>
                      ))}
                    </optgroup>
                  </select>
                  <IcChevron className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-moss" />
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <Label>Business phone numbers</Label>
                    <p className="mt-1 text-xs text-moss/70">each gets its own 1,000</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-mint/20 bg-ink-950/80 p-1">
                    <button
                      type="button"
                      onClick={() => setNumbers((n) => Math.max(1, n - 1))}
                      aria-label="Fewer phone numbers"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-moss transition-colors hover:bg-mint/10 hover:text-mint"
                    >
                      −
                    </button>
                    <span key={numbers} className="anim-value w-8 text-center font-mono text-sm font-semibold text-fog" aria-live="polite">
                      {numbers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNumbers((n) => Math.min(25, n + 1))}
                      aria-label="More phone numbers"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-moss transition-colors hover:bg-mint/10 hover:text-mint"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <Label>Service messages / month</Label>
                    <p key={volume} className="anim-value font-mono text-lg font-semibold text-fog">{fmtNum(volume)}</p>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={pos}
                    onChange={(e) => setPos(Number(e.target.value))}
                    className="rp-range mt-4"
                    style={{ ["--fill" as string]: `${(pos / 1000) * 100}%` }}
                    aria-label="Monthly service message volume"
                  />
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {PRESETS.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPos(Math.round(posFor(v)))}
                        className={cn(
                          "rounded-full border px-3 py-1 font-mono text-[10.5px] transition-all duration-300",
                          volume === volFor(Math.round(posFor(v)))
                            ? "border-emerald/60 bg-emerald/15 text-mint"
                            : "border-mint/15 text-moss hover:-translate-y-0.5 hover:border-emerald/50 hover:text-mint",
                        )}
                      >
                        {shortNum(v)}
                      </button>
                    ))}
                  </div>
                </div>

                <dl className="mt-7 space-y-2.5 border-t border-mint/10 pt-5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-moss">Service rate · {m.name}</dt>
                    <dd className="font-mono font-medium text-fog/90">{fmtINR(m.service)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-moss">Volume tiers</dt>
                    <dd className="font-mono text-xs font-medium text-citron">none · flat rate</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-moss">Free tier ({fmtNum(FREE_SERVICE_PER_NUMBER)} × {numbers})</dt>
                    <dd className="font-mono font-medium text-emerald">−{fmtNum(monthly.free)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-moss">Billable messages</dt>
                    <dd className="font-mono font-medium text-fog/90">{fmtNum(monthly.billable)}</dd>
                  </div>
                </dl>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-mint/10 bg-ink-900/70 p-3.5">
                    <p className="font-mono text-[9.5px] tracking-[0.18em] text-moss/70">THROUGH 30 SEP</p>
                    <p className="mt-1 font-mono text-xl font-semibold text-fog/60 line-through decoration-moss/40">₹0</p>
                  </div>
                  <div className="rounded-lg border border-citron/30 bg-citron/[0.07] p-3.5">
                    <p className="font-mono text-[9.5px] tracking-[0.18em] text-citron/80">FROM 01 OCT / MO</p>
                    <p key={monthly.cost.toFixed(2)} className="anim-value mt-1 font-mono text-xl font-semibold text-citron">
                      {fmtINR(monthly.cost, monthly.cost < 1000 ? 2 : 0)}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-moss/70">
                  ≈ <span className="font-mono text-fog/90">{fmtINR(monthly.cost * 12, 0)}</span> a year · free tier worth{" "}
                  <span className="font-mono text-emerald">{fmtINR(monthly.freeValue, 2)}</span> / month. Assumes volume is
                  spread evenly across numbers.
                </p>

                <div className="mt-5 flex gap-3 rounded-lg border border-citron/30 bg-citron/[0.06] p-3.5">
                  <span className="mt-0.5 font-mono text-[10px] font-bold text-citron">!</span>
                  <p className="text-[12.5px] leading-relaxed text-moss">
                    <span className="font-semibold text-fog">Add a payment method by {PAYMENT_METHOD_DEADLINE}.</span>{" "}
                    Without one, Meta delivers the first 1,000 service messages — but not the 1,001st or anything after it.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ================= what changes table ================= */}
        <Reveal delay={80} className="mt-6">
          <div className="overflow-hidden rounded-[20px] border border-mint/15 bg-ink-900/70">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mint/10 px-5 py-4 sm:px-7">
              <p className="font-display text-base font-semibold tracking-tight text-fog">What changes on 1 October 2026</p>
              <a
                href={META_LINKS.pricing}
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-[13px] font-medium text-mint"
              >
                Meta's change table
                <IcExternal className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-mint/10">
                    <th scope="col" className="px-5 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-moss/70 sm:px-7">
                      Which messages
                    </th>
                    <th scope="col" className="px-5 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-moss/70">
                      Through 30 Sep 2026
                    </th>
                    <th scope="col" className="px-5 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-moss/70 sm:px-7">
                      As of 1 Oct 2026
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CHANGES.map((c) => (
                    <tr
                      key={c.what}
                      className={cn(
                        "row-sweep border-b border-mint/[0.06] last:border-b-0",
                        c.after !== c.before && "bg-citron/[0.03]",
                      )}
                    >
                      <td className="px-5 py-3.5 sm:px-7">
                        <p className="font-medium text-fog/90">{c.what}</p>
                        {c.note && <p className="mt-0.5 font-mono text-[10.5px] text-moss/70">{c.note}</p>}
                      </td>
                      <td className="px-5 py-3.5">
                        <Pill charged={c.before} />
                      </td>
                      <td className="px-5 py-3.5 sm:px-7">
                        <div className="flex items-center gap-2">
                          <Pill charged={c.after} />
                          {c.after !== c.before && (
                            <span className="font-mono text-[9.5px] font-semibold tracking-[0.16em] text-citron/80">NEW</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* ================= rules ================= */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal delay={60}>
            <div className="card-lift h-full rounded-[18px] border border-emerald/25 bg-emerald/[0.05] p-6 hover:border-emerald/50 sm:p-7">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald">Still free</p>
              <ul className="mt-5 space-y-3.5">
                {[
                  "Every message your customers send you",
                  "The first 1,000 service messages per business phone number, each month",
                  "Reaction messages — and they don't use up the 1,000",
                  "All messages in a 72h free entry point window (click-to-WhatsApp ads, Page CTAs) — except Meta Business Agent",
                  `Service messages for eligible governments and non-profits, through ${NONPROFIT_FREE_UNTIL}`,
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-fog/90">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald/20 text-emerald">
                      <IcCheck className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-lift h-full rounded-[18px] border border-citron/20 bg-citron/[0.04] p-6 hover:border-citron/45 sm:p-7">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-citron">Charged per delivered message</p>
              <ul className="mt-5 space-y-3.5">
                {[
                  ["Service messages after the free tier", `${fmtINR(m.service)} in ${m.name} · flat, no tiers`],
                  ["Utility templates inside an open 24h window", "newly charged · don't use the free tier"],
                  ["Marketing, utility & authentication templates", "list or volume-tier rate, as before"],
                  ["Meta Business Agent replies", "$2.00 per 1M tokens · since 1 Aug 2026"],
                ].map(([r, price]) => (
                  <li key={r} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-fog/90">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-citron/15 text-citron">
                      <IcX className="h-2.5 w-2.5" strokeWidth={2.6} />
                    </span>
                    <span>
                      {r}
                      <span className="mt-0.5 block font-mono text-[11px] text-moss">{price}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="card-lift flex h-full flex-col justify-between rounded-[18px] border border-mint/15 bg-ink-850/70 p-6 hover:border-mint/45 sm:p-7">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-mint">Unchanged</p>
                <ul className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-moss">
                  <li>
                    <span className="text-fog">The 24-hour window still decides <em>when</em></span> you can send a
                    free-form reply — it opens, and resets, with every customer message.
                  </li>
                  <li>
                    <span className="text-fog">Per number, not per account.</span> A WhatsApp Business Account with five
                    numbers gets five separate allowances of 1,000.
                  </li>
                  <li>
                    <span className="text-fog">Replies from humans or third-party AI</span> count the same — both are
                    service messages.
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-mint/10 pt-5">
                <Btn href="#calculator" className="px-5 py-2.5">
                  Model all types
                  <IcArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

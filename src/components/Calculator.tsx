import { useEffect, useState, type ReactNode } from "react";
import {
  FREE_SERVICE_PER_NUMBER,
  MARKETS,
  MSG_TYPES,
  discountPct,
  fmtINR,
  fmtNum,
  listRate,
  tierForVolume,
  tierIndex,
  tiersFor,
  toCsv,
  type MsgType,
  type TierRow,
} from "../data/rates";
import { Reveal } from "../lib/motion";
import { cn } from "../utils/cn";
import { Btn, IcChevron, IcDownload, SectionHead } from "./ui";

const shortNum = (n: number): string =>
  n >= 1_000_000_000
    ? `${(n / 1e9).toLocaleString("en-IN", { maximumFractionDigits: 1 })}B`
    : n >= 1_000_000
      ? `${(n / 1e6).toLocaleString("en-IN", { maximumFractionDigits: 1 })}M`
      : n >= 1000
        ? `${Math.round(n / 1000).toLocaleString("en-IN")}K`
        : `${n}`;

const rangeLabel = (r: TierRow) =>
  r.to === null ? `${shortNum(r.from)}+` : `${shortNum(r.from)}–${shortNum(r.to)}`;

const PRESETS = [10_000, 100_000, 1_000_000, 10_000_000, 50_000_000, 100_000_000];
const posFor = (v: number) => (Math.log10(v) - 3) / 5 * 1000;

function downloadCsv() {
  const blob = new Blob([toCsv()], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "whatsapp-business-rate-card-oct-2026.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss">{children}</p>
);

export default function Calculator() {
  const [mid, setMid] = useState("in");
  const [type, setType] = useState<MsgType>("utility");
  const [pos, setPos] = useState(895); // ≈ 30M msgs — sits in India's −6% tier

  const m = MARKETS.find((x) => x.id === mid)!;

  useEffect(() => {
    if (type === "authIntl" && m.authIntl === null) setType("authentication");
  }, [m, type]);

  const volume = Math.round(10 ** (3 + pos / 200));
  const list = listRate(m, type) ?? 0;
  const tiers = tiersFor(m, type);
  const tier = tiers ? tierForVolume(m, type, volume) : null;
  const idx = tiers ? tierIndex(m, type, volume) : -1;
  const eff = tier ? tier.rate : list;
  const isSvc = type === "service";
  const svcFree = isSvc ? Math.min(volume, FREE_SERVICE_PER_NUMBER) : 0; // one business number
  const cost = eff * (volume - svcFree);
  const savings = isSvc ? svcFree * eff : (list - eff) * volume;
  const next = tiers && idx >= 0 && idx < tiers.length - 1 ? tiers[idx + 1] : null;
  const d = tier ? discountPct(m, type, tier.rate) : 0;
  const animKey = `${m.id}|${type}|${volume}`;

  const countries = MARKETS.filter((x) => x.group === "Country");
  const regions = MARKETS.filter((x) => x.group === "Region");
  const others = MARKETS.filter((x) => x.group === "Other");
  const typeMeta = MSG_TYPES.find((t) => t.id === type)!;

  return (
    <section id="calculator" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            eyebrow="The modeler"
            title={
              <>
                Drag your volume.
                <br />
                <span className="text-mint">Watch the rate fall.</span>
              </>
            }
            sub="Pick a market, a message type, and your expected monthly volume. The calculator applies the exact tier bands from the 1 October 2026 card — no spreadsheet required."
          />
        </Reveal>

        <Reveal delay={150} dir="scale" className="mt-14">
          <div className="overflow-hidden rounded-[22px] border border-mint/15 bg-gradient-to-b from-ink-850 to-ink-900/90 shadow-[0_50px_140px_rgba(0,0,0,0.5)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {/* ---------------- controls ---------------- */}
              <div className="border-b border-mint/10 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                <Label>01 · Market</Label>
                <div className="relative mt-3">
                  <select
                    value={mid}
                    onChange={(e) => setMid(e.target.value)}
                    aria-label="Market"
                    className="w-full cursor-pointer appearance-none rounded-lg border border-mint/20 bg-ink-950/70 px-4 py-3.5 pr-10 text-sm font-medium text-fog transition-colors hover:border-mint/40 focus:border-emerald"
                  >
                    <optgroup label="Countries">
                      {countries.map((x) => (
                        <option key={x.id} value={x.id}>{x.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Regions">
                      {regions.map((x) => (
                        <option key={x.id} value={x.id}>{x.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Other">
                      {others.map((x) => (
                        <option key={x.id} value={x.id}>{x.name}</option>
                      ))}
                    </optgroup>
                  </select>
                  <IcChevron className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-moss" />
                </div>

                <div className="mt-8">
                  <Label>02 · Message type</Label>
                  <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Message type">
                    {MSG_TYPES.map((t) => {
                      const disabled = t.id === "authIntl" && m.authIntl === null;
                      const active = type === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          disabled={disabled}
                          onClick={() => setType(t.id)}
                          className={cn(
                            "rounded-lg border px-3.5 py-3 text-left transition-all duration-300",
                            t.id === "service" && "col-span-2 flex items-center justify-between gap-4",
                            active
                              ? "border-emerald/60 bg-emerald/15 shadow-[0_0_24px_rgba(43,217,140,0.15)]"
                              : "border-mint/15 bg-ink-950/50 hover:-translate-y-0.5 hover:border-mint/40",
                            disabled && "cursor-not-allowed opacity-30 hover:translate-y-0 hover:border-mint/15",
                          )}
                        >
                          <span>
                            <span className="block font-mono text-[9px] tracking-[0.2em] text-moss">{t.short}</span>
                            <span className={cn("mt-1 block font-display text-sm font-semibold", active ? "text-fog" : "text-moss")}>
                              {t.label}
                            </span>
                          </span>
                          {t.id === "service" && (
                            <span
                              className={cn(
                                "whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] transition-colors",
                                active ? "border-citron/50 text-citron" : "border-mint/20 text-moss",
                              )}
                            >
                              NEW · 1K FREE / NO. / MO
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-moss/70">
                    {type === "service"
                      ? `From 1 Oct 2026, free-form replies in the 24h window cost ${fmtINR(m.service)} in ${m.name} after the first 1,000 per business number each month.`
                      : m.authIntl === null
                        ? `Authentication International isn't priced in ${m.name} — regular Authentication applies.`
                        : `Authentication International covers international customer verification in ${m.name}.`}
                  </p>
                </div>

                <div className="mt-8">
                  <Label>03 · Monthly volume</Label>
                  <div className="mt-3 flex items-baseline justify-between gap-4">
                    <p key={volume} className="anim-value font-mono text-2xl font-semibold tracking-tight text-fog sm:text-3xl">
                      {fmtNum(volume)}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.22em] text-moss">MSGS / MONTH</p>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={pos}
                    onChange={(e) => setPos(Number(e.target.value))}
                    className="rp-range mt-5"
                    style={{ ["--fill" as string]: `${(pos / 1000) * 100}%` }}
                    aria-label="Monthly message volume"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[9px] tracking-wider text-moss/60">
                    <span>1K</span>
                    <span>10M</span>
                    <span>100M</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {PRESETS.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPos(Math.round(posFor(v)))}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-all duration-300",
                          Math.abs(pos - posFor(v)) < 30
                            ? "border-emerald/60 bg-emerald/15 text-mint"
                            : "border-mint/15 text-moss hover:-translate-y-0.5 hover:border-emerald/50 hover:text-mint",
                        )}
                      >
                        {shortNum(v)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* tier ladder */}
                {tiers ? (
                  <div className="mt-9">
                    <Label>Tier ladder · {typeMeta.label}</Label>
                    <div className="mt-3 space-y-1.5">
                      {tiers.map((r, i) => {
                        const active = i === idx;
                        const pd = i === 0 ? 0 : discountPct(m, type, r.rate);
                        return (
                          <div
                            key={i}
                            className={cn(
                              "flex items-center gap-3 rounded-lg border px-3.5 py-2 transition-all duration-300",
                              active
                                ? "border-emerald/50 bg-emerald/10 shadow-[0_0_20px_rgba(43,217,140,0.12)]"
                                : "border-mint/10 bg-ink-950/40",
                            )}
                          >
                            <span
                              className={cn(
                                "w-12 shrink-0 font-mono text-[11px] font-bold",
                                i === 0 ? "text-moss/70" : active ? "text-emerald" : "text-moss/60",
                              )}
                            >
                              {i === 0 ? "LIST" : `−${pd}%`}
                            </span>
                            <span className="flex-1 truncate font-mono text-[11px] text-moss/80">{rangeLabel(r)}</span>
                            <span className={cn("font-mono text-xs font-semibold", active ? "text-fog" : "text-moss")}>
                              {fmtINR(r.rate)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  ) : type === "service" ? (
                  <div className="mt-9 rounded-lg border border-citron/25 bg-citron/[0.06] px-4 py-3.5 text-[13px] leading-relaxed text-moss">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-citron">FLAT RATE · FREE TIER</span>
                    <p className="mt-1">
                      Service messages have <span className="text-fog">no volume tiers</span>. Each business phone number
                      gets <span className="text-fog">1,000 free per month</span> — charging starts at the 1,001st, unused
                      messages don't roll over, and the count resets on the 1st. This model assumes one number.
                    </p>
                  </div>
                ) : (
                  <div className="mt-9 rounded-lg border border-citron/25 bg-citron/[0.06] px-4 py-3.5 text-[13px] leading-relaxed text-moss">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-citron">NOTE</span>
                    <p className="mt-1">
                      Marketing is a <span className="text-fog">flat rate</span> — volume tiers apply only to utility
                      and authentication, so this rate holds from 1,000 to 100M messages.
                    </p>
                  </div>
                )}
              </div>

              {/* ---------------- results ---------------- */}
              <div className="relative bg-ink-950/55 p-6 sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald/[0.12] blur-[90px]"
                />
                <div key={animKey} className="anim-value relative">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label>Your effective rate</Label>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.16em]",
                        type === "service"
                          ? "border-citron/50 bg-citron/10 text-citron"
                          : !tiers
                            ? "border-citron/40 bg-citron/10 text-citron"
                            : idx === 0
                              ? "border-mint/25 bg-mint/5 text-moss"
                              : "border-emerald/50 bg-emerald/15 text-emerald",
                      )}
                    >
                      {type === "service"
                        ? "FLAT · AFTER 1K FREE"
                        : !tiers
                          ? "FLAT · NO TIERS"
                          : idx === 0
                            ? "LIST RATE"
                            : `TIER ${idx + 1} · −${d}% VS LIST`}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-[3.1rem] font-semibold leading-none tracking-tight text-fog sm:text-[3.8rem]">
                    {fmtINR(eff)}
                    <span className="ml-2 font-display text-xl font-medium text-moss">/ msg</span>
                  </p>
                  <p className="mt-3 text-sm text-moss">
                    <span className="font-semibold text-fog">{m.name}</span> · {typeMeta.label.toLowerCase()} ·
                    effective 01 Oct 2026
                    {isSvc && " · from the 1,001st message"}
                  </p>

                  <dl className="mt-8 space-y-3 border-t border-mint/10 pt-6 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-moss">List rate</dt>
                      <dd className="font-mono font-medium text-fog/90">{fmtINR(list)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-moss">Tier discount</dt>
                      <dd className="font-mono font-medium">
                        {isSvc ? (
                          <span className="text-citron">n/a — no tiers</span>
                        ) : !tiers ? (
                          <span className="text-citron">n/a — flat</span>
                        ) : d > 0 ? (
                          <span className="text-emerald">−{d}%</span>
                        ) : (
                          <span className="text-moss/70">0% (list band)</span>
                        )}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-moss">Monthly volume</dt>
                      <dd className="font-mono font-medium text-fog/90">{fmtNum(volume)}</dd>
                    </div>
                    {isSvc && (
                      <div className="flex items-center justify-between">
                        <dt className="text-moss">Free tier (1 number)</dt>
                        <dd className="font-mono font-medium text-emerald">−{fmtNum(svcFree)} msgs</dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <dt className="font-display text-base font-semibold text-fog">Projected monthly cost</dt>
                      <dd className="font-mono text-2xl font-semibold tracking-tight text-mint">
                        {fmtINR(cost, cost < 1000 ? 2 : 0)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-moss">{isSvc ? "Saved by the free tier" : "Savings vs list rate"}</dt>
                      <dd className="font-mono font-medium">
                        {savings > 0 ? (
                          <span className="text-emerald">−{fmtINR(savings, savings < 1000 ? 2 : 0)} / mo</span>
                        ) : (
                          <span className="text-moss/60">—</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div
                  className={cn(
                    "mt-7 rounded-lg border px-4 py-3 text-[13px] leading-relaxed",
                    next ? "border-mint/15 bg-ink-900/70 text-moss" : "border-emerald/30 bg-emerald/[0.08] text-moss",
                  )}
                >
                  {isSvc && (
                    <span>
                      {volume <= FREE_SERVICE_PER_NUMBER ? (
                        <>
                          <span className="font-semibold text-emerald">Inside the free tier.</span>{" "}
                          {fmtNum(FREE_SERVICE_PER_NUMBER - volume)} free messages left this month — unused ones expire on
                          the 1st.
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-citron">{fmtNum(volume - FREE_SERVICE_PER_NUMBER)} billable replies.</span>{" "}
                          Running several business numbers? Each one gets its own 1,000.
                        </>
                      )}{" "}
                      <a href="#service" className="link-underline font-semibold text-mint">
                        Model the allowance →
                      </a>
                    </span>
                  )}
                  {!tiers && type !== "service" && (
                    <span>
                      Volume doesn't move the marketing rate. If you're sending utility or auth traffic too, switch
                      types to see where your tier savings are.
                    </span>
                  )}
                  {tiers && next && (
                    <span>
                      You're <span className="font-mono font-semibold text-fog">{fmtNum(next.from - volume)}</span>{" "}
                      messages away from{" "}
                      <span className="font-mono font-semibold text-emerald">
                        −{discountPct(m, type, next.rate)}%
                      </span>{" "}
                      ({fmtINR(next.rate)}/msg).
                    </span>
                  )}
                  {tiers && !next && (
                    <span className="text-emerald">
                      You're on the deepest tier on the {m.name} card — nothing left to unlock here.
                    </span>
                  )}
                </div>

                {/* all-types comparison */}
                <div className="mt-7 rounded-lg border border-mint/10 bg-ink-950/60 p-4">
                  <p className="font-mono text-[9px] tracking-[0.22em] text-moss">
                    {m.name.toUpperCase()} · LIST RATES · ALL TYPES
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {MSG_TYPES.map((t) => {
                      const r = listRate(m, t.id);
                      return (
                        <div key={t.id} className="flex items-center justify-between gap-2">
                          <span className={cn("text-xs", type === t.id ? "font-semibold text-fog" : "text-moss")}>
                            {t.label}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-xs font-semibold",
                              type === t.id ? "text-mint" : "text-moss/70",
                            )}
                          >
                            {r === null ? "—" : fmtINR(r)}
                            {t.id === "service" && <sup className="ml-0.5 text-[8px] text-citron">1K free</sup>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Btn href="#cta" className="flex-1 whitespace-nowrap">
                    Email me this model
                  </Btn>
                  <Btn variant="ghost" onClick={downloadCsv}>
                    <IcDownload className="h-4 w-4" />
                    CSV
                  </Btn>
                </div>
                <p className="mt-5 text-[11px] leading-relaxed text-moss/60">
                  Estimates from Meta's official 01-Oct-2026 INR rate card. Tiers apply per market, per message
                  type, per calendar month. Service messages are charged after 1,000 free per business number per month;
                  utility templates inside an open 24h window are charged too.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { MARKETS, META_LINKS, discountPct, fmtINR, topTier, toCsv, type Market } from "../data/rates";
import { Reveal } from "../lib/motion";
import { cn } from "../utils/cn";
import { Btn, IcChevron, IcDownload, IcExternal, IcSearch, SectionHead } from "./ui";

type SortKey = "name" | "utility" | "marketing" | "authentication";

const shortNum = (n: number): string =>
  n >= 1_000_000
    ? `${(n / 1e6).toLocaleString("en-IN", { maximumFractionDigits: 1 })}M`
    : n >= 1000
      ? `${Math.round(n / 1000).toLocaleString("en-IN")}K`
      : `${n}`;

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

function RateCell({ v, sub }: { v: number | null; sub?: string }) {
  return (
    <div className="text-right">
      {v === null ? (
        <span className="font-mono text-sm text-pine-ink/30">—</span>
      ) : (
        <span className="font-mono text-[13px] font-semibold text-pine-ink">{fmtINR(v)}</span>
      )}
      {sub && <p className="mt-0.5 font-mono text-[10px] text-pine-ink/45">{sub}</p>}
    </div>
  );
}

function Row({ m }: { m: Market }) {
  const top = topTier(m, "utility")!;
  const pct = discountPct(m, "utility", top.rate);
  return (
    <tr
      className={cn(
        "row-sweep border-b border-pine-ink/[0.07]",
        m.id === "in" ? "bg-emerald/[0.12]" : "transition-colors hover:bg-emerald/[0.06]",
      )}
    >
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          {m.id === "in" && (
            <span className="rounded-sm bg-emerald px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">IN</span>
          )}
          <span className="whitespace-nowrap font-semibold text-pine-ink">{m.name}</span>
          {m.group !== "Country" && (
            <span className="whitespace-nowrap rounded-full border border-pine-ink/15 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-pine-ink/50">
              {m.group}
            </span>
          )}
        </div>
      </td>
      <td className="px-5 py-3.5">
        <RateCell v={m.marketing} />
      </td>
      <td className="px-5 py-3.5">
        <RateCell v={m.utility} sub={`→ ${fmtINR(top.rate)} @ ${shortNum(top.from)}+`} />
      </td>
      <td className="px-5 py-3.5">
        <RateCell v={m.authentication} />
      </td>
      <td className="px-5 py-3.5">
        <RateCell v={m.authIntl} />
      </td>
      <td className="whitespace-nowrap px-5 py-3.5 text-right">
        <span className="inline-flex rounded-full bg-jade/10 px-2.5 py-1 font-mono text-[10.5px] font-semibold text-jade">
          −{pct}%
        </span>
        <p className="mt-1 font-mono text-[9.5px] text-pine-ink/45">@ {shortNum(top.from)}+ / mo</p>
      </td>
    </tr>
  );
}

export default function RateTable() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("name");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = MARKETS.filter((m) => !term || m.name.toLowerCase().includes(term));
    return [...list].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a[sort] - b[sort],
    );
  }, [q, sort]);

  return (
    <section id="rate-card" className="relative scroll-mt-24 overflow-hidden bg-paper py-24 text-pine-ink sm:py-28">
      <div aria-hidden className="grid-bg-paper absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHead
              light
              eyebrow="The rate card"
              title={
                <>
                  Every market. Every message type.
                  <br />
                  <span className="text-jade">One table.</span>
                </>
              }
              sub="List rates in INR, effective 1 October 2026 — with each market's deepest utility tier shown underneath. Search, sort, and take it away as CSV."
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <IcSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-ink/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search 47 markets…"
                aria-label="Search markets"
                className="w-56 rounded-full border border-pine-ink/15 bg-white/80 py-3 pl-11 pr-4 text-sm text-pine-ink placeholder:text-pine-ink/40 transition-all focus:border-jade focus:shadow-[0_0_0_4px_rgba(15,107,79,0.12)] focus:outline-none"
              />
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort markets"
                className="cursor-pointer appearance-none rounded-full border border-pine-ink/15 bg-white/80 py-3 pl-4 pr-10 text-sm font-medium text-pine-ink transition-colors focus:border-jade focus:outline-none"
              >
                <option value="name">Market A–Z</option>
                <option value="utility">Utility low → high</option>
                <option value="marketing">Marketing low → high</option>
                <option value="authentication">Auth low → high</option>
              </select>
              <IcChevron className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-ink/50" />
            </div>
            <Btn variant="dark" onClick={downloadCsv} className="px-5">
              <IcDownload className="h-4 w-4" />
              CSV
            </Btn>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-pine-ink/50" aria-live="polite">
            SHOWING {rows.length} OF {MARKETS.length} MARKETS · INR · 01 OCT 2026
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-pine-ink/15 bg-white/70 shadow-[0_30px_80px_rgba(14,33,26,0.12)] backdrop-blur">
            <div className="max-h-[560px] overflow-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b border-pine-ink/15 bg-paper-2/95 backdrop-blur">
                    {["Market", "Marketing", "Utility", "Authentication", "Auth · Intl", "Service", "Deepest UTL tier"].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={cn(
                          "whitespace-nowrap px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-pine-ink/60",
                          i > 0 && "text-right",
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((m) => (
                    <Row key={m.id} m={m} />
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-pine-ink/50">
                        No market matches “{q}” — try “India”, “Europe”, or “Other”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-7 flex flex-wrap items-start justify-between gap-6 text-[13px] leading-relaxed text-pine-ink/60">
            <p className="max-w-xl">
              Volume tiers apply to <span className="font-semibold text-pine-ink">utility & authentication</span> only,
              per market, per month. <span className="font-semibold text-pine-ink">Service</span> is a flat rate charged
              from 1 Oct 2026 after 1,000 free messages per business phone number each month (no roll-over). Some markets map to a “Rest of” region or “Other” by country calling code;
              authentication-international rates exist in a subset of markets.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                ["Pricing overview", META_LINKS.pricing],
                ["Volume tiers", META_LINKS.volumeTiers],
                ["Country codes", META_LINKS.countryCodes],
                ["Auth intl rates", META_LINKS.authIntl],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 font-medium text-jade"
                >
                  {label}
                  <IcExternal className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

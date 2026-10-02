import { MARKETS, discountPct, fmtINR, topTier } from "../data/rates";

const IDS = ["in", "br", "de", "gb", "ae", "sg", "id", "mx", "eg", "fr", "na", "sa", "tr", "nl", "za", "co"];
const items = IDS.map((id) => MARKETS.find((m) => m.id === id)!).filter(Boolean);

function Item({ m }: { m: (typeof MARKETS)[number] }) {
  const top = topTier(m, "utility")!;
  const pct = discountPct(m, "utility", top.rate);
  return (
    <span className="flex shrink-0 items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-moss">
      <span className="font-semibold uppercase text-fog/90">{m.name}</span>
      <span>
        UTL <span className="text-mint">{fmtINR(m.utility)}</span>
        <span className="mx-1.5 text-moss/50">→</span>
        {fmtINR(top.rate)}
      </span>
      <span className="rounded-sm bg-emerald/15 px-1.5 py-0.5 font-semibold text-emerald">−{pct}%</span>
      <span className="ml-4 text-emerald/40" aria-hidden>
        ✦
      </span>
    </span>
  );
}

export default function Ticker() {
  const strip = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((m) => (
        <Item key={`${m.id}${hidden ? "-b" : ""}`} m={m} />
      ))}
    </div>
  );

  return (
    <div className="marquee-hover relative mt-16 overflow-hidden border-y border-mint/10 bg-ink-900/80 py-3.5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent"
      />
      <div className="anim-marquee flex w-max" style={{ ["--speed" as string]: "48s" }}>
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { CountUp, Reveal } from "../lib/motion";
import { SectionHead, IcBolt, IcGlobe, IcLadder, IcTag } from "./ui";

const ITEMS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <IcBolt className="h-5 w-5" />,
    title: "Predictable unit economics",
    body: "List rates are fixed per market and type for the period. Quote a campaign to four decimals before a single template is approved — no carrier surcharges, no per-seat drift.",
  },
  {
    icon: <IcLadder className="h-5 w-5" />,
    title: "Discounts that reward volume",
    body: "Utility and authentication step down automatically as monthly volume climbs per market — −5% to −25% in most places, −30% in India. Growth pays for itself, line by line.",
  },
  {
    icon: <IcTag className="h-5 w-5" />,
    title: "No subscription tax",
    body: "You pay per message delivered, not per seat or per month. Every business number starts each month with 1,000 free service messages — and inbound messages, reactions and 72h free-entry-point chats never cost a rupee.",
  },
  {
    icon: <IcGlobe className="h-5 w-5" />,
    title: "One API, 47 markets",
    body: "The same integration ships from your first OTP to your 100-millionth order update. Market pricing resolves automatically from the recipient's number.",
  },
];

const BARS = [
  { label: "WhatsApp", value: 98, bar: "bg-gradient-to-r from-jade via-emerald to-mint", tone: "text-mint" },
  { label: "SMS", value: 45, bar: "bg-pine", tone: "text-fog/70" },
  { label: "Email", value: 20, bar: "bg-moss/30", tone: "text-moss" },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <SectionHead
              eyebrow="Why it matters"
              title={
                <>
                  Pricing you can
                  <br />
                  <span className="text-mint">plan against.</span>
                </>
              }
              sub="The October 2026 card rewards the teams who understand it. Here's what 'per-message, per-market, tiered' actually gets you."
            />
          </Reveal>
          <div className="mt-10 space-y-3">
            {ITEMS.map((it, i) => (
              <Reveal key={it.title} delay={i * 100}>
                <div className="card-lift group flex gap-5 rounded-xl border border-mint/10 bg-ink-850/60 p-6 hover:border-emerald/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald/20 bg-emerald/10 text-mint transition-transform duration-300 group-hover:scale-110">
                    {it.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-fog">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-moss">{it.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150} dir="right" className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[20px] border border-mint/15 bg-gradient-to-b from-ink-850 to-ink-900 p-7 shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald/[0.14] blur-[80px]"
            />
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss">
              Open rates · industry benchmark
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fog">
              Where your message actually gets read
            </h3>

            <div className="mt-8 space-y-6">
              {BARS.map((b) => (
                <div key={b.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-sm font-semibold text-fog">{b.label}</span>
                    <span className={`font-mono text-sm font-semibold ${b.tone}`}>
                      <CountUp to={b.value} suffix="%" />
                    </span>
                  </div>
                  <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-ink-700/60">
                    <div className={`bar-fill h-full rounded-full ${b.bar}`} style={{ ["--w" as string]: `${b.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-mint/10 bg-ink-950/60 p-4">
                <p className="font-mono text-2xl font-semibold text-mint">
                  <CountUp to={6} />s
                </p>
                <p className="mt-1 text-xs leading-snug text-moss">median first response on WhatsApp</p>
              </div>
              <div className="rounded-lg border border-mint/10 bg-ink-950/60 p-4">
                <p className="font-mono text-2xl font-semibold text-mint">
                  <CountUp to={1000} />
                </p>
                <p className="mt-1 text-xs leading-snug text-moss">free service messages per number, every month</p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-moss/60">
              Benchmarks are industry-typical and shown for context; your mix of marketing, utility and
              service traffic decides the real number.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

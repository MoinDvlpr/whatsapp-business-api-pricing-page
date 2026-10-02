import type { ReactNode } from "react";
import { MARKETS, META_LINKS, SERVICE_PRICE, fmtINR } from "../data/rates";
import { Reveal } from "../lib/motion";
import { cn } from "../utils/cn";
import { SectionHead, IcBot, IcClock, IcExternal, IcGlobe, IcLadder, IcShield, IcTag } from "./ui";

const india = MARKETS.find((m) => m.id === "in")!;

const TYPES = [
  {
    name: "Marketing",
    dot: "bg-citron",
    text: "Campaigns, promos, win-backs. Sent with an approved marketing template.",
    rate: fmtINR(india.marketing),
  },
  {
    name: "Utility",
    dot: "bg-mint",
    text: "Order, shipment, billing, booking updates — the workhorse of commerce.",
    rate: fmtINR(india.utility),
  },
  {
    name: "Authentication",
    dot: "bg-emerald",
    text: "OTP codes and one-time tokens issued at the customer's request.",
    rate: fmtINR(india.authentication),
  },
  {
    name: "Service",
    dot: "bg-fog",
    text: "Free-form replies in the 24h window. 1,000 free per number each month, then charged.",
    rate: fmtINR(india.service),
  },
];

function Card({
  className,
  delay,
  icon,
  title,
  children,
}: {
  className?: string;
  delay?: number;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="card-lift group h-full rounded-xl border border-mint/10 bg-ink-850/70 p-6 hover:border-emerald/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald/20 bg-emerald/10 text-mint transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald/20">
          {icon}
        </span>
        <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fog">{title}</h3>
        <div className="mt-3 text-sm leading-relaxed text-moss">{children}</div>
      </div>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="messages" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            eyebrow="Message types"
            title={
              <>
                Four message types.
                <br />
                <span className="text-mint">Every one now has a price tag.</span>
              </>
            }
            sub="The single biggest driver of your bill isn't volume — it's classification. From 1 October 2026 even service replies are metered, so knowing which bucket each message falls into is how the new rates work for you instead of against you."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {/* four types */}
          <Reveal className="md:col-span-4">
            <div className="card-lift h-full rounded-xl border border-mint/10 bg-gradient-to-b from-ink-850 to-ink-900 p-6 hover:border-emerald/40 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold tracking-tight text-fog sm:text-xl">
                  The four message types
                </h3>
                <span className="rounded-full border border-mint/15 px-3 py-1 font-mono text-[10px] tracking-widest text-moss">
                  INDIA · LIST
                </span>
              </div>
              <ul className="mt-6 divide-y divide-mint/[0.07]">
                {TYPES.map((t) => (
                  <li
                    key={t.name}
                    className="group grid grid-cols-[14px_1fr_auto] items-center gap-4 py-4 transition-all duration-300 hover:pl-2 sm:grid-cols-[14px_1fr_260px_auto]"
                  >
                    <span className={cn("h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-150", t.dot)} />
                    <div>
                      <p className="font-display text-[15px] font-semibold text-fog">{t.name}</p>
                      <p className="mt-0.5 hidden text-[13px] leading-relaxed text-moss sm:block">{t.text}</p>
                    </div>
                    <p className="hidden text-right text-[13px] leading-relaxed text-moss/70 sm:block">{t.text}</p>
                    <p className="font-mono text-sm font-semibold text-mint">
                      {t.rate}
                      {t.name === "Service" && <sup className="ml-0.5 text-[8px] text-citron">1K free</sup>}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-moss/70">
                Service messages are charged from the 1,001st per business number each month —{" "}
                <a href="#service" className="link-underline font-semibold text-mint">
                  see the allowance
                </a>
                . Authentication-international is a separate column in{" "}
                {MARKETS.filter((m) => m.authIntl !== null).length} markets.
              </p>
            </div>
          </Reveal>

          <Card delay={120} className="md:col-span-2" icon={<IcClock className="h-5 w-5" />} title="Service gets a meter">
            From 1 Oct 2026, replies in the 24h window are charged per message at the market's
            service rate — after 1,000 free per business number, resetting every month. Utility
            templates sent inside the window are charged too.{" "}
            <a href="#service" className="link-underline font-semibold text-mint">
              Model your allowance →
            </a>
          </Card>

          <Card delay={60} className="md:col-span-2" icon={<IcLadder className="h-5 w-5" />} title="Tiers: UTL & AUTH only">
            Marketing and service stay flat. Volume tiers apply to utility and authentication —
            stepping from list down to −25%, or −30% on the India card.
          </Card>

          <Card delay={140} className="md:col-span-2" icon={<IcGlobe className="h-5 w-5" />} title="“Rest of” fallbacks">
            Unmapped countries resolve to regional rates — Rest of Middle East, Rest of Western
            Europe, and an "Other" catch-all — by country calling code.
          </Card>

          <Card delay={200} className="md:col-span-2" icon={<IcTag className="h-5 w-5" />} title="One marketing rate">
            The same marketing rate applies across the Cloud API and the Marketing Messages Lite
            API — no second column to track, effective 1 October 2026.
          </Card>

          <Card delay={260} className="md:col-span-3" icon={<IcBot className="h-5 w-5" />} title="Meta Business Agent">
            Agent messages bill per token, not per message: {SERVICE_PRICE} — uniform across all
            47 markets on the card.
          </Card>

          <Card delay={320} className="md:col-span-3" icon={<IcShield className="h-5 w-5" />} title="Rates you can quote">
            List rates are fixed per market and type for the period. Model a campaign's cost to
            four decimals before a single template is approved.
          </Card>

          <Reveal delay={380} className="md:col-span-6">
            <a
              href={META_LINKS.pricing}
              target="_blank"
              rel="noreferrer"
              className="card-lift group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-mint/10 bg-ink-900/70 px-6 py-5 hover:border-emerald/40"
            >
              <p className="text-sm text-moss">
                <span className="font-semibold text-fog">Source of truth:</span> every figure on this
                page is drawn from Meta's published WhatsApp Business Platform pricing.
              </p>
              <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-mint">
                Read Meta's pricing docs
                <IcExternal className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

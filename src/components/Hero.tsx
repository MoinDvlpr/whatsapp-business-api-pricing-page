import type { ReactNode } from "react";
import { MARKETS, META_LINKS, fmtINR } from "../data/rates";
import { CountUp, Reveal } from "../lib/motion";
import { cn } from "../utils/cn";
import { Btn, IcArrow, IcExternal } from "./ui";

const india = MARKETS.find((m) => m.id === "in")!;

function FloatChip({
  className,
  delay,
  title,
  sub,
}: {
  className?: string;
  delay: number;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={cn(
        "anim-floaty absolute z-10 rounded-lg border border-mint/20 bg-ink-850/90 px-3.5 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-md",
        className,
      )}
      style={{ animationDelay: `${delay}ms`, ["--tilt" as string]: "0deg" }}
    >
      <p className="font-mono text-[10px] font-semibold tracking-widest text-mint">{title}</p>
      <p className="mt-0.5 font-mono text-[9px] tracking-wide text-moss">{sub}</p>
    </div>
  );
}

function Bubble({
  side,
  children,
  tag,
  tagClass,
  delay,
  ticks = false,
}: {
  side: "in" | "out";
  children: ReactNode;
  tag: string;
  tagClass: string;
  delay: number;
  ticks?: boolean;
}) {
  return (
    <div
      className={cn("anim-pop max-w-[86%]", side === "out" && "ml-auto")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "px-3 py-2 text-[11px] leading-relaxed text-fog/95 shadow-sm",
          side === "out"
            ? "rounded-lg rounded-tr-[4px] border border-emerald/25 bg-jade/40"
            : "rounded-lg rounded-tl-[4px] bg-ink-700/95",
        )}
      >
        {children}
      </div>
      <div className={cn("mt-1 flex items-center gap-1.5", side === "out" && "justify-end")}>
        <span className={cn("font-mono text-[8.5px] font-medium tracking-[0.14em]", tagClass)}>{tag}</span>
        {ticks && (
          <svg viewBox="0 0 20 12" className="h-3 w-5 text-emerald" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="tick-path" style={{ animationDelay: `${delay + 500}ms` }} d="M1.5 6.2 4.6 9.3 10.2 3.4" />
            <path className="tick-path" style={{ animationDelay: `${delay + 750}ms` }} d="M8.6 6.9 10.9 9.3 16.5 3.4" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36" id="top">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---------- copy ---------- */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald/30 bg-emerald/[0.08] py-1.5 pl-2 pr-4 text-[13px] font-medium text-mint">
              <span className="anim-pulse-dot ml-1 h-2 w-2 rounded-full bg-emerald" />
              New rate card
              <span className="text-moss">·</span>
              <span className="font-mono text-xs tracking-widest">EFFECTIVE 01 OCT 2026</span>
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-fog sm:text-6xl lg:text-[4.3rem]">
              The WhatsApp Business Platform rate card,{" "}
              <span className="text-shimmer">decoded</span> for October 2026.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-moss">
              Meta reprices the WhatsApp Business Platform on 1 October — and{" "}
              <span className="font-semibold text-fog">service replies start billing</span> after 1,000 free per
              number each month. 47 markets, volume tiers worth up to{" "}
              <span className="font-semibold text-fog">30% off</span>, and the price of every message before it's charged.
            </p>
          </Reveal>

          <Reveal delay={360} className="mt-9 flex flex-wrap items-center gap-4">
            <Btn href="#calculator">
              Open the rate calculator
              <IcArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Btn>
            <Btn href="#rate-card" variant="ghost">
              Browse all 47 markets
            </Btn>
          </Reveal>

          {/* India at a glance */}
          <Reveal delay={480} className="mt-10">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss/80">
              India at a glance · list rates · INR
            </p>
            <div className="mt-3 grid max-w-xl grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { l: "MARKETING", v: fmtINR(india.marketing, 4), tone: "text-citron" },
                { l: "UTILITY", v: fmtINR(india.utility, 4), tone: "text-mint" },
                { l: "AUTH", v: fmtINR(india.authentication, 4), tone: "text-emerald" },
                { l: "SERVICE*", v: fmtINR(india.service, 4), tone: "text-fog" },
              ].map((c) => (
                <div
                  key={c.l}
                  className="group rounded-lg border border-mint/10 bg-ink-850/80 px-3.5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:bg-ink-800"
                >
                  <p className="font-mono text-[9px] font-medium tracking-[0.2em] text-moss/80">{c.l}</p>
                  <p className={cn("mt-1 font-mono text-sm font-semibold", c.tone)}>{c.v}</p>
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-xs text-moss/70">
              * Service messages: first 1,000 per business number each month are free, then charged.{" "}
              <a href="#service" className="link-underline text-mint">What changed →</a>
            </p>
            <a
              href={META_LINKS.pricing}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-moss transition-colors hover:text-mint"
            >
              Built from Meta's official rate card
              <IcExternal className="h-3.5 w-3.5" />
              <span className="underline decoration-mint/30 underline-offset-4">developers.facebook.com</span>
            </a>
          </Reveal>
        </div>

        {/* ---------- phone mock ---------- */}
        <Reveal delay={300} dir="right" className="relative mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden
            className="anim-breathe absolute -inset-16 rounded-full bg-emerald/[0.13] blur-[110px]"
            style={{ ["--o" as string]: "0.5" }}
          />
          <FloatChip delay={200} title="VOL TIER −30%" sub="INDIA · UTL · 300M+" className="-right-3 top-14 sm:-right-8" />
          <FloatChip delay={900} title="47 MARKETS" sub="ONE CURRENCY · INR" className="-left-2 top-1/2 hidden sm:-left-10 md:block" />
          <FloatChip delay={1500} title="01 · 10 · 2026" sub="RATES GO LIVE" className="-bottom-5 -right-2 sm:-right-6" />

          <div className="relative rounded-[2.4rem] border border-mint/15 bg-ink-850 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="overflow-hidden rounded-[1.9rem] bg-ink-900">
              {/* chat header */}
              <div className="flex items-center gap-3 border-b border-mint/10 bg-ink-850/90 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-jade font-display text-sm font-bold text-ink-950">
                  N
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-fog">Nimbus Store</p>
                  <p className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-wide text-emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> online
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-mint/15 bg-ink-950/60 px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-moss">
                  WABA · INR
                </span>
              </div>

              {/* chat body */}
              <div className="relative flex flex-col gap-3 px-3.5 py-4">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(123,241,191,0.06) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                <div className="relative flex flex-col gap-3">
                  <Bubble side="out" tag="UTILITY · ₹0.1150" tagClass="text-mint" delay={400}>
                    Order <b>#4821</b> shipped via Nimbus Express. ETA tomorrow, 6–9 pm.
                  </Bubble>
                  <Bubble side="in" tag="INBOUND · FREE" tagClass="text-fog/70" delay={1100}>
                    Great — any discount on the new line?
                  </Bubble>
                  <Bubble side="out" tag="SERVICE · 1K FREE, THEN ₹0.1150" tagClass="text-fog/80" delay={1450}>
                    Yes! The new line is in tonight's flash sale.
                  </Bubble>
                  <Bubble side="out" tag="MARKETING · ₹0.8631" tagClass="text-citron" delay={1800}>
                    Flash sale: <b>40% off</b> the new line till midnight. Code <b>NIMBUS40</b>.
                  </Bubble>
                  <Bubble side="out" tag="AUTH · ₹0.1150" tagClass="text-emerald" delay={2500} ticks>
                    Your verification code is <b>482196</b>.
                  </Bubble>
                  <div className="anim-pop flex justify-start" style={{ animationDelay: "3200ms" }}>
                    <div className="flex items-center gap-1 rounded-lg rounded-tl-[4px] bg-ink-700/95 px-3 py-2.5">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-moss" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-moss" style={{ animationDelay: "150ms" }} />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-moss" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* input bar */}
              <div className="flex items-center gap-2 border-t border-mint/10 px-3 py-3">
                <div className="flex-1 rounded-full bg-ink-800 px-4 py-2 text-[11px] text-moss/70">
                  Message<span className="anim-caret text-mint">|</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald text-ink-950">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M3.4 20.6 21.8 12 3.4 3.4l2.4 7.2 9.6 1.4-9.6 1.4-2.4 7.2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- stat strip ---------- */}
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <Reveal delay={150}>
          <dl className="grid grid-cols-2 divide-mint/10 border-y border-mint/10 py-7 max-md:gap-y-6 md:grid-cols-4 md:divide-x">
            <div className="px-2 md:px-8 md:first:pl-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-moss/80">Markets & regions priced</dt>
              <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-fog">
                <CountUp to={47} />
              </dd>
            </div>
            <div className="px-2 md:px-8">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-moss/80">Max tier discount · India</dt>
              <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-mint">
                <CountUp to={30} suffix="%" />
              </dd>
            </div>
            <div className="px-2 md:px-8">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-moss/80">Free service msgs / number / mo</dt>
              <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-fog">
                <CountUp to={1000} />
              </dd>
            </div>
            <div className="px-2 md:px-8">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-moss/80">India utility · from list</dt>
              <dd className="mt-2 font-mono text-3xl font-semibold tracking-tight text-emerald sm:text-4xl">
                ₹0.1150
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

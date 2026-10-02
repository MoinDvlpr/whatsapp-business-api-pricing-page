import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Reveal } from "../lib/motion";
import { Eyebrow, IcClock, IcGlobe, IcInvoice, IcLadder } from "./ui";

const STEPS: {
  n: string;
  title: string;
  body: string;
  icon: ReactNode;
  chip: ReactNode;
}[] = [
  {
    n: "01",
    title: "Classify the conversation",
    icon: <IcLadder className="h-5 w-5" />,
    body:
      "Every outbound message falls into one bucket, and each bucket carries its own rate. For templates, the category you send — not the words inside it — decides the price tag. Free-form replies in the 24h window are service messages, charged from 1 Oct 2026 after 1,000 free per number each month.*",
    chip: (
      <div className="flex flex-wrap gap-2">
        {[
          ["Marketing", "₹0.8631"],
          ["Utility", "₹0.1150"],
          ["Auth", "₹0.1150"],
          ["Service", "₹0.1150*"],
        ].map(([l, v]) => (
          <span key={l} className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
            {l} <span className="text-mint">{v}</span>
          </span>
        ))}
      </div>
    ),
  },
  {
    n: "02",
    title: "Resolve the market",
    icon: <IcGlobe className="h-5 w-5" />,
    body:
      "Pricing follows the recipient's number, not your server. The platform maps each phone number to one of 47 priced markets by country calling code — with “Rest of” regional fallbacks when a country isn't listed.",
    chip: (
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
          +91 → <span className="text-mint">India</span>
        </span>
        <span className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
          +1 US/CA → <span className="text-mint">North America</span>
        </span>
        <span className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
          unmapped → <span className="text-mint">Rest of…</span>
        </span>
      </div>
    ),
  },
  {
    n: "03",
    title: "Apply the volume tier",
    icon: <IcClock className="h-5 w-5" />,
    body:
      "Utility and authentication rates step down as your monthly volume per market climbs — from list rate at 0 messages to −25% in most markets, and −30% in India. Marketing and service stay flat, always.",
    chip: (
      <div className="flex items-end gap-1.5" aria-hidden>
        {[0, 5, 10, 15, 20, 30].map((p, i) => (
          <div key={p} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={cn("w-full rounded-sm", i === 5 ? "bg-emerald" : "bg-pine")}
              style={{ height: `${14 + i * 9}px` }}
            />
            <span className="font-mono text-[9px] text-moss">{i === 0 ? "0%" : `−${p}%`}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "04",
    title: "Bill, per message, in INR",
    icon: <IcInvoice className="h-5 w-5" />,
    body:
      "You're invoiced monthly on usage — message by message, market by market. Each business number's first 1,000 service messages are free; the counter resets on the 1st with no roll-over. Meta Business Agent tokens are a flat $2.00 per million, everywhere.",
    chip: (
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
          Billed <span className="text-mint">monthly</span>
        </span>
        <span className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
          Agent tokens <span className="text-mint">$2.00 / 1M</span>
        </span>
        <span className="rounded-md border border-mint/15 bg-ink-950/60 px-2.5 py-1.5 font-mono text-[10.5px] text-moss">
          Service <span className="text-mint">1K free / no. / mo</span>
        </span>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i ?? 0));
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* sticky rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>The mechanics</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-fog sm:text-4xl lg:text-[2.75rem]">
              How a WhatsApp invoice is actually built.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-moss">
              Four decisions turn a single message into a rupee amount on your bill. Walk through
              them once and the entire October 2026 rate card stops being a spreadsheet.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-10 hidden lg:block">
            <ol className="space-y-1 border-l border-mint/10 pl-0">
              {STEPS.map((s, i) => (
                <li key={s.n}>
                  <button
                    onClick={() =>
                      refs.current[i]?.scrollIntoView({ block: "center", behavior: "smooth" })
                    }
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-r-lg py-3 pl-5 pr-3 text-left transition-all duration-300",
                      active === i ? "bg-mint/[0.05]" : "hover:bg-mint/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "h-8 w-px transition-all duration-500",
                        active === i ? "bg-emerald" : "bg-mint/10 group-hover:bg-mint/30",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors duration-300",
                        active === i ? "text-emerald" : "text-moss/60",
                      )}
                    >
                      {s.n}
                    </span>
                    <span
                      className={cn(
                        "font-display text-sm font-medium transition-colors duration-300",
                        active === i ? "text-fog" : "text-moss group-hover:text-fog/80",
                      )}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* steps */}
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <article
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className={cn(
                  "card-lift relative overflow-hidden rounded-xl border p-7 sm:p-9",
                  active === i
                    ? "border-emerald/35 bg-ink-850 shadow-[0_0_60px_rgba(43,217,140,0.08)]"
                    : "border-mint/10 bg-ink-850/60",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[7rem] font-bold leading-none text-mint/[0.05]"
                >
                  {s.n}
                </span>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-500",
                      active === i
                        ? "border-emerald/50 bg-emerald/15 text-mint"
                        : "border-mint/15 bg-ink-950/60 text-moss",
                    )}
                  >
                    {s.icon}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-fog sm:text-2xl">
                    <span className="mr-3 font-mono text-sm font-medium text-emerald">{s.n}</span>
                    {s.title}
                  </h3>
                </div>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-moss">{s.body}</p>
                <div className="mt-6">{s.chip}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

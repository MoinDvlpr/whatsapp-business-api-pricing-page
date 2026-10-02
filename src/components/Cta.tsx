import { useState, type FormEvent } from "react";
import { Reveal, useCountdown } from "../lib/motion";
import { Btn, IcCheck } from "./ui";

const TARGET = new Date("2026-10-01T00:00:00+05:30");

const KIT = [
  "Full 47-market rate card (CSV, list + top tiers)",
  "Volume & tier model — pre-filled with your market",
  "30-minute migration walkthrough with a pricing engineer",
];

export default function Cta() {
  const cd = useCountdown(TARGET);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  const cells: [string, number][] = [
    ["Days", cd.days],
    ["Hrs", cd.hours],
    ["Min", cd.minutes],
    ["Sec", cd.seconds],
  ];

  return (
    <section id="cta" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal dir="scale">
          <div className="relative overflow-hidden rounded-[24px] border border-emerald/25 bg-gradient-to-br from-jade/40 via-ink-850 to-ink-950 px-6 py-14 shadow-[0_60px_160px_rgba(0,0,0,0.55)] sm:px-12 lg:px-16">
            <div aria-hidden className="anim-breathe absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald/[0.2] blur-[110px]" style={{ ["--o" as string]: "0.6" }} />
            <div aria-hidden className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-mint/[0.1] blur-[100px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Reveal>
                  <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fog sm:text-4xl lg:text-[2.9rem]">
                    Be ready before
                    <br />
                    the rate card <span className="text-shimmer">flips.</span>
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-moss">
                    Get the October 2026 kit: the complete INR rate card, a working volume model, and a human
                    to pressure-test your numbers before 1st October.
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <ul className="mt-8 space-y-3.5">
                    {KIT.map((k) => (
                      <li key={k} className="flex items-start gap-3 text-sm text-fog/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/20 text-emerald">
                          <IcCheck className="h-3 w-3" strokeWidth={2.4} />
                        </span>
                        {k}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div>
                <Reveal delay={160}>
                  <div className="rounded-2xl border border-mint/15 bg-ink-950/70 p-6 backdrop-blur-md sm:p-7">
                    {cd.done ? (
                      <div className="py-6 text-center">
                        <p className="font-display text-2xl font-semibold text-mint">The new rates are live.</p>
                        <p className="mt-2 text-sm text-moss">
                          The 1 October 2026 card is now in effect — get the kit and start optimizing.
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-moss">
                          New rates go live in
                        </p>
                        <div className="mt-5 grid grid-cols-4 gap-2.5">
                          {cells.map(([label, v]) => (
                            <div key={label} className="rounded-lg border border-mint/15 bg-ink-950 px-2 py-3.5 text-center">
                              <p key={v} className="anim-value font-mono text-2xl font-semibold tabular-nums text-fog sm:text-3xl">
                                {String(v).padStart(2, "0")}
                              </p>
                              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-moss/70">{label}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="mt-7 border-t border-mint/10 pt-6">
                      {sent ? (
                        <div className="flex items-start gap-3.5 rounded-lg border border-emerald/40 bg-emerald/10 p-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald text-ink-950">
                            <IcCheck className="h-4 w-4" strokeWidth={2.6} />
                          </span>
                          <div>
                            <p className="font-display text-sm font-semibold text-fog">Kit on its way.</p>
                            <p className="mt-1 text-[13px] leading-relaxed text-moss">
                              We've sent the CSV rate card and volume model to{" "}
                              <span className="font-mono text-mint">{email}</span>. First message lands within the
                              minute.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                          <label htmlFor="kit-email" className="sr-only">
                            Work email
                          </label>
                          <input
                            id="kit-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="min-w-0 flex-1 rounded-full border border-mint/20 bg-ink-950/80 px-5 py-3.5 text-sm text-fog placeholder:text-moss/50 transition-colors focus:border-emerald focus:outline-none"
                          />
                          <Btn type="submit" className="whitespace-nowrap">
                            Get the kit
                          </Btn>
                        </form>
                      )}
                      <p className="mt-4 text-[11px] leading-relaxed text-moss/60">
                        RatePilot is an independent guide to Meta's published pricing — not affiliated with Meta or
                        WhatsApp. Official rates: developers.facebook.com/docs/whatsapp/pricing.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

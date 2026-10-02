import type { ReactNode } from "react";
import { Reveal } from "../lib/motion";

const BRANDS: { name: string; tag: string; glyph: ReactNode }[] = [
  {
    name: "Finora",
    tag: "fintech",
    glyph: <circle cx="10" cy="10" r="7" />,
  },
  {
    name: "ShipKart",
    tag: "logistics",
    glyph: <path d="M3 14 10 3l7 11H3Z" />,
  },
  {
    name: "Cureo Health",
    tag: "health",
    glyph: <path d="M10 3v14M3 10h14" />,
  },
  {
    name: "Nimbus",
    tag: "retail",
    glyph: <path d="M4 14a6 6 0 0 1 12 0H4ZM14 10a4 4 0 0 1 6 4h-6" />,
  },
  {
    name: "Paylio",
    tag: "payments",
    glyph: <rect x="4" y="4" width="12" height="12" rx="3" />,
  },
  {
    name: "MediLoop",
    tag: "B2B SaaS",
    glyph: <path d="M10 3a7 7 0 1 1-6.5 9.7M3.5 12.7 10 3l2 4.5" />,
  },
];

export default function Social() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-moss/80">
            Planning the October rate switchover with
          </p>
        </Reveal>
        <div className="mt-9 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map((b, i) => (
            <Reveal key={b.name} delay={i * 90}>
              <div className="group flex items-center gap-2.5 opacity-50 transition-all duration-300 hover:opacity-100">
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5 text-emerald transition-transform duration-500 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {b.glyph}
                </svg>
                <span className="font-display text-lg font-semibold tracking-tight text-fog">{b.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-moss/80">
            <span className="font-semibold text-mint">120+ businesses</span> modeled their October volume
            this quarter · from 10k OTPs to 40M order updates
          </p>
        </Reveal>
      </div>
    </section>
  );
}

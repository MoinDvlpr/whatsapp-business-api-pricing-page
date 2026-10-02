import { Reveal } from "../lib/motion";
import { cn } from "../utils/cn";
import { SectionHead } from "./ui";

const QUOTES = [
  {
    name: "Ananya Iyer",
    role: "Head of Growth · Finora",
    photo:
      "https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=200",
    quote:
      "Splitting our OTP traffic by recipient market showed us exactly how much was billing at authentication-international rates — and how close our domestic volume was to the next India tier. The modeler paid for itself inside a week.",
    chip: "AUTH TIER 2 · −6%",
    tilt: "md:-rotate-1",
  },
  {
    name: "Marcus Feld",
    role: "CTO · ShipKart Logistics",
    photo:
      "https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=200",
    quote:
      "Order tracking puts us past 100M utility messages a month in India. ₹0.1150 became ₹0.0943 per message without us lifting a finger — and the invoice just follows.",
    chip: "TIER 4 · −18%",
    tilt: "md:rotate-[0.75deg] md:translate-y-3",
  },
  {
    name: "Sofia Almeida",
    role: "Founder · Cureo Health",
    photo:
      "https://images.pexels.com/photos/7752788/pexels-photo-7752788.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=200",
    quote:
      "Our patient support runs about 40,000 replies a month — all free until now. The allowance model showed finance the real October line, ₹4,485 for India traffic after the first 1,000, before anyone had to ask.",
    chip: "SERVICE BUDGETED",
    tilt: "md:-rotate-[0.5deg]",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            eyebrow="Field notes"
            title={
              <>
                Teams that did the math
                <br />
                <span className="text-mint">before October.</span>
              </>
            }
            sub="What changes when you stop guessing at per-message rates — from fintech OTPs to logistics tracking to patient care."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((t, i) => (
            <Reveal key={t.name} delay={i * 140} dir="scale">
              <figure
                className={cn(
                  "card-lift flex h-full flex-col rounded-xl border border-mint/10 bg-ink-850/70 p-7 transition-transform duration-500 hover:rotate-0 hover:border-emerald/40",
                  t.tilt,
                )}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald/50" fill="currentColor" aria-hidden="true">
                  <path d="M4 15.2c0-4.3 2.6-7.6 6.4-9.2l1 1.7c-2.4 1.2-4 3-4.3 4.9.4-.2.9-.3 1.5-.3 2 0 3.5 1.5 3.5 3.5S10.6 19.3 8.5 19.3C5.9 19.3 4 17.6 4 15.2Zm10.4 0c0-4.3 2.6-7.6 6.4-9.2l1 1.7c-2.4 1.2-4 3-4.3 4.9.4-.2.9-.3 1.5-.3 2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5c-2.6 0-4.6-1.7-4.6-4.1Z" />
                </svg>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-fog/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-mint/10 pt-6">
                  <img
                    src={t.photo}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald/30 ring-offset-2 ring-offset-ink-850"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-fog">{t.name}</p>
                    <p className="truncate text-xs text-moss">{t.role}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-wider text-emerald">
                    {t.chip}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

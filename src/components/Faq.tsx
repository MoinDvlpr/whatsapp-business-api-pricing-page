import { useState } from "react";
import { Reveal } from "../lib/motion";
import { cn } from "../utils/cn";
import { Btn, IcChevron, SectionHead } from "./ui";

const FAQS = [
  {
    q: "When exactly do the new rates apply?",
    a: "From 1 October 2026, in INR, across the WhatsApp Business Platform. Messages sent before the cutover stay on the previous card — so volume shifted earlier or later can land on a different list rate. The 47 markets and six-tier ladders on this page are the ones that count after the switch.",
  },
  {
    q: "Which message types get volume-tier discounts?",
    a: "Utility and authentication only — plus authentication-international where it's offered. Marketing stays at its flat list rate in every market, and the same marketing rate applies across both the Cloud API and the Marketing Messages Lite API.",
  },
  {
    q: "Are service messages still free after 1 October 2026?",
    a: "Only the first 1,000 each month, per business phone number. From 1 October 2026, every delivered service message after that is charged at the recipient market's service rate — ₹0.1150 in India, the same as the utility list rate in every market — with no volume-tier discounts. Service messages have been free since November 2024; this ends that.",
  },
  {
    q: "How does the 1,000 free service message allowance work?",
    a: "It's per business phone number, not per WhatsApp Business Account or portfolio — an account with five numbers has five separate allowances of 1,000. Charging starts at the 1,001st delivered service message. Unused messages don't roll over: October gets 1,000, November gets a fresh 1,000, and so on. 1:1 and group service messages share the same allowance.",
  },
  {
    q: "What exactly counts as a service message?",
    a: "Any free-form (non-template) reply you send while a customer service window is open — whether a human agent or a third-party AI sends it. The window opens when the customer messages you, lasts 24 hours, and resets with each new customer message; that rule hasn't changed. Reaction messages stay free for everyone and don't count toward the 1,000. Meta Business Agent replies are a separate token-based charge.",
  },
  {
    q: "Are utility templates inside the 24-hour window still free?",
    a: "No. Utility templates sent in response to a user within an open customer service window have been free since July 2025, but from 1 October 2026 they're charged at the regular utility rate (with volume tiers). They don't use the 1,000 free service-message allowance.",
  },
  {
    q: "What's still completely free?",
    a: "Messages your customers send you; the first 1,000 service messages per number each month; reaction messages; and everything inside a 72-hour free entry point window opened by a click-to-WhatsApp ad or Facebook Page CTA — templates included, except Meta Business Agent tokens. Eligible governments and non-profits also keep free service messages beyond the monthly tier through 31 December 2027.",
  },
  {
    q: "What happens if I don't have a payment method on file?",
    a: "Add a payment method in Meta's Billing Hub by 30 September 2026 — this applies to Solution Providers and directly integrated businesses alike. Without one, Meta will deliver your first 1,000 service messages for the month but won't deliver the 1,001st or anything after it.",
  },
  {
    q: "What are the “Rest of” markets?",
    a: "Countries without an explicit row are mapped to a regional rate by country calling code — for example Rest of Middle East, Rest of Asia Pacific, Rest of Western Europe — with an “Other” catch-all. Check Meta's country-code mapping before quoting a market you don't see listed.",
  },
  {
    q: "Do Cloud API and Marketing Messages Lite charge different marketing rates?",
    a: "No. From 1 October 2026, marketing rates apply identically across the Cloud API and the Marketing Messages Lite API — one column, both surfaces. Nothing to arbitrate between.",
  },
  {
    q: "Which markets have Authentication-International rates?",
    a: "Eighteen markets where international verification traffic is priced separately: India, Bangladesh, Egypt, Indonesia, Iraq, Kazakhstan, Kuwait, Malaysia, Morocco, Nepal, Nigeria, Oman, Pakistan, Saudi Arabia, South Africa, Sri Lanka, Ukraine and the UAE. Everywhere else, regular authentication applies.",
  },
  {
    q: "How is my volume tier determined?",
    a: "By messages sent per market, per message type, per calendar month. Each market's rate card defines its own “from–to” bands — India's utility ladder, for example, starts at 25M. Cross a band and your per-message rate steps down to that tier's rate.",
  },
  {
    q: "Can I get the full rate card as a file?",
    a: "Yes — the rate card section has a one-click CSV export with all 47 markets, list rates and top-tier rates. Or drop your email in the kit request form below and we'll send it with the volume-model template and a walkthrough slot.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHead
              eyebrow="Questions"
              title={
                <>
                  The fine print,
                  <br />
                  <span className="text-mint">without the fog.</span>
                </>
              }
              sub="Everything teams ask before the October cutover — answered straight, with the official docs where it counts."
            />
          </Reveal>
          <Reveal delay={150} className="mt-9 hidden lg:block">
            <div className="card-lift rounded-xl border border-mint/10 bg-ink-850/70 p-6 hover:border-emerald/40">
              <p className="font-display text-base font-semibold text-fog">Still mapping a tricky market?</p>
              <p className="mt-2 text-sm leading-relaxed text-moss">
                Send us your top three markets and monthly volumes — we'll come back with the tier math in 24 hours.
              </p>
              <Btn href="#cta" variant="ghost" className="mt-5 px-5 py-2.5">
                Ask a pricing engineer
              </Btn>
            </div>
          </Reveal>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div className={cn("border-b border-mint/10", i === 0 && "border-t")}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-[15px] font-medium transition-colors duration-300 sm:text-lg",
                      open === i ? "text-mint" : "text-fog group-hover:text-mint/80",
                    )}
                  >
                    <span className="mr-3 font-mono text-xs text-emerald/70">{String(i + 1).padStart(2, "0")}</span>
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      open === i
                        ? "rotate-180 border-emerald/50 bg-emerald/15 text-emerald"
                        : "border-mint/20 text-moss group-hover:border-mint/40",
                    )}
                  >
                    <IcChevron className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pl-0 text-[15px] leading-relaxed text-moss sm:pl-8">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

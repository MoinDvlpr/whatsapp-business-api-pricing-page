import { MARKETS, META_LINKS, SERVICE_PRICE } from "../data/rates";
import { IcExternal, LogoMark } from "./ui";

const EXPLORE = [
  ["How pricing works", "#how"],
  ["Message types", "#messages"],
  ["Service message charges", "#service"],
  ["Rate calculator", "#calculator"],
  ["Full rate card", "#rate-card"],
  ["FAQ", "#faq"],
];

const DOCS: [string, string][] = [
  ["Pricing overview", META_LINKS.pricing],
  ["Volume tiers", META_LINKS.volumeTiers],
  ["Country calling codes", META_LINKS.countryCodes],
  ["Auth-international rates", META_LINKS.authIntl],
];

export default function Footer() {
  return (
    <footer className="relative border-t border-mint/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-lg font-semibold tracking-tight text-fog">RatePilot</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-moss">
              The co-pilot for the WhatsApp Business Platform rate card. We turn Meta's published INR pricing into
              numbers your finance team can plan against.
            </p>
            <p className="mt-5 inline-flex rounded-full border border-citron/30 bg-citron/[0.07] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-citron/90">
              INDEPENDENT GUIDE · NOT AFFILIATED WITH META
            </p>
          </div>

          <nav aria-label="Explore">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss/70">Explore</p>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="link-underline text-sm text-moss transition-colors hover:text-fog">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Official Meta documentation">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss/70">
              Official Meta docs
            </p>
            <ul className="mt-5 space-y-3">
              {DOCS.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-sm text-moss transition-colors hover:text-mint"
                  >
                    {label}
                    <IcExternal className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-moss/70">
              Card snapshot
            </p>
            <dl className="mt-5 space-y-2.5 rounded-xl border border-mint/10 bg-ink-850/60 p-5 text-sm">
              {[
                ["Effective", "01 Oct 2026"],
                ["Currency", "INR"],
                ["Markets", `${MARKETS.length} priced`],
                ["Free service msgs", "1,000 / no. / mo"],
                ["Agent tokens", SERVICE_PRICE],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3">
                  <dt className="text-moss">{k}</dt>
                  <dd className="whitespace-nowrap font-mono text-[11.5px] font-semibold text-fog/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-mint/10 pt-7 text-xs text-moss/60 sm:flex-row">
          <p>© 2026 RatePilot Labs. Rates reproduced from Meta's published rate card, for reference.</p>
          <p className="font-mono text-[10px] tracking-[0.18em]">
            47 MARKETS · 4 TYPES · <span className="text-emerald">−30% AT THE TOP TIER</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

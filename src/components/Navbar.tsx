import { useState } from "react";
import { cn } from "../utils/cn";
import { useScrollProgress, useScrolled } from "../lib/motion";
import { Btn, IcMenu, IcX, LogoMark } from "./ui";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Message types", href: "#messages" },
  { label: "Service update", href: "#service" },
  { label: "Calculator", href: "#calculator" },
  { label: "Rate card", href: "#rate-card" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const scrolled = useScrolled(16);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-mint/10 bg-ink-950/85 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="RatePilot — back to top">
          <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3" />
          <span className="font-display text-lg font-semibold tracking-tight text-fog">RatePilot</span>
          <span className="hidden rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-widest text-emerald sm:inline-flex">
            OCT '26
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-underline text-sm font-medium text-moss transition-colors hover:text-fog">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Btn href="#cta" className="px-5 py-2.5">
            Plan my switchover
          </Btn>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-mint/20 text-fog transition-colors hover:bg-mint/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <IcX className="h-5 w-5" /> : <IcMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* scroll progress */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-jade via-emerald to-mint"
        style={{ width: `${progress * 100}%` }}
      />

      {/* mobile panel */}
      <div
        className={cn(
          "grid overflow-hidden border-mint/10 bg-ink-950/95 backdrop-blur-xl transition-all duration-400 lg:hidden",
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-display text-base font-medium text-fog/90 transition-colors hover:bg-mint/10 hover:text-mint"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 pb-2">
              <Btn href="#cta" className="w-full" onClick={() => setOpen(false)}>
                Plan my switchover
              </Btn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

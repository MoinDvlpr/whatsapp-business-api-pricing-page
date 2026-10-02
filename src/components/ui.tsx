import type { ReactNode, SVGProps } from "react";
import { cn } from "../utils/cn";

type P = SVGProps<SVGSVGElement>;

function S({ children, ...p }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  );
}

export const IcChat = (p: P) => (
  <S {...p}>
    <path d="M12 3.5c-5 0-8.7 3.3-8.7 7.4 0 4 3.7 7.4 8.7 7.4 1 0 1.9-.1 2.7-.4l4.1 1.2-1.2-3c1.8-1.4 2.4-3.4 2.4-5.2 0-4.1-3.7-7.4-8-7.4Z" />
    <path d="M8.5 11h2l1-2 1.7 4.2 1-2.2h2.3" />
  </S>
);

export const IcTag = (p: P) => (
  <S {...p}>
    <path d="M3.5 11.2V5.6c0-1.2 1-2.1 2.1-2.1h5.6c.6 0 1.1.2 1.5.6l7.3 7.3c.8.8.8 2 0 2.8l-5.6 5.6c-.8.8-2 .8-2.8 0l-7.3-7.3a2 2 0 0 1-.6-1.5Z" />
    <circle cx={8.3} cy={8.3} r={1.4} />
  </S>
);

export const IcLadder = (p: P) => (
  <S {...p}>
    <path d="M4 20.5h16" />
    <path d="M5 20.5v-5h4.5v5" />
    <path d="M9.8 20.5v-9.5h4.5v9.5" />
    <path d="M14.6 20.5V6h4.5v14.5" />
  </S>
);

export const IcGlobe = (p: P) => (
  <S {...p}>
    <circle cx={12} cy={12} r={8.5} />
    <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
  </S>
);

export const IcClock = (p: P) => (
  <S {...p}>
    <circle cx={12} cy={12} r={8.5} />
    <path d="M12 7.2V12l3.2 2.2" />
    <path d="M12 2v1.5M22 12h-1.5M12 22v-1.5M2 12h1.5" />
  </S>
);

export const IcInvoice = (p: P) => (
  <S {...p}>
    <path d="M6 3.5h12c.8 0 1.5.7 1.5 1.5v14l-2.7-1.8-2.4 1.8-2.4-1.8-2.4 1.8-2.7-1.8V5c0-.8.7-1.5 1.5-1.5Z" />
    <path d="M9 8h6.5M9 11.5h6.5M9 15h4" />
  </S>
);

export const IcBolt = (p: P) => (
  <S {...p}>
    <path d="M13.2 2.8 5.5 13.1h5l-1.6 8 7.7-10.3h-5l1.6-8Z" />
  </S>
);

export const IcShield = (p: P) => (
  <S {...p}>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 8.1 7 9.3 4-1.2 7-4.9 7-9.3V5.8L12 3Z" />
    <path d="m9.2 11.6 2 2 3.6-3.9" />
  </S>
);

export const IcBot = (p: P) => (
  <S {...p}>
    <rect x={5} y={8} width={14} height={11} rx={3} />
    <path d="M12 8V4.5M9.5 4.5h5" />
    <path d="M9.2 13.2v1.4M14.8 13.2v1.4M9.5 16.6c.7.5 1.5.8 2.5.8s1.8-.3 2.5-.8" />
  </S>
);

export const IcCheck = (p: P) => (
  <S {...p}>
    <path d="m4.5 12.6 5 5 10-11" />
  </S>
);

export const IcArrow = (p: P) => (
  <S {...p}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </S>
);

export const IcDownload = (p: P) => (
  <S {...p}>
    <path d="M12 3.5v11M7.5 10 12 14.5 16.5 10M4.5 17.5v2A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
  </S>
);

export const IcSearch = (p: P) => (
  <S {...p}>
    <circle cx={11} cy={11} r={6.5} />
    <path d="m16 16 4.5 4.5" />
  </S>
);

export const IcChevron = (p: P) => (
  <S {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </S>
);

export const IcExternal = (p: P) => (
  <S {...p}>
    <path d="M9 5H5.5A1.5 1.5 0 0 0 4 6.5v12A1.5 1.5 0 0 0 5.5 20h12a1.5 1.5 0 0 0 1.5-1.5V15" />
    <path d="M13 4h7v7M20 4 11 13" />
  </S>
);

export const IcMenu = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </S>
);

export const IcX = (p: P) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);

export const IcSpark = (p: P) => (
  <S {...p}>
    <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
  </S>
);

/* ---------- logo mark ---------- */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="url(#lg)" />
      <path
        d="M20 9.5c-7 0-12 4.7-12 10.4 0 5.8 5 10.5 12 10.5 1.3 0 2.5-.2 3.6-.5l5.4 1.5-1.6-3.8c2.7-1.8 4.6-4.7 4.6-7.7 0-5.7-5-10.4-12-10.4Z"
        fill="#2bd98c"
      />
      <path
        d="M13.5 19.5h3.2l1.4-2.7 2.2 5.7 1.4-3h3.4"
        stroke="#050d0a"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#0d1e17" />
          <stop offset="1" stopColor="#17352a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- eyebrow / section head ---------- */
export function Eyebrow({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em]",
        light ? "text-jade" : "text-emerald",
        className,
      )}
    >
      <span className={cn("h-px w-9", light ? "bg-jade/70" : "bg-emerald/50")} />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  light,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-pine-ink" : "text-fog",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-5 max-w-2xl text-base leading-relaxed sm:text-lg", light ? "text-pine-ink/70" : "text-moss")}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------- buttons ---------- */
export function Btn({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const styles = {
    primary:
      "bg-emerald text-ink-950 hover:bg-mint hover:shadow-[0_10px_34px_rgba(43,217,140,0.35)]",
    ghost:
      "border border-mint/25 bg-mint/[0.04] text-mint hover:border-mint/60 hover:bg-mint/10",
    dark: "bg-pine-ink text-paper hover:bg-jade hover:shadow-[0_10px_30px_rgba(15,107,79,0.35)]",
  } as const;
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 font-display text-sm font-semibold tracking-tight transition-all duration-300 active:scale-[0.97]",
    styles[variant],
    className,
  );
  const shine = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
    />
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {shine}
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {shine}
      {children}
    </button>
  );
}

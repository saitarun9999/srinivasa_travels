import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 font-display text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary-deep hover:shadow-md",
  gold: "bg-accent text-primary-night shadow-sm hover:bg-[#ffc51e] hover:shadow-md",
  outline:
    "border border-line bg-white text-primary hover:border-primary/40 hover:bg-surface",
  "ghost-light":
    "border border-white/30 text-white hover:border-white/70 hover:bg-white/10",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

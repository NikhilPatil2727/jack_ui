"use client";

/**
 * Btn06 — Dot-rail + status-sweep button
 * Part of Jack UI library — compatible with Next.js 13+ App Router
 *
 * Dependencies:
 *   npm install motion
 *
 * Font (add once to your app/layout.tsx):
 *   import { Plus_Jakarta_Sans } from "next/font/google";
 *   const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
 *   <body className={jakarta.variable}>
 *
 * Usage:
 *   import Btn06 from "@/components/ui/Btn06";
 *   <Btn06 label="Get Started" />
 *   <Btn06 label="Connect"     variant="cyan" />
 *   <Btn06 label="Upgrade"     variant="amber" />
 *   <Btn06 label="Delete"      variant="rose" />
 *   <Btn06 label="Cancel"      variant="ghost" />
 */

import { motion, useAnimation } from "motion/react";
import { useCallback, useState } from "react";

/* ── Public types ───────────────────────────────────────────── */

export type Btn06Variant = "default" | "cyan" | "amber" | "rose" | "ghost";

export interface Btn06Props {
  label?: string;
  variant?: Btn06Variant;
  onClick?: () => void;
  className?: string;
}

/* ── Variant config ─────────────────────────────────────────── */

interface VariantConfig {
  base: string;
  border: string;
  borderHover: string;
  textBase: string;
  textHover: string;
  dotColor: string;
  dotHover: string;
  barColor: string;
  railBorder: string;
  railBorderHover: string;
  arrowBase: string;
  arrowHover: string;
}

const VARIANTS: Record<Btn06Variant, VariantConfig> = {
  default: {
    base: "#161616",
    border: "rgba(255,255,255,0.10)",
    borderHover: "rgba(255,255,255,0.22)",
    textBase: "#d0d0d0",
    textHover: "#ffffff",
    dotColor: "rgba(255,255,255,0.20)",
    dotHover: "rgba(255,255,255,0.65)",
    barColor: "rgba(255,255,255,0.18)",
    railBorder: "rgba(255,255,255,0.06)",
    railBorderHover: "rgba(255,255,255,0.14)",
    arrowBase: "rgba(255,255,255,0.28)",
    arrowHover: "rgba(255,255,255,0.90)",
  },
  cyan: {
    base: "#0e1a1c",
    border: "rgba(34,211,238,0.18)",
    borderHover: "rgba(34,211,238,0.50)",
    textBase: "#6ee7f7",
    textHover: "#22d3ee",
    dotColor: "rgba(34,211,238,0.28)",
    dotHover: "rgba(34,211,238,0.80)",
    barColor: "rgba(34,211,238,0.38)",
    railBorder: "rgba(34,211,238,0.10)",
    railBorderHover: "rgba(34,211,238,0.22)",
    arrowBase: "rgba(34,211,238,0.30)",
    arrowHover: "rgba(34,211,238,0.90)",
  },
  amber: {
    base: "#1a1600",
    border: "rgba(251,191,36,0.18)",
    borderHover: "rgba(251,191,36,0.50)",
    textBase: "#fcd97a",
    textHover: "#fbbf24",
    dotColor: "rgba(251,191,36,0.28)",
    dotHover: "rgba(251,191,36,0.80)",
    barColor: "rgba(251,191,36,0.38)",
    railBorder: "rgba(251,191,36,0.10)",
    railBorderHover: "rgba(251,191,36,0.22)",
    arrowBase: "rgba(251,191,36,0.30)",
    arrowHover: "rgba(251,191,36,0.90)",
  },
  rose: {
    base: "#1a0c0e",
    border: "rgba(244,63,94,0.18)",
    borderHover: "rgba(244,63,94,0.50)",
    textBase: "#f9879c",
    textHover: "#f43f5e",
    dotColor: "rgba(244,63,94,0.28)",
    dotHover: "rgba(244,63,94,0.80)",
    barColor: "rgba(244,63,94,0.38)",
    railBorder: "rgba(244,63,94,0.10)",
    railBorderHover: "rgba(244,63,94,0.22)",
    arrowBase: "rgba(244,63,94,0.30)",
    arrowHover: "rgba(244,63,94,0.90)",
  },
  ghost: {
    base: "transparent",
    border: "rgba(255,255,255,0.09)",
    borderHover: "rgba(255,255,255,0.22)",
    textBase: "rgba(255,255,255,0.55)",
    textHover: "#ffffff",
    dotColor: "rgba(255,255,255,0.14)",
    dotHover: "rgba(255,255,255,0.55)",
    barColor: "rgba(255,255,255,0.15)",
    railBorder: "rgba(255,255,255,0.05)",
    railBorderHover: "rgba(255,255,255,0.12)",
    arrowBase: "rgba(255,255,255,0.22)",
    arrowHover: "rgba(255,255,255,0.80)",
  },
};

/* ── Diagonal stripe texture (very subtle) ──────────────────── */
const STRIPE =
  "repeating-linear-gradient(-55deg, transparent, transparent 6px, rgba(255,255,255,0.013) 6px, rgba(255,255,255,0.013) 12px)";

/* ── Component ──────────────────────────────────────────────── */

export default function Btn06({
  label = "Get Started",
  variant = "default",
  onClick,
  className = "",
}: Btn06Props) {
  const cfg = VARIANTS[variant];
  const [hovered, setHovered] = useState(false);

  const railControls  = useAnimation();
  const barControls   = useAnimation();
  const textControls  = useAnimation();
  const arrowControls = useAnimation();
  const dotControls   = useAnimation();

  const enter = useCallback(() => {
    setHovered(true);
    railControls.start({  width: "44px", transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } });
    barControls.start({   width: "100%", transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } });
    textControls.start({  x: 4,          transition: { duration: 0.30, ease: [0.4, 0, 0.2, 1] } });
    arrowControls.start({ x: 2,          transition: { duration: 0.30, ease: [0.34, 1.4, 0.64, 1] } });
    dotControls.start({   scaleY: 1.5,   transition: { duration: 0.22, ease: "easeOut" } });
  }, [railControls, barControls, textControls, arrowControls, dotControls]);

  const leave = useCallback(() => {
    setHovered(false);
    railControls.start({  width: "36px", transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] } });
    barControls.start({   width: "0%",   transition: { duration: 0.20, ease: [0.4, 0, 0.2, 1] } });
    textControls.start({  x: 0,          transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } });
    arrowControls.start({ x: 0,          transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } });
    dotControls.start({   scaleY: 1,     transition: { duration: 0.18, ease: "easeOut" } });
  }, [railControls, barControls, textControls, arrowControls, dotControls]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center gap-[10px] overflow-hidden cursor-pointer select-none ${className}`}
      style={{
        height: "48px",
        borderRadius: "10px",
        padding: "0 24px",
        background: cfg.base,
        border: `1px solid ${hovered ? cfg.borderHover : cfg.border}`,
        boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
        fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.01em",
        color: hovered ? cfg.textHover : cfg.textBase,
        transition: "border-color 0.2s ease, color 0.2s ease",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* ── Diagonal stripe texture ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: STRIPE }}
      />

      {/* ── Left dot-rail ── */}
      <motion.span
        aria-hidden="true"
        animate={railControls}
        initial={{ width: "36px" }}
        className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-center gap-[4px] pointer-events-none"
        style={{
          borderRight: `1px solid ${hovered ? cfg.railBorderHover : cfg.railBorder}`,
          transition: "border-color 0.2s ease",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            animate={dotControls}
            initial={{ scaleY: 1 }}
            className="block rounded-full"
            style={{
              width: "3px",
              height: "3px",
              background: hovered ? cfg.dotHover : cfg.dotColor,
              transition: "background 0.22s ease",
            }}
          />
        ))}
      </motion.span>

      {/* ── Label ── */}
      <motion.span
        animate={textControls}
        initial={{ x: 0 }}
        className="relative z-[2] whitespace-nowrap"
        style={{ marginLeft: "20px" }}
      >
        {label}
      </motion.span>

      {/* ── Arrow ── */}
      <motion.span
        aria-hidden="true"
        animate={arrowControls}
        initial={{ x: 0 }}
        className="relative z-[2] flex items-center"
        style={{
          color: hovered ? cfg.arrowHover : cfg.arrowBase,
          transition: "color 0.2s ease",
        }}
      >
        <ArrowIcon />
      </motion.span>

      {/* ── Bottom status sweep bar ── */}
      <motion.span
        aria-hidden="true"
        animate={barControls}
        initial={{ width: "0%" }}
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          height: "2px",
          borderRadius: "0 2px 0 0",
          background: cfg.barColor,
        }}
      />
    </motion.button>
  );
}

Btn06.displayName = "Btn06";

/* ── Arrow icon ─────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
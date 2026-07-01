"use client";

import React, { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Inline Brand Logos ──────────────────────────────────────────────────────
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23 23 20.46" className="w-8 h-8 text-[#00d8ff] drop-shadow-[0_0_8px_rgba(0,216,255,0.4)]" fill="none">
    <circle r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TurbopackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" strokeLinecap="round" />
  </svg>
);

const SwcLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 12h18M3 6h18M3 18h18" strokeDasharray="3 3" />
    <path d="M12 2v22M5 12l7-7 7 7-7 7-7-7" />
  </svg>
);

const RustLogo = () => (
  <svg viewBox="0 0 24 24" className="inline-block w-3.5 h-3.5 mx-1 text-[#f97316] align-middle" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2v-6h2v6z" />
  </svg>
);

export function CircuitConnections({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const s = (cls: string) => `${cls}-${uid}`;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full max-w-[1000px] mx-auto overflow-hidden transition-colors font-sans",
        s("container"),
        className
      )}
      style={{
        borderRadius: "var(--radius-md)",
        padding: "var(--space-6)",
      }}
    >
      <style>{`
        .${s("container")} {
          /* Style Foundations & Tokens */
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          font-size: 13px;
          font-weight: 400;
          line-height: 17.875px;

          /* Brand Colors */
          --color-text-primary: lab(48.496 0 0);
          --color-text-secondary: lab(26.8019 1.35387 -4.68303);
          --color-text-tertiary: lab(2.75381 0 0);
          --color-text-inverse: lab(34.924 0 0);

          --color-surface-base: #000000;
          --color-surface-muted: #ffffff;
          --color-surface-raised: lab(100 0 0);
          --color-surface-strong: oklab(0.969998 -0.00000959635 0.0000227094 / 0.8);

          --color-border-default: lab(90.952 0 -0.0000119209);
          --color-border-strong: oklab(0.921998 -0.00000908971 0.0000215769 / 0.8);

          /* Spacing Scale */
          --space-1: 4px;
          --space-2: 5px;
          --space-3: 6px;
          --space-4: 8px;
          --space-5: 12px;
          --space-6: 16px;
          --space-7: 20px;
          --space-8: 24px;

          /* Radii Scale */
          --radius-xs: 8px;
          --radius-sm: 10px;
          --radius-md: 14px;
          --radius-lg: 40px;
          --radius-xl: 20971500px;

          /* Shadows Scale */
          --shadow-1: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px -1px, rgba(0, 0, 0, 0.04) 0px 2px 4px 0px;
          --shadow-3: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, lab(0 0 0 / 0.02) 0px 1px 0px 0px inset, lab(0 0 0 / 0.02) 0px 0px 0px 1px inset, lab(100 0 0 / 0.25) 0px 0px 0px 1px;
          --shadow-4: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, lab(0 0 0 / 0.05) 0px 1px 1px 0px, lab(97.6618 1.68431 3.32774 / 0.5) 0px 1px 1px 0px inset, lab(100 0 0 / 0.1) 0px 0px 0px 1px inset, lab(7.20476 1.68892 2.90778 / 0.5) 0px 0px 1px 0px;

          /* Motion Duration */
          --motion-duration-instant: 150ms;
          --motion-duration-fast: 200ms;

          /* Dynamic Active Colors */
          --line-active-cyan: #00d8ff;
          --line-active-orange: #f97316;

          /* Component Theme Maps */
          background-color: var(--color-surface-muted);
          border: 1px solid var(--color-border-default);
          box-shadow: var(--shadow-1);
        }

        :is(.dark) .${s("container")} {
          background-color: var(--color-surface-base);
          border: 1px solid var(--color-border-strong);
        }

        .${s("card-el")} {
          background-color: var(--color-surface-raised);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-3);
          transition: all var(--motion-duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
        }

        :is(.dark) .${s("card-el")} {
          background-color: #050505;
          border: 1px solid var(--color-border-strong);
        }

        .${s("hub-body")} {
          background-color: var(--color-text-tertiary);
          border: 1px solid var(--color-border-strong);
          color: var(--color-surface-muted);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-4);
        }

        :is(.dark) .${s("hub-body")} {
          background-color: #1a1a1a;
        }
      `}</style>

      {/* Circuit Board SVG Canvas */}
      <div 
        className="relative w-full pointer-events-none z-0"
        style={{ height: "200px" }}
      >
        <svg
          viewBox="0 0 800 220"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* SVG Glow Filter Definition */}
          <defs>
            <filter id={`glow-cyan-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`glow-orange-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle background lines (matching the photo) */}
          <g stroke="currentColor" className="text-zinc-100 dark:text-zinc-900" strokeWidth="1.5" fill="none">
            <path d="M 400 40 L 400 20 M 420 50 L 420 10 M 380 55 L 380 15" />
            <path d="M 420 10 H 480 V 30" />
            <path d="M 380 15 H 320 V 40" />
            <path d="M 280 20 H 220 V 70 H 150" />
            <path d="M 520 20 H 580 V 70 H 650" />

            <path d="M 150 120 H 300 V 70" />
            <path d="M 650 120 H 500 V 70" />
            <path d="M 320 120 V 160 H 480" />

            {/* Inactive main tracks */}
            <path d="M 350 110 H 133 V 220" />
            <path d="M 400 135 V 170 H 320 V 190 H 400 V 220" />
            <path d="M 450 110 H 510 V 140 H 667 V 220" />
          </g>

          {/* Glowing active solid circuit tracks (no dash array, plain neon gradient effect) */}
          <g fill="none" strokeWidth="2.5" strokeLinecap="round">
            {/* React Line */}
            <path
              d="M 350 110 H 133 V 220"
              stroke="var(--line-active-cyan)"
              style={{
                filter: `url(#glow-cyan-${uid})`,
                opacity: hoveredCard === "react" ? 1 : hoveredCard ? 0.2 : 0.75,
                transition: "opacity 0.3s ease, stroke-width 0.3s ease",
              }}
            />

            {/* Turbopack Line */}
            <path
              d="M 400 135 V 170 H 320 V 190 H 400 V 220"
              stroke="var(--line-active-cyan)"
              style={{
                filter: `url(#glow-cyan-${uid})`,
                opacity: hoveredCard === "turbopack" ? 1 : hoveredCard ? 0.2 : 0.75,
                transition: "opacity 0.3s ease, stroke-width 0.3s ease",
              }}
            />

            {/* SWC Line */}
            <path
              d="M 450 110 H 510 V 140 H 667 V 220"
              stroke="var(--line-active-orange)"
              style={{
                filter: `url(#glow-orange-${uid})`,
                opacity: hoveredCard === "swc" ? 1 : hoveredCard ? 0.2 : 0.75,
                transition: "opacity 0.3s ease, stroke-width 0.3s ease",
              }}
            />
          </g>

          {/* Moving Signal Particles traveling along paths (using animateMotion for optimized plain glow dot effect) */}
          <g>
            <circle r="4.5" fill="#00d8ff" style={{ filter: "drop-shadow(0 0 5px #00d8ff)", opacity: hoveredCard === "react" ? 1 : hoveredCard ? 0.2 : 0.9 }}>
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 350 110 H 133 V 220" />
            </circle>

            <circle r="4.5" fill="#00d8ff" style={{ filter: "drop-shadow(0 0 5px #00d8ff)", opacity: hoveredCard === "turbopack" ? 1 : hoveredCard ? 0.2 : 0.9 }}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 400 135 V 170 H 320 V 190 H 400 V 220" />
            </circle>

            <circle r="4.5" fill="#f97316" style={{ filter: "drop-shadow(0 0 5px #f97316)", opacity: hoveredCard === "swc" ? 1 : hoveredCard ? 0.2 : 0.9 }}>
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 110 H 510 V 140 H 667 V 220" />
            </circle>
          </g>

          {/* Decorative Junction dots */}
          <g>
            <circle cx="210" cy="110" r="3" fill="#00d8ff" className="animate-pulse" />
            <circle cx="150" cy="120" r="2.5" fill="#a1a1aa" />
            <circle cx="490" cy="30" r="3" fill="#ec4899" />
            <circle cx="610" cy="110" r="3" fill="#f97316" className="animate-pulse" />
          </g>
        </svg>

        {/* Central Core CPU ("Powered By") */}
        <div className="absolute top-[85px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
          {/* Top Pins */}
          <div className="flex gap-1.5 mb-[-2px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-t-xs" />
            ))}
          </div>

          {/* Main Hub Body */}
          <div
            className={cn(
              "px-6 py-3.5 text-sm font-bold tracking-wide select-none transition-all",
              s("hub-body")
            )}
          >
            Powered By
          </div>

          {/* Bottom Pins */}
          <div className="flex gap-1.5 mt-[-2px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-b-xs" />
            ))}
          </div>
        </div>
      </div>

      {/* 3 Columns Tech Cards Grid */}
      <div 
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 w-full"
        style={{ gap: "var(--space-6)" }}
      >
        {/* Card 1: React */}
        <motion.a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredCard("react")}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "flex flex-col text-left cursor-pointer outline-none no-underline",
            s("card-el")
          )}
          style={{
            padding: "var(--space-6)",
            borderColor: hoveredCard === "react" ? "#00d8ff" : "var(--color-border-default)",
            transform: hoveredCard === "react" ? "translateY(-2px)" : "none",
          }}
        >
          {/* Logo Container */}
          <div style={{ marginBottom: "var(--space-5)" }}>
            <ReactLogo />
          </div>

          {/* Title */}
          <div 
            className="flex items-center" 
            style={{ gap: "var(--space-2)", marginBottom: "var(--space-2)" }}
          >
            <h3 
              className="font-bold tracking-tight font-sans"
              style={{ 
                fontSize: "14px", 
                color: "var(--color-text-secondary)" 
              }}
            >
              React
            </h3>
            <span style={{ color: "var(--color-text-primary)", fontSize: "11px", fontWeight: "bold" }}>
              ↗
            </span>
          </div>

          {/* Description */}
          <p 
            className="font-normal font-sans"
            style={{ 
              fontSize: "13px", 
              lineHeight: "17.875px",
              color: "var(--color-text-primary)" 
            }}
          >
            The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions.
          </p>
        </motion.a>

        {/* Card 2: Turbopack */}
        <motion.a
          href="https://turbo.build"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredCard("turbopack")}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "flex flex-col text-left cursor-pointer outline-none no-underline",
            s("card-el")
          )}
          style={{
            padding: "var(--space-6)",
            borderColor: hoveredCard === "turbopack" ? "#00d8ff" : "var(--color-border-default)",
            transform: hoveredCard === "turbopack" ? "translateY(-2px)" : "none",
          }}
        >
          {/* Logo Container */}
          <div style={{ marginBottom: "var(--space-5)" }}>
            <TurbopackLogo />
          </div>

          {/* Title */}
          <div 
            className="flex items-center" 
            style={{ gap: "var(--space-2)", marginBottom: "var(--space-2)" }}
          >
            <h3 
              className="font-bold tracking-tight font-sans"
              style={{ 
                fontSize: "14px", 
                color: "var(--color-text-secondary)" 
              }}
            >
              Turbopack
            </h3>
            <span style={{ color: "var(--color-text-primary)", fontSize: "11px", fontWeight: "bold" }}>
              ↗
            </span>
          </div>

          {/* Description */}
          <p 
            className="font-normal font-sans"
            style={{ 
              fontSize: "13px", 
              lineHeight: "17.875px",
              color: "var(--color-text-primary)" 
            }}
          >
            An incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js.
          </p>
        </motion.a>

        {/* Card 3: SWC */}
        <motion.a
          href="https://swc.rs"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredCard("swc")}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "flex flex-col text-left cursor-pointer outline-none no-underline",
            s("card-el")
          )}
          style={{
            padding: "var(--space-6)",
            borderColor: hoveredCard === "swc" ? "#f97316" : "var(--color-border-default)",
            transform: hoveredCard === "swc" ? "translateY(-2px)" : "none",
          }}
        >
          {/* Logo Container */}
          <div style={{ marginBottom: "var(--space-5)" }}>
            <SwcLogo />
          </div>

          {/* Title */}
          <div 
            className="flex items-center" 
            style={{ gap: "var(--space-2)", marginBottom: "var(--space-2)" }}
          >
            <h3 
              className="font-bold tracking-tight font-sans"
              style={{ 
                fontSize: "14px", 
                color: "var(--color-text-secondary)" 
              }}
            >
              Speedy Web Compiler
            </h3>
            <span style={{ color: "var(--color-text-primary)", fontSize: "11px", fontWeight: "bold" }}>
              ↗
            </span>
          </div>

          {/* Description */}
          <p 
            className="font-normal font-sans"
            style={{ 
              fontSize: "13px", 
              lineHeight: "17.875px",
              color: "var(--color-text-primary)" 
            }}
          >
            An extensible Rust <RustLogo /> based platform for the next generation of fast developer tools, and can be used for both compilation and minification.
          </p>
        </motion.a>
      </div>
    </div>
  );
}

export default CircuitConnections;

"use client";

/**
 * Btn05 — Liquid sweep + particle burst button
 * Part of your UI library — compatible with Next.js 13+ App Router
 *
 * Dependencies:
 *   npm install motion
 *
 * Font (add once to your app/layout.tsx):
 *   import { Syne } from "next/font/google";
 *   const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
 *   <body className={syne.variable}>
 *
 * Usage:
 *   import Btn05 from "@/components/ui/Btn05";
 *   <Btn05 label="Launch Project" variant="acid" />
 *   <Btn05 label="Book a Call"    variant="ember" />
 *   <Btn05 label="View Docs"      variant="ghost" />
 *   <Btn05 label="Get Access"     variant="violet" rounded={false} />
 */

import { motion, useAnimation } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";

/* ── Public types (exported for library consumers) ──────────── */

export type Btn05Variant = "acid" | "ember" | "ghost" | "violet";

export interface Btn05Props {
  label?: string;
  variant?: Btn05Variant;
  /** true = pill shape (default), false = rounded rect */
  rounded?: boolean;
  onClick?: () => void;
  className?: string;
}

/* ── Internal variant config ────────────────────────────────── */

interface VariantConfig {
  fill: string;
  textOnFill: string;
  particleColor: string;
  border: string;
  baseBg: string;
}

const VARIANTS: Record<Btn05Variant, VariantConfig> = {
  acid: {
    fill: "linear-gradient(135deg, #e8ff47 0%, #b5f542 100%)",
    textOnFill: "#0a0a0a",
    particleColor: "#d4f542",
    border: "rgba(255,255,255,0.08)",
    baseBg: "#0a0a0a",
  },
  ember: {
    fill: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 100%)",
    textOnFill: "#1a0a00",
    particleColor: "#ff8c5a",
    border: "rgba(255,255,255,0.08)",
    baseBg: "#0a0a0a",
  },
  ghost: {
    fill: "linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)",
    textOnFill: "#111111",
    particleColor: "#cccccc",
    border: "rgba(255,255,255,0.22)",
    baseBg: "transparent",
  },
  violet: {
    fill: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    textOnFill: "#ffffff",
    particleColor: "#a78bfa",
    border: "rgba(255,255,255,0.08)",
    baseBg: "#0a0a0a",
  },
};

/* ── Particle system ────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  decay: number;
}

/**
 * Fires a one-shot canvas particle burst.
 * Returns a cleanup fn that cancels the RAF if the component unmounts mid-animation.
 */
function burstParticles(
  canvas: HTMLCanvasElement,
  cx: number,
  cy: number,
  color: string
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const COUNT = 24;
  let live: Particle[] = Array.from({ length: COUNT }, (_, i) => {
    const angle = ((Math.PI * 2) / COUNT) * i + Math.random() * 0.3;
    const speed = 3 + Math.random() * 4;
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      size: 2.5 + Math.random() * 3,
      decay: 0.022 + Math.random() * 0.016,
    };
  });

  let raf: ReturnType<typeof requestAnimationFrame> | undefined;

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    live = live.filter((p) => p.alpha > 0.01);

    for (const p of live) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.13; // gravity
      p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    if (live.length > 0) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  raf = requestAnimationFrame(tick);

  // Return cleanup for useEffect
  return () => {
    if (raf !== undefined) cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

/* ── Component ──────────────────────────────────────────────── */

export default function Btn05({
  label = "Launch Project",
  variant = "acid",
  rounded = true,
  onClick,
  className = "",
}: Btn05Props) {
  const config = VARIANTS[variant];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  const [hovered, setHovered] = useState(false);
  const fillControls = useAnimation();
  // Scan line uses translateX (GPU-composited) instead of CSS `left`
  const scanControls = useAnimation();

  const borderRadius = rounded ? "9999px" : "10px";

  // Cancel any in-flight particle RAF on unmount
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);

    // Scan line races left → right via translateX (perf-safe, no layout thrash)
    scanControls.start({
      x: ["0%", "150%"],
      opacity: [1, 0],
      transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
    });

    // Liquid fill sweeps in from the left
    fillControls.start({
      x: "0%",
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
    });
  }, [fillControls, scanControls]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);

    fillControls.start({
      x: "-101%",
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
    });
  }, [fillControls]);

  const handleClick = useCallback(() => {
    onClick?.();

    if (!canvasRef.current || !btnRef.current) return;

    const br = btnRef.current.getBoundingClientRect();
    const cr = canvasRef.current.getBoundingClientRect();
    const cx = br.left + br.width / 2 - cr.left;
    const cy = br.top + br.height / 2 - cr.top;

    // Cancel previous burst before starting a new one
    cleanupRef.current?.();
    cleanupRef.current = burstParticles(
      canvasRef.current,
      cx,
      cy,
      config.particleColor
    );
  }, [onClick, config.particleColor]);

  return (
    <div className={`relative inline-flex ${className}`}>
      {/* Particle canvas — oversized so bursts aren't clipped by button overflow:hidden */}
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[60px] z-10"
      />

      <motion.button
        ref={btnRef}
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
        className="relative inline-flex cursor-pointer select-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Outer shell — controls size, bg, border, clip */}
        <div
          className="relative flex items-center justify-center gap-[10px] px-7 overflow-hidden"
          style={{
            height: rounded ? "52px" : "44px",
            borderRadius,
            background: config.baseBg,
            border: `1.5px solid rgba(255,255,255,0.22)`,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)`,
          }}
        >
          {/* ── Liquid fill (slides in from left) ── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ borderRadius, overflow: "hidden" }}
          >
            <motion.div
              animate={fillControls}
              initial={{ x: "-101%" }}
              className="absolute inset-0"
              style={{
                background: config.fill,
                borderRadius,
              }}
            />
          </div>

          {/* ── Scan line (translateX — GPU composited) ── */}
          <motion.div
            aria-hidden="true"
            animate={scanControls}
            initial={{ x: "-120%", opacity: 1 }}
            className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-[3]"
            style={{
              left: 0,
              background: "rgba(255,255,255,0.22)",
            }}
          />

          {/* ── Top gloss bar (larger + stronger for dark mode visibility) ── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 right-0 z-[3]"
            style={{ borderRadius: `${borderRadius} ${borderRadius} 0 0` }}
          >
            {/* Main glow band */}
            <div
              style={{
                height: "3px",
                borderRadius: "99px 99px 0 0",
                background:
                  "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.55) 50%, transparent 95%)",
              }}
            />
            {/* Soft bloom below it */}
            <div
              style={{
                height: "10px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* ── Label ── */}
          <motion.span
            className="relative z-[2] font-semibold text-[15px] tracking-[0.01em] whitespace-nowrap"
            style={{ fontFamily: "var(--font-syne, 'Syne', sans-serif)" }}
            animate={{
              color: hovered ? config.textOnFill : "#ffffff",
            }}
            transition={{ duration: 0.22, delay: hovered ? 0.06 : 0 }}
          >
            {label}
          </motion.span>

          {/* ── Arrow (rotates 45° on hover → northeast arrow) ── */}
          <motion.span
            aria-hidden="true"
            className="relative z-[2] flex items-center"
            animate={{
              rotate: hovered ? -45 : 0,
              color: hovered ? config.textOnFill : "#ffffff",
            }}
            transition={{
              rotate: { type: "spring", stiffness: 300, damping: 22 },
              color: { duration: 0.22, delay: hovered ? 0.06 : 0 },
            }}
          >
            <ArrowIcon />
          </motion.span>
        </div>
      </motion.button>
    </div>
  );
}

Btn05.displayName = "Btn05";

/* ── Arrow icon ─────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 13L13 3M13 3H7M13 3V9" />
    </svg>
  );
}
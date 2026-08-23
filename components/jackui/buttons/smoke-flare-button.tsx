"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

type SmokeFlareButtonSize = "sm" | "md" | "lg";

export interface SmokeFlareButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  /**
   * Main text label on the button.
   * @default "Get Started"
   */
  label?: string;
  /**
   * Sizing variant of the button.
   * @default "md"
   */
  size?: SmokeFlareButtonSize;
  /**
   * Disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * Loading state showing spinner.
   * @default false
   */
  loading?: boolean;
}

// ─── Size mappings ────────────────────────────────────────────────────────────

const sizes: Record<SmokeFlareButtonSize, { w: number; h: number; fs: number }> = {
  sm: { w: 120, h: 42, fs: 12 },
  md: { w: 180, h: 54, fs: 14 },
  lg: { w: 220, h: 64, fs: 16 },
};

const ambientOffsets: Record<SmokeFlareButtonSize, string> = {
  sm: "-inset-[16px]",
  md: "-inset-[24px]",
  lg: "-inset-[32px]",
};



/**
 * SmokeFlareButton
 *
 * A premium button design system component featuring cosmic smoke patterns,
 * and interactive canvas ripple pulses on click.
 * Enhanced with magnetic pull, mouse-tracking premium border lighting,
 * and high-end landing page aesthetics.
 *
 * @author Jack UI
 * @version 2.0.0
 * @see {@link SmokeFlareButtonProps} for details on customisation.
 *Designe by @Nikhil_PATIL (Jack UI)
 */
export function SmokeFlareButton({
  label = "Get Started",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  style,
  className,
  ...rest
}: SmokeFlareButtonProps) {
  const { w, h, fs } = sizes[size];
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const nextId = useRef(0);

  // Magnetic Pull
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagX = useSpring(magnetX, { stiffness: 120, damping: 18 });
  const springMagY = useSpring(magnetY, { stiffness: 120, damping: 18 });

  // Mouse Glow Position Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      // Check if dark mode is active
      const isDark = document.documentElement.classList.contains("dark");

      // X pull is always active
      magnetX.set((relX - 0.5) * 14);

      // Y pull is only active in dark mode (disabled in light mode for horizontal-only movement)
      magnetY.set(isDark ? (relY - 0.5) * 10 : 0);

      // Mouse reflection position
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [disabled, magnetX, magnetY, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    magnetX.set(0);
    magnetY.set(0);
  }, [magnetX, magnetY]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const id = nextId.current++;
        setRipples((r) => [
          ...r,
          { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
        ]);
        setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
      }
      onClick?.(e);
    },
    [disabled, loading, onClick]
  );

  // Dynamic light tracking gradient for premium active border
  const borderGradient = useTransform(
    [springMouseX, springMouseY],
    ([x, y]) => {
      return hovered
        ? `radial-gradient(160px circle at ${x}px ${y}px, rgba(var(--sf-border-flare), var(--sf-border-flare-opacity)) 0%, rgba(var(--sf-border-flare), 0.2) 50%, rgba(var(--sf-border-flare), 0.02) 100%)`
        : `linear-gradient(to bottom, rgba(var(--sf-border-base-color), var(--sf-border-base-opacity)), rgba(var(--sf-border-flare), 0.05))`;
    }
  );

  // Parallax glow coordinates (moves slightly with magnetic pull)
  const glowX = useTransform(springMagX, (x) => x * 1.4);
  const glowY = useTransform(springMagY, (y) => y * 1.4);

  return (
    <motion.div
      style={{ x: springMagX, y: springMagY }}
      className="relative inline-flex items-center justify-center group"
    >
      {/* Dynamic Keyframes & CSS variables */}
      <style>{`
        :root {
          /* Light Mode: Black button on white/light page background */
          --sf-border-flare: 255, 255, 255; /* White flashy spotlight sweep */
          --sf-border-flare-opacity: 0.95; /* Super flashy! */
          --sf-border-base-color: 0, 0, 0; /* Visible dark outline on white page */
          --sf-border-base-opacity: 0.15;
          --sf-glow-color: 99, 102, 241; /* Indigo ambient glow */
          --sf-glow-opacity: 0.15; /* Higher opacity to pop on light backgrounds */
          --sf-shadow-color: 0, 0, 0; /* Deep black drop shadow */
          --sf-shadow-opacity: 0.26;
        }
        .dark {
          /* Dark Mode: Black button on dark page background */
          --sf-border-flare: 255, 255, 255; /* White flashy spotlight sweep */
          --sf-border-flare-opacity: 0.75;
          --sf-border-base-color: 255, 255, 255; /* Soft white border outline */
          --sf-border-base-opacity: 0.35;
          --sf-glow-color: 255, 255, 255; /* White ambient glow */
          --sf-glow-opacity: 0.08;
          --sf-shadow-color: 255, 255, 255; /* Soft white shadow bloom */
          --sf-shadow-opacity: 0.18;
        }

        @keyframes jack-smokeflare-smoke-rot {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(360deg) scale(1.05); }
        }

        @keyframes jack-smokeflare-text-pulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.2);
          }
          50% {
            text-shadow: 0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.4);
          }
        }
        @keyframes jack-smokeflare-ripple {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.4; }
          100% { transform: translate(-50%,-50%) scale(4.5); opacity: 0; }
        }
      `}</style>

      {/* Light Mode: Stable Horizontal Colorful Glow (Wider offsets for visibility) */}
      <motion.div
        className="absolute rounded-full pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-55 blur-[28px] dark:hidden"
        style={{
          background: "linear-gradient(90deg, #c084fc, #6366f1, #2dd4bf, #ec4899)",
          left: "-28px",
          right: "-28px",
          top: "-14px",
          bottom: "-14px",
          x: glowX,
        }}
        animate={{
          scaleX: hovered ? 1.25 : 0.95,
          scaleY: hovered ? 1.05 : 0.95,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Dark Mode: Original White Ambient Bloom (Undamaged original styling) */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className={cn(
          "absolute rounded-full pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105 hidden dark:block",
          ambientOffsets[size],
          "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[24px]"
        )}
      />

      {/* Ethereal Drop shadow below pill (increased gap, blur, and scale) */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-[16px] pointer-events-none rounded-full transition-all duration-500 opacity-40 group-hover:opacity-85 bg-[radial-gradient(ellipse_at_50%_50%,rgba(var(--sf-shadow-color),var(--sf-shadow-opacity))_0%,transparent_70%)] blur-[10px]"
        style={{
          width: w * 0.85,
        }}
      />

      {/* ─── Premium Border Glow / Shimmer Wrapper (thicker border ring) ─── */}
      <motion.div
        className="absolute -inset-[2px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: borderGradient,
          opacity: hovered ? 1 : 0.8,
        }}
      />

      {/* Button */}
      <motion.button
        ref={btnRef}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full cursor-pointer outline-none border-0 bg-transparent select-none -webkit-tap-highlight-color-transparent transition-transform duration-[180ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        disabled={disabled || loading}
        onClick={handleClick}
        animate={{
          scale: pressed ? 0.96 : hovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ width: w, height: h, ...style }}
        {...rest}
      >
        {/* Always Dark body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-950 to-black" />

        {/* Inner border / bezel reflection */}
        <div className="absolute inset-[1px] rounded-full border border-white/5 transition-opacity duration-300 group-hover:border-white/10" />

        {/* Smoke layer A */}
        <div
          className="absolute inset-[-10%] rounded-full pointer-events-none bg-[radial-gradient(ellipse_65%_40%_at_25%_55%,rgba(255,255,255,0.08)_0%,transparent_55%),radial-gradient(ellipse_45%_65%_at_72%_38%,rgba(255,255,255,0.08)_0%,transparent_55%)] animate-[jack-smokeflare-smoke-rot_12s_linear_infinite]"
          style={{
            animationDuration: hovered ? "6s" : "12s",
            opacity: hovered ? 1 : 0.75,
            transition: "opacity 0.3s ease, animation-duration 0.5s ease",
          }}
        />

        {/* Smoke layer B */}
        <div
          className="absolute inset-[-10%] rounded-full pointer-events-none bg-[radial-gradient(ellipse_55%_50%_at_60%_65%,rgba(255,255,255,0.06)_0%,transparent_50%),radial-gradient(ellipse_40%_55%_at_35%_30%,rgba(255,255,255,0.06)_0%,transparent_50%)] animate-[jack-smokeflare-smoke-rot_16s_linear_infinite_reverse]"
          style={{
            animationDuration: hovered ? "8s" : "16s",
            opacity: hovered ? 1 : 0.75,
            transition: "opacity 0.3s ease, animation-duration 0.5s ease",
          }}
        />

        {/* Bottom glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(ellipse_75%_50%_at_50%_105%,rgba(255,255,255,0.22)_0%,transparent_60%)]" />

        {/* Top glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(ellipse_60%_35%_at_50%_-5%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

        {/* Sheen */}
        <div className="absolute top-0 left-0 right-0 h-[46%] rounded-t-full rounded-b-[60%] pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-white/10 to-white/[0.02]" />

        {/* Premium metallic shine sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/15 to-transparent"
          style={{
            width: "200%",
            left: "-100%",
            skewX: -25,
          }}
          animate={hovered ? { left: "120%" } : { left: "-100%" }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        />



        {/* Ripples */}
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="absolute rounded-full w-[70px] h-[70px] bg-white/15 pointer-events-none animate-[jack-smokeflare-ripple_0.7s_ease-out_forwards]"
            style={{
              left: rp.x,
              top: rp.y,
            }}
          />
        ))}

        {/* Content */}
        {loading ? (
          <span
            className="inline-block w-[18px] h-[18px] rounded-full border-2 border-white/25 border-t-white animate-spin"
            aria-label="Loading"
          />
        ) : (
          <motion.span
            className="relative z-10 font-semibold tracking-[0.03em] text-white animate-[jack-smokeflare-text-pulse_3.5s_ease-in-out_infinite]"
            style={{
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              fontSize: fs,
            }}
            layoutId="smokeflare-button-text"
          >
            {label}
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
}

export default SmokeFlareButton;

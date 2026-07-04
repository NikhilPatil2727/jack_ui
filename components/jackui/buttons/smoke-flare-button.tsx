"use client";

import React, { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
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
  sm: { w: 100, h: 38, fs: 12 },
  md: { w: 150, h: 50, fs: 15 },
  lg: { w: 200, h: 64, fs: 18 },
};

const ambientOffsets: Record<SmokeFlareButtonSize, string> = {
  sm: "-inset-[14px]",
  md: "-inset-[20px]",
  lg: "-inset-[28px]",
};

// ─── Flares ───────────────────────────────────────────────────────────────────

const FLARES = [
  { top: "32%", left: "19%", w: 3, h: 3, delay: "0s" },
  { top: "62%", left: "73%", w: 2.5, h: 2.5, delay: "0.7s" },
  { top: "72%", left: "45%", w: 2, h: 2, delay: "1.3s" },
  { top: "24%", left: "60%", w: 1.8, h: 1.8, delay: "2s" },
  { top: "55%", left: "28%", w: 2.2, h: 2.2, delay: "2.8s" },
];

/**
 * SmokeFlareButton
 *
 * A premium button design system component featuring cosmic smoke patterns,
 * hovering ambient glow flares, and interactive canvas ripple pulses on click.
 *
 * @author Jack UI
 * @version 1.2.0
 * @see {@link SmokeFlareButtonProps} for details on customisation.
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
  const nextId = useRef(0);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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
  };

  return (
    <div className="relative inline-flex items-center justify-center group">
      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes jack-smokeflare-smoke-rot {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(360deg) scale(1.04); }
        }
        @keyframes jack-smokeflare-flare {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.8; }
          33%      { transform: translate(3px,-5px) scale(1.4); opacity: 1; }
          66%      { transform: translate(-2px,4px) scale(0.75); opacity: 0.5; }
        }
        @keyframes jack-smokeflare-text-pulse {
          0%, 100% {
            text-shadow: 0 0 12px #fff, 0 0 28px rgba(255,255,255,0.85),
                         0 0 55px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.2);
          }
          50% {
            text-shadow: 0 0 16px #fff, 0 0 40px rgba(255,255,255,0.95),
                         0 0 80px rgba(255,255,255,0.65), 0 0 130px rgba(255,255,255,0.3);
          }
        }
        @keyframes jack-smokeflare-ripple {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(4.5); opacity: 0; }
        }
      `}</style>

      {/* Ambient outer glow */}
      <div
        className={cn(
          "absolute rounded-full pointer-events-none transition-opacity duration-500 opacity-70 group-hover:opacity-100",
          ambientOffsets[size],
          "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.12)_0%,transparent_65%)] blur-[18px]"
        )}
      />

      {/* Button */}
      <motion.button
        ref={btnRef}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full cursor-pointer outline-none border-0 bg-transparent select-none -webkit-tap-highlight-color-transparent hover:scale-[1.035] active:scale-[0.975] transition-transform duration-[180ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60",
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ width: w, height: h, ...style }}
        {...rest}
      >
        {/* Dark body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-900 to-black" />

        {/* Outer border */}
        <div className="absolute inset-0 rounded-full border-[1.5px] border-white/30 transition-colors duration-300 group-hover:border-white/55" />

        {/* Inner border */}
        <div className="absolute inset-[2px] rounded-full border border-white/10" />

        {/* Smoke layer A */}
        <div
          className="absolute inset-[-10%] rounded-full pointer-events-none bg-[radial-gradient(ellipse_65%_40%_at_25%_55%,rgba(255,255,255,0.11)_0%,transparent_55%),radial-gradient(ellipse_45%_65%_at_72%_38%,rgba(255,255,255,0.11)_0%,transparent_55%)] animate-[jack-smokeflare-smoke-rot_10s_linear_infinite]"
        />

        {/* Smoke layer B */}
        <div
          className="absolute inset-[-10%] rounded-full pointer-events-none bg-[radial-gradient(ellipse_55%_50%_at_60%_65%,rgba(255,255,255,0.07)_0%,transparent_50%),radial-gradient(ellipse_40%_55%_at_35%_30%,rgba(255,255,255,0.07)_0%,transparent_50%)] animate-[jack-smokeflare-smoke-rot_14s_linear_infinite_reverse]"
        />

        {/* Bottom glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(ellipse_75%_50%_at_50%_105%,rgba(255,255,255,0.28)_0%,transparent_60%)]" />

        {/* Top glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(ellipse_60%_35%_at_50%_-5%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />

        {/* Sheen */}
        <div className="absolute top-0 left-0 right-0 h-[46%] rounded-t-full rounded-b-[60%] pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-white/12 to-white/3" />

        {/* Floating flares */}
        {FLARES.map((f, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/95 pointer-events-none blur-[0.5px] animate-[jack-smokeflare-flare_4s_ease-in-out_infinite]"
            style={{
              top: f.top,
              left: f.left,
              width: f.w,
              height: f.h,
              animationDelay: f.delay,
            }}
          />
        ))}

        {/* Ripples */}
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="absolute rounded-full w-[70px] h-[70px] bg-white/20 pointer-events-none animate-[jack-smokeflare-ripple_0.7s_ease-out_forwards]"
            style={{
              left: rp.x,
              top: rp.y,
            }}
          />
        ))}

        {/* Content */}
        {loading ? (
          <span
            className="inline-block w-[17px] h-[17px] rounded-full border-2 border-white/25 border-t-white animate-spin"
            aria-label="Loading"
          />
        ) : (
          <motion.span
            className="relative z-10 font-semibold tracking-[0.01em] text-white animate-[jack-smokeflare-text-pulse_3.5s_ease-in-out_infinite]"
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

      {/* Drop shadow below pill */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-[18px] pointer-events-none rounded-full transition-opacity duration-300 opacity-60 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-[6px]"
        style={{
          width: w * 0.72,
        }}
      />
    </div>
  );
}

export default SmokeFlareButton;

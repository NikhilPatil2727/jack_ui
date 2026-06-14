"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Btn02Size = "sm" | "md" | "lg";

export interface Btn02Props
  extends Omit<HTMLMotionProps<"button">, "children"> {
  label?: string;
  size?: Btn02Size;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const sizes: Record<Btn02Size, { w: number; h: number; fs: number }> = {
  sm: { w: 140, h: 42,  fs: 13 },
  md: { w: 210, h: 60,  fs: 18 },
  lg: { w: 280, h: 76,  fs: 22 },
};

const ambientInset: Record<Btn02Size, string> = {
  sm: "-14px",
  md: "-20px",
  lg: "-28px",
};

// ─── Keyframes only (Tailwind can't express these) ───────────────────────────

const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@600&display=swap');

@keyframes jackSmokeRot {
  from { transform: rotate(0deg) scale(1); }
  to   { transform: rotate(360deg) scale(1.04); }
}
@keyframes jackFlare {
  0%,100% { transform: translate(0,0) scale(1); opacity:.8; }
  33%      { transform: translate(3px,-5px) scale(1.4); opacity:1; }
  66%      { transform: translate(-2px,4px) scale(.75); opacity:.5; }
}
@keyframes jackTextPulse {
  0%,100% {
    text-shadow: 0 0 12px #fff, 0 0 28px rgba(255,255,255,.85),
                 0 0 55px rgba(255,255,255,.5), 0 0 100px rgba(255,255,255,.2);
  }
  50% {
    text-shadow: 0 0 16px #fff, 0 0 40px rgba(255,255,255,.95),
                 0 0 80px rgba(255,255,255,.65), 0 0 130px rgba(255,255,255,.3);
  }
}
@keyframes jackRipple {
  0%   { transform: translate(-50%,-50%) scale(0); opacity:.6; }
  100% { transform: translate(-50%,-50%) scale(4.5); opacity:0; }
}
@keyframes jackSpin {
  to { transform: rotate(360deg); }
}
`;

let styleInjected = false;
function injectStyle() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  styleInjected = true;
}

// ─── Flare positions ──────────────────────────────────────────────────────────

const FLARES = [
  { top: "32%", left: "19%", w: 3,   h: 3,   delay: "0s"   },
  { top: "62%", left: "73%", w: 2.5, h: 2.5, delay: ".7s"  },
  { top: "72%", left: "45%", w: 2,   h: 2,   delay: "1.3s" },
  { top: "24%", left: "60%", w: 1.8, h: 1.8, delay: "2s"   },
  { top: "55%", left: "28%", w: 2.2, h: 2.2, delay: "2.8s" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Btn02({
  label = "Get Started",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  style,
  ...rest
}: Btn02Props) {
  injectStyle();

  const { w, h, fs } = sizes[size];
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled || loading) return;
    const rect = btnRef.current!.getBoundingClientRect();
    const id = nextId.current++;
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 750);
    onClick?.(e);
  };

  return (
    /* Outer wrapper */
    <div className="relative inline-flex items-center justify-center">

    {/* Ambient outer glow */}
    <div
      className="absolute rounded-full pointer-events-none transition-opacity duration-400 opacity-70 hover:opacity-100"
      style={{
        inset: ambientInset[size],
        background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.12) 0%, transparent 65%)",
        filter: "blur(18px)",
      }}
    />

    {/* Button */}
    <motion.button
      ref={btnRef}
      className={[
        // layout
        "relative inline-flex items-center justify-center overflow-hidden",
        // shape
        "rounded-full",
        // interaction
        "cursor-pointer outline-none border-0 bg-transparent select-none",
        "-webkit-tap-highlight-color-transparent",
        // hover / active scale (Tailwind)
        "hover:scale-[1.035] active:scale-[0.975]",
        // transition
        "transition-transform duration-[180ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
        // disabled
        "disabled:opacity-[.42] disabled:cursor-not-allowed disabled:pointer-events-none",
      ].join(" ")}
      disabled={disabled || loading}
      onClick={handleClick}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ width: w, height: h, ...style }}
      {...rest}
    >
      {/* Dark body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(180deg, #1e1e1e 0%, #0a0a0a 100%)" }}
      />

      {/* Outer border */}
      <div
        className="absolute inset-0 rounded-full border border-white/30 transition-[border-color] duration-300 group-hover:border-white/55"
        style={{ borderWidth: "1.5px" }}
      />

      {/* Inner border */}
      <div className="absolute inset-[2px] rounded-full border border-white/[.08]" />

      {/* Smoke A */}
      <div
        className="absolute inset-[-10%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 40% at 25% 55%, rgba(255,255,255,.11) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 65% at 72% 38%, rgba(255,255,255,.11) 0%, transparent 55%)",
          animation: "jackSmokeRot 10s linear infinite",
        }}
      />

      {/* Smoke B */}
      <div
        className="absolute inset-[-10%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 60% 65%, rgba(255,255,255,.07) 0%, transparent 50%), " +
            "radial-gradient(ellipse 40% 55% at 35% 30%, rgba(255,255,255,.07) 0%, transparent 50%)",
          animation: "jackSmokeRot 14s linear infinite reverse",
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 105%, rgba(255,255,255,.28) 0%, transparent 60%)",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% -5%, rgba(255,255,255,.1) 0%, transparent 60%)",
        }}
      />

      {/* Sheen */}
      <div
        className="absolute top-0 left-0 right-0 h-[46%] pointer-events-none transition-opacity duration-300"
        style={{
          borderRadius: "999px 999px 60% 60%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.03) 100%)",
        }}
      />

      {/* Floating flares */}
      {FLARES.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/95 pointer-events-none"
          style={{
            top: f.top,
            left: f.left,
            width: f.w,
            height: f.h,
            filter: "blur(1px)",
            animation: `jackFlare 4s ease-in-out infinite`,
            animationDelay: f.delay,
          }}
        />
      ))}

      {/* Ripples */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="absolute rounded-full w-[70px] h-[70px] bg-white/20 pointer-events-none"
          style={{
            left: rp.x,
            top: rp.y,
            animation: "jackRipple .7s ease-out forwards",
          }}
        />
      ))}

      {/* Content */}
      {loading ? (
        <span
          className="inline-block w-[17px] h-[17px] rounded-full border-2 border-white/25 border-t-white"
          style={{ animation: "jackSpin .72s linear infinite" }}
          aria-label="Loading"
        />
      ) : (
        <motion.span
          className="relative z-10 font-semibold tracking-[.01em] text-white"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: fs,
            animation: "jackTextPulse 3.5s ease-in-out infinite",
          }}
          layoutId="btn02-text"
        >
          {label}
        </motion.span>
      )}
    </motion.button>

    {/* Drop shadow below pill */}
    <div
      className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-[18px] pointer-events-none rounded-full transition-opacity duration-300 opacity-60 hover:opacity-100"
      style={{
        width: w * 0.72,
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.15) 0%, transparent 70%)",
        filter: "blur(6px)",
      }}
    />
  </div>
  );
}

export default Btn02;
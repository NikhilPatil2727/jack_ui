"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface SparkButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  /**
   * Main text label on the button.
   * @default "Get Started"
   */
  label?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

// Violet–purple spark palette
const SPARK_COLORS = [
  "#c084fc", // violet-400
  "#a855f7", // purple-500
  "#7c3aed", // violet-600
  "#e879f9", // fuchsia-400
  "#f0abfc", // fuchsia-300
  "#ffffff", // white flash
  "#d8b4fe", // violet-300
];

/**
 * @component
 * @name Spark Button
 * @author Jack UI (@Nikhil_PATIL)
 * @description A premium, highly interactive black button with an animated violet gradient border ring, purple heat shimmer, violet scanline sweep, and a dynamic canvas spark burst on click.
 * 
 * Use Cases:
 * - Hero Sections: Perfect for the primary Call-To-Action (CTA) in a dark-themed hero section where you want to instantly grab the user's attention.
 * - Feature Sections: Great for "Unlock Pro" or "Get Started" buttons within feature comparison grids.
 * - High-Intent Actions: Use it for the final "Submit" or "Checkout" button to provide a satisfying, tactile reward (the spark burst) upon completion.
 * 
 * Features:
 * - Fully GPU-accelerated Framer Motion animations.
 * - Custom HTML5 Canvas particle system for the spark burst.
 * - Magnetic pull effect on hover for enhanced interactivity.
 */
export function SparkButton({
  className,
  label = "Get Started",
  onClick,
  disabled,
  type = "button",
  ...props
}: SparkButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [fired, setFired] = useState(false);

  // Magnetic pull
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagX = useSpring(magnetX, { stiffness: 200, damping: 22 });
  const springMagY = useSpring(magnetY, { stiffness: 200, damping: 22 });

  // Heat shimmer tracks horizontal mouse
  const mouseXRaw = useMotionValue(0.5);
  const springHeat = useSpring(mouseXRaw, { stiffness: 130, damping: 26 });
  const heatOpacity = useTransform(springHeat, [0, 0.5, 1], [0.25, 0.7, 0.25]);

  // Scanline Y
  const scanY = useMotionValue(-20);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      magnetX.set((relX - 0.5) * 10);
      magnetY.set((relY - 0.5) * 6);
      mouseXRaw.set(relX);
    },
    [magnetX, magnetY, mouseXRaw, disabled]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
    scanY.set(-20);
    animate(scanY, 58, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
  }, [scanY, disabled]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    magnetX.set(0);
    magnetY.set(0);
    mouseXRaw.set(0.5);
  }, [magnetX, magnetY, mouseXRaw]);

  // Violet spark burst
  const spawnParticles = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || !canvasRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const originX = e.clientX - rect.left;
      const originY = e.clientY - rect.top;

      particlesRef.current = Array.from({ length: 32 }, (_, i) => {
        const angle = (i / 32) * Math.PI * 2 + Math.random() * 0.3;
        const speed = 2.2 + Math.random() * 3.8;
        return {
          id: Date.now() + i,
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.8,
          size: 1.4 + Math.random() * 3.0,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        };
      });
    },
    []
  );

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const syncSize = () => {
      if (buttonRef.current && canvasRef.current) {
        const r = buttonRef.current.getBoundingClientRect();
        canvasRef.current.width = r.width;
        canvasRef.current.height = r.height;
      }
    };

    syncSize();
    window.addEventListener("resize", syncSize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.11;
        p.vx *= 0.972;
        p.size *= 0.91;

        if (p.size <= 0.22) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", syncSize);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      spawnParticles(e);
      setFired(true);
      setTimeout(() => setFired(false), 1400);
      onClick?.(e);
    },
    [spawnParticles, onClick, disabled]
  );

  return (
    <motion.div
      style={{ x: springMagX, y: springMagY }}
      className="inline-flex relative"
    >
      {/* ── Animated violet gradient border ring ── */}
      <motion.div
        className="absolute -inset-[1px] rounded-[10px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #7c3aed, #a855f7, #e879f9, #c084fc, #7c3aed)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: hovered
            ? ["0% 0%", "100% 100%", "0% 0%"]
            : "50% 50%",
          opacity: hovered ? 1 : 0.3,
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
          opacity: { duration: 0.35 },
        }}
        aria-hidden="true"
      />

      {/* ── Outer violet glow bloom ── */}
      <motion.div
        className="absolute -inset-3 rounded-[21px] pointer-events-none blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.35) 0%, transparent 70%)",
        }}
        animate={{
          opacity: pressed ? 0.6 : hovered ? 1 : 0,
          scale: hovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {/* ── Drop shadow bloom ── */}
      <motion.div
        className="absolute -inset-x-0.5 bottom-0 h-5 rounded-full blur-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.5) 0%, transparent 70%)",
        }}
        animate={{
          opacity: pressed ? 0.3 : hovered ? 0.9 : 0.2,
          scaleY: pressed ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />

      {/* ── Spark canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50 rounded-[9px] w-full h-full mix-blend-screen"
        aria-hidden="true"
      />

      {/* ── Button ── */}
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onClick={handleClick}
        disabled={disabled}
        type={type}
        animate={{
          scale: pressed ? 0.963 : 1,
          y: pressed ? 1.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={cn(
          // Shape
          "relative group isolate w-fit px-3 h-[38px] rounded-[9px] select-none overflow-hidden outline-none cursor-pointer",
          // Disabled
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          // Focus
          "focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          // Background — pure deep black
          "bg-[#050505]",
          // Shadow
          pressed
            ? "shadow-[inset_0_4px_12px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.02)]"
            : "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.8),0_10px_32px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.6)]",
          className
        )}
        aria-label={fired ? "Action triggered" : label}
        {...props}
      >
        {/* ── Fine noise grain ── */}
        <span
          className="absolute inset-0 pointer-events-none opacity-[0.022] bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,rgba(255,255,255,1)_1px,rgba(255,255,255,1)_2px)] bg-[size:2px_100%]"
          aria-hidden="true"
        />

        {/* ── Top soft highlight ── */}
        <span
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(192,132,252,0.08)_0%,transparent_60%)]"
          aria-hidden="true"
        />

        {/* ── Violet heat shimmer ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: heatOpacity }}
          animate={{ opacity: hovered ? undefined : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(139,92,246,0.3)_0%,transparent_65%)]" />
        </motion.span>

        {/* ── Violet scanline sweep ── */}
        <motion.span
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{
            top: scanY,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(192,132,252,0.4) 15%, rgba(232,121,249,1) 50%, rgba(192,132,252,0.4) 85%, transparent 100%)",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* ── Violet inner glow on hover ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: hovered
              ? "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)"
              : "none",
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        />

        {/* ── Click violet flash ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,132,252,0.75) 0%, transparent 65%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: fired ? [0, 0.6, 0] : 0 }}
          transition={{ duration: 0.4, times: [0, 0.1, 1] }}
          aria-hidden="true"
        />

        {/* ── Label ── */}
        <span className="relative z-10 flex items-center justify-center gap-1.5">

          {/* Left violet spark bars */}
          <motion.span
            className="flex items-end gap-[2px]"
            animate={{ opacity: hovered ? 1 : 0.2 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            {[4, 8, 5].map((h, i) => (
              <motion.span
                key={i}
                className="block w-[1.5px] rounded-full"
                style={{
                  height: h,
                  background: hovered
                    ? "linear-gradient(to top, #7c3aed, #e879f9)"
                    : "#6d28d9",
                }}
                animate={
                  hovered
                    ? {
                        scaleY: [1, 1.5, 0.7, 1.3, 1],
                        opacity: [0.5, 1, 0.6, 1, 0.7],
                      }
                    : { scaleY: 1, opacity: 0.5 }
                }
                transition={{
                  duration: 1.0,
                  delay: i * 0.1,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 0.6,
                }}
              />
            ))}
          </motion.span>

          {/* Text */}
          <motion.span
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
            }}
            className="text-[11.5px] font-[600] tracking-[0.1em] uppercase"
            animate={{
              color: fired
                ? "#f5f3ff"
                : hovered
                ? "#ddd6fe"
                : "#6d28d9",
              textShadow: hovered
                ? "0 0 16px rgba(167,139,250,0.7), 0 0 32px rgba(139,92,246,0.35)"
                : "none",
            }}
            transition={{ duration: 0.2 }}
          >
            {fired ? "Activated" : label}
          </motion.span>

          {/* Right violet spark bars (mirrored) */}
          <motion.span
            className="flex items-end gap-[2px] scale-x-[-1]"
            animate={{ opacity: hovered ? 1 : 0.2 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            {[4, 8, 5].map((h, i) => (
              <motion.span
                key={i}
                className="block w-[1.5px] rounded-full"
                style={{
                  height: h,
                  background: hovered
                    ? "linear-gradient(to top, #7c3aed, #e879f9)"
                    : "#6d28d9",
                }}
                animate={
                  hovered
                    ? {
                        scaleY: [1, 1.5, 0.7, 1.3, 1],
                        opacity: [0.5, 1, 0.6, 1, 0.7],
                      }
                    : { scaleY: 1, opacity: 0.5 }
                }
                transition={{
                  duration: 1.0,
                  delay: i * 0.1 + 0.15,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 0.6,
                }}
              />
            ))}
          </motion.span>

        </span>
      </motion.button>
    </motion.div>
  );
}

export default SparkButton;

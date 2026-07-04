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
   * @default "Click me 🎉"
   */
  label?: string;
}

// Particle that bursts on click
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const METAL_COLORS = ["#e8e0d0", "#c8bfaa", "#a89f8c", "#d4c9b0", "#f0e8d8"];

/**
 * SparkButton
 *
 * A premium button featuring brushed metal grain, glowing heat effects,
 * a laser scanline sweep, and real-time canvas sparks particle burst.
 *
 * @author Jack UI
 * @version 1.2.0
 * @see {@link SparkButtonProps} for details on customisation.
 */
export function SparkButton({
  className,
  label = "Click me 🎉",
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
  const [forged, setForged] = useState(false);

  // Magnetic pull effect
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagX = useSpring(magnetX, { stiffness: 180, damping: 18 });
  const springMagY = useSpring(magnetY, { stiffness: 180, damping: 18 });

  // Heat shimmer: tracks horizontal mouse for a forge-heat color shift
  const mouseXRaw = useMotionValue(0.5);
  const springHeat = useSpring(mouseXRaw, { stiffness: 120, damping: 24 });
  const heatOpacity = useTransform(springHeat, [0, 0.5, 1], [0.4, 0.85, 0.4]);

  // Scan line Y position on hover
  const scanY = useMotionValue(-20);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      // Magnetic: subtle pull toward cursor (max 6px offset)
      magnetX.set((relX - 0.5) * 12);
      magnetY.set((relY - 0.5) * 8);
      mouseXRaw.set(relX);
    },
    [magnetX, magnetY, mouseXRaw, disabled]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
    // Scan line sweeps top → bottom
    scanY.set(-20);
    animate(scanY, 72, { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] });
  }, [scanY, disabled]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    magnetX.set(0);
    magnetY.set(0);
    mouseXRaw.set(0.5);
  }, [magnetX, magnetY, mouseXRaw]);

  // Particle burst on click
  const spawnParticles = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || !canvasRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const originX = e.clientX - rect.left;
      const originY = e.clientY - rect.top;

      const burst: Particle[] = Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 1.8 + Math.random() * 3.2;
        return {
          id: Date.now() + i,
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: 1.5 + Math.random() * 2.5,
          color: METAL_COLORS[Math.floor(Math.random() * METAL_COLORS.length)],
        };
      });
      particlesRef.current = burst;
    },
    []
  );

  // Animate canvas particles (using high-performance in-place mutations)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      if (buttonRef.current && canvasRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14; // Gravity acceleration
        p.vx *= 0.97; // Air drag
        p.size *= 0.93; // Spark decay

        if (p.size <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#e8d5a0";
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      spawnParticles(e);
      setForged(true);
      setTimeout(() => setForged(false), 1600);
      onClick?.(e);
    },
    [spawnParticles, onClick, disabled]
  );

  return (
    <motion.div
      style={{ x: springMagX, y: springMagY }}
      className="inline-flex relative"
    >
      {/* Particle canvas — sits outside button in absolute overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50 rounded-[10px] w-full h-full mix-blend-screen"
        aria-hidden="true"
      />

      {/* Outer anvil shadow */}
      <motion.div
        className="absolute -inset-x-1 bottom-0 h-3 rounded-full blur-lg pointer-events-none bg-[radial-gradient(ellipse,#8b7355_0%,transparent_70%)]"
        animate={{
          opacity: pressed ? 0.3 : hovered ? 0.7 : 0.25,
          scaleY: pressed ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />

      {/* The button itself */}
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
          scale: pressed ? 0.96 : 1,
          y: pressed ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative group isolate w-[180px] h-[52px] rounded-[10px] select-none overflow-hidden outline-none border border-white/5 focus-visible:ring-2 focus-visible:ring-[#c8a96e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none transition-shadow",
          "bg-[linear-gradient(168deg,#2a2520_0%,#1a1714_30%,#0f0d0b_50%,#1a1714_70%,#2a2520_100%)]",
          pressed
            ? "shadow-[inset_0_3px_8px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.04)]"
            : "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.5),0_6px_24px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.4)]",
          className
        )}
        aria-label={forged ? "Forged Click Action Successful" : label}
        {...props}
      >
        {/* ── Brushed metal grain texture ── */}
        <span
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,rgba(255,255,255,0.8)_1px,rgba(255,255,255,0.8)_2px)] bg-[size:3px_100%]"
          aria-hidden="true"
        />

        {/* ── Forge heat glow — molten orange core ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: heatOpacity }}
          animate={{ opacity: hovered ? undefined : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(200,120,30,0.28)_0%,transparent_70%)]" />
        </motion.span>

        {/* ── Scan line sweep on hover ── */}
        <motion.span
          className="absolute left-0 right-0 h-[1.5px] pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(230,200,140,0.7)_20%,rgba(255,240,180,0.95)_50%,rgba(230,200,140,0.7)_80%,transparent_100%)]"
          style={{ top: scanY }}
          animate={{ opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* ── Top specular edge highlight ── */}
        <span
          className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none bg-[linear-gradient(90deg,transparent_5%,rgba(255,245,220,0.15)_20%,rgba(255,245,220,0.35)_50%,rgba(255,245,220,0.15)_80%,transparent_95%)]"
          aria-hidden="true"
        />

        {/* ── Hover fill: dark copper wash ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(160,100,30,0.12)_0%,rgba(100,70,20,0.08)_50%,rgba(160,100,30,0.14)_100%)]"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        />

        {/* ── Forged state: white hot flash ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,240,200,0.9)_0%,transparent_70%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: forged ? [0, 0.55, 0] : 0 }}
          transition={{ duration: 0.5, times: [0, 0.15, 1] }}
          aria-hidden="true"
        />

        {/* ── Label ── */}
        <span className="relative z-10 flex items-center justify-center gap-3">
          {/* Forge mark — decorative notch */}
          <motion.span
            className="flex items-center gap-[3px]"
            animate={{ opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block rounded-full bg-[#c8a050]"
                style={{ width: i === 1 ? 3 : 2, height: i === 1 ? 10 : 6 }}
                animate={{ scaleY: hovered ? [1, 1.3, 1] : 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 1.2,
                }}
              />
            ))}
          </motion.span>

          {/* Text */}
          <motion.span
            className="font-[550] tracking-[0.12em] uppercase text-[13px] text-shadow-[0_1px_0_rgba(0,0,0,0.9)] hover:text-shadow-[0_0_12px_rgba(200,160,80,0.5),0_1px_0_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.14em",
            }}
            animate={{
              color: forged ? "#fff8e7" : hovered ? "#e8d5a8" : "#b8a880",
            }}
            transition={{ duration: 0.25 }}
          >
            {forged ? "Clicked" : label}
          </motion.span>

          {/* Forge mark — right side */}
          <motion.span
            className="flex items-center gap-[3px] scale-x-[-1]"
            animate={{ opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block rounded-full bg-[#c8a050]"
                style={{ width: i === 1 ? 3 : 2, height: i === 1 ? 10 : 6 }}
                animate={{ scaleY: hovered ? [1, 1.3, 1] : 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08 + 0.1,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 1.2,
                }}
              />
            ))}
          </motion.span>
        </span>

        {/* ── Bottom inset shadow for depth ── */}
        <span className="absolute left-0 right-0 bottom-0 h-[1px] pointer-events-none bg-black/60" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}

export default SparkButton;

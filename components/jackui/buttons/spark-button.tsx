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

// Refined gold-platinum spark palette
const SPARK_COLORS = [
  "#f5e6c8",
  "#e8d5a0",
  "#d4bb78",
  "#c8a84b",
  "#ffffff",
  "#f0e4c4",
];

/**
 * SparkButton
 *
 * A premium enterprise-grade button with brushed metal grain, glowing
 * gradient border ring, heat shimmer, laser scanline sweep, and
 * real-time canvas spark particle burst on click.
 *
 * @author Jack UI
 * @version 2.0.0
 * @see {@link SparkButtonProps} for customisation details.
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

  // Heat shimmer tracks horizontal mouse position
  const mouseXRaw = useMotionValue(0.5);
  const springHeat = useSpring(mouseXRaw, { stiffness: 130, damping: 26 });
  const heatOpacity = useTransform(springHeat, [0, 0.5, 1], [0.3, 0.75, 0.3]);

  // Scanline Y position
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
    animate(scanY, 72, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
  }, [scanY, disabled]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    magnetX.set(0);
    magnetY.set(0);
    mouseXRaw.set(0.5);
  }, [magnetX, magnetY, mouseXRaw]);

  // Spark burst on click
  const spawnParticles = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || !canvasRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const originX = e.clientX - rect.left;
      const originY = e.clientY - rect.top;

      particlesRef.current = Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.35;
        const speed = 2.0 + Math.random() * 3.5;
        return {
          id: Date.now() + i,
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 1.2 + Math.random() * 2.8,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        };
      });
    },
    []
  );

  // Canvas particle loop
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
        p.vy += 0.12;
        p.vx *= 0.975;
        p.size *= 0.92;

        if (p.size <= 0.25) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#f0d080";
        ctx.shadowBlur = 6;
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
      {/* ── Gradient border ring (outer glow layer) ── */}
      <motion.div
        className="absolute -inset-[1.5px] rounded-[12px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,168,75,0.0) 0%, rgba(200,168,75,0.55) 40%, rgba(255,230,120,0.8) 50%, rgba(200,168,75,0.55) 60%, rgba(200,168,75,0.0) 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: hovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          opacity: hovered ? 1 : 0.35,
        }}
        transition={{
          backgroundPosition: { duration: 2.5, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.3 },
        }}
        aria-hidden="true"
      />

      {/* ── Outer depth shadow ── */}
      <motion.div
        className="absolute -inset-x-0.5 bottom-0 h-4 rounded-full blur-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(200,168,75,0.4) 0%, transparent 70%)",
        }}
        animate={{
          opacity: pressed ? 0.2 : hovered ? 0.8 : 0.3,
          scaleY: pressed ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />

      {/* ── Spark canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50 rounded-[10px] w-full h-full mix-blend-screen"
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
          scale: pressed ? 0.965 : 1,
          y: pressed ? 1.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={cn(
          // Base shape
          "relative group isolate w-[200px] h-[52px] rounded-[10px] select-none overflow-hidden outline-none cursor-pointer",
          // Disabled
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          // Focus ring
          "focus-visible:ring-2 focus-visible:ring-[#c8a84b]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080706]",
          // Background — deep forge steel
          "bg-[linear-gradient(160deg,#1e1b16_0%,#131109_40%,#0a0906_55%,#131109_70%,#1e1b16_100%)]",
          // Border — thin warm gold line
          "border border-[#c8a84b]/30",
          // Shadow
          pressed
            ? "shadow-[inset_0_4px_10px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.03)]"
            : "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.6),0_8px_28px_rgba(0,0,0,0.7),0_2px_6px_rgba(0,0,0,0.5)]",
          className
        )}
        aria-label={fired ? "Action triggered" : label}
        {...props}
      >
        {/* ── Fine brushed metal grain ── */}
        <span
          className="absolute inset-0 pointer-events-none opacity-[0.028] bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,rgba(255,255,255,1)_1px,rgba(255,255,255,1)_2px)] bg-[size:2.5px_100%]"
          aria-hidden="true"
        />

        {/* ── Radial vignette top ── */}
        <span
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(255,245,210,0.07)_0%,transparent_65%)]"
          aria-hidden="true"
        />

        {/* ── Heat shimmer on hover ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: heatOpacity }}
          animate={{ opacity: hovered ? undefined : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_105%,rgba(200,130,20,0.22)_0%,transparent_65%)]" />
        </motion.span>

        {/* ── Scanline sweep ── */}
        <motion.span
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{
            top: scanY,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(240,210,120,0.5) 15%, rgba(255,240,160,1) 50%, rgba(240,210,120,0.5) 85%, transparent 100%)",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* ── Top specular edge ── */}
        <span
          className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none bg-[linear-gradient(90deg,transparent_8%,rgba(255,245,200,0.18)_25%,rgba(255,245,200,0.42)_50%,rgba(255,245,200,0.18)_75%,transparent_92%)]"
          aria-hidden="true"
        />

        {/* ── Bottom edge depth ── */}
        <span
          className="absolute left-0 right-0 bottom-0 h-[1px] pointer-events-none bg-black/70"
          aria-hidden="true"
        />

        {/* ── Hover copper wash ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(150deg,rgba(180,120,20,0.10)_0%,rgba(120,80,10,0.06)_50%,rgba(180,120,20,0.12)_100%)]"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* ── Click flash ── */}
        <motion.span
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(255,245,190,0.85)_0%,transparent_65%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: fired ? [0, 0.5, 0] : 0 }}
          transition={{ duration: 0.45, times: [0, 0.12, 1] }}
          aria-hidden="true"
        />

        {/* ── Label ── */}
        <span className="relative z-10 flex items-center justify-center gap-2.5">

          {/* Left spark indicator */}
          <motion.span
            className="flex items-end gap-[2.5px]"
            animate={{ opacity: hovered ? 1 : 0.28 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            {[4, 7, 5].map((h, i) => (
              <motion.span
                key={i}
                className="block w-[1.5px] rounded-full bg-[#c8a84b]"
                style={{ height: h }}
                animate={
                  hovered
                    ? { scaleY: [1, 1.4, 0.8, 1.2, 1], opacity: [0.6, 1, 0.7, 1, 0.8] }
                    : { scaleY: 1, opacity: 0.6 }
                }
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 0.8,
                }}
              />
            ))}
          </motion.span>

          {/* Text */}
          <motion.span
            style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
            className="text-[12.5px] font-[600] tracking-[0.18em] uppercase"
            animate={{
              color: fired
                ? "#fffbf0"
                : hovered
                ? "#f0dea0"
                : "#a89060",
              textShadow: hovered
                ? "0 0 14px rgba(200,168,75,0.45), 0 1px 0 rgba(0,0,0,0.95)"
                : "0 1px 0 rgba(0,0,0,0.9)",
            }}
            transition={{ duration: 0.22 }}
          >
            {fired ? "Activated" : label}
          </motion.span>

          {/* Right spark indicator (mirrored) */}
          <motion.span
            className="flex items-end gap-[2.5px] scale-x-[-1]"
            animate={{ opacity: hovered ? 1 : 0.28 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            {[4, 7, 5].map((h, i) => (
              <motion.span
                key={i}
                className="block w-[1.5px] rounded-full bg-[#c8a84b]"
                style={{ height: h }}
                animate={
                  hovered
                    ? { scaleY: [1, 1.4, 0.8, 1.2, 1], opacity: [0.6, 1, 0.7, 1, 0.8] }
                    : { scaleY: 1, opacity: 0.6 }
                }
                transition={{
                  duration: 0.9,
                  delay: i * 0.1 + 0.12,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 0.8,
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

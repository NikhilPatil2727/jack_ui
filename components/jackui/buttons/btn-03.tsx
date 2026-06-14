"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, animate, type HTMLMotionProps } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

interface Btn03Props extends Omit<HTMLMotionProps<"button">, "ref"> {
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

export default function Btn03({ className, label = "Click me 🎉", onClick, ...props }: Btn03Props) {
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // Magnetic: subtle pull toward cursor (max 6px)
    magnetX.set((relX - 0.5) * 12);
    magnetY.set((relY - 0.5) * 8);
    mouseXRaw.set(relX);
  }, [magnetX, magnetY, mouseXRaw]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    // Scan line sweeps top → bottom
    scanY.set(-20);
    animate(scanY, 72, { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] });
  }, [scanY]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    magnetX.set(0);
    magnetY.set(0);
    mouseXRaw.set(0.5);
  }, [magnetX, magnetY, mouseXRaw]);

  // Particle burst on click
  const spawnParticles = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
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
  }, []);

  // Animate canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions to match button
    const updateCanvasSize = () => {
      if (buttonRef.current && canvasRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.14,
          vx: p.vx * 0.97,
          size: p.size * 0.93,
        }))
        .filter((p) => p.size > 0.3);

      for (const p of particlesRef.current) {
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
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    spawnParticles(e);
    setForged(true);
    setTimeout(() => setForged(false), 1600);
    onClick?.(e);
  }, [spawnParticles, onClick]);

  // Separate props that shouldn't be passed to motion.button
  const { disabled, type, form, formAction, formEncType, formMethod, formNoValidate, formTarget, name, value, ...restProps } = props;

  return (
    <motion.div
      style={{ x: springMagX, y: springMagY }}
      className="inline-flex relative"
    >
      {/* Particle canvas — sits outside button in absolute overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50 rounded-[10px] w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Outer anvil shadow */}
      <motion.div
        aria-hidden
        className="absolute -inset-x-1 bottom-0 h-3 rounded-full blur-lg pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #8b7355 0%, transparent 70%)",
        }}
        animate={{ opacity: pressed ? 0.3 : hovered ? 0.7 : 0.25, scaleY: pressed ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* The button itself */}
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onClick={handleClick}
        disabled={disabled}
        type={type}
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        name={name}
        value={value}
        {...restProps}
        animate={{
          scale: pressed ? 0.96 : 1,
          y: pressed ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative group isolate",
          "w-[180px] h-[52px]",
          "rounded-[10px]",
          "outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]",
          "cursor-pointer select-none",
          "overflow-hidden",
          className
        )}
        style={{
          // Brushed metal base via layered gradients
          background: `
            linear-gradient(
              168deg,
              #2a2520 0%,
              #1a1714 30%,
              #0f0d0b 50%,
              #1a1714 70%,
              #2a2520 100%
            )
          `,
          boxShadow: pressed
            ? "inset 0 3px 8px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.04)"
            : "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5), 0 6px 24px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Brushed metal grain texture ── */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.8) 1px,
              rgba(255,255,255,0.8) 2px
            )`,
            backgroundSize: "3px 100%",
          }}
        />

        {/* ── Forge heat glow — molten orange core ── */}
        <motion.span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: heatOpacity }}
          animate={{ opacity: hovered ? undefined : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,120,30,0.28) 0%, transparent 70%)",
            }}
          />
        </motion.span>

        {/* ── Scan line sweep on hover ── */}
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
          style={{
            top: scanY,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(230,200,140,0.7) 20%, rgba(255,240,180,0.95) 50%, rgba(230,200,140,0.7) 80%, transparent 100%)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Top specular edge highlight ── */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,245,220,0.15) 20%, rgba(255,245,220,0.35) 50%, rgba(255,245,220,0.15) 80%, transparent 95%)",
          }}
        />

        {/* ── Hover fill: dark copper wash ── */}
        <motion.span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(160,100,30,0.12) 0%, rgba(100,70,20,0.08) 50%, rgba(160,100,30,0.14) 100%)",
          }}
        />

        {/* ── Forged state: white hot flash ── */}
        <motion.span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: forged ? [0, 0.55, 0] : 0 }}
          transition={{ duration: 0.5, times: [0, 0.15, 1] }}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,240,200,0.9) 0%, transparent 70%)",
          }}
        />

        {/* ── Label ── */}
        <span className="relative z-10 flex items-center justify-center gap-3">
          {/* Forge mark — decorative notch */}
          <motion.span
            aria-hidden
            className="flex items-center gap-[3px]"
            animate={{ opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
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
            className="font-[550] tracking-[0.12em] uppercase text-[13px]"
            style={{
              fontFamily: "'DM Mono', 'Courier New', monospace",
              color: forged ? "#fff8e7" : "#d4c4a0",
              textShadow: hovered
                ? "0 0 12px rgba(200,160,80,0.5), 0 1px 0 rgba(0,0,0,0.8)"
                : "0 1px 0 rgba(0,0,0,0.9)",
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
            aria-hidden
            className="flex items-center gap-[3px] scale-x-[-1]"
            animate={{ opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
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
        <span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[1px] pointer-events-none"
          style={{ background: "rgba(0,0,0,0.6)" }}
        />
      </motion.button>
    </motion.div>
  );
}
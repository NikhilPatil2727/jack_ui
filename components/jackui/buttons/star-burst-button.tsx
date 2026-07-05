"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface StarBurstButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
  > {
  /**
   * The list of glyphs to explode.
   * @default ["★", "✦", "✧", "✩", "✫", "✬"]
   */
  glyphs?: string[];
  /**
   * The pool of colors for the star particles.
   * @default ["#a78bfa", "#fbbf24", "#f0abfc", "#60a5fa", "#34d399", "#fb923c"]
   */
  colors?: string[];
  /**
   * The number of particles generated per click. If not specified, a random count between 6 and 8 is used.
   */
  particleCount?: number;
  /**
   * Minimum duration of a particle animation in milliseconds.
   * @default 580
   */
  minDuration?: number;
  /**
   * Maximum duration of a particle animation in milliseconds.
   * @default 720
   */
  maxDuration?: number;
  /**
   * Callback triggered after all explosions in a click settle.
   */
  onSuccess?: () => void;
}

interface StarParticle {
  id: string;
  x: number;
  y: number;
  glyph: string;
  color: string;
  size: number;
  dx: number;
  dy: number;
  rotate: number;
  delay: number;
  duration: number;
}

const DEFAULT_GLYPHS = ["★", "✦", "✧", "✩", "✫", "✬"];
const DEFAULT_COLORS = [
  "#ff0055", // Hot Pink
  "#00ffcc", // Neon Cyan
  "#ffcc00", // Bright Gold
  "#ff3300", // Vivid Red-Orange
  "#9933ff", // Intense Violet
  "#33ff00", // Electric Green
];

/**
 * StarBurstButton — colorful star glyphs explode outward from the exact click point
 * relative to the button. Features clean physics-like trajectories, custom configurations,
 * full ref-forwarding, and system level reduced-motion accessibility.
 */
export const StarBurstButton = React.forwardRef<
  HTMLButtonElement,
  StarBurstButtonProps
>(
  (
    {
      children,
      onClick,
      onSuccess,
      className,
      disabled,
      glyphs = DEFAULT_GLYPHS,
      colors = DEFAULT_COLORS,
      particleCount,
      minDuration = 580,
      maxDuration = 720,
      ...props
    },
    ref
  ) => {
    const [particles, setParticles] = React.useState<StarParticle[]>([]);
    const shouldReduceMotion = useReducedMotion();
    const uniqueCounter = React.useRef(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);

      if (shouldReduceMotion) {
        onSuccess?.();
        return;
      }

      // Calculate click point relative to the button bounds
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const count = particleCount ?? (6 + Math.floor(Math.random() * 3));
      const newParticles: StarParticle[] = Array.from({ length: count }, (_, i) => {
        const angle =
          (i / count) * Math.PI * 2 -
          Math.PI / 2 +
          (Math.random() - 0.5) * 0.85;
        const dist = 40 + Math.random() * 38;
        const dur = minDuration + Math.random() * (maxDuration - minDuration);
        const pId = `${Date.now()}-${uniqueCounter.current++}`;

        return {
          id: pId,
          x: clickX,
          y: clickY,
          glyph: glyphs[i % glyphs.length],
          color: colors[i % colors.length],
          size: 14 + Math.random() * 10,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          rotate: (Math.random() - 0.5) * 130,
          delay: i * 28,
          duration: dur,
        };
      });

      setParticles((prev) => [...prev, ...newParticles]);

      const totalTtl = Math.max(...newParticles.map((p) => p.duration + p.delay)) + 80;
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
        onSuccess?.();
      }, totalTtl);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 h-[42px]",
          "text-sm font-medium tracking-wide text-white bg-zinc-950 dark:bg-zinc-900 border border-white/10 rounded-xl cursor-pointer outline-none select-none",
          "hover:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors duration-150",
          "disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          className
        )}
        disabled={disabled}
        onClick={handleClick}
        whileHover={shouldReduceMotion ? {} : { y: -1 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        {...props}
      >
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden="true"
              className="absolute pointer-events-none select-none z-50 line-height-none flex items-center justify-center font-sans font-bold"
              style={{
                left: p.x,
                top: p.y,
                color: p.color,
                fontSize: `${p.size}px`,
                textShadow: "1px 1px 0px rgba(0,0,0,0.7), -1px -1px 0px rgba(0,0,0,0.7), 1px -1px 0px rgba(0,0,0,0.7), -1px 1px 0px rgba(0,0,0,0.7)",
              }}
              initial={{
                x: "-50%",
                y: "-50%",
                scale: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: `calc(-50% + ${p.dx}px)`,
                y: `calc(-50% + ${p.dy}px)`,
                scale: 1,
                rotate: p.rotate,
                opacity: [1, 1, 0],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: p.duration / 1000,
                delay: p.delay / 1000,
                ease: [0.2, 0.8, 0.35, 1],
              }}
            >
              {p.glyph}
            </motion.span>
          ))}
        </AnimatePresence>
        <span className="relative z-10 flex items-center gap-2">
          {children ?? "Click me"}
        </span>
      </motion.button>
    );
  }
);

StarBurstButton.displayName = "StarBurstButton";

export default StarBurstButton;

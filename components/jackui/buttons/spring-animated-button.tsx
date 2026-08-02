"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface SpringAnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  /**
   * Main text label on the button.
   * @default "Button"
   */
  label?: string;
  /**
   * Rotation duration in seconds for the single spring to complete one full loop.
   * @default 2.5
   */
  speed?: number;
}

/**
 * @component
 * @name Spring Animated Button
 * @description A button with a single spring segment that continuously rotates and travels around the entire perimeter (Top -> Right -> Bottom -> Left).
 */
export function SpringAnimatedButton({
  className,
  label = "Button",
  speed = 2.5,
  disabled,
  type = "button",
  ...props
}: SpringAnimatedButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState({ width: 180, height: 48 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setSize({ width: rect.width, height: rect.height });
        }
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate the single spring path and compute perimeter dimensions
  const { springPath, totalPerimeter, springSegmentLength } = useMemo(() => {
    const width = size.width;
    const height = size.height;
    const pad = 8;
    const cornerRadius = 12;
    const targetWavelength = 14;
    const amplitude = 3.5;

    const r = Math.min(cornerRadius, (width - pad * 2) / 2, (height - pad * 2) / 2);
    const xMin = pad + r;
    const xMax = width - pad - r;
    const yMin = pad + r;
    const yMax = height - pad - r;

    const topLen = Math.max(0, xMax - xMin);
    const rightLen = Math.max(0, yMax - yMin);
    const bottomLen = topLen;
    const leftLen = rightLen;
    const arcLen = (Math.PI / 2) * r;

    const perimeter = topLen + arcLen + rightLen + arcLen + bottomLen + arcLen + leftLen + arcLen;
    if (perimeter <= 0) return { springPath: "", totalPerimeter: 100, springSegmentLength: 30 };

    // Force an exact integer number of waves so the loop connects seamlessly
    const waveCount = Math.max(4, Math.round(perimeter / targetWavelength));
    const waveLen = perimeter / waveCount;

    const getPointAndNormal = (dist: number) => {
      let s = dist % perimeter;
      if (s < 0) s += perimeter;

      // 1. Top straight
      if (s < topLen) {
        const t = s / topLen;
        return { x: xMin + t * topLen, y: pad, nx: 0, ny: -1 };
      }
      s -= topLen;

      // 2. Top-Right arc
      if (s < arcLen) {
        const angle = -Math.PI / 2 + (s / arcLen) * (Math.PI / 2);
        return {
          x: xMax + Math.cos(angle) * r,
          y: yMin + Math.sin(angle) * r,
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        };
      }
      s -= arcLen;

      // 3. Right straight
      if (s < rightLen) {
        const t = s / rightLen;
        return { x: width - pad, y: yMin + t * rightLen, nx: 1, ny: 0 };
      }
      s -= rightLen;

      // 4. Bottom-Right arc
      if (s < arcLen) {
        const angle = (s / arcLen) * (Math.PI / 2);
        return {
          x: xMax + Math.cos(angle) * r,
          y: yMax + Math.sin(angle) * r,
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        };
      }
      s -= arcLen;

      // 5. Bottom straight
      if (s < bottomLen) {
        const t = s / bottomLen;
        return { x: xMax - t * bottomLen, y: height - pad, nx: 0, ny: 1 };
      }
      s -= bottomLen;

      // 6. Bottom-Left arc
      if (s < arcLen) {
        const angle = Math.PI / 2 + (s / arcLen) * (Math.PI / 2);
        return {
          x: xMin + Math.cos(angle) * r,
          y: yMax + Math.sin(angle) * r,
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        };
      }
      s -= arcLen;

      // 7. Left straight
      if (s < leftLen) {
        const t = s / leftLen;
        return { x: pad, y: yMax - t * leftLen, nx: -1, ny: 0 };
      }
      s -= leftLen;

      // 8. Top-Left arc
      const angle = Math.PI + (s / arcLen) * (Math.PI / 2);
      return {
        x: xMin + Math.cos(angle) * r,
        y: yMin + Math.sin(angle) * r,
        nx: Math.cos(angle),
        ny: Math.sin(angle),
      };
    };

    const stepSize = 1.2;
    const pointsCount = Math.ceil(perimeter / stepSize);
    let path = "";

    for (let i = 0; i <= pointsCount; i++) {
      const s = (i / pointsCount) * perimeter;
      const { x, y, nx, ny } = getPointAndNormal(s);
      const waveOffset = Math.sin((2 * Math.PI * s) / waveLen) * amplitude;
      const px = x + nx * waveOffset;
      const py = y + ny * waveOffset;

      if (i === 0) {
        path += `M ${px.toFixed(2)} ${py.toFixed(2)}`;
      } else {
        path += ` L ${px.toFixed(2)} ${py.toFixed(2)}`;
      }
    }

    path += " Z";

    // Length of the single spring segment (~28% of perimeter to match the diagram)
    const segLen = Math.min(topLen + arcLen * 0.5, perimeter * 0.28);

    return { springPath: path, totalPerimeter: perimeter, springSegmentLength: segLen };
  }, [size.width, size.height]);

  return (
    <motion.button
      ref={containerRef}
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      disabled={disabled}
      type={type}
      className={cn(
        "relative isolate group px-10 py-3.5 rounded-2xl bg-[#09090b] text-white font-medium outline-none cursor-pointer select-none overflow-hidden",
        "focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.6)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="spring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Outer rigid border frame */}
        <rect
          x="1"
          y="1"
          width={Math.max(0, size.width - 2)}
          height={Math.max(0, size.height - 2)}
          rx="15"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
        />

        {/* Faint background track for the spring path */}
        {springPath && (
          <path
            d={springPath}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        )}

        {/* Single spring segment rotating continuously around the entire button */}
        {springPath && totalPerimeter > 0 && (
          <motion.path
            d={springPath}
            fill="none"
            stroke="url(#spring-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${springSegmentLength} ${totalPerimeter - springSegmentLength}`}
            animate={{ strokeDashoffset: [0, -totalPerimeter] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>

      {/* Button Label */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-[15px] tracking-wide text-white/95 group-hover:text-white transition-colors">
        {label}
      </span>

      {/* Ambient hover glow */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.25)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </motion.button>
  );
}

export default SpringAnimatedButton;

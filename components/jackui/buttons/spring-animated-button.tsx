"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, type HTMLMotionProps } from "motion/react";
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
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const spotlightGradient = useMotionTemplate`radial-gradient(120px circle at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.08), transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

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
    const pad = 4;
    const cornerRadius = 16; // Perfectly concentric with outer rounded-[20px]
    const targetWavelength = 8;
    const amplitude = 1.2;

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

    const stepSize = 0.5;
    const pointsCount = Math.ceil(perimeter / stepSize);
    let path = "";
    let truePathLength = 0;
    let prevPx = 0;
    let prevPy = 0;

    // Loop twice to allow the dash to seamlessly wrap around the end of the path
    for (let i = 0; i <= pointsCount * 2; i++) {
      const s = (i / pointsCount) * perimeter;
      const { x, y, nx, ny } = getPointAndNormal(s);
      const waveOffset = Math.sin((2 * Math.PI * s) / waveLen) * amplitude;
      const px = x + nx * waveOffset;
      const py = y + ny * waveOffset;

      if (i === 0) {
        path += `M ${px.toFixed(2)} ${py.toFixed(2)}`;
      } else {
        path += ` L ${px.toFixed(2)} ${py.toFixed(2)}`;
        
        // Measure length of a single full loop
        if (i <= pointsCount) {
          const dx = px - prevPx;
          const dy = py - prevPy;
          truePathLength += Math.sqrt(dx * dx + dy * dy);
        }
      }
      prevPx = px;
      prevPy = py;
    }

    path += " Z";

    // Length of the single spring segment (~28% of a single loop)
    const segLen = truePathLength * 0.28;

    return { springPath: path, totalPerimeter: truePathLength, springSegmentLength: segLen };
  }, [size.width, size.height]);

  return (
    <motion.button
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      disabled={disabled}
      type={type}
      className={cn(
        "relative isolate group px-8 py-3.5 rounded-[20px] bg-gradient-to-b from-[#18181b] to-[#09090b] outline-none cursor-pointer select-none overflow-hidden",
        "focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.4)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Spotlight Hover Effect */}
      <motion.div
        className="absolute -inset-px rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlightGradient }}
        aria-hidden="true"
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-[20px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="spring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          {/* Premium neon glow filter */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rigid border frame */}
        <rect
          x="1"
          y="1"
          width={Math.max(0, size.width - 2)}
          height={Math.max(0, size.height - 2)}
          rx="19"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow)"
            strokeDasharray={`${springSegmentLength} ${totalPerimeter - springSegmentLength}`}
            animate={{ strokeDashoffset: [0, -totalPerimeter] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>

      {/* Button Label with Glow Transition */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2 font-medium text-sm tracking-wide"
        animate={{
          textShadow: isHovered ? "0 0 16px rgba(255, 255, 255, 0.4)" : "none",
          color: isHovered ? "#ffffff" : "rgba(255,255,255,0.7)"
        }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

export default SpringAnimatedButton;

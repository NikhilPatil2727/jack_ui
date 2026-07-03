"use client";

import React, { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Custom Premium SVG Icons (AI Orchestrator Theme) ────────────────────────
const CognitiveIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 2.5 2.5" />
    <path d="M12 9h5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-5M12 5h7a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-7" />
    <path d="M12 19H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h5M12 15H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h7" />
    <circle cx="12" cy="4.5" r="1.5" className="fill-violet-400 animate-pulse" />
    <circle cx="12" cy="19.5" r="1.5" className="fill-violet-400 animate-pulse" />
  </svg>
);

const MemoryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    <line x1="12" y1="8" x2="12" y2="22" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="2" className="fill-emerald-400" />
  </svg>
);

const ToolsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 22V12h6v10M12 2v2M2 12h2M20 12h2" />
    <circle cx="12" cy="8" r="1" className="fill-rose-400 animate-ping" />
  </svg>
);

// ─── Twinkling Star Flare Decoration ─────────────────────────────────────────
const StarFlare = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <g className={className} style={style}>
    <path
      d="M -5 0 Q 0 0 0 -5 Q 0 0 5 0 Q 0 0 0 5 Q 0 0 -5 0 Z"
      fill="#ffffff"
      style={{ filter: "drop-shadow(0 0 4px #ffffff)" }}
    />
  </g>
);

export function CircuitConnections({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const s = (cls: string) => `${cls}-${uid}`;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full max-w-[1200px] mx-auto overflow-hidden transition-colors font-sans p-6 rounded-[14px] bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-xs",
        s("container"),
        className
      )}
    >
      <style>{`
        .${s("container")} {
          /* Style Foundations & Tokens */
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          font-size: 13px;
          font-weight: 400;
          line-height: 17.875px;

          /* Dynamic Active Colors */
          --line-active-violet: #a78bfa;
          --line-active-emerald: #34d399;
          --line-active-rose: #fb7185;
        }

        /* Premium line draw-on and fade animation matching the user specification */
        @keyframes ${s("line-draw")} {
          0%   { stroke-dashoffset: var(--path-len); opacity: 1; }
          40%  { stroke-dashoffset: 0;               opacity: 1; }
          82%  { stroke-dashoffset: 0;               opacity: 1; }
          90%  { stroke-dashoffset: 0;               opacity: 0; }
          91%  { stroke-dashoffset: var(--path-len); opacity: 0; }
          100% { stroke-dashoffset: var(--path-len); opacity: 1; }
        }

        /* Sparkly Star Flare Rotation and Scaling */
        @keyframes ${s("sparkle")} {
          0%, 100% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) rotate(90deg);
            opacity: 1;
          }
        }

        .${s("twinkle-star")} {
          transform-origin: center;
          animation: ${s("sparkle")} 5s ease-in-out infinite;
        }
      `}</style>

      {/* Circuit Board SVG Canvas */}
      <div className="relative w-full h-[220px] pointer-events-none z-0">
        <svg
          viewBox="0 0 800 220"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* SVG Glow Filter Definitions */}
          <defs>
            <filter id={`glow-violet-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`glow-emerald-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`glow-rose-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Unique Creative Background Lines Network */}
          <g stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1.5" fill="none" opacity="0.4">
            <path d="M 400 35 L 400 15 M 430 45 L 450 15 H 510 V 35" />
            <path d="M 370 45 L 350 15 H 290 V 35" />
            <path d="M 250 15 H 180 V 65 H 100" />
            <path d="M 550 15 H 620 V 65 H 700" />

            <path d="M 133 120 H 260 V 55" />
            <path d="M 667 120 H 540 V 55" />
            <path d="M 350 145 H 450 V 175 H 400" />

            {/* Inactive Main paths */}
            <path d="M 350 110 H 133 V 220" />
            <path d="M 400 135 V 220" />
            <path d="M 450 110 H 667 V 220" />
          </g>

          {/* Glowing active solid circuit tracks (Unique Colors: Violet, Emerald, Rose) */}
          <g fill="none" strokeWidth="2" strokeLinecap="round">
            {/* Cognitive Engine (Violet) */}
            <path
              d="M 350 110 H 133 V 220"
              stroke="var(--line-active-violet)"
              style={{
                filter: `url(#glow-violet-${uid})`,
                opacity: hoveredCard === "cognitive" ? 0.9 : 0.4,
                transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.4s ease",
              }}
            />

            {/* Vector Memory (Emerald) */}
            <path
              d="M 400 135 V 220"
              stroke="var(--line-active-emerald)"
              style={{
                filter: `url(#glow-emerald-${uid})`,
                opacity: hoveredCard === "memory" ? 0.9 : 0.4,
                transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.4s ease",
              }}
            />

            {/* Autonomous Tools (Rose) */}
            <path
              d="M 450 110 H 667 V 220"
              stroke="var(--line-active-rose)"
              style={{
                filter: `url(#glow-rose-${uid})`,
                opacity: hoveredCard === "tools" ? 0.9 : 0.4,
                transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.4s ease",
              }}
            />
          </g>

          {/* Flashy Premium Pulse/Laser Beams travelling on paths */}
          <g fill="none" strokeWidth="3" strokeLinecap="round">
            {/* Cognitive Laser (Violet) */}
            <path
              d="M 350 110 H 133 V 220"
              stroke="var(--line-active-violet)"
              style={{
                filter: "drop-shadow(0 0 5px var(--line-active-violet)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))",
                strokeDasharray: 327,
                strokeDashoffset: 327,
                animation: `${s("line-draw")} 3s ease-in-out infinite`,
                animationDelay: "0ms",
                "--path-len": 327,
                opacity: hoveredCard === "cognitive" ? 1 : 0.85,
                transition: "opacity 0.4s ease",
              } as React.CSSProperties}
            />

            {/* Vector Memory Laser (Emerald) */}
            <path
              d="M 400 135 V 220"
              stroke="var(--line-active-emerald)"
              style={{
                filter: "drop-shadow(0 0 5px var(--line-active-emerald)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))",
                strokeDasharray: 85,
                strokeDashoffset: 85,
                animation: `${s("line-draw")} 3s ease-in-out infinite`,
                animationDelay: "300ms",
                "--path-len": 85,
                opacity: hoveredCard === "memory" ? 1 : 0.85,
                transition: "opacity 0.4s ease",
              } as React.CSSProperties}
            />

            {/* Autonomous Tools Laser (Rose) */}
            <path
              d="M 450 110 H 667 V 220"
              stroke="var(--line-active-rose)"
              style={{
                filter: "drop-shadow(0 0 5px var(--line-active-rose)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))",
                strokeDasharray: 327,
                strokeDashoffset: 327,
                animation: `${s("line-draw")} 3s ease-in-out infinite`,
                animationDelay: "600ms",
                "--path-len": 327,
                opacity: hoveredCard === "tools" ? 1 : 0.85,
                transition: "opacity 0.4s ease",
              } as React.CSSProperties}
            />
          </g>

          {/* Decorative Junction dots with responsive glow */}
          <g>
            <circle cx="210" cy="110" r="3" fill="#a78bfa" className="animate-pulse" />
            <circle cx="150" cy="120" r="2.5" fill="#a1a1aa" />
            <circle cx="490" cy="30" r="3" fill="#ec4899" />
            <circle cx="590" cy="110" r="3" fill="#fb7185" className="animate-pulse" />
          </g>

          {/* Flashy Sparkle Star Flares positioned at key junction nodes */}
          <StarFlare className={s("twinkle-star")} style={{ transform: "translate(210px, 110px)" }} />
          <StarFlare className={s("twinkle-star")} style={{ transform: "translate(590px, 110px)", animationDelay: "1s" }} />
          <StarFlare className={s("twinkle-star")} style={{ transform: "translate(490px, 30px)", animationDelay: "0.5s" }} />
        </svg>

        {/* Central Core CPU ("AGENT GATEWAY") - Clean Button style with no pins */}
        <div className="absolute top-[85px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
          <div className="px-6 py-3.5 text-sm font-bold tracking-wide select-none transition-all rounded-[10px] shadow-sm bg-neutral-900 dark:bg-zinc-900 text-white border border-neutral-800 dark:border-zinc-800">
            AGENT GATEWAY
          </div>
        </div>
      </div>

      {/* 3 Columns Tech Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 w-full max-w-full mx-auto gap-10 px-0 mt-4">
        {/* Card 1: Cognitive Engine */}
        <motion.a
          href="#"
          onMouseEnter={() => setHoveredCard("cognitive")}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "flex flex-col text-left cursor-pointer outline-none no-underline py-5 px-6 rounded-[20px] transition-all duration-300 border bg-white dark:bg-zinc-950/40",
            hoveredCard === "cognitive"
              ? "border-violet-300 dark:border-violet-800 shadow-[0_12px_40px_rgba(167,139,250,0.12)] -translate-y-1"
              : "border-violet-100/80 dark:border-violet-950/40 shadow-[0_8px_30px_rgba(167,139,250,0.03)]"
          )}
        >
          {/* Logo Container */}
          <div className="mb-4">
            <CognitiveIcon />
          </div>

          {/* Title */}
          <div className="flex items-center gap-[6px] mb-[6px]">
            <h3 className="font-bold tracking-tight font-sans text-[15px] text-zinc-800 dark:text-zinc-200">
              Cognitive Engine
            </h3>
            <span className="text-zinc-400 dark:text-zinc-500 text-[12px] font-bold">
              ↗
            </span>
          </div>

          {/* Description */}
          <p className="font-normal font-sans text-[13px] leading-[18.5px] text-zinc-500 dark:text-zinc-400">
            Deconstructs complex user requests into dynamic workflows, selecting parameters and execution models programmatically.
          </p>
        </motion.a>

        {/* Card 2: Vector Memory */}
        <motion.a
          href="#"
          onMouseEnter={() => setHoveredCard("memory")}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "flex flex-col text-left cursor-pointer outline-none no-underline py-5 px-6 rounded-[20px] transition-all duration-300 border bg-white dark:bg-zinc-950/40",
            hoveredCard === "memory"
              ? "border-emerald-300 dark:border-emerald-800 shadow-[0_12px_40px_rgba(52,211,153,0.12)] -translate-y-1"
              : "border-emerald-100/80 dark:border-emerald-950/40 shadow-[0_8px_30px_rgba(52,211,153,0.03)]"
          )}
        >
          {/* Logo Container */}
          <div className="mb-4">
            <MemoryIcon />
          </div>

          {/* Title */}
          <div className="flex items-center gap-[6px] mb-[6px]">
            <h3 className="font-bold tracking-tight font-sans text-[15px] text-zinc-800 dark:text-zinc-200">
              Vector Memory
            </h3>
            <span className="text-zinc-400 dark:text-zinc-500 text-[12px] font-bold">
              ↗
            </span>
          </div>

          {/* Description */}
          <p className="font-normal font-sans text-[13px] leading-[18.5px] text-zinc-500 dark:text-zinc-400">
            High-speed multi-modal database retrieving long-term agent memories and contextual semantic maps in real-time.
          </p>
        </motion.a>

        {/* Card 3: Autonomous Tools */}
        <motion.a
          href="#"
          onMouseEnter={() => setHoveredCard("tools")}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "flex flex-col text-left cursor-pointer outline-none no-underline py-5 px-6 rounded-[20px] transition-all duration-300 border bg-white dark:bg-zinc-950/40",
            hoveredCard === "tools"
              ? "border-rose-300 dark:border-rose-800 shadow-[0_12px_40px_rgba(251,113,133,0.12)] -translate-y-1"
              : "border-rose-100/80 dark:border-rose-950/40 shadow-[0_8px_30px_rgba(251,113,133,0.03)]"
          )}
        >
          {/* Logo Container */}
          <div className="mb-4">
            <ToolsIcon />
          </div>

          {/* Title */}
          <div className="flex items-center gap-[6px] mb-[6px]">
            <h3 className="font-bold tracking-tight font-sans text-[15px] text-zinc-800 dark:text-zinc-200">
              Autonomous Tools
            </h3>
            <span className="text-zinc-400 dark:text-zinc-500 text-[12px] font-bold">
              ↗
            </span>
          </div>

          {/* Description */}
          <p className="font-normal font-sans text-[13px] leading-[18.5px] text-zinc-500 dark:text-zinc-400">
            Secure sandbox environment containing code compilers, API interfaces, and file system executors.
          </p>
        </motion.a>
      </div>
    </div>
  );
}

export default CircuitConnections;

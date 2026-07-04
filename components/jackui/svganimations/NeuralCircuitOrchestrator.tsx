"use client";

import React, { useId, useState, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Definition for dynamic card items in the orchestrator.
 */
export interface OrchestratorCard {
  /**
   * Unique identifier for the card and connection track.
   */
  id: string;
  /**
   * Main title of the card.
   */
  title: string;
  /**
   * Text description of the card's purpose.
   */
  description: string;
  /**
   * Action link target when the card is clicked.
   */
  href?: string;
  /**
   * Custom element to render as the card's top icon.
   */
  icon?: React.ReactNode;
  /**
   * Custom theme mapping for color schemes.
   * @default "violet"
   */
  theme?: "violet" | "emerald" | "rose";
}

/**
 * Defines configuration options for the NeuralCircuitOrchestrator component.
 */
export interface NeuralCircuitOrchestratorProps {
  /**
   * Custom Tailwind classes to apply to the root container.
   */
  className?: string;
  /**
   * Central gateway button text.
   * @default "AGENT GATEWAY"
   */
  gatewayLabel?: string;
  /**
   * Callback event triggered when the central gateway is clicked.
   */
  onGatewayClick?: () => void;
  /**
   * Custom list of orchestrator cards. If omitted, defaults to the standard 3 cards.
   */
  cards?: OrchestratorCard[];
  /**
   * Callback event triggered when an individual card is clicked.
   */
  onCardClick?: (cardId: string) => void;
}

// ─── Custom Premium SVG Icons (AI Orchestrator Theme) ────────────────────────

const CognitiveIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    className="w-8 h-8 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 2.5 2.5" />
    <path d="M12 9h5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-5M12 5h7a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-7" />
    <path d="M12 19H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h5M12 15H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h7" />
    <circle cx="12" cy="4.5" r="1.5" className="fill-violet-400 animate-pulse" />
    <circle cx="12" cy="19.5" r="1.5" className="fill-violet-400 animate-pulse" />
  </svg>
));
CognitiveIcon.displayName = "CognitiveIcon";

const MemoryIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    <line x1="12" y1="8" x2="12" y2="22" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="2" className="fill-emerald-400" />
  </svg>
));
MemoryIcon.displayName = "MemoryIcon";

const ToolsIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 22V12h6v10M12 2v2M2 12h2M20 12h2" />
    <circle cx="12" cy="8" r="1" className="fill-rose-400 animate-ping" />
  </svg>
));
ToolsIcon.displayName = "ToolsIcon";

// ─── Twinkling Star Flare Decoration ─────────────────────────────────────────
const StarFlare = memo(
  ({ className, x, y, delay = 0 }: { className?: string; x: number; y: number; delay?: number }) => (
    <motion.g
      className={className}
      style={{ transformOrigin: `${x}px ${y}px`, x, y }}
      initial={{ scale: 0.3, rotate: 0, opacity: 0.3 }}
      animate={{
        scale: [0.3, 1.1, 0.3],
        rotate: [0, 90, 180],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path
        d="M -5 0 Q 0 0 0 -5 Q 0 0 5 0 Q 0 0 0 5 Q 0 0 -5 0 Z"
        fill="#ffffff"
        className="drop-shadow-[0_0_4px_#fff]"
      />
    </motion.g>
  )
);
StarFlare.displayName = "StarFlare";

const DEFAULT_CARDS: OrchestratorCard[] = [
  {
    id: "cognitive",
    title: "Cognitive Engine",
    description:
      "Deconstructs complex user requests into dynamic workflows, selecting parameters and execution models programmatically.",
    icon: <CognitiveIcon />,
    theme: "violet",
  },
  {
    id: "memory",
    title: "Vector Memory",
    description:
      "High-speed multi-modal database retrieving long-term agent memories and contextual semantic maps in real-time.",
    icon: <MemoryIcon />,
    theme: "emerald",
  },
  {
    id: "tools",
    title: "Autonomous Tools",
    description:
      "Secure sandbox environment containing code compilers, API interfaces, and file system executors.",
    icon: <ToolsIcon />,
    theme: "rose",
  },
];

/**
 * NeuralCircuitOrchestrator
 *
 * Displays the premium animated Neural Circuit Grid aggregating gateway sources.
 * Fully responsive, theme-ready, accessible, and optimized with Tailwind CSS and Motion vectors.
 *
 * @author Jack UI
 * @version 1.2.0
 * @see {@link NeuralCircuitOrchestratorProps} for details on customisation.
 */
export function NeuralCircuitOrchestrator({
  className,
  gatewayLabel = "AGENT GATEWAY",
  onGatewayClick,
  cards = DEFAULT_CARDS,
  onCardClick,
}: NeuralCircuitOrchestratorProps) {
  const uid = useId().replace(/:/g, "");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Themes configurations to avoid classname build issues
  const themeClasses: Record<
    "violet" | "emerald" | "rose",
    {
      stroke: string;
      glow: string;
      glowColor: string;
      cardBorderActive: string;
      cardBorderInactive: string;
      cardShadow: string;
    }
  > = {
    violet: {
      stroke: "stroke-violet-400",
      glow: `url(#glow-violet-${uid})`,
      glowColor: "drop-shadow-[0_0_5px_rgba(167,139,250,1)]",
      cardBorderActive: "border-violet-300 dark:border-violet-800",
      cardBorderInactive: "border-violet-100/80 dark:border-violet-950/40",
      cardShadow: "shadow-[0_12px_40px_rgba(167,139,250,0.12)]",
    },
    emerald: {
      stroke: "stroke-emerald-400",
      glow: `url(#glow-emerald-${uid})`,
      glowColor: "drop-shadow-[0_0_5px_rgba(52,211,153,1)]",
      cardBorderActive: "border-emerald-300 dark:border-emerald-800",
      cardBorderInactive: "border-emerald-100/80 dark:border-emerald-950/40",
      cardShadow: "shadow-[0_12px_40px_rgba(52,211,153,0.12)]",
    },
    rose: {
      stroke: "stroke-rose-400",
      glow: `url(#glow-rose-${uid})`,
      glowColor: "drop-shadow-[0_0_5px_rgba(244,63,94,1)]",
      cardBorderActive: "border-rose-300 dark:border-rose-800",
      cardBorderInactive: "border-rose-100/80 dark:border-rose-950/40",
      cardShadow: "shadow-[0_12px_40px_rgba(244,63,94,0.12)]",
    },
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[1200px] mx-auto overflow-hidden transition-colors duration-300 font-sans p-6 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm",
        className
      )}
    >
      {/* Circuit Board SVG Canvas */}
      <div className="relative w-full h-[220px] pointer-events-none z-0">
        <svg viewBox="0 0 800 220" className="w-full h-full" preserveAspectRatio="none">
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

          {/* Background Grid Lines Network */}
          <g stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1" fill="none" opacity="0.6">
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

          {/* Glowing active circuit tracks */}
          <g fill="none" strokeWidth="2" strokeLinecap="round">
            {/* Cognitive Engine (Violet) */}
            <path
              d="M 350 110 H 133 V 220"
              className={cn(themeClasses.violet.stroke, "transition-all duration-300")}
              style={{
                filter: themeClasses.violet.glow,
                opacity: hoveredCard === "cognitive" ? 0.9 : 0.4,
              }}
            />

            {/* Vector Memory (Emerald) */}
            <path
              d="M 400 135 V 220"
              className={cn(themeClasses.emerald.stroke, "transition-all duration-300")}
              style={{
                filter: themeClasses.emerald.glow,
                opacity: hoveredCard === "memory" ? 0.9 : 0.4,
              }}
            />

            {/* Autonomous Tools (Rose) */}
            <path
              d="M 450 110 H 667 V 220"
              className={cn(themeClasses.rose.stroke, "transition-all duration-300")}
              style={{
                filter: themeClasses.rose.glow,
                opacity: hoveredCard === "tools" ? 0.9 : 0.4,
              }}
            />
          </g>

          {/* Lasers traveling along the active circuit tracks */}
          <g fill="none" strokeWidth="3" strokeLinecap="round" className="motion-reduce:hidden">
            {/* Cognitive Laser */}
            <motion.path
              d="M 350 110 H 133 V 220"
              className={cn(themeClasses.violet.stroke, themeClasses.violet.glowColor)}
              initial={{ pathLength: 1, pathOffset: 1, opacity: 1 }}
              animate={{
                pathOffset: [1, 0, 0, 0, 1],
                opacity: hoveredCard === "cognitive" ? [1, 1, 1, 0, 1] : [0.85, 0.85, 0.85, 0, 0.85],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.82, 0.9, 1],
                delay: 0,
              }}
            />

            {/* Vector Memory Laser */}
            <motion.path
              d="M 400 135 V 220"
              className={cn(themeClasses.emerald.stroke, themeClasses.emerald.glowColor)}
              initial={{ pathLength: 1, pathOffset: 1, opacity: 1 }}
              animate={{
                pathOffset: [1, 0, 0, 0, 1],
                opacity: hoveredCard === "memory" ? [1, 1, 1, 0, 1] : [0.85, 0.85, 0.85, 0, 0.85],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.82, 0.9, 1],
                delay: 0.3,
              }}
            />

            {/* Autonomous Tools Laser */}
            <motion.path
              d="M 450 110 H 667 V 220"
              className={cn(themeClasses.rose.stroke, themeClasses.rose.glowColor)}
              initial={{ pathLength: 1, pathOffset: 1, opacity: 1 }}
              animate={{
                pathOffset: [1, 0, 0, 0, 1],
                opacity: hoveredCard === "tools" ? [1, 1, 1, 0, 1] : [0.85, 0.85, 0.85, 0, 0.85],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.82, 0.9, 1],
                delay: 0.6,
              }}
            />
          </g>

          {/* Decorative Junction dots */}
          <g>
            <circle cx="210" cy="110" r="3" fill="#a78bfa" className="animate-pulse" />
            <circle cx="150" cy="120" r="2.5" className="fill-zinc-400/80" />
            <circle cx="490" cy="30" r="3" fill="#ec4899" />
            <circle cx="590" cy="110" r="3" fill="#fb7185" className="animate-pulse" />
          </g>

          {/* Sparkles at key junctions */}
          <StarFlare x={210} y={110} delay={0} />
          <StarFlare x={590} y={110} delay={1} />
          <StarFlare x={490} y={30} delay={0.5} />
        </svg>

        {/* Central Core Gateway CPU */}
        <div className="absolute top-[85px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
          <button
            type="button"
            onClick={onGatewayClick}
            className={cn(
              "px-6 py-3.5 text-xs font-semibold text-white tracking-wider uppercase select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500",
              "bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 border border-zinc-700/60 shadow-lg cursor-pointer"
            )}
            aria-label={gatewayLabel}
          >
            {gatewayLabel}
          </button>
        </div>
      </div>

      {/* 3-Column dynamic Card grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 w-full gap-6 mt-[-2px]">
        {cards.map((card) => {
          const themeConf = themeClasses[card.theme || "violet"];
          const isHovered = hoveredCard === card.id;

          return (
            <motion.a
              key={card.id}
              href={card.href || "#"}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={(e) => {
                if (onCardClick) {
                  e.preventDefault();
                  onCardClick(card.id);
                }
              }}
              className={cn(
                "flex flex-col text-left cursor-pointer outline-none no-underline py-8 px-8 rounded-2xl transition-all duration-300 border bg-white dark:bg-zinc-950/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400",
                isHovered
                  ? cn(themeConf.cardBorderActive, themeConf.cardShadow, "-translate-y-1")
                  : themeConf.cardBorderInactive
              )}
              aria-label={`Navigate to ${card.title}`}
            >
              {/* Icon Container */}
              <div className="mb-4 shrink-0 flex items-center">
                {card.icon || <CognitiveIcon />}
              </div>

              {/* Title */}
              <div className="flex items-center gap-[6px] mb-1.5">
                <h3 className="font-bold tracking-tight font-sans text-sm text-zinc-800 dark:text-zinc-200">
                  {card.title}
                </h3>
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold" aria-hidden="true">
                  ↗
                </span>
              </div>

              {/* Description */}
              <p className="font-normal font-sans text-xs leading-[18.5px] text-zinc-500 dark:text-zinc-400">
                {card.description}
              </p>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

export default NeuralCircuitOrchestrator;
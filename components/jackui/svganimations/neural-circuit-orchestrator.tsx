"use client";

import React, { useId, useState, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SiReact, SiNextdotjs, SiTanstack } from "react-icons/si";

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
export interface NeuralCircuitOrchestratorProps extends React.HTMLAttributes<HTMLDivElement> {
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

const DEFAULT_CARDS: OrchestratorCard[] = [
  {
    id: "react",
    title: "React",
    description:
      "The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions.",
    icon: <SiReact className="w-8 h-8 text-zinc-900 dark:text-white" />,
    theme: "violet",
  },
  {
    id: "nextjs",
    title: "Next.js",
    description:
      "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create high-quality web applications.",
    icon: <SiNextdotjs className="w-8 h-8 text-zinc-900 dark:text-white" />,
    theme: "emerald",
  },
  {
    id: "tanstack",
    title: "TanStack",
    description:
      "High-quality open-source software for web developers. Headless UI, Data Fetching, Routing, and more for modern frontend apps.",
    icon: <SiTanstack className="w-8 h-8 text-zinc-900 dark:text-white" />,
    theme: "rose",
  },
];

const CognitiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-zinc-900 dark:text-white"
  >
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <path d="m4.93 4.93 14.14 14.14" />
    <path d="m4.93 19.07 14.14-14.14" />
  </svg>
);

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
  ...props
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
      {...props}
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

          {/* Background Grid Lines Network (Subtle animated breathing effect with color shift) */}
          <motion.g
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0.15, color: "#a855f7" }}
            animate={{
              opacity: [0.15, 0.35, 0.15, 0.35, 0.15],
              color: ["#a855f7", "#10b981", "#f43f5e", "#10b981", "#a855f7"]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 400 35 L 400 15 M 430 45 L 450 15 H 510 V 35" />
            <path d="M 370 45 L 350 15 H 290 V 35" />
            <path d="M 250 15 H 180 V 65 H 100" />
            <path d="M 550 15 H 620 V 65 H 700" />

            <path d="M 133 120 H 260 V 55" />
            <path d="M 667 120 H 540 V 55" />

            {/* Inactive Main paths */}
            <path d="M 350 110 H 133 V 220" />
            <path d="M 400 135 V 220" />
            <path d="M 450 110 H 667 V 220" />
          </motion.g>

          {/* Glowing active circuit tracks */}
          <g fill="none" strokeWidth="2" strokeLinecap="round">
            {/* Cognitive Engine (Violet) */}
            <path
              d="M 350 110 H 133 V 220"
              className={cn(themeClasses.violet.stroke, "transition-all duration-300")}
              style={{
                filter: themeClasses.violet.glow,
                opacity: hoveredCard === "react" ? 0.9 : 0.4,
              }}
            />

            {/* Vector Memory (Emerald) */}
            <path
              d="M 400 135 V 220"
              className={cn(themeClasses.emerald.stroke, "transition-all duration-300")}
              style={{
                filter: themeClasses.emerald.glow,
                opacity: hoveredCard === "nextjs" ? 0.9 : 0.4,
              }}
            />

            {/* Autonomous Tools (Rose) */}
            <path
              d="M 450 110 H 667 V 220"
              className={cn(themeClasses.rose.stroke, "transition-all duration-300")}
              style={{
                filter: themeClasses.rose.glow,
                opacity: hoveredCard === "tanstack" ? 0.9 : 0.4,
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
                opacity: hoveredCard === "react" ? [1, 1, 1, 0, 1] : [0.85, 0.85, 0.85, 0, 0.85],
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
                opacity: hoveredCard === "nextjs" ? [1, 1, 1, 0, 1] : [0.85, 0.85, 0.85, 0, 0.85],
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
                opacity: hoveredCard === "tanstack" ? [1, 1, 1, 0, 1] : [0.85, 0.85, 0.85, 0, 0.85],
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


        </svg>

        {/* Central Core Gateway CPU */}
        <div className="absolute top-[85px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
          <button
            type="button"
            onClick={onGatewayClick}
            className={cn(
              "px-6 py-3.5 text-xs font-semibold text-white tracking-wider uppercase select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500",
              "bg-gradient-to-b from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 border border-zinc-700/60 shadow-lg cursor-pointer"
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

          // Determine the accent color based on theme
          const accentColors: Record<"violet" | "emerald" | "rose", string> = {
            violet: "#a855f7",
            emerald: "#10b981",
            rose: "#f43f5e"
          };
          const accentColor = accentColors[card.theme || "violet"];

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
                "group relative flex flex-col justify-start text-left cursor-pointer outline-none no-underline p-8 overflow-hidden transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400",
                "rounded-2xl dark:rounded-[24px]", // Base radius vs Dark mode radius
                "bg-white dark:bg-[#151515]", // Backgrounds
                "border-zinc-200 dark:border-white/15", // Borders
                "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.45)]", // Complex shadow

                // Dark mode 'before' pseudo-element
                "dark:before:absolute dark:before:inset-0 dark:before:pointer-events-none dark:before:rounded-[24px]",
                "dark:before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,transparent_70%,rgba(255,255,255,0.025))]",

                // Dark mode 'after' pseudo-element
                "dark:after:absolute dark:after:inset-[1px] dark:after:pointer-events-none dark:after:rounded-[23px] dark:after:border dark:after:border-white/[0.035]",

                isHovered ? "shadow-sm dark:border-white/30" : ""
              )}
              style={{ "--accent": accentColor } as React.CSSProperties}
              aria-label={`Navigate to ${card.title}`}
            >
              {/* Top Edge Gradient Highlight */}
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-[1px] w-full transition-opacity duration-300 hidden dark:block",
                  isHovered ? "opacity-100" : "opacity-40"
                )}
                style={{
                  background: `linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)`
                }}
              />

              {/* Icon Container */}
              <div className="mb-10 shrink-0 flex items-center relative z-10">
                {card.icon || <CognitiveIcon />}
              </div>

              {/* Title */}
              <div className="flex items-center gap-[6px] mb-2 relative z-10">
                <h3 className="font-bold tracking-tight font-sans text-[18px] md:text-[20px] text-zinc-900 dark:text-[#ededed] dark:group-hover:text-[#fafafa] transition-colors">
                  {card.title}
                </h3>
                <span
                  className={cn(
                    "text-zinc-400 dark:text-[#888888] text-sm font-bold transition-transform duration-200",
                    isHovered ? "translate-x-0.5 -translate-y-0.5 text-zinc-600 dark:text-[#ededed]" : ""
                  )}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              {/* Description */}
              <p className="font-normal font-sans text-[14px] leading-relaxed text-zinc-600 dark:text-[#888888] relative z-10 max-w-[95%]">
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

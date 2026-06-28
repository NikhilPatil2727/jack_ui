"use client";

import React, { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * @interface AudienceHubAnimationProps
 * Defines configuration options for the AudienceHubAnimation component.
 */
export interface AudienceHubAnimationProps {
  /**
   * Array of exactly 4 strings to be shown in the outer node buttons.
   * Order: LinkedIn followers, Post engagers, Company page visitors, Post commenters.
   * @default ["LinkedIn Followers", "Post Engagers", "Company Page Visitors", "Post Commenters"]
   */
  labels?: [string, string, string, string];
  /**
   * Whether the animations should be active.
   * @default true
   */
  animated?: boolean;
  /**
   * Custom Tailwind classes to apply to the root container.
   */
  className?: string;
  /**
   * Central hub logo top text.
   * @default "JACK"
   */
  logoTextTop?: string;
  /**
   * Central hub logo bottom text.
   * @default "UI"
   */
  logoTextBottom?: string;
  /**
   * Custom background image URL.
   * @default "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
   */
  backgroundImageUrl?: string;
  /**
   * Animation cycle duration in milliseconds.
   * @default 3000
   */
  animationDuration?: number;
  /**
   * Optional click handler for the node buttons.
   */
  onNodeClick?: (nodeId: string, label: string) => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

/* Replace icon here - Customize node SVGs */
const Icon = {
  Company: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="6" y1="3" x2="6" y2="8" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

// ─── Node definitions (stable — no recalculation per render) ──────────────────

interface NodeDef {
  id: string;
  labelIndex: 0 | 1 | 2 | 3;
  x: number;
  y: number;
  dotX: number;
  dotY: number;
  path: string;
  pathLength: number;
  IconComponent: React.FC;
  lineDelay: number;
  labelDelay: number;
}

const NODE_DEFS: NodeDef[] = [
  {
    id: "linkedin",
    labelIndex: 0,
    x: 120, y: 88,
    dotX: 200, dotY: 88,
    path: "M200 88 L285 88 L285 178",
    pathLength: 175,
    IconComponent: Icon.LinkedIn,
    lineDelay: 0,
    labelDelay: 200,
  },
  {
    id: "engagers",
    labelIndex: 1,
    x: 480, y: 88,
    dotX: 400, dotY: 88,
    path: "M400 88 L315 88 L315 178",
    pathLength: 175,
    IconComponent: Icon.Layers,
    lineDelay: 150,
    labelDelay: 350,
  },
  {
    id: "company-page",
    labelIndex: 2,
    x: 120, y: 312,
    dotX: 200, dotY: 312,
    path: "M200 312 L200 210 L268 210",
    pathLength: 170,
    IconComponent: Icon.Company,
    lineDelay: 300,
    labelDelay: 500,
  },
  {
    id: "commenters",
    labelIndex: 3,
    x: 480, y: 312,
    dotX: 400, dotY: 312,
    path: "M400 312 L400 210 L332 210",
    pathLength: 170,
    IconComponent: Icon.Chat,
    lineDelay: 450,
    labelDelay: 650,
  },
];

const DEFAULT_LABELS: [string, string, string, string] = [
  "LinkedIn Followers",
  "Post Engagers",
  "Company Page Visitors",
  "Post Commenters",
];

const DEFAULT_BG_IMAGE = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";

/**
 * AudienceHubAnimation
 *
 * Displays the animated Audience Hub hero section used across products.
 * Designed for high reusability, strict performance, and customizability.
 *
 * @author Jack UI
 * @version 1.1.0
 * @see {@link AudienceHubAnimationProps} for details on customisation.
 */
export function AudienceHubAnimation({
  labels = DEFAULT_LABELS,
  animated = true,
  className = "",
  logoTextTop = "JACK",
  logoTextBottom = "UI",
  backgroundImageUrl = DEFAULT_BG_IMAGE,
  animationDuration = 3000,
  onNodeClick,
}: AudienceHubAnimationProps) {
  const uid = useId().replace(/:/g, "");
  const s = (cls: string) => `${cls}-${uid}`;

  // Memoize labels to prevent unnecessary renders/lookups
  const memoizedLabels = useMemo(() => labels, [labels]);

  return (
    <div
      className={cn(
        "relative w-full max-w-[600px] mx-auto overflow-hidden",
        "flex items-center justify-center font-sans",
        s("hub"),
        className
      )}
      style={{ aspectRatio: "600 / 420" }}
      role="img"
      aria-label="Diagram showing Valley AI aggregating LinkedIn audience sources"
    >
      {/* ── Scoped styles ───────────────────────────────────────────────────── */}
      {/* Modify colors here - Base colors and gradients for the component */}
      <style>{`
        /* Design tokens — light */
        .${s("hub")} {
          --card-text:         #0f172a;
          --line-base:         rgba(255 255 255 / 0.45);
          --line-active:       #ffffff;
          --hub-bg:            #ffffff;
          --hub-fg:            #0f172a;
          --hub-border:        rgba(255 255 255 / 0.95);

          /* Replace image here - Custom background image path */
          background-image:
            linear-gradient(to bottom, rgba(0 0 0 / 0.10), rgba(0 0 0 / 0.22)),
            url('${backgroundImageUrl}');
          background-size: cover;
          background-position: center;
          box-shadow: inset 0 0 100px rgba(0 0 0 / 0.2);
        }

        /* Design tokens — dark */
        :is(.dark) .${s("hub")} {
          --card-text:   #ffffff;
          --line-base:   rgba(255 255 255 / 0.25);
          --line-active: rgba(255 255 255 / 0.80);
          --hub-bg:      #000000;
          --hub-fg:      #ffffff;
          --hub-border:  rgba(255 255 255 / 0.14);

          /* Replace image here - Custom background image path for dark mode */
          background-image:
            linear-gradient(to bottom, rgba(0 0 0 / 0.40), rgba(0 0 0 / 0.60)),
            url('${backgroundImageUrl}');
        }

        /* Hub enter */
        @keyframes ${s("hub-in")} {
          from { transform: scale(0.80); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          to   { transform: scale(1.00); opacity: 1; }
        }

        /* Card enter */
        @keyframes ${s("card-in")} {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        /* Line draw → hold → fade → reset → hold clear */
        @keyframes ${s("line-draw")} {
          0%   { stroke-dashoffset: var(--path-len); opacity: 1; }
          40%  { stroke-dashoffset: 0;               opacity: 1; }
          82%  { stroke-dashoffset: 0;               opacity: 1; }
          90%  { stroke-dashoffset: 0;               opacity: 0; }
          91%  { stroke-dashoffset: var(--path-len); opacity: 0; }
          100% { stroke-dashoffset: var(--path-len); opacity: 1; }
        }

        /* Subtle pulse on base lines */
        @keyframes ${s("breathe")} {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.9; }
        }

        /* Repeating Hub Logo Animations */
        @keyframes ${s("pulse-text")} {
          0%, 100% { opacity: 0.70; }
          50%       { opacity: 1.00; }
        }

        @keyframes ${s("expand-line")} {
          0%, 100% { width: 14px; }
          50%       { width: 26px; }
        }

        /* Typographic Entrance Animation (Blur + Slide up) */
        @keyframes ${s("text-reveal")} {
          from { opacity: 0; transform: translateY(4px); filter: blur(1.5px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        /* ── Animated class applications ─────────────────────────────────── */

        .${s("hub-node")} {
          transform-origin: 300px 210px;
          animation: ${s("hub-in")} 500ms cubic-bezier(0.34,1.56,0.64,1) 100ms both;
        }

        .${s("card")} {
          animation: ${s("card-in")} 380ms ease-out both;
        }

        .${s("line-overlay")} {
          /* Update animation duration here - Set animation speed for draw-on overlay */
          animation: ${s("line-draw")} ${animationDuration}ms ease-in-out infinite;
        }

        .${s("line-base")} {
          /* Update animation duration here - Set animation speed for breathing lines */
          animation: ${s("breathe")} ${animationDuration}ms ease-in-out infinite;
        }

        .${s("logo-text")} {
          animation: 
            ${s("text-reveal")} 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms both,
            ${s("pulse-text")} 2.5s ease-in-out infinite 950ms;
        }

        .${s("logo-line")} {
          animation: 
            ${s("text-reveal")} 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms both,
            ${s("expand-line")} 2.5s ease-in-out infinite 950ms;
        }

        /* Honour reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .${s("hub-node")},
          .${s("card")},
          .${s("line-overlay")},
          .${s("line-base")},
          .${s("logo-text")},
          .${s("logo-line")} {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* ── SVG canvas ──────────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 600 420"
        className="w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Connector line paths */}
        {NODE_DEFS.map(({ id, path, pathLength, lineDelay }) => (
          <g key={`conn-${id}`}>
            {/* Static base line */}
            <path
              d={path}
              fill="none"
              stroke="var(--line-base)"
              strokeWidth="1.5"
              className={animated ? s("line-base") : undefined}
              style={animated ? { animationDelay: `${lineDelay}ms` } : undefined}
            />

            {/* Animated draw-on overlay */}
            {animated && (
              <path
                d={path}
                fill="none"
                stroke="var(--line-active)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={s("line-overlay")}
                style={{
                  "--path-len": pathLength,
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength,
                  animationDelay: `${lineDelay}ms`,
                } as React.CSSProperties}
              />
            )}
          </g>
        ))}

        {/* Interactive Label Cards (Using premium valley button style directly inside foreignObject) */}
        {NODE_DEFS.map(({ id, x, y, labelIndex, IconComponent, labelDelay }) => (
          <g
            key={`card-${id}`}
            className={animated ? s("card") : undefined}
            style={animated ? { animationDelay: `${labelDelay}ms`, animationFillMode: "both" } : undefined}
          >
            <foreignObject x={x - 80} y={y - 18} width={160} height={36} className="pointer-events-auto">
              {/* Change button text here - Labels for node triggers */}
              {/* Replace CTA link here - Customize button onClick behavior */}
              <button
                type="button"
                onClick={() => onNodeClick?.(id, memoizedLabels[labelIndex])}
                className={cn(
                  "w-full h-full flex items-center gap-2.5 px-3.5 border-[1.5px] backdrop-blur-md transition-all duration-300 font-sans font-medium uppercase tracking-widest text-[10px] select-none cursor-pointer active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  "bg-white/88 border-white/95 text-slate-900 hover:bg-white/95",
                  // The button remains white/light in both dark mode and light mode, per user specification
                  "dark:bg-white/88 dark:border-white/95 dark:text-slate-900 dark:hover:bg-white/95"
                )}
              >
                <span className="shrink-0 opacity-90 flex items-center">
                  <IconComponent />
                </span>
                <span className="truncate leading-none mt-px">
                  {memoizedLabels[labelIndex]}
                </span>
              </button>
            </foreignObject>
          </g>
        ))}

        {/* ── Central hub (using custom layout) ─────────────────────────────── */}
        <g className={animated ? s("hub-node") : undefined}>
          <rect
            x={268} y={178}
            width={64} height={64}
            rx={14} ry={14}
            fill="var(--hub-bg)"
            stroke="var(--hub-border)"
            strokeWidth="1.5"
          />
          <foreignObject x={268} y={178} width={64} height={64}>
            <div
              className="w-full h-full flex flex-col items-center justify-center select-none font-sans"
              style={{ color: "var(--hub-fg)" }}
            >
              {/* Customize heading text here - Top logo heading */}
              <span
                className={animated ? s("logo-text") : undefined}
                style={{
                  fontFamily: "PP Neue Montreal Medium, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                }}
              >
                {logoTextTop}
              </span>
              <div
                className={animated ? s("logo-line") : undefined}
                style={{
                  height: "1px",
                  backgroundColor: "currentColor",
                  opacity: 0.15,
                  margin: "3px 0",
                }}
              />
              {/* Customize heading text here - Bottom logo heading */}
              <span
                className={animated ? s("logo-text") : undefined}
                style={{
                  fontFamily: "PP Neue Montreal Medium, sans-serif",
                  fontSize: "8px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                  paddingLeft: "0.2em",
                }}
              >
                {logoTextBottom}
              </span>
            </div>
          </foreignObject>
        </g>

        {/* Junction dots (Rendered at the very end so they sit on top of card borders) */}
        {NODE_DEFS.map(({ id, dotX, dotY, labelDelay }) => (
          <g key={`dots-${id}`}>
            {/* Junction dot to label card */}
            <circle
              cx={dotX}
              cy={dotY}
              r={3}
              fill="var(--card-text)"
              className={animated ? s("card") : undefined}
              style={animated ? { animationDelay: `${labelDelay}ms`, animationFillMode: "both" } : {}}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default AudienceHubAnimation;
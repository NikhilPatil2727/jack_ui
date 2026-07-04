"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the AudienceHubAnimation component.
 */
export interface AudienceHubAnimationProps {
  /**
   * Array of labels to be shown in the outer node buttons.
   * Order: LinkedIn followers, Post engagers, Company page visitors, Post commenters.
   * @default ["LinkedIn Followers", "Post Engagers", "Company Page Visitors", "Post Commenters"]
   */
  labels?: string[];
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

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LayersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CompanyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <line x1="6" y1="3" x2="6" y2="8" />
  </svg>
);

const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// ─── Node definitions (static configs) ────────────────────────────────────────

interface NodeDef {
  id: string;
  labelIndex: number;
  x: number;
  y: number;
  dotX: number;
  dotY: number;
  path: string;
  pathLength: number;
  IconComponent: React.ComponentType;
  lineDelay: number;
  labelDelay: number;
}

const NODE_DEFS: NodeDef[] = [
  {
    id: "linkedin",
    labelIndex: 0,
    x: 120,
    y: 88,
    dotX: 200,
    dotY: 88,
    path: "M200 88 L285 88 L285 178",
    pathLength: 175,
    IconComponent: LinkedInIcon,
    lineDelay: 0,
    labelDelay: 200,
  },
  {
    id: "engagers",
    labelIndex: 1,
    x: 480,
    y: 88,
    dotX: 400,
    dotY: 88,
    path: "M400 88 L315 88 L315 178",
    pathLength: 175,
    IconComponent: LayersIcon,
    lineDelay: 150,
    labelDelay: 350,
  },
  {
    id: "company-page",
    labelIndex: 2,
    x: 120,
    y: 312,
    dotX: 200,
    dotY: 312,
    path: "M200 312 L200 210 L268 210",
    pathLength: 170,
    IconComponent: CompanyIcon,
    lineDelay: 300,
    labelDelay: 500,
  },
  {
    id: "commenters",
    labelIndex: 3,
    x: 480,
    y: 312,
    dotX: 400,
    dotY: 312,
    path: "M400 312 L400 210 L332 210",
    pathLength: 170,
    IconComponent: ChatIcon,
    lineDelay: 450,
    labelDelay: 650,
  },
];

const DEFAULT_LABELS = [
  "LinkedIn Followers",
  "Post Engagers",
  "Company Page Visitors",
  "Post Commenters",
];

const DEFAULT_BG_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";

/**
 * AudienceHubAnimation
 *
 * Displays the animated Audience Hub diagram showing integration of audience sources.
 * Optimized for design-system reuse, accessibility, performance, and cross-framework support.
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
  // Safe destructuring of labels with fallbacks to avoid indexing undefined values
  const label0 = labels[0] || DEFAULT_LABELS[0];
  const label1 = labels[1] || DEFAULT_LABELS[1];
  const label2 = labels[2] || DEFAULT_LABELS[2];
  const label3 = labels[3] || DEFAULT_LABELS[3];
  const activeLabels = [label0, label1, label2, label3];

  return (
    <div
      className={cn(
        "relative w-full max-w-[600px] mx-auto overflow-hidden",
        "flex items-center justify-center font-sans rounded-xl border border-slate-200/20 dark:border-slate-800/20",
        "bg-cover bg-center shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{
        aspectRatio: "600 / 420",
        backgroundImage: `linear-gradient(to bottom, var(--hub-overlay-from), var(--hub-overlay-to)), url('${backgroundImageUrl}')`,
        ["--hub-overlay-from" as any]: "rgba(0, 0, 0, 0.12)",
        ["--hub-overlay-to" as any]: "rgba(0, 0, 0, 0.25)",
        ["--hub-anim-duration" as any]: `${animationDuration}ms`,
      }}
      role="region"
      aria-label="Audience Hub diagram showing connection of audience sources to the central hub"
    >
      {/* ── Scoped static keyframes ─────────────────────────────────────────── */}
      <style>{`
        @keyframes jackui-hub-in {
          from { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.03); opacity: 1; }
          to   { transform: scale(1.00); opacity: 1; }
        }

        @keyframes jackui-card-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        @keyframes jackui-line-draw {
          0%   { stroke-dashoffset: var(--path-len); opacity: 1; }
          40%  { stroke-dashoffset: 0;               opacity: 1; }
          82%  { stroke-dashoffset: 0;               opacity: 1; }
          90%  { stroke-dashoffset: 0;               opacity: 0; }
          91%  { stroke-dashoffset: var(--path-len); opacity: 0; }
          100% { stroke-dashoffset: var(--path-len); opacity: 1; }
        }

        @keyframes jackui-breathe {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.85; }
        }

        @keyframes jackui-pulse-text {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1.00; }
        }

        @keyframes jackui-expand-line {
          0%, 100% { width: 14px; }
          50%       { width: 24px; }
        }

        @keyframes jackui-text-reveal {
          from { opacity: 0; transform: translateY(3px); filter: blur(1px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes jackui-hub-ripple-pulse {
          0%, 35% {
            transform: scale(1);
            opacity: 0;
          }
          40% {
            transform: scale(1);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.25);
            opacity: 0;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
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
              stroke="currentColor"
              strokeWidth="1.5"
              className={cn(
                "text-white/45 dark:text-white/25",
                animated && "animate-[jackui-breathe_var(--hub-anim-duration)_ease-in-out_infinite] motion-reduce:animate-none"
              )}
              style={animated ? { animationDelay: `${lineDelay}ms` } : undefined}
            />

            {/* Animated draw-on overlay */}
            {animated && (
              <path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-white dark:text-white/85 animate-[jackui-line-draw_var(--hub-anim-duration)_ease-in-out_infinite] motion-reduce:animate-none filter-[drop-shadow(0_0_2px_rgba(255,255,255,0.9))]"
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

        {/* Interactive Label Cards */}
        {NODE_DEFS.map(({ id, x, y, labelIndex, IconComponent, labelDelay }) => {
          const currentLabel = activeLabels[labelIndex];
          return (
            <g
              key={`card-${id}`}
              className={cn(
                animated && "animate-[jackui-card-in_380ms_ease-out_both] motion-reduce:animate-none"
              )}
              style={animated ? { animationDelay: `${labelDelay}ms`, animationFillMode: "both" } : undefined}
            >
              <foreignObject x={x - 80} y={y - 18} width={160} height={36} className="pointer-events-auto">
                <button
                  type="button"
                  onClick={() => onNodeClick?.(id, currentLabel)}
                  className={cn(
                    "w-full h-full flex items-center gap-2.5 px-3.5 border-[1.5px] backdrop-blur-md transition-all duration-300 font-sans font-medium uppercase tracking-widest text-[10px] select-none cursor-pointer active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white",
                    "bg-white/90 border-white/95 text-slate-900 hover:bg-white focus:bg-white",
                    "dark:bg-white/90 dark:border-white/95 dark:text-slate-900 dark:hover:bg-white"
                  )}
                  aria-label={`Interact with ${currentLabel}`}
                >
                  <span className="shrink-0 opacity-90 flex items-center">
                    <IconComponent />
                  </span>
                  <span className="truncate leading-none mt-px">
                    {currentLabel}
                  </span>
                </button>
              </foreignObject>
            </g>
          );
        })}

        {/* ── Central hub ───────────────────────────────────────────────────── */}
        <g
          className={cn(
            "origin-[300px_210px]",
            animated && "animate-[jackui-hub-in_500ms_cubic-bezier(0.34,1.56,0.64,1)_100ms_both] motion-reduce:animate-none"
          )}
        >
          {/* Animated pulse/ripple shape behind the central hub */}
          {animated && (
            <rect
              x={268}
              y={178}
              width={64}
              height={64}
              rx={14}
              ry={14}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white dark:text-white/85 origin-[300px_210px] animate-[jackui-hub-ripple-pulse_var(--hub-anim-duration)_cubic-bezier(0.16,1,0.3,1)_infinite] motion-reduce:animate-none filter-[drop-shadow(0_0_4px_#fff)] dark:filter-[drop-shadow(0_0_4px_rgba(255,255,255,0.85))]"
            />
          )}
          <rect
            x={268}
            y={178}
            width={64}
            height={64}
            rx={14}
            ry={14}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white dark:text-zinc-950 stroke-white/95 dark:stroke-white/12"
          />
          <foreignObject x={268} y={178} width={64} height={64}>
            <div className="w-full h-full flex flex-col items-center justify-center select-none font-sans text-slate-900 dark:text-white">
              <span
                className={cn(
                  animated && "animate-[jackui-text-reveal_600ms_cubic-bezier(0.16,1,0.3,1)_350ms_both,jackui-pulse-text_2.5s_ease-in-out_infinite_950ms] motion-reduce:animate-none"
                )}
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
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
                className={cn(
                  animated && "animate-[jackui-text-reveal_600ms_cubic-bezier(0.16,1,0.3,1)_350ms_both,jackui-expand-line_2.5s_ease-in-out_infinite_950ms] motion-reduce:animate-none"
                )}
                style={{
                  height: "1px",
                  backgroundColor: "currentColor",
                  opacity: 0.15,
                  margin: "3px 0",
                }}
              />
              <span
                className={cn(
                  animated && "animate-[jackui-text-reveal_600ms_cubic-bezier(0.16,1,0.3,1)_350ms_both,jackui-pulse-text_2.5s_ease-in-out_infinite_950ms] motion-reduce:animate-none"
                )}
                style={{
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
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

        {/* Junction dots */}
        {NODE_DEFS.map(({ id, dotX, dotY, labelDelay }) => (
          <g key={`dots-${id}`}>
            <circle
              cx={dotX}
              cy={dotY}
              r={3}
              fill="currentColor"
              className={cn(
                "text-slate-900 dark:text-white",
                animated && "animate-[jackui-card-in_380ms_ease-out_both] motion-reduce:animate-none"
              )}
              style={animated ? { animationDelay: `${labelDelay}ms`, animationFillMode: "both" } : {}}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default AudienceHubAnimation;
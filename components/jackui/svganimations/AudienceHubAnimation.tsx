"use client";

import React, { useId, useRef, useEffect } from "react";
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
   * @default "CORE"
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
  logoTextTop = "CORE",
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const paint = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 800;
      const height = 560;
      canvas.width = width;
      canvas.height = height;

      const isDark = document.documentElement.classList.contains("dark");

      // 1. Base watercolor paper color
      ctx.fillStyle = isDark ? "#09090b" : "#faf8f5";
      ctx.fillRect(0, 0, width, height);

      const random = (min: number, max: number) => Math.random() * (max - min) + min;

      // Enable a soft blur filter to blend colors beautifully, mimicking the organic watercolor wash of the second image
      ctx.save();
      ctx.filter = "blur(60px)";

      // Paint colors (rose, indigo/blue, cyan, and a touch of gold/yellow for rich rainbow accents)
      const roseColor = isDark ? "rgba(244, 63, 94, 0.42)" : "rgba(251, 113, 133, 0.65)"; 
      const indigoColor = isDark ? "rgba(99, 102, 241, 0.42)" : "rgba(129, 140, 248, 0.65)";
      const cyanColor = isDark ? "rgba(6, 182, 212, 0.42)" : "rgba(34, 211, 238, 0.65)";
      const goldColor = isDark ? "rgba(234, 179, 8, 0.32)" : "rgba(253, 224, 71, 0.6)"; // Warm yellow/gold accent

      const drawWash = (x: number, y: number, r: number, color: string) => {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };

      // Draw large, overlapping paint wash blobs to create the pricing style soft gradient mesh
      // Bottom-Left (Cyan)
      drawWash(random(150, 300), random(350, 480), random(260, 380), cyanColor);
      drawWash(random(250, 450), random(300, 450), random(220, 320), cyanColor);

      // Top-Left (Rose/Pink)
      drawWash(random(100, 250), random(80, 180), random(250, 350), roseColor);
      drawWash(random(50, 180), random(50, 150), random(200, 300), roseColor);

      // Center & Right (Indigo/Blue)
      drawWash(random(350, 500), random(150, 280), random(250, 380), indigoColor);
      drawWash(random(400, 600), random(200, 350), random(200, 320), indigoColor);

      // Bottom-Right (Gold/Yellow accent matching the gold splashes in the second image)
      drawWash(random(550, 700), random(350, 480), random(200, 300), goldColor);
      drawWash(random(600, 750), random(100, 250), random(180, 260), goldColor);

      ctx.restore();

      // 2. High-detailing noise grain (creates the canvas texture grain)
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const noiseIntensity = isDark ? 4 : 7;
      for (let i = 0; i < data.length; i += 4) {
        const noiseVal = (Math.random() - 0.5) * noiseIntensity;
        data[i] = Math.min(255, Math.max(0, data[i] + noiseVal));     // R
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noiseVal)); // G
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noiseVal)); // B
      }
      ctx.putImageData(imgData, 0, 0);

      // 3. Draw tiny organic paper pulp fibers (light and dark) for cold-press paper detailing
      ctx.save();
      // Dark fibers
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = isDark ? 0.015 : 0.01;
      ctx.strokeStyle = isDark ? "#ffffff" : "#000000";
      ctx.lineWidth = 0.4;
      for (let i = 0; i < 3500; i++) {
        ctx.beginPath();
        const fx = Math.random() * width;
        const fy = Math.random() * height;
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(
          fx + random(-4, 4),
          fy + random(-4, 4),
          fx + random(-8, 8),
          fy + random(-8, 8)
        );
        ctx.stroke();
      }

      // Light fibers (adds highlights/pits texture)
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = isDark ? 0.025 : 0.018;
      ctx.strokeStyle = isDark ? "#ffffff" : "#ffffff";
      ctx.lineWidth = 0.4;
      for (let i = 0; i < 2500; i++) {
        ctx.beginPath();
        const fx = Math.random() * width;
        const fy = Math.random() * height;
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(
          fx + random(-4, 4),
          fy + random(-4, 4),
          fx + random(-8, 8),
          fy + random(-8, 8)
        );
        ctx.stroke();
      }
      ctx.restore();

      // 4. Draw horizontal organic wavy paper ridges (grooves) to mimic the close-up texture
      ctx.save();
      // Shadow ridges (dark grooves)
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = isDark ? 0.02 : 0.015;
      ctx.strokeStyle = isDark ? "#ffffff" : "#000000";
      ctx.lineWidth = 0.6;
      for (let y = 0; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < width; x += 20) {
          const wave = Math.sin(x * 0.03 + y * 0.5) * 1.0 + (Math.random() - 0.5) * 0.5;
          ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }

      // Highlight ridges (light grooves) offset by 1px to create a 3D embossed look
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = isDark ? 0.03 : 0.022;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.6;
      for (let y = 0; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y - 1);
        for (let x = 0; x < width; x += 20) {
          const wave = Math.sin(x * 0.03 + y * 0.5) * 1.0 + (Math.random() - 0.5) * 0.5;
          ctx.lineTo(x, y - 1 + wave);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    paint();

    // Re-draw when class (e.g. dark mode) changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          paint();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full max-w-[600px] mx-auto overflow-hidden",
        "flex items-center justify-center font-sans border border-slate-200/50 dark:border-slate-800/50",
        "bg-slate-50 dark:bg-zinc-950 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]",
        className
      )}
      style={{
        aspectRatio: "600 / 420",
        "--hub-anim-duration": `${animationDuration}ms`,
      } as React.CSSProperties}
      role="region"
      aria-label="Audience Hub diagram showing connection of audience sources to the central hub"
    >
      {/* Dynamic Canvas Paint & Texture Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

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
        className="w-full h-full pointer-events-none z-10"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="blueish-smoke" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.010;0.016;0.010" dur="40s" repeatCount="indefinite"/>
            </feTurbulence>
            <feColorMatrix type="matrix" values="
              0 0 0 0 0.2
              0 0 0 0 0.5
              0 0 0 0 0.95
              1 0 0 0 0
            " result="coloredNoise"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.035"/>
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Very faint blueish smoke overlay */}
        <rect width="600" height="420" filter="url(#blueish-smoke)" className="pointer-events-none" />

        {/* Connector line paths */}
        {NODE_DEFS.map(({ id, path, pathLength, lineDelay }) => (
          <g key={`conn-${id}`}>
            {/* Static base line */}
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className={cn(
                "text-slate-400 dark:text-zinc-700",
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
                strokeWidth="1.2"
                strokeLinecap="round"
                className="text-white/70 dark:text-white/60 animate-[jackui-line-draw_var(--hub-anim-duration)_ease-in-out_infinite] motion-reduce:animate-none filter-[drop-shadow(0_0_2px_rgba(255,255,255,0.7))_drop-shadow(0_0_4px_rgba(255,255,255,0.4))]"
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
                    "w-full h-full flex items-center gap-2.5 px-3.5 border rounded-[3px] backdrop-blur-md transition-all duration-300 font-sans font-medium uppercase tracking-widest text-[10px] select-none cursor-pointer active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                    "bg-gradient-to-r from-white/45 via-white/20 to-white/10 border-black text-slate-800 hover:from-white/60 hover:via-white/35 hover:to-white/20 hover:border-black focus:from-white/50 focus:to-white/25",
                    "dark:bg-gradient-to-r dark:from-zinc-900/45 dark:via-zinc-900/20 dark:to-zinc-900/10 dark:border-black dark:text-zinc-200 dark:hover:from-zinc-900/60 dark:hover:via-zinc-900/35 dark:hover:to-zinc-900/20 dark:hover:border-black"
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
              strokeWidth="1.2"
              className="text-white/40 dark:text-white/30 origin-[300px_210px] animate-[jackui-hub-ripple-pulse_var(--hub-anim-duration)_cubic-bezier(0.16,1,0.3,1)_infinite] motion-reduce:animate-none filter-[drop-shadow(0_0_3px_rgba(255,255,255,0.4))]"
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
            className="text-white dark:text-zinc-900 stroke-slate-200 dark:stroke-zinc-800"
          />
          {/* 3D Isometric Component Stack (representing modular component blocks) */}
          <g className="text-slate-800 dark:text-white pointer-events-none">
            {/* Top Card */}
            <path
              d="M 284, 198 L 300, 190 L 316, 198 L 300, 206 Z"
              fill="currentColor"
              opacity="0.3"
              className={animated ? "animate-[jackui-breathe_2s_ease-in-out_infinite_500ms]" : ""}
            />
            {/* Middle Card */}
            <path
              d="M 284, 210 L 300, 202 L 316, 210 L 300, 218 Z"
              fill="currentColor"
              opacity="0.6"
              className={animated ? "animate-[jackui-breathe_2s_ease-in-out_infinite_250ms]" : ""}
            />
            {/* Bottom Card */}
            <path
              d="M 284, 222 L 300, 214 L 316, 222 L 300, 230 Z"
              fill="currentColor"
              className={animated ? "animate-[jackui-breathe_2s_ease-in-out_infinite]" : ""}
            />
            {/* Vertical connector core axis */}
            <line
              x1={300}
              y1={194}
              x2={300}
              y2={226}
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.45"
              strokeDasharray="2,2"
            />
          </g>
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
                "text-slate-400 dark:text-zinc-600",
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
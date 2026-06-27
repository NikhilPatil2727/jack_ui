"use client";

import React, { useId } from "react";

export interface AudienceHubAnimationProps {
  labels?: string[];
  animated?: boolean;
  className?: string;
}

const ICONS = {
  Company: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[14px] h-[14px]"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="6" y1="3" x2="6" y2="8" />
    </svg>
  ),
  LinkedIn: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[14px] h-[14px]"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Layers: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[14px] h-[14px]"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Chat: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[14px] h-[14px]"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  PersonSearch: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[14px] h-[14px]"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8a3 3 0 0 0-3 3" />
    </svg>
  ),
};

export function AudienceHubAnimation({
  labels = [
    "Company Page Visitors",
    "LinkedIn Followers",
    "Post Engagers",
    "Post Commenters",
    "Post Visitors",
  ],
  animated = true,
  className = "",
}: AudienceHubAnimationProps) {
  const componentId = useId().replace(/:/g, "");

  const nodes = [
    {
      id: "company",
      label: labels[0],
      x: 300,
      y: 50,
      lineX: 300,
      lineY: 68,
      path: "M300 68 L300 178",
      pathLength: 110,
      icon: ICONS.Company,
      lineDelay: 0,
      labelDelay: 200,
    },
    {
      id: "linkedin",
      label: labels[1],
      x: 120,
      y: 88,
      lineX: 200,
      lineY: 88,
      path: "M200 88 L285 88 L285 178",
      pathLength: 175,
      icon: ICONS.LinkedIn,
      lineDelay: 150,
      labelDelay: 350,
    },
    {
      id: "engagers",
      label: labels[2],
      x: 480,
      y: 88,
      lineX: 400,
      lineY: 88,
      path: "M400 88 L315 88 L315 178",
      pathLength: 175,
      icon: ICONS.Layers,
      lineDelay: 300,
      labelDelay: 500,
    },
    {
      id: "commenters",
      label: labels[3],
      x: 120,
      y: 310,
      lineX: 200,
      lineY: 310,
      path: "M200 310 L200 210 L268 210",
      pathLength: 168,
      icon: ICONS.Chat,
      lineDelay: 450,
      labelDelay: 650,
    },
    {
      id: "visitors",
      label: labels[4],
      x: 480,
      y: 310,
      lineX: 400,
      lineY: 310,
      path: "M400 310 L400 210 L332 210",
      pathLength: 168,
      icon: ICONS.PersonSearch,
      lineDelay: 600,
      labelDelay: 800,
    },
  ];

  return (
    <div
      className={`relative w-full max-w-[600px] mx-auto aspect-[600/420] overflow-hidden flex items-center justify-center font-sans audience-hub-container-${componentId} ${className}`}
      role="img"
      aria-label="Diagram showing Valley AI aggregating LinkedIn audience sources"
    >
      <style>{`
        /* Nature Background and Theme Tokens */
        .audience-hub-container-${componentId} {
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80');
          background-size: cover;
          background-position: center;
          --card-bg: rgba(255, 255, 255, 0.85);
          --card-border: rgba(255, 255, 255, 0.95);
          --card-text: #0f172a;
          --line-stroke: rgba(255, 255, 255, 0.55);
          --line-stroke-active: #ffffff;
          --hub-bg: #ffffff;
          --hub-icon: #0f172a;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.2);
        }

        :is(.dark) .audience-hub-container-${componentId} {
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80');
          --card-bg: rgba(0, 0, 0, 0.65);
          --card-border: rgba(255, 255, 255, 0.15);
          --card-text: #ffffff;
          --line-stroke: rgba(255, 255, 255, 0.3);
          --line-stroke-active: rgba(255, 255, 255, 0.8);
          --hub-bg: #000000;
          --hub-icon: #ffffff;
        }

        /* Mount-only Animations for Cards/Hub */
        @keyframes pulse-hub-${componentId} {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fade-slide-${componentId} {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Repeating Infinite Drawing Loop for Lines */
        @keyframes draw-line-${componentId} {
          0% {
            stroke-dashoffset: var(--dash-length);
          }
          40% {
            stroke-dashoffset: 0;
          }
          85% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          90% {
            opacity: 0;
          }
          95% {
            stroke-dashoffset: var(--dash-length);
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Static Breathing for Line overlay */
        @keyframes breathe-line-${componentId} {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1.0;
          }
        }

        /* Apply Animations */
        .hub-node-${componentId} {
          transform-origin: 300px 210px;
          animation: pulse-hub-${componentId} 500ms ease-out 100ms both;
        }

        .label-card-${componentId} {
          animation: fade-slide-${componentId} 400ms ease-out both;
        }

        .connector-line-${componentId} {
          animation: draw-line-${componentId} 3s ease-in-out infinite;
        }

        .connector-group-${componentId} {
          animation: breathe-line-${componentId} 3s ease-in-out infinite;
        }

        /* Prefers Reduced Motion override */
        @media (prefers-reduced-motion: reduce) {
          .hub-node-${componentId},
          .label-card-${componentId},
          .connector-line-${componentId},
          .connector-group-${componentId} {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 600 420"
        className="w-full h-full pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw Connector Lines */}
        {nodes.map((node) => {
          const dashStyle = {
            "--dash-length": node.pathLength,
            strokeDasharray: node.pathLength,
            strokeDashoffset: node.pathLength,
          } as React.CSSProperties;

          return (
            <g key={`group-${node.id}`}>
              {/* Static connector line underneath */}
              <path
                d={node.path}
                fill="none"
                stroke="var(--line-stroke)"
                strokeWidth="1.5"
              />

              {/* Connector animated overlay (repeats draw-on cycle) */}
              <g
                className={`connector-group-${componentId}`}
                style={
                  animated
                    ? {
                        animationDelay: `${node.lineDelay}ms`,
                      }
                    : {}
                }
              >
                <path
                  d={node.path}
                  fill="none"
                  stroke="var(--line-stroke-active)"
                  strokeWidth="1.5"
                  className={animated ? `connector-line-${componentId}` : ""}
                  style={
                    animated
                      ? {
                          ...dashStyle,
                          animationDelay: `${node.lineDelay}ms`,
                        }
                      : {}
                  }
                />
              </g>

              {/* Connector-to-label junction dot */}
              <circle
                cx={node.lineX}
                cy={node.lineY}
                r="3"
                fill="var(--card-text)"
                opacity="0.6"
                className={animated ? `label-card-${componentId}` : ""}
                style={
                  animated
                    ? {
                        animationDelay: `${node.labelDelay}ms`,
                        animationFillMode: "both",
                      }
                    : {}
                }
              />
            </g>
          );
        })}

        {/* Draw Label Cards */}
        {nodes.map((node) => (
          <g
            key={`card-${node.id}`}
            className={animated ? `label-card-${componentId}` : ""}
            style={
              animated
                ? {
                    animationDelay: `${node.labelDelay}ms`,
                    animationFillMode: "both",
                  }
                : {}
            }
          >
            {/* Backdrop-blurred label rectangle card */}
            <rect
              x={node.x - 80}
              y={node.y - 18}
              width="160"
              height="36"
              rx="6"
              ry="6"
              fill="var(--card-bg)"
              stroke="var(--card-border)"
              strokeWidth="1.5"
              className="backdrop-blur-md"
            />

            {/* Label icon + text using foreignObject */}
            <foreignObject
              x={node.x - 80}
              y={node.y - 18}
              width="160"
              height="36"
            >
              <div className="w-full h-full flex items-center justify-start gap-2.5 px-3.5 text-[var(--card-text)] font-semibold select-none">
                <span className="opacity-90 flex items-center justify-center shrink-0">
                  {node.icon}
                </span>
                <span
                  style={{
                    fontFamily: "PP Neue Montreal Medium, sans-serif",
                    fontSize: "11px",
                    lineHeight: "13.2px",
                  }}
                  className="uppercase tracking-widest truncate mt-[1px]"
                >
                  {node.label}
                </span>
              </div>
            </foreignObject>
          </g>
        ))}

        {/* Central Hub Card (64x64px centered at 300, 210) */}
        <g className={animated ? `hub-node-${componentId}` : ""}>
          <rect
            x="268"
            y="178"
            width="64"
            height="64"
            rx="16"
            ry="16"
            fill="var(--hub-bg)"
            stroke="var(--card-border)"
            strokeWidth="1.5"
          />
          {/* Custom Jack UI Logo Mark */}
          <foreignObject
            x="268"
            y="178"
            width="64"
            height="64"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center select-none font-bold">
              <span
                style={{
                  fontFamily: "PP Neue Montreal Medium, sans-serif",
                  fontSize: "22px",
                  lineHeight: "1",
                }}
                className="text-[var(--hub-icon)] tracking-tighter"
              >
                J
              </span>
              <span
                style={{
                  fontFamily: "PP Neue Montreal Medium, sans-serif",
                  fontSize: "7px",
                  letterSpacing: "0.15em",
                }}
                className="text-[var(--hub-icon)] uppercase opacity-85 mt-0.5"
              >
                JACK UI
              </span>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

export default AudienceHubAnimation;
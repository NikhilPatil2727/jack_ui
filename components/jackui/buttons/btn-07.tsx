"use client";

/**
 * @component: Btn07
 * @author: your-name
 * @description: Star Burst Button — colorful star glyphs explode from the
 *               exact click point, scatter outward, then fade. Pure React,
 *               no external UI dependencies.
 * @version: 1.0.0
 * @license: MIT
 */

import {
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
} from "react";

/* ─── types ──────────────────────────────────────────────────── */

interface Star {
  id: number;
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

interface Btn07Props {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onSuccess?: () => void;
  className?: string;
  disabled?: boolean;
}

/* ─── constants ──────────────────────────────────────────────── */

const GLYPHS = ["★", "✦", "✧", "✩", "✫", "✬"];
const COLORS = [
  "#a78bfa",
  "#fbbf24",
  "#f0abfc",
  "#60a5fa",
  "#34d399",
  "#fb923c",
];

let uid = 0;

/* ─── styles ─────────────────────────────────────────────────── */

const CSS = `
@keyframes btn07-fly {
  0%   { transform: translate(-50%,-50%) scale(0) rotate(0deg); opacity: 1; }
  35%  { opacity: 1; }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
               scale(1) rotate(var(--dr));
    opacity: 0;
  }
}
.btn07 {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 22px;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.015em;
  color: #fff;
  background: #09090b;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  transition: background 0.15s, transform 0.12s cubic-bezier(.34,1.56,.64,1);
  -webkit-font-smoothing: antialiased;
  user-select: none;
}
.btn07:hover  { background: #18181b; transform: translateY(-1px); }
.btn07:active { transform: scale(0.94); }
.btn07:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.btn07-star {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  line-height: 1;
  animation: btn07-fly var(--dur) cubic-bezier(.2,.8,.35,1) var(--delay) forwards;
}
`;

function useInjectStyles() {
  useEffect(() => {
    if (document.getElementById("btn07-styles")) return;
    const tag = document.createElement("style");
    tag.id = "btn07-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);
}

/* ─── particle layer ─────────────────────────────────────────── */

function Stars({ stars }: { stars: Star[] }) {
  return (
    <>
      {stars.map((s) => (
        <span
          key={s.id}
          className="btn07-star"
          style={
            {
              left: s.x,
              top: s.y,
              fontSize: s.size,
              color: s.color,
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
              "--dr": `${s.rotate}deg`,
              "--dur": `${s.duration}ms`,
              "--delay": `${s.delay}ms`,
            } as CSSProperties
          }
        >
          {s.glyph}
        </span>
      ))}
    </>
  );
}

/* ─── Btn07 ──────────────────────────────────────────────────── */

export default function Btn07({
  children,
  onClick,
  onSuccess,
  className = "",
  disabled = false,
}: Btn07Props) {
  useInjectStyles();
  const [stars, setStars] = useState<Star[]>([]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);

      const COUNT = 6 + Math.floor(Math.random() * 3);

      const burst: Star[] = Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2 - Math.PI / 2 + (Math.random() - 0.5) * 0.85;
        const dist = 40 + Math.random() * 38;
        const dur = 580 + Math.random() * 140;

        return {
          id:       ++uid,
          x:        e.clientX,
          y:        e.clientY,
          glyph:    GLYPHS[i % GLYPHS.length],
          color:    COLORS[i % COLORS.length],
          size:     10 + Math.random() * 8,
          dx:       Math.cos(angle) * dist,
          dy:       Math.sin(angle) * dist,
          rotate:   (Math.random() - 0.5) * 130,
          delay:    i * 28,
          duration: dur,
        };
      });

      setStars((prev) => [...prev, ...burst]);

      const ttl = Math.max(...burst.map((s) => s.duration + s.delay)) + 80;
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => !burst.includes(s)));
        onSuccess?.();
      }, ttl);
    },
    [disabled, onClick, onSuccess]
  );

  return (
    <>
      <Stars stars={stars} />
      <button
        className={`btn07${className ? ` ${className}` : ""}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {children ?? "Click me"}
      </button>
    </>
  );
}
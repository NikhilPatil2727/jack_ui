"use client";

import { motion, Variants } from "motion/react";
import React, { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface EnvelopeCardItem {
  id: string;
  label: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
  theme?: "crimson" | "midnight" | "forest";
}

export interface EnvelopeCardProps {
  items?: EnvelopeCardItem[];
  className?: string;
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────
// Organic, soft, tactile paper-like color palettes and layered shadows.
const themes = {
  crimson: {
    backGradient: "linear-gradient(160deg, #fbfaf8 30%, #ede8e3 100%)",
    frontGradStart: "#f6f2ee",
    frontGradEnd: "#e6e0d8",
    edgeStroke: "rgba(180, 170, 160, 0.4)",
    edgeHighlight: "rgba(255, 255, 255, 0.85)",
    shadowColor: "rgba(65, 55, 45, 0.08)",
    hoverShadow: "rgba(65, 55, 45, 0.18)",
  },
  midnight: {
    backGradient: "linear-gradient(160deg, #fafbfb 30%, #e2e5e8 100%)",
    frontGradStart: "#edf1f3",
    frontGradEnd: "#dae0e5",
    edgeStroke: "rgba(150, 160, 170, 0.4)",
    edgeHighlight: "rgba(255, 255, 255, 0.85)",
    shadowColor: "rgba(35, 45, 55, 0.08)",
    hoverShadow: "rgba(35, 45, 55, 0.18)",
  },
  forest: {
    backGradient: "linear-gradient(160deg, #fafbfa 30%, #e1e7e1 100%)",
    frontGradStart: "#edf2ed",
    frontGradEnd: "#d7e0d7",
    edgeStroke: "rgba(150, 170, 150, 0.4)",
    edgeHighlight: "rgba(255, 255, 255, 0.85)",
    shadowColor: "rgba(35, 55, 35, 0.08)",
    hoverShadow: "rgba(35, 55, 35, 0.18)",
  },
} as const;

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: EnvelopeCardItem[] = [
  {
    id: "1",
    label: "Cabin · Cozy Woods",
    title: "The A-Frame Retreat",
    description: "Deep forest escape · Wood fireplace",
    price: "From $180 / night",
    imageUrl: "/nature_cabin_1.png",
    imageAlt: "Cozy A-frame cabin in autumn woods",
    theme: "crimson",
  },
  {
    id: "2",
    label: "Cabin · Lakeside",
    title: "Lakeside Glow Cottage",
    description: "Waterfront deck · Warm cozy fireplace",
    price: "From $220 / night",
    imageUrl: "/nature_cabin_2.png",
    imageAlt: "Cozy wooden cottage by a lake at dusk",
    theme: "midnight",
  },
  {
    id: "3",
    label: "Lodge · Pine Forest",
    title: "Misty Mountain Lodge",
    description: "Surrounded by pines · Outdoor hot tub",
    price: "From $260 / night",
    imageUrl: "/nature_cabin_3.png",
    imageAlt: "Lodge surrounded by green forest trees",
    theme: "forest",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SingleEnvelopeProps {
  item: EnvelopeCardItem;
}

function SingleEnvelope({ item }: SingleEnvelopeProps) {
  const t = themes[item.theme ?? "crimson"];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 select-none"
      style={{ 
        width: 220, 
        height: 350, 
        cursor: "pointer", 
        zIndex: isHovered ? 50 : 1 
      }}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* ── 1. Envelope Back ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 w-full rounded-b-[14px]"
        style={{
          height: 150,
          background: t.backGradient,
          zIndex: 0,
          boxShadow: isHovered 
            ? `0 12px 28px ${t.hoverShadow}` 
            : `0 4px 12px ${t.shadowColor}`,
          transition: "box-shadow 0.3s ease",
        }}
      />

      {/* ── 2. Card (animates upward on hover) ── */}
      <motion.article
        variants={{
          initial: { y: 20, x: "-50%" },
          hover: { y: -80, x: "-50%" },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="absolute overflow-hidden rounded-[10px]"
        style={{
          left: "50%",
          bottom: 40,
          width: 196,
          height: 230,
          zIndex: 10,
          boxShadow: isHovered 
            ? `0 24px 38px ${t.hoverShadow}` 
            : `0 8px 16px ${t.shadowColor}`,
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.95) saturate(1.15)",
          }}
        />
      </motion.article>

      {/* ── 3. Envelope Front (SVG) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 w-full pointer-events-none"
        style={{
          height: 150,
          zIndex: 20,
          filter: `drop-shadow(0 -4px 10px ${t.shadowColor})`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`frontGrad-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={t.frontGradStart} />
              <stop offset="100%" stopColor={t.frontGradEnd} />
            </linearGradient>
          </defs>
          {/* Main flap */}
          <path
            d="M0,0 L50,42 L100,0 L100,100 L0,100 Z"
            fill={`url(#frontGrad-${item.id})`}
          />
          {/* Creases with highlight and shadow */}
          {/* Top crease shadow */}
          <path
            d="M0,0 L50,42 L100,0"
            fill="none"
            stroke={t.edgeStroke}
            strokeWidth="1.2"
          />
          {/* Top crease highlight offset slightly down */}
          <path
            d="M0,1 L50,43 L100,1"
            fill="none"
            stroke={t.edgeHighlight}
            strokeWidth="0.8"
          />
          {/* Bottom crease shadow */}
          <path
            d="M0,100 L50,58 L100,100"
            fill="none"
            stroke={t.edgeStroke}
            strokeWidth="0.8"
          />
          {/* Bottom crease highlight offset slightly up */}
          <path
            d="M0,99 L50,57.2 L100,99"
            fill="none"
            stroke={t.edgeHighlight}
            strokeWidth="0.6"
          />
        </svg>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function EnvelopeCard({
  items = DEFAULT_ITEMS,
  className = "",
}: EnvelopeCardProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`flex flex-wrap items-start justify-center gap-x-8 gap-y-12 p-8 ${className}`}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <SingleEnvelope item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
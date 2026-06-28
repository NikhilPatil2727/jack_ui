"use client";

/**
 * @component: EnvelopeCard
 * @author: Jack UI library
 * @description: 3D Envelope Card — premium paper-like envelope card components
 *               with ambient lighting, 3-stop diagonal gradients, and responsive
 *               photo-sheen glare transitions on hover.
 *
 * Part of your UI library — compatible with Next.js 13+ App Router
 */

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
// Highly refined HSL/Hex values with 3-stop lighting gradients and ambient shadows.
const themes = {
  crimson: {
    backGradient: "linear-gradient(135deg, #fdfcfb 0%, #f4f0eb 50%, #e6e0d8 100%)",
    frontGradStart: "#fbfaf9",
    frontGradMiddle: "#f0ebe5",
    frontGradEnd: "#ded7ce",
    edgeStroke: "rgba(139, 115, 92, 0.22)",
    edgeHighlight: "rgba(255, 255, 255, 0.95)",
    shadowColor: "rgba(45, 35, 25, 0.05)",
    hoverShadow: "rgba(45, 35, 25, 0.14)",
  },
  midnight: {
    backGradient: "linear-gradient(135deg, #fbfcfc 0%, #eff2f4 50%, #e0e5ea 100%)",
    frontGradStart: "#f6f8f9",
    frontGradMiddle: "#ebedf0",
    frontGradEnd: "#d3dae0",
    edgeStroke: "rgba(92, 115, 139, 0.22)",
    edgeHighlight: "rgba(255, 255, 255, 0.95)",
    shadowColor: "rgba(25, 35, 45, 0.05)",
    hoverShadow: "rgba(25, 35, 45, 0.14)",
  },
  forest: {
    backGradient: "linear-gradient(135deg, #fcfdfc 0%, #edf2ed 50%, #dae2da 100%)",
    frontGradStart: "#f5f8f5",
    frontGradMiddle: "#e6ede6",
    frontGradEnd: "#cfdacf",
    edgeStroke: "rgba(92, 139, 92, 0.22)",
    edgeHighlight: "rgba(255, 255, 255, 0.95)",
    shadowColor: "rgba(25, 45, 25, 0.05)",
    hoverShadow: "rgba(25, 45, 25, 0.14)",
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
            ? `0 16px 36px ${t.hoverShadow}`
            : `0 4px 16px ${t.shadowColor}`,
          transition: "box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ── 2. Card (animates upward on hover) ── */}
      <motion.article
        variants={{
          initial: { y: 45, x: "-50%" },
          hover: { y: -70, x: "-50%" },
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute overflow-hidden rounded-[10px]"
        style={{
          left: "50%",
          bottom: 50,
          width: 190,
          height: 210,
          zIndex: 10,
          boxShadow: isHovered
            ? `0 24px 44px ${t.hoverShadow}`
            : `0 8px 20px ${t.shadowColor}`,
        }}
      >
        {/* Photo wrapper */}
        <div className="relative w-full h-full">
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
              filter: "brightness(0.95) saturate(1.1)",
            }}
          />
          {/* Real paper-gloss sheen/glare overlay sweeping across the photo card on hover */}
          <motion.div
            variants={{
              initial: { x: "-100%", y: "-100%" },
              hover: { x: "100%", y: "100%" }
            }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 70%)",
              zIndex: 2,
            }}
          />
        </div>
      </motion.article>

      {/* ── 3. Envelope Front (SVG) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 w-full pointer-events-none"
        style={{
          height: 150,
          zIndex: 20,
          filter: `drop-shadow(0 -5px 12px ${t.shadowColor})`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          <defs>
            {/* Diagonal 3-stop light gradient representing light shining from top-left */}
            <linearGradient id={`frontGrad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={t.frontGradStart} />
              <stop offset="42%" stopColor={t.frontGradMiddle} />
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
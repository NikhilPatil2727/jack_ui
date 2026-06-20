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

const themes = {
  crimson: {
    backGradient: "linear-gradient(160deg, #f8f4f0 60%, #ede8e3)",
    frontFill: "#f0ebe5",
    edgeStroke: "#d4cfc9",
    accentColor: "#c0392b",
    sealGradient: "radial-gradient(circle at 40% 35%, #e74c3c, #a93226)", // Kept in theme just in case, but no longer used
  },
  midnight: {
    backGradient: "linear-gradient(160deg, #f5f7f8 60%, #eaecee)",
    frontFill: "#edf0f2",
    edgeStroke: "#c8cdd2",
    accentColor: "#1a3a5c",
    sealGradient: "radial-gradient(circle at 40% 35%, #2980b9, #1a5276)",
  },
  forest: {
    backGradient: "linear-gradient(160deg, #f4f7f4 60%, #e8ede8)",
    frontFill: "#edf2ed",
    edgeStroke: "#c5ccc5",
    accentColor: "#1e5631",
    sealGradient: "radial-gradient(circle at 40% 35%, #27ae60, #1e5631)",
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
      className="relative flex-shrink-0"
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
        className="absolute bottom-0 w-full rounded-b-[14px] shadow-md"
        style={{
          height: 150,
          background: t.backGradient,
          zIndex: 0,
        }}
      />

      {/* ── 2. Card (animates upward on hover) ── */}
      <motion.article
        variants={{
          initial: { y: 20, x: "-50%" },
          hover: { y: -80, x: "-50%" },
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="absolute overflow-hidden rounded-[10px]"
        style={{
          left: "50%",
          bottom: 40,
          width: 196,
          height: 230,
          zIndex: 10,
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,0,0,0.30)" 
            : "0 10px 25px rgba(0,0,0,0.12)",
        }}
      >
        {/* Car photo */}
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
          filter: "drop-shadow(0 -3px 12px rgba(0,0,0,0.08))",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          {/* Main flap */}
          <path
            d="M0,0 L50,42 L100,0 L100,100 L0,100 Z"
            fill={t.frontFill}
          />
          {/* Top crease */}
          <path
            d="M0,0 L50,42 L100,0"
            fill="none"
            stroke={t.edgeStroke}
            strokeWidth="1.2"
          />
          {/* Bottom crease */}
          <path
            d="M0,100 L50,58 L100,100"
            fill="none"
            stroke={t.edgeStroke}
            strokeWidth="0.8"
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
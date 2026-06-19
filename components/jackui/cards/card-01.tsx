"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useRef, useState } from "react";

interface CardData {
  id: number;
  title: string;
  description: string;
  tag: string;
  color: string;
}

const cards: CardData[] = [
  {
    id: 1,
    title: "Design System",
    description: "A unified visual language crafted for scale and clarity across every surface.",
    tag: "UI / UX",
    color: "#C8F0DC",
  },
  {
    id: 2,
    title: "Motion Lab",
    description: "Interactions that feel alive — micro-moments that guide and delight.",
    tag: "Animation",
    color: "#D4C8F0",
  },
  {
    id: 3,
    title: "Brand Identity",
    description: "Visual stories told through mark, type, and colour that endure.",
    tag: "Branding",
    color: "#F0E0C8",
  },
];

function EnvelopeCard({ card }: { card: CardData }) {
  const [hovered, setHovered] = useState(false);
  const cardY = useMotionValue(0);

  const handleEnter = () => {
    setHovered(true);
    animate(cardY, -28, { type: "spring", stiffness: 300, damping: 22 });
  };

  const handleLeave = () => {
    setHovered(false);
    animate(cardY, 0, { type: "spring", stiffness: 300, damping: 22 });
  };

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: 300 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── CARD ── */}
      <motion.div
        style={{ y: cardY, zIndex: 10, position: "relative" }}
        className="w-full rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Card face */}
        <div
          className="relative w-full rounded-2xl p-7 flex flex-col justify-between"
          style={{
            height: 340,
            background: "#F3F3F3",
            boxShadow: hovered
              ? "0 32px 64px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.18)"
              : "0 4px 24px rgba(0,0,0,0.10)",
            transition: "box-shadow 0.35s ease",
          }}
        >
          {/* Tag pill */}
          <span
            className="self-start text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: card.color,
              color: "#1a1a1a",
              letterSpacing: "0.12em",
            }}
          >
            {card.tag}
          </span>

          {/* Content */}
          <div>
            <h2
              className="text-2xl font-bold mb-2 leading-tight"
              style={{ color: "#111", fontFamily: "'Inter', sans-serif" }}
            >
              {card.title}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#666", fontFamily: "'Inter', sans-serif" }}
            >
              {card.description}
            </p>
          </div>

          {/* Arrow hint */}
          <motion.div
            animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className="self-end text-xs font-medium tracking-wide"
            style={{ color: "#aaa" }}
          >
            Open ↗
          </motion.div>
        </div>
      </motion.div>

      {/* ── ENVELOPE ── */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: 160,
          zIndex: 5,
        }}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-b-2xl rounded-t-none"
          style={{
            background: "#1a1a1a",
            border: "1.5px solid #333",
            borderTop: "none",
          }}
        />

        {/* Envelope flap (top V shape) */}
        <svg
          viewBox="0 0 300 80"
          className="absolute top-0 left-0 w-full"
          style={{ height: 80 }}
          preserveAspectRatio="none"
        >
          {/* flap background */}
          <polygon points="0,0 300,0 300,4 150,68 0,4" fill="#1a1a1a" />
          {/* flap crease lines */}
          <polyline
            points="0,0 150,68 300,0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="0" y1="0" x2="300" y2="0" stroke="#333" strokeWidth="1.5" />
        </svg>

        {/* Content peeking inside envelope (visible at rest, slides with card) */}
        <motion.div
          className="absolute left-0 w-full flex flex-col items-center justify-center"
          style={{ top: 40, opacity: hovered ? 0 : 0.55 }}
          animate={{ opacity: hovered ? 0 : 0.55 }}
          transition={{ duration: 0.25 }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: card.color, letterSpacing: "0.14em" }}
          >
            {card.tag}
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            {card.title}
          </span>
        </motion.div>

        {/* Envelope side lines */}
        <svg
          viewBox="0 0 300 160"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ pointerEvents: "none" }}
        >
          <line x1="0" y1="0" x2="0" y2="160" stroke="#333" strokeWidth="1.5" />
          <line x1="300" y1="0" x2="300" y2="160" stroke="#333" strokeWidth="1.5" />
          <line x1="0" y1="160" x2="300" y2="160" stroke="#333" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}

export default function Card_01() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: "#111" }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-8"
        style={{ color: "#555", letterSpacing: "0.2em" }}
      >
        Hover to reveal
      </p>
      <div className="flex flex-wrap items-end justify-center gap-10">
        {cards.map((card) => (
          <EnvelopeCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
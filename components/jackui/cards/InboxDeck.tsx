"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // or "motion/react" depending on your v12 setup

export interface EnvelopeCardData {
    id: string;
    tag: string;
    time: string;
    title: string;
    subtitle: string;
    imageUrl: string;
}

const DEFAULT_CARDS: [EnvelopeCardData, EnvelopeCardData, EnvelopeCardData, EnvelopeCardData] = [
    {
        id: "c-1",
        tag: "Retreats",
        time: "2m ago",
        title: "Pine Creek Cabin",
        subtitle: "Booking confirmed for Oct 24. Code: #49A",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "c-2",
        tag: "Design",
        time: "45m ago",
        title: "A-Frame Blueprint",
        subtitle: "Interior lighting specs have been approved by the client.",
        imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "c-3",
        tag: "Finance",
        time: "1.5h ago",
        title: "Deposit Cleared",
        subtitle: "Stripe payout of $2,850.00 is now available in your balance.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "c-4",
        tag: "DevOps",
        time: "3h ago",
        title: "Serverless Deploy",
        subtitle: "US-East-1 Edge routing successfully migrated to Node 20.",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
];

// The precise math for a 4-card symmetrical fan arch
const CHOREOGRAPHY = [
    { idle: { x: -6, y: 4, rotate: -4 }, hover: { x: -165, y: -105, rotate: -18 } },
    { idle: { x: -2, y: 1, rotate: -1 }, hover: { x: -55, y: -138, rotate: -6 } },
    { idle: { x: 2, y: -1, rotate: 2 }, hover: { x: 55, y: -138, rotate: 6 } },
    { idle: { x: 6, y: 2, rotate: 5 }, hover: { x: 165, y: -105, rotate: 18 } },
];

interface EnvelopeDeckProps {
    cards?: [EnvelopeCardData, EnvelopeCardData, EnvelopeCardData, EnvelopeCardData];
    className?: string;
}

export default function EnvelopeDeck({ cards = DEFAULT_CARDS, className = "" }: EnvelopeDeckProps) {
    const [isDeckHovered, setIsDeckHovered] = useState(false);
    const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

    return (
        <div className={`relative flex flex-col items-center justify-end p-10 select-none min-h-[480px] ${className}`}>
            <motion.div
                onHoverStart={() => setIsDeckHovered(true)}
                onHoverEnd={() => {
                    setIsDeckHovered(false);
                    setFocusedCardId(null);
                }}
                onClick={() => setIsDeckHovered(!isDeckHovered)}
                className="relative w-[340px] h-[220px] cursor-pointer group"
            >
                {/* 1. THE ENVELOPE BACK (Inside wall) */}
                <div className="absolute inset-0 bg-[#ECE7DE] rounded-2xl border border-[#D5CEC2] shadow-[inset_0_12px_25px_-5px_rgba(0,0,0,0.15)]" />

                {/* 2. THE 4 CARDS (Sandwiched inside) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[220px] h-[260px] pointer-events-auto">
                    {cards.map((card, i) => {
                        const pos = CHOREOGRAPHY[i];
                        const isThisCardFocused = focusedCardId === card.id;

                        return (
                            <motion.div
                                key={card.id}
                                onHoverStart={() => isDeckHovered && setFocusedCardId(card.id)}
                                initial={false}
                                animate={{
                                    x: isDeckHovered ? pos.hover.x : pos.idle.x,
                                    y: isDeckHovered
                                        ? (isThisCardFocused ? pos.hover.y - 16 : pos.hover.y)
                                        : pos.idle.y,
                                    rotate: isDeckHovered
                                        ? (isThisCardFocused ? 0 : pos.hover.rotate)
                                        : pos.idle.rotate,
                                    scale: isDeckHovered
                                        ? (isThisCardFocused ? 1.08 : 1)
                                        : 0.95,
                                    zIndex: isDeckHovered
                                        ? (isThisCardFocused ? 60 : 20 + i)
                                        : 10 + i,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 320 - i * 15,
                                    damping: 22,
                                    mass: 0.9,
                                }}
                                className="absolute inset-0 rounded-2xl overflow-hidden border border-white/40 shadow-2xl bg-neutral-900 group/card"
                            >
                                {/* Card Background Image */}
                                <img
                                    src={card.imageUrl}
                                    alt={card.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                />

                                {/* Dark Vignette to make text readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

                                {/* Card Content */}
                                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20">
                                            {card.tag}
                                        </span>
                                        <span className="text-[10px] text-white/80 font-medium drop-shadow-sm">
                                            {card.time}
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <h4 className="text-sm font-bold text-white tracking-tight drop-shadow">
                                            {card.title}
                                        </h4>
                                        <p className="text-xs text-white/70 line-clamp-2 mt-0.5 font-light leading-relaxed">
                                            {card.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 3. THE ENVELOPE FRONT FLAPS (SVG Paper Geometry) */}
                <div className="absolute inset-0 z-40 overflow-hidden rounded-2xl pointer-events-none drop-shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
                    <svg
                        viewBox="0 0 340 220"
                        className="absolute inset-0 w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Left side flap */}
                        <path d="M0 10 L170 120 L0 220 Z" fill="#E6E0D4" stroke="#D3C9BA" strokeWidth="1.5" />

                        {/* Right side flap */}
                        <path d="M340 10 L170 120 L340 220 Z" fill="#E6E0D4" stroke="#D3C9BA" strokeWidth="1.5" />

                        {/* Main bottom flap (Overlaps the side diagonals to form the pocket peak) */}
                        <path d="M0 220 L170 85 L340 220 Z" fill="#EFECE6" stroke="#D3C9BA" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* 4. THE LEATHER EMBLEM */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                    <div className="px-4 py-1.5 rounded-full bg-[#965A38] text-white text-[11px] font-mono tracking-wider uppercase shadow-lg border border-[#7A4528] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        Mail Deck (4)
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
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

// The precise math for a 4-card symmetrical fan arch centered on a 220px wide envelope
const CHOREOGRAPHY = [
    { idle: { x: -8, y: 14, rotate: -4 }, hover: { x: -130, y: -110, rotate: -16 } },
    { idle: { x: -3, y: 11, rotate: -1.5 }, hover: { x: -44, y: -140, rotate: -6 } },
    { idle: { x: 3, y: 9, rotate: 1.5 }, hover: { x: 44, y: -140, rotate: 6 } },
    { idle: { x: 8, y: 12, rotate: 4 }, hover: { x: 130, y: -110, rotate: 16 } },
];

interface EnvelopeDeckProps {
    cards?: [EnvelopeCardData, EnvelopeCardData, EnvelopeCardData, EnvelopeCardData];
    className?: string;
}

export default function EnvelopeDeck({ cards = DEFAULT_CARDS, className = "" }: EnvelopeDeckProps) {
    const [isDeckHovered, setIsDeckHovered] = useState(false);
    const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

    return (
        <div className={`relative flex flex-col items-center justify-end p-10 select-none min-h-[520px] ${className}`}>
            <motion.div
                onHoverStart={() => setIsDeckHovered(true)}
                onHoverEnd={() => {
                    setIsDeckHovered(false);
                    setFocusedCardId(null);
                }}
                onClick={() => setIsDeckHovered(!isDeckHovered)}
                className="relative w-[260px] h-[180px] cursor-pointer group"
            >
                {/* 1. THE ENVELOPE BACK (Inside wall) */}
                <div
                    className="absolute inset-0 rounded-2xl border shadow-[inset_0_12px_25px_-5px_rgba(45,35,25,0.15)] transition-all duration-300"
                    style={{
                        background: "linear-gradient(135deg, #fdfcfb 0%, #f4f0eb 50%, #e6e0d8 100%)",
                        borderColor: "rgba(139, 115, 92, 0.22)",
                        boxShadow: isDeckHovered
                            ? "0 32px 64px rgba(45,35,25,0.22), inset 0 12px 25px -5px rgba(45,35,25,0.15)"
                            : "0 12px 36px rgba(45,35,25,0.1), inset 0 12px 25px -5px rgba(45,35,25,0.15)",
                    }}
                />

                {/* 2. THE 4 CARDS (Sandwiched inside) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[230px] h-[260px] pointer-events-auto">
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
                                        ? (isThisCardFocused ? pos.hover.y - 18 : pos.hover.y)
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
                                className="absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 group/card"
                            >
                                {/* Card Background Image */}
                                <img
                                    src={card.imageUrl}
                                    alt={card.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                />

                                {/* Dark Vignette to make text readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                                {/* Card Content */}
                                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20">
                                            {card.tag}
                                        </span>
                                        <span className="text-[10px] text-white/90 font-medium drop-shadow-sm">
                                            {card.time}
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <h4 className="text-sm font-bold text-white tracking-tight drop-shadow">
                                            {card.title}
                                        </h4>
                                        <p className="text-xs text-white/80 line-clamp-2 mt-0.5 font-light leading-relaxed">
                                            {card.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 3. THE ENVELOPE FRONT FLAPS (SVG Paper Geometry) */}
                <div className="absolute inset-0 z-40 overflow-hidden rounded-2xl pointer-events-none">
                    <svg
                        viewBox="0 0 260 180"
                        className="absolute inset-0 w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="frontFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fbfaf9" />
                                <stop offset="42%" stopColor="#f0ebe5" />
                                <stop offset="100%" stopColor="#ded7ce" />
                            </linearGradient>
                            <linearGradient id="frontFlapGradAlt" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#fbfaf9" />
                                <stop offset="42%" stopColor="#f0ebe5" />
                                <stop offset="100%" stopColor="#ded7ce" />
                            </linearGradient>
                            <linearGradient id="frontFlapGradBottom" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fbfaf9" />
                                <stop offset="42%" stopColor="#f0ebe5" />
                                <stop offset="100%" stopColor="#ded7ce" />
                            </linearGradient>
                            <filter id="flapShadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#2d2319" floodOpacity="0.1" />
                            </filter>
                        </defs>

                        {/* Left side flap */}
                        <path d="M0 10 L130 95 L0 180 Z" fill="url(#frontFlapGrad)" />
                        <path d="M0 10 L130 95" stroke="rgba(139, 115, 92, 0.22)" strokeWidth="1.2" />
                        <path d="M0 11 L130 96" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="0.8" />

                        {/* Right side flap */}
                        <path d="M260 10 L130 95 L260 180 Z" fill="url(#frontFlapGradAlt)" />
                        <path d="M260 10 L130 95" stroke="rgba(139, 115, 92, 0.22)" strokeWidth="1.2" />
                        <path d="M260 11 L130 96" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="0.8" />

                        {/* Main bottom flap (Overlaps the side diagonals to form the pocket peak) */}
                        <path d="M0 180 L130 75 L260 180 Z" fill="url(#frontFlapGradBottom)" filter="url(#flapShadow)" />
                        <path d="M0 180 L130 75 L260 180" stroke="rgba(139, 115, 92, 0.25)" strokeWidth="1.2" />
                        <path d="M0 179 L130 74 L260 179" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="0.8" />
                    </svg>
                </div>

                {/* 4. WAX SEAL BRAND BADGE */}
                <div
                    className="absolute z-50 transition-all duration-300 pointer-events-none"
                    style={{
                        left: "50%",
                        top: "75px",
                        transform: isDeckHovered 
                            ? "translate(-50%, -50%) scale(1.08)" 
                            : "translate(-50%, -50%) scale(1)",
                        width: "36px",
                        height: "36px",
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 via-red-700 to-red-950 shadow-[0_4px_12px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-red-800 flex items-center justify-center">
                        {/* Elegant gold metallic center element */}
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                        <div className="absolute inset-1 rounded-full border border-red-500/20 pointer-events-none" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
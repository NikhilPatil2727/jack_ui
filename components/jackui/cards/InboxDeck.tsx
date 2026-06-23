"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @component 
 * @author Jack UI
 * @description A premium, interactive envelope card stack deck component.
 * Features realistic SVG flap shadows, depth transitions, hover expansions,
 * and custom wax seal detailing.
 * 
 * Optimizations (Senior Dev, 8+ YOE):
 * - Next.js Image component with optimized sizes/priorities for Cumulative Layout Shift (CLS) prevention.
 * - Full Accessibility (a11y) support (keyboard navigation, ARIA roles, states, focus ring).
 * - GPU acceleration optimization (will-change properties for smooth transitions).
 * - React memoization optimizations (useMemo, useCallback) to avoid unnecessary recalculations/rerenders.
 */

export interface EnvelopeCardData {
    id: string;
    imageUrl: string;
}

const DEFAULT_CARDS: [EnvelopeCardData, EnvelopeCardData, EnvelopeCardData, EnvelopeCardData] = [
    {
        id: "c-1",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "c-2",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "c-3",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "c-4",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
];

// The precise math for a 4-card symmetrical fan arch centered on a 220px wide envelope
const CHOREOGRAPHY = [
    { idle: { x: -8, y: -4, rotate: -4 }, hover: { x: -130, y: -120, rotate: -16 } },
    { idle: { x: -3, y: -7, rotate: -1.5 }, hover: { x: -44, y: -150, rotate: -6 } },
    { idle: { x: 3, y: -9, rotate: 1.5 }, hover: { x: 44, y: -150, rotate: 6 } },
    { idle: { x: 8, y: -6, rotate: 4 }, hover: { x: 130, y: -120, rotate: 16 } },
] as const;

interface EnvelopeDeckProps {
    cards?: [EnvelopeCardData, EnvelopeCardData, EnvelopeCardData, EnvelopeCardData];
    className?: string;
}

export default function EnvelopeDeck({ cards = DEFAULT_CARDS, className = "" }: EnvelopeDeckProps) {
    const [isDeckHovered, setIsDeckHovered] = useState(false);
    const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

    // Memoize backdrop styling to avoid recalculation on unrelated renders
    const backdropStyle = useMemo(() => ({
        background: "linear-gradient(135deg, #fdfcfb 0%, #f4f0eb 50%, #e6e0d8 100%)",
        borderColor: "rgba(139, 115, 92, 0.22)",
        boxShadow: isDeckHovered
            ? "0 32px 64px rgba(45,35,25,0.22), inset 0 12px 25px -5px rgba(45,35,25,0.15)"
            : "0 12px 36px rgba(45,35,25,0.1), inset 0 12px 25px -5px rgba(45,35,25,0.15)",
    }), [isDeckHovered]);

    // Memoize wax seal transform to prevent layout thrashing
    const waxSealStyle = useMemo(() => ({
        left: "50%",
        top: "75px",
        transform: isDeckHovered ? "translate(-50%, -50%) scale(1.08)" : "translate(-50%, -50%) scale(1)",
        width: "36px",
        height: "36px",
    }), [isDeckHovered]);

    // Callbacks to prevent reference recreation
    const handleDeckHoverStart = useCallback(() => setIsDeckHovered(true), []);
    const handleDeckHoverEnd = useCallback(() => {
        setIsDeckHovered(false);
        setFocusedCardId(null);
    }, []);
    const handleDeckClick = useCallback(() => setIsDeckHovered(prev => !prev), []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleDeckClick();
        }
    }, [handleDeckClick]);

    return (
        <div className={cn("relative flex flex-col items-center justify-end p-10 select-none min-h-[520px]", className)}>
            <motion.div
                role="button"
                tabIndex={0}
                aria-label="Interactive card envelope deck. Press Enter or Space to open/close."
                aria-expanded={isDeckHovered}
                onHoverStart={handleDeckHoverStart}
                onHoverEnd={handleDeckHoverEnd}
                onClick={handleDeckClick}
                onKeyDown={handleKeyDown}
                className="relative w-[260px] h-[180px] cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-amber-600/50 rounded-2xl will-change-transform"
            >
                {/* 1. THE ENVELOPE BACK (Inside wall) */}
                <div
                    className="absolute inset-0 rounded-2xl border transition-all duration-300 will-change-[box-shadow,transform]"
                    style={backdropStyle}
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
                                    boxShadow: isThisCardFocused
                                        ? "0 0 25px 6px rgba(255, 255, 255, 0.4), 0 20px 30px rgba(0, 0, 0, 0.6)"
                                        : "0 10px 20px rgba(0, 0, 0, 0.3)",
                                    borderColor: isThisCardFocused
                                        ? "rgba(255, 255, 255, 0.85)"
                                        : "rgba(255, 255, 255, 0.15)",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 320 - i * 15,
                                    damping: 22,
                                    mass: 0.9,
                                }}
                                className="absolute inset-0 rounded-2xl overflow-hidden border bg-neutral-900 group/card will-change-transform"
                            >
                                {/* Card Background Image (Next.js Optimized) */}
                                <Image
                                    src={card.imageUrl}
                                    alt="Envelope Card"
                                    fill
                                    sizes="230px"
                                    priority={i < 2} // Prioritize first two cards for faster initial loading
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                />

                                {/* White flash/shine sweep effect on hover */}
                                <div className="absolute inset-0 -translate-x-[100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none -skew-x-20" />
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
                    className="absolute z-50 transition-all duration-300 pointer-events-none will-change-transform"
                    style={waxSealStyle}
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
"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "coral";

interface Btn01Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string;
    variant?: Variant;
    tag?: string; // optional prefix symbol e.g. "→" or "~"
}

const variantConfig: Record<
    Variant,
    {
        border: string;
        baseText: string;
        inkBg: string;
        litText: string;
        cursor: string;
    }
> = {
    dark: {
        border: "border-zinc-900 dark:border-zinc-100",
        baseText: "text-zinc-900 dark:text-zinc-100",
        inkBg: "bg-zinc-900 dark:bg-zinc-100",
        litText: "text-zinc-50 dark:text-zinc-900",
        cursor: "bg-zinc-50 dark:bg-zinc-900",
    },
    light: {
        border: "border-zinc-300",
        baseText: "text-zinc-500",
        inkBg: "bg-zinc-100",
        litText: "text-zinc-800",
        cursor: "bg-zinc-800",
    },
    coral: {
        border: "border-[#d85a30]",
        baseText: "text-[#d85a30]",
        inkBg: "bg-[#d85a30]",
        litText: "text-zinc-50",
        cursor: "bg-zinc-50",
    },
};

export default function Btn01({
    className,
    children = "Get Started",
    variant = "dark",
    tag,
    disabled,
    ...props
}: Btn01Props) {
    const v = variantConfig[variant];
    const label = children;
    const chars = Array.from(label);

    // 0 = fully out, 1 = fully revealed
    const progress = useRef(0);
    const direction = useRef(0); // 1 = forward, -1 = reverse
    const [litCount, setLitCount] = useState(0);
    const [hovered, setHovered] = useState(false);

    useAnimationFrame((_, delta) => {
        if (direction.current === 0) return;

        progress.current += direction.current * (delta / 320);
        progress.current = Math.max(0, Math.min(1, progress.current));

        const next = Math.round(progress.current * chars.length);
        setLitCount(next);

        if (progress.current === 0 || progress.current === 1) {
            direction.current = 0;
        }
    });

    const handleEnter = useCallback(() => {
        direction.current = 1;
        setHovered(true);
    }, []);

    const handleLeave = useCallback(() => {
        direction.current = -1;
        setHovered(false);
    }, []);

    return (
        <button
            disabled={disabled}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={cn(
                "relative h-[46px] px-6 rounded-[10px] border-[1.5px]",
                "bg-transparent overflow-hidden cursor-pointer select-none",
                "outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                "focus-visible:ring-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed",
                "transition-colors duration-200",
                v.border,
                className
            )}
            {...props}
        >
            {/* Ink slab — skewed, slides in from left */}
            <motion.span
                aria-hidden
                className={cn(
                    "absolute top-[-10%] left-[-8%] h-[120%] w-0 rounded-[4px] pointer-events-none z-0",
                    v.inkBg
                )}
                style={{ skewX: "-6deg" }}
                animate={{ width: hovered ? "116%" : "0%" }}
                transition={{ duration: 0.48, ease: [0.86, 0, 0.07, 1] }}
            />

            {/* Label */}
            <span className="relative z-10 flex items-center gap-0 font-mono text-[13px] font-medium tracking-[0.02em]">
                {tag && (
                    <span
                        className={cn(
                            "mr-2 text-[12px] opacity-40",
                            v.baseText
                        )}
                        aria-hidden
                    >
                        {tag}
                    </span>
                )}

                {chars.map((ch, i) => (
                    <span
                        key={i}
                        className={cn(
                            "inline-block transition-colors duration-[80ms]",
                            i < litCount ? v.litText : v.baseText
                        )}
                    >
                        {ch === " " ? "\u00A0" : ch}
                    </span>
                ))}

                <motion.span
                    aria-hidden
                    className={cn(
                        "inline-block w-[2px] h-[14px] rounded-[1px] ml-[3px] align-middle",
                        v.cursor
                    )}
                    animate={
                        hovered
                            ? { opacity: [1, 0, 1, 0, 1] }
                            : { opacity: 0 }
                    }
                    transition={
                        hovered
                            ? {
                                  duration: 1.3,
                                  repeat: Infinity,
                                  ease: (t: number) => (t < 1 ? 0 : 1),
                              }
                            : { duration: 0.1 }
                    }
                />
            </span>
        </button>
    );
}
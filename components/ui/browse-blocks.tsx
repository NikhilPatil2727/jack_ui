"use client";

import { Link } from "next-view-transitions";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/**
 *
 *
 */
export function BrowseBlocksButton() {
    return (
        <Link
            id="browse-blocks-button"
            href="https://kokonutui.pro/templates"
            className="group flex items-center"
        >
            <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
                className="relative"
            >
                <Button
                    className={cn(
                        "relative h-12 min-w-72 overflow-hidden rounded-2xl px-6 md:min-w-56",
                        "inline-flex items-center justify-center gap-3",
                        "bg-transparent",
                        "text-zinc-700 dark:text-zinc-300",
                        "border border-zinc-300 dark:border-zinc-700",
                        "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                        "hover:border-zinc-400 dark:hover:border-zinc-600",
                        "hover:-translate-y-0.5",
                        "shadow-sm hover:shadow-md",
                        "transition-all duration-300 ease-out"
                    )}
                >
                    {/* Top edge highlight */}
                    <div
                        className={cn(
                            "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent dark:via-zinc-500/20",
                            "opacity-0 transition-opacity duration-300",
                            "group-hover:opacity-100"
                        )}
                    />

                    <span className="relative z-10 font-medium tracking-tight">
                        Browse Blocks
                    </span>

                    <motion.div
                        className="relative z-10"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </Button>
            </motion.div>
        </Link>
    );
}
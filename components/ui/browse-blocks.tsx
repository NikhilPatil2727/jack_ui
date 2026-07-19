"use client";

import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function BrowseBlocksButton() {
    const ref = useRef<HTMLAnchorElement>(null);
    
    // Magnetic pull
    const magnetX = useMotionValue(0);
    const magnetY = useMotionValue(0);
    const springX = useSpring(magnetX, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(magnetY, { stiffness: 150, damping: 15, mass: 0.1 });

    function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        // Magnetic pull calculation
        const centerX = width / 2;
        const centerY = height / 2;
        magnetX.set((x - centerX) * 0.2);
        magnetY.set((y - centerY) * 0.2);
    }

    function handleMouseLeave() {
        magnetX.set(0);
        magnetY.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }}
            style={{ x: springX, y: springY }}
            className="relative w-full sm:w-auto z-10"
        >
            <Link
                ref={ref}
                id="browse-blocks-button"
                href="/docs"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex h-14 w-full sm:w-[220px] items-center justify-center overflow-hidden rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-[1.03] active:scale-[0.97] shadow-sm hover:shadow-md dark:shadow-none"
            >
                {/* Clean hover gradient shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100 dark:via-zinc-800 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide text-[15px]">
                    Browse Blocks
                    <motion.div
                        className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
                        whileHover={{ x: 4, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <ArrowRight className="h-[18px] w-[18px]" />
                    </motion.div>
                </span>
            </Link>
        </motion.div>
    );
}
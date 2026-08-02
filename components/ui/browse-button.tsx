"use client";

import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function BrowseComponentsButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  
  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
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
    mouseX.set(x);
    mouseY.set(y);
    
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
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      style={{ x: springX, y: springY }}
      className="relative w-full sm:w-auto z-10"
    >
      <Link 
        ref={ref}
        href="/docs" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex h-12 w-full sm:w-[220px] items-center justify-center overflow-hidden rounded-full bg-zinc-950 dark:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-xl dark:shadow-none border border-zinc-800 dark:border-white/10"
      >
        {/* Animated spinning gradient background */}
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(99,102,241,0)_0%,rgba(99,102,241,0.5)_50%,rgba(99,102,241,0)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Inner solid background to hide center of spin */}
        <div className="absolute inset-[1px] rounded-full bg-zinc-950 dark:bg-[#0a0a0a] z-0" />
        
        {/* Spotlight cursor glow */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 80%)`
          }}
        />

        {/* Shimmer line */}
        <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
        
        <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-wide text-white text-[15px] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
          Browse Components
          <motion.div
            className="text-white"
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
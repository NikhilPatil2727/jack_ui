"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}

export function PricingHeader({ title, subtitle, isAnnual, setIsAnnual }: PricingHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto mb-20 mt-8">
      
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 whitespace-pre-line leading-tight">
        {title}
      </h2>
      
      <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-normal leading-relaxed mt-4">
        {subtitle}
      </p>

      {/* Unique 3D Perspective Toggle */}
      <div 
        className="mt-10 flex items-center gap-2 p-2 relative z-20"
        style={{ perspective: "1000px" }}
      >
        {/* Monthly Button */}
        <motion.button
          onClick={() => setIsAnnual(false)}
          className={cn(
            "relative px-8 py-3.5 text-sm font-medium rounded-sm z-10 cursor-pointer overflow-hidden border",
            !isAnnual ? "border-zinc-200 dark:border-zinc-800" : "border-transparent"
          )}
          animate={{
            rotateY: isAnnual ? 15 : 0,
            rotateX: isAnnual ? 5 : 0,
            scale: isAnnual ? 0.9 : 1,
            z: isAnnual ? -20 : 0,
            opacity: isAnnual ? 0.6 : 1,
            backgroundColor: !isAnnual ? "var(--bg-active)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "right center",
            "--bg-active": "rgba(255, 255, 255, 1)",
          } as React.CSSProperties}
        >
          {/* Active indicator inner shadow/glow */}
          {!isAnnual && (
            <motion.div 
              layoutId="glow-line"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white"
            />
          )}
          <span className={cn(
            "relative z-10 transition-colors duration-300",
            !isAnnual ? "text-zinc-900 dark:text-zinc-900" : "text-zinc-500 dark:text-zinc-400"
          )}>
            Pay Monthly
          </span>
          {!isAnnual && (
             <div className="absolute inset-0 bg-white dark:bg-zinc-100 -z-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]" />
          )}
        </motion.button>

        {/* Separator / Hinge */}
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-1 opacity-50" />

        {/* Annually Button */}
        <motion.button
          onClick={() => setIsAnnual(true)}
          className={cn(
            "relative px-8 py-3.5 text-sm font-medium rounded-sm z-10 cursor-pointer overflow-hidden border",
            isAnnual ? "border-zinc-200 dark:border-zinc-800" : "border-transparent"
          )}
          animate={{
            rotateY: !isAnnual ? -15 : 0,
            rotateX: !isAnnual ? 5 : 0,
            scale: !isAnnual ? 0.9 : 1,
            z: !isAnnual ? -20 : 0,
            opacity: !isAnnual ? 0.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
          }}
        >
          {isAnnual && (
            <motion.div 
              layoutId="glow-line"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white z-20"
            />
          )}
          <span className={cn(
            "relative z-10 flex items-center gap-2 transition-colors duration-300",
            isAnnual ? "text-zinc-900 dark:text-zinc-900" : "text-zinc-500 dark:text-zinc-400"
          )}>
            Pay Annually
            <span className={cn(
              "inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border",
              isAnnual 
                ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-100 dark:text-emerald-700 dark:border-emerald-200" 
                : "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30"
            )}>
              Save 20%
            </span>
          </span>
          {isAnnual && (
             <div className="absolute inset-0 bg-white dark:bg-zinc-100 -z-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

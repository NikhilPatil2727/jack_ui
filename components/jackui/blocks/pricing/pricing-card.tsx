"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingTier } from "./pricing";

interface PricingCardProps {
  tier: PricingTier;
  isAnnual: boolean;
}

export function PricingCard({ tier, isAnnual }: PricingCardProps) {
  const isPopular = tier.isPopular;
  const price = isAnnual ? tier.priceAnnually : tier.priceMonthly;
  
  // Interactive hover glow logic for subtle detailing
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Subtle, highly polished glow following the cursor - Rainbow colored
  const borderGradient = useTransform(
    [springMouseX, springMouseY],
    ([x, y]) => {
      return hovered
        ? `radial-gradient(250px circle at ${x}px ${y}px, rgba(255,0,0,0.1) 0%, rgba(255,165,0,0.08) 20%, rgba(255,255,0,0.06) 40%, rgba(0,255,0,0.04) 60%, rgba(0,0,255,0.02) 80%, rgba(255,255,255,0) 100%)`
        : `radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)`;
    }
  );

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative flex flex-col h-full group transition-transform duration-500 ease-out hover:-translate-y-1",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      
      {/* Subtle ambient shadow (Idle animation / Polish) - "minimum detailing" */}
      {isPopular && (
        <div className="absolute -inset-1 rounded-sm opacity-10 dark:opacity-20 blur-2xl pointer-events-none transition-all duration-700 ease-out group-hover:opacity-30 group-hover:blur-3xl"
             style={{
               background: "linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)"
             }}
        />
      )}

      {/* Refined Animated Gradient Border for Popular Tier */}
      {isPopular && (
        <div className="absolute -inset-[1px] z-0 overflow-hidden pointer-events-none rounded-none opacity-60 dark:opacity-80 transition-opacity duration-500 group-hover:opacity-100">
          {/* Base gradient - Vibrant but masked by opacity */}
          <motion.div
            className="absolute inset-[-100%] z-0"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear",
            }}
          />
          {/* Inner cutout for the gradient border */}
          <div className="absolute inset-[1px] bg-white dark:bg-zinc-950 z-10" />
        </div>
      )}

      {/* Mouse Tracking Inner Glow overlay (Subtle feedback) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
        style={{
          background: borderGradient,
        }}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col h-full p-8 bg-white dark:bg-zinc-950/95 backdrop-blur-md border transition-colors duration-500 ease-out",
          isPopular 
            ? "border-transparent dark:border-transparent" 
            : "border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 rounded-none"
        )}
      >
        {/* Corner markers for standard tiers - Moved inside z-10 container to prevent overlap crashing */}
        {!isPopular && (
          <>
            <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-zinc-400 dark:border-zinc-500 z-20" />
            <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-zinc-400 dark:border-zinc-500 z-20" />
            <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-zinc-400 dark:border-zinc-500 z-20" />
            <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-zinc-400 dark:border-zinc-500 z-20" />
          </>
        )}
        {isPopular && (
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400" />
        )}
        {!isPopular && (
          <div className="absolute top-4 right-4 w-1.5 h-1.5 border border-zinc-400" />
        )}

        <div className="mb-6">
          <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            {tier.name}
            {isPopular && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-none bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-semibold uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                Popular
              </span>
            )}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 min-h-[40px]">
            {tier.description}
          </p>
        </div>

        <div className="mb-2">
          <span className="text-lg text-zinc-500 dark:text-zinc-400 font-medium align-top">$</span>
          <span className="text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
            {price}
          </span>
          {typeof price === "number" && (
            <span className="text-zinc-500 dark:text-zinc-400 text-sm"> / month</span>
          )}
        </div>
        
        <div className="text-[10px] font-medium tracking-widest text-zinc-500 dark:text-zinc-500 uppercase mb-8">
          {isAnnual && tier.billedAnnuallyText ? tier.billedAnnuallyText : "\u00A0"}
        </div>

        <ul className="space-y-4 mb-8 flex-1">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className={cn(
                "h-4 w-4 mr-3 shrink-0 mt-0.5",
                isPopular ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-900 dark:text-zinc-100 opacity-70"
              )} />
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        <button
          className={cn(
            "w-full py-3.5 px-4 rounded-none text-sm font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden group/btn",
            isPopular
              ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          )}
        >
          {isPopular && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out" />
          )}
          <span className="relative z-10">{tier.ctaText}</span>
        </button>
      </div>
    </div>
  );
}

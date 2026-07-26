"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}

export function PricingHeader({ title, subtitle, isAnnual, setIsAnnual }: PricingHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs tracking-widest text-zinc-900 dark:text-zinc-100 uppercase">
        <span className="w-1.5 h-1.5 rounded-sm bg-black dark:bg-white mr-2" />
        Pricing Plans
      </div>
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 whitespace-pre-line">
        {title}
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-lg">
        {subtitle}
      </p>

      {/* Toggle */}
      <div className="mt-8 flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-sm">
        <button
          onClick={() => setIsAnnual(true)}
          className={cn(
            "px-6 py-2.5 text-sm font-medium transition-all rounded-sm",
            isAnnual
              ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          )}
        >
          Bill annually <span className="opacity-70 ml-1">-20%</span>
        </button>
        <button
          onClick={() => setIsAnnual(false)}
          className={cn(
            "px-6 py-2.5 text-sm font-medium transition-all rounded-sm",
            !isAnnual
              ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          )}
        >
          Bill monthly
        </button>
      </div>
    </div>
  );
}

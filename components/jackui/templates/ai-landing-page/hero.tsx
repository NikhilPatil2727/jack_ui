"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Cpu, Sparkles } from "lucide-react";

export interface HeroProps {
  badgeText?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function Hero({
  badgeText = "Aether v2.0: The Next Generation AI Engine",
  title = "Automate Workflows with",
  highlightedText = "Autonomous Agents",
  description = "Deploy custom AI agents that integrate with your tools, analyze data in real time, and scale operations automatically. All inside a sleek, privacy-first interface.",
  primaryCtaText = "Start for free",
  secondaryCtaText = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background pt-16 md:pt-20 pb-20">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl opacity-70 dark:opacity-40" />
        <div className="absolute bottom-0 right-[10%] h-[300px] w-[300px] rounded-full bg-rose-500/10 blur-2xl opacity-50 dark:opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{badgeText}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-zinc-50"
        >
          {title} <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
            {highlightedText}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-400"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onPrimaryClick}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-indigo-500/35"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onSecondaryClick}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-8 py-4 text-sm font-semibold text-zinc-700 shadow-xs backdrop-blur-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Play className="h-4 w-4 fill-current text-zinc-600 dark:text-zinc-400" />
            <span>{secondaryCtaText}</span>
          </button>
        </motion.div>

        {/* Product Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-5xl rounded-2xl border border-zinc-200 bg-white/40 p-2 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/40"
        >
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header window control */}
            <div className="flex h-10 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs font-medium text-zinc-500">console.aether.ai</div>
              <div className="w-12" />
            </div>
            {/* Display Dashboard/Code Mockup */}
            <div className="grid grid-cols-1 gap-6 p-6 text-left md:grid-cols-3">
              <div className="col-span-2 space-y-4">
                <div className="rounded-lg bg-white p-4 shadow-xs dark:bg-zinc-950">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">SYSTEM PERFORMANCE</span>
                    <span className="text-xs font-bold text-emerald-500">99.98% SLA</span>
                  </div>
                  <div className="mt-2 h-20 w-full rounded-md bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10" />
                </div>
                <div className="rounded-lg bg-white p-4 shadow-xs dark:bg-zinc-950">
                  <span className="text-xs font-semibold text-zinc-500">AGENT PIPELINE</span>
                  <div className="mt-2 space-y-2">
                    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full bg-indigo-600" style={{ width: "70%" }} />
                      <div className="h-full bg-purple-600" style={{ width: "20%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-500">
                      <span>Embedding generation</span>
                      <span>Indexing database</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-zinc-950 p-4 font-mono text-[12px] text-zinc-400 dark:bg-zinc-950/80">
                <span className="text-indigo-400">const</span> agent = <span className="text-amber-400">new</span> AetherAgent({"{"}
                <div className="pl-4">
                  role: <span className="text-emerald-400">"Data Analyst"</span>,<br />
                  model: <span className="text-emerald-400">"aether-ultra-v2"</span>,<br />
                  memory: <span className="text-indigo-400">true</span>,<br />
                  tools: [<span className="text-emerald-400">"sql"</span>, <span className="text-emerald-400">"web-search"</span>]
                </div>
                {"}"});
                <br />
                <br />
                <span className="text-zinc-500">// Run pipeline</span>
                <br />
                agent.run(<span className="text-emerald-400">"Optimize sales pipeline"</span>);
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Database, BarChart3, Workflow, MoreHorizontal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassInput } from "./glass-input";
import { Navbar } from "./navbar";

export interface HeroProps {
  badgeText?: string;
  titlePart1?: string;
  titlePart2?: string;
  chips?: { icon: React.ReactNode; label: string }[];
  placeholder?: string;
  logoText?: string;
  logos?: { name: string; icon: React.ReactNode }[];
}

export function Hero({
  badgeText = "Automate your workflows with intelligent precision",
  titlePart1 = "Scale",
  titlePart2 = "automate\nwith intelligent logic.",
  chips = [
    { icon: <Workflow className="h-4 w-4" />, label: "Workflows" },
    { icon: <Database className="h-4 w-4" />, label: "Data" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Insights" },
    { icon: <Zap className="h-4 w-4" />, label: "Automation" },
    { icon: <MoreHorizontal className="h-4 w-4" />, label: "More" },
  ],
  placeholder = "Define your workflow...",


}: HeroProps) {
  return (
    <>
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.05); }
          66% { transform: translate(20px, -20px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>

      <div className="relative w-full min-h-[98vh] overflow-hidden bg-transparent dark:bg-black flex flex-col font-sans">

        {/* Background Mesh Gradients & Ribbon */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50/50 to-[#f3e8ff]/30 dark:bg-black dark:from-black dark:via-black dark:to-black opacity-95 dark:opacity-100" />

          {/* Radial blobs */}
          <div
            className="absolute top-[-10%] left-[-10%] h-[60vw] w-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-200/40 dark:hidden mix-blend-multiply blur-[80px] sm:blur-[120px]"
            style={{ animation: 'drift 20s infinite alternate' }}
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] h-[70vw] w-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-fuchsia-200/30 dark:hidden mix-blend-multiply blur-[100px] sm:blur-[140px]"
            style={{ animation: 'drift-reverse 25s infinite alternate' }}
          />
          <div
            className="absolute top-[20%] left-[30%] h-[40vw] w-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-pink-300/20 dark:hidden mix-blend-multiply blur-[80px] sm:blur-[100px]"
            style={{ animation: 'drift 15s infinite alternate' }}
          />

          {/* Ribbon / Wave */}
          <svg className="absolute w-full h-full inset-0 opacity-40 dark:hidden" preserveAspectRatio="none" viewBox="0 0 1440 850">
            <path
              d="M-100 450 C 400 150, 900 800, 1540 250 L 1540 -100 L -100 -100 Z"
              className="fill-[rgba(216,180,254,0.05)]"
              filter="blur(30px)"
            />
          </svg>

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 mt-4 sm:mt-6 mb-4">

          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-purple-200/60 dark:border-purple-800/60 backdrop-blur-md mb-3 shadow-[0_2px_10px_-3px_rgba(168,85,247,0.2)] dark:shadow-[0_2px_10px_-3px_rgba(168,85,247,0.4)] cursor-pointer hover:bg-white dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
              🎉
            </span>
            <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-wide pr-1">
              {badgeText}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-zinc-900 dark:text-white font-instrument text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tighter leading-[1.05] max-w-4xl"
          >
            {titlePart1}{" "}
            {titlePart2.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 pr-3 pb-2 -mr-3">
                  {line}
                </span>
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-center text-zinc-500 dark:text-zinc-400 text-[15px] sm:text-[17px] max-w-lg font-medium tracking-tight leading-relaxed"
          >
            The easiest way to build, deploy, and manage your autonomous agents. No complex coding required.
          </motion.p>

          {/* Glass Input Section with Glows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative w-full max-w-[720px] mt-5 sm:mt-8 px-4 sm:px-0"
          >
            {/* Glowing background circles for glassmorphism visibility */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-purple-400/20 dark:hidden blur-[60px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-fuchsia-500/20 dark:hidden blur-[60px] pointer-events-none" />

            <div className="relative z-10 drop-shadow-2xl">
              <GlassInput
                placeholder={placeholder}
                onSubmit={(val) => console.log("Submitted:", val)}
                showFilters={false}
              />
            </div>
          </motion.div>

        </div>

        {/* Trust / Logo Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 w-full pb-4 sm:pb-6 flex flex-col items-center mt-auto px-4"
        >


        </motion.div>

      </div>
    </>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Sparkles, Zap, Database, BarChart3, Workflow, MoreHorizontal, Paperclip, Globe, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassInput } from "@/components/ui/glass-input";

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
  logoText = "Trusted by leading teams worldwide",
  logos = [
    { name: "Acme Corp", icon: <div className="h-5 w-5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-sm transform rotate-45 shadow-sm" /> },
    { name: "Lumina", icon: <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 shadow-sm" /> },
    { name: "Vertex", icon: <div className="h-5 w-5 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-tl-full rounded-br-full shadow-sm" /> },
    { name: "Nova", icon: <div className="h-5 w-5 border-[3px] border-yellow-500 rounded-full" /> },
    { name: "Zenith", icon: <div className="h-5 w-5 bg-gradient-to-t from-yellow-300 to-amber-500 rounded-sm skew-x-12 shadow-sm" /> },
  ],
}: HeroProps) {
  return (
    <>
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>

      <div className="relative w-full min-h-[850px] overflow-hidden rounded-[28px] sm:rounded-[32px] border-[2px] sm:border-[3px] border-zinc-200/50 shadow-2xl bg-white flex flex-col font-sans">

        {/* Background Mesh Gradients & Ribbon */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFFDF5] to-[#FFFbeb] opacity-95" />

          {/* Radial blobs */}
          <div
            className="absolute top-[-20%] left-[-10%] h-[70vw] w-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-[#FEF08A] mix-blend-multiply filter blur-[80px] sm:blur-[100px] opacity-40"
            style={{ animation: 'drift 25s infinite alternate' }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] h-[80vw] w-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-[#FDE047] mix-blend-multiply filter blur-[100px] sm:blur-[120px] opacity-35"
            style={{ animation: 'drift-reverse 30s infinite alternate' }}
          />
          <div
            className="absolute top-[30%] left-[20%] h-[50vw] w-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#FEF9C3] mix-blend-multiply filter blur-[80px] sm:blur-[100px] opacity-45"
            style={{ animation: 'drift 20s infinite alternate' }}
          />

          {/* Ribbon / Wave */}
          <svg className="absolute w-full h-full inset-0" preserveAspectRatio="none" viewBox="0 0 1440 850">
            <path
              d="M-100 450 C 400 150, 900 800, 1540 250 L 1540 -100 L -100 -100 Z"
              fill="rgba(253,224,71,0.08)"
              filter="blur(40px)"
            />
          </svg>

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7">
              <svg className="w-full h-full text-zinc-950 dark:text-zinc-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 22C8 16 3 13 6.5 7C8 4.5 12 5.5 12 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.8" />
                <path d="M12.5 22C12.5 17 17.5 15 14.5 9C12.5 5 9.5 6 8.5 2.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16.5 22C16.5 18.5 21 16.5 18.5 12C16.5 8.5 19.5 7 20.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                <path d="M5.5 22C5.5 19 2.5 17.5 4 14C5 11.5 7.5 12.5 8 10" stroke="#FBBF24" strokeWidth="0.75" strokeLinecap="round" opacity="0.9" />
                <circle cx="10" cy="14" r="0.75" fill="currentColor" />
                <circle cx="15.5" cy="7.5" r="0.75" fill="#FBBF24" />
                <circle cx="7" cy="10" r="0.5" fill="currentColor" opacity="0.6" />
                <circle cx="19" cy="9" r="0.5" fill="#FBBF24" opacity="0.8" />
              </svg>
            </div>
            <span className="font-heading font-bold text-[17px] tracking-tight text-zinc-950">Aether AI</span>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-10">
            <a href="#" className="text-zinc-700 hover:text-yellow-600 text-[14px] sm:text-[15px] font-medium transition-colors">Home</a>
            <a href="#features" className="text-zinc-700 hover:text-yellow-600 text-[14px] sm:text-[15px] font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-zinc-700 hover:text-yellow-600 text-[14px] sm:text-[15px] font-medium transition-colors">Pricing</a>
          </div>

          <button className="group flex items-center gap-2 bg-[#FBBF24] hover:bg-[#F59E0B] hover:scale-105 transition-all duration-300 text-zinc-900 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold border border-yellow-300/30 shadow-md">
            Get Started
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-black/10 bg-black/5 group-hover:bg-black/10 transition-colors">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </button>
        </nav>

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 mt-8 sm:mt-12">

          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100/55 border border-yellow-300/40 backdrop-blur-md mb-8 sm:mb-10 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-600" />
            <span className="text-[12px] sm:text-[13px] md:text-[14px] text-zinc-800 font-medium tracking-wide">
              {badgeText}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-zinc-900 font-instrument text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.12] max-w-4xl"
          >
            {titlePart1}{" "}
            {titlePart2.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          {/* Glass Input Section with Glows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative w-full max-w-[760px] mt-12 sm:mt-16 px-4 sm:px-0"
          >
            {/* Glowing background circles for glassmorphism visibility */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/25 blur-[60px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/25 blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <GlassInput
                placeholder="Ask Anything"
                onSubmit={(val) => console.log("Submitted:", val)}
              />
            </div>
          </motion.div>

        </div>

        {/* Trust / Logo Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 w-full pb-8 sm:pb-12 flex flex-col items-center mt-12 sm:mt-auto px-4"
        >
          <p className="text-zinc-400 text-[13px] sm:text-[14px] font-medium mb-4 sm:mb-6">{logoText}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-4">
            {logos.map((logo, idx) => (
              <React.Fragment key={logo.name}>
                <div className="flex items-center gap-2 text-zinc-700 font-semibold text-[14px] sm:text-[16px] hover:text-yellow-600 transition-colors">
                  {logo.icon}
                  {logo.name}
                </div>
                {idx < logos.length - 1 && (
                  <div className="hidden sm:block text-zinc-200 text-lg font-light">|</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

      </div>
    </>
  );
}

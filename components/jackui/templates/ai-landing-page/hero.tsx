"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Sparkles, Lightbulb, Code2, FileText, GraduationCap, MoreHorizontal, Paperclip, Globe, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
  badgeText = "Experience the power of our generative AI engine",
  titlePart1 = "Build",
  titlePart2 = "create\nwith generative AI.",
  chips = [
    { icon: <Lightbulb className="h-4 w-4" />, label: "Brainstorm" },
    { icon: <Code2 className="h-4 w-4" />, label: "</> Code" },
    { icon: <FileText className="h-4 w-4" />, label: "Text" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Advice" },
    { icon: <MoreHorizontal className="h-4 w-4" />, label: "More" },
  ],
  placeholder = "Ask Anything",
  logoText = "Join 4,000+ companies already growing",
  logos = [
    { name: "Boltshift", icon: <div className="h-5 w-5 rounded-full bg-white text-[#1a4fd6] flex items-center justify-center text-[10px] font-bold">⚡</div> },
    { name: "Lightbox", icon: <div className="h-5 w-5 bg-white text-[#1a4fd6] flex items-center justify-center text-[10px] font-bold rounded-sm">📦</div> },
    { name: "FeatherDev", icon: <div className="h-5 w-5 bg-white text-[#1a4fd6] flex items-center justify-center text-[10px] font-bold rounded-sm -rotate-12">🪶</div> },
    { name: "Spherule", icon: <div className="h-5 w-5 rounded-full border-2 border-white flex items-center justify-center" /> },
    { name: "GlobalBank", icon: <div className="h-5 w-5 bg-white text-[#1a4fd6] flex items-center justify-center text-[10px] font-bold rounded-sm">🏦</div> },
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
      
      <div className="relative w-full min-h-[850px] overflow-hidden rounded-[28px] sm:rounded-[32px] border-[2px] sm:border-[3px] border-white/40 shadow-2xl bg-[#1a4fd6] flex flex-col font-sans">
        
        {/* Background Mesh Gradients & Ribbon */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a4fd6] via-[#2f6fe0] to-[#f0e9d8] opacity-90" />
          
          {/* Radial blobs */}
          <div 
            className="absolute top-[-20%] left-[-10%] h-[70vw] w-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-[#3B82F6] mix-blend-screen filter blur-[80px] sm:blur-[100px] opacity-60"
            style={{ animation: 'drift 25s infinite alternate' }}
          />
          <div 
            className="absolute bottom-[-20%] right-[-10%] h-[80vw] w-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-[#a3c2ff] mix-blend-screen filter blur-[100px] sm:blur-[120px] opacity-40"
            style={{ animation: 'drift-reverse 30s infinite alternate' }}
          />
          <div 
            className="absolute top-[30%] left-[20%] h-[50vw] w-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#f0e9d8] mix-blend-overlay filter blur-[80px] sm:blur-[100px] opacity-40"
            style={{ animation: 'drift 20s infinite alternate' }}
          />
          
          {/* Ribbon / Wave */}
          <svg className="absolute w-full h-full inset-0" preserveAspectRatio="none" viewBox="0 0 1440 850">
            <path
              d="M-100 450 C 400 150, 900 800, 1540 250 L 1540 -100 L -100 -100 Z"
              fill="rgba(255,255,255,0.06)"
              filter="blur(40px)"
            />
          </svg>
          
          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
          />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
          <div className="flex items-center gap-2">
            {/* Left intentionally blank for no logo as requested, but keeping container for spacing */}
          </div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-10">
            <a href="#" className="text-white/90 hover:text-white text-[14px] sm:text-[15px] font-medium transition-colors">Home</a>
            <a href="#features" className="text-white/90 hover:text-white text-[14px] sm:text-[15px] font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-white/90 hover:text-white text-[14px] sm:text-[15px] font-medium transition-colors">Pricing</a>
          </div>

          <button className="group flex items-center gap-2 bg-[#0a0a0a] hover:scale-105 transition-transform duration-300 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium border border-white/10 shadow-lg">
            Get Started
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-white/10 group-hover:bg-white/20 transition-colors">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 sm:mb-10 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-[12px] sm:text-[13px] md:text-[14px] text-white font-medium tracking-wide">
              {badgeText}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-white font-light text-[50px] sm:text-[72px] md:text-[84px] lg:text-[90px] leading-[1.05] tracking-tight max-w-4xl"
          >
            {titlePart1}{" "}
            <span className="inline-flex align-baseline relative top-[4px] sm:top-[8px] mx-1 sm:mx-2">
              <div className="w-[50px] h-[50px] sm:w-[72px] sm:h-[72px] md:w-[84px] md:h-[84px] lg:w-[90px] lg:h-[90px] rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-[#0A1A2F] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5),_0_10px_30px_rgba(0,0,0,0.4)] border-[2px] border-blue-300/40 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.9),_transparent_40%)]" />
                 <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(0,0,0,0.6),_transparent_50%)]" />
                 {/* Decorative 3D internal elements */}
                 <div className="w-1/2 h-1/2 rounded-full border-[3px] border-white/40 transform rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                 <div className="absolute w-2/3 h-2/3 rounded-full border-[2px] border-white/20 transform -rotate-12" />
              </div>
            </span>{" "}
            {titlePart2.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          {/* Capability Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-10 sm:mt-12"
          >
            {chips.map((pill, i) => (
              <button
                key={i}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md text-white text-[13px] sm:text-[14px] hover:bg-white/[0.15] transition-colors shadow-sm"
              >
                <div className="opacity-80">
                  {pill.icon}
                </div>
                <span className="font-medium">{pill.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Prompt / Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-[830px] mt-12 sm:mt-16 group px-4 sm:px-0"
          >
            <div className="relative w-full h-[120px] sm:h-[130px] md:h-[140px] rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 group-focus-within:border-blue-400/50 group-focus-within:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-focus-within:bg-white/[0.08]">
              
              <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-transparent text-white placeholder-white/70 text-[15px] sm:text-[16px] font-medium outline-none"
              />

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                    <Globe className="h-4 w-4" />
                  </button>
                </div>
                
                <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a0a0a] border border-white/10 text-white hover:bg-black hover:scale-105 transition-all shadow-lg">
                  <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
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
          <p className="text-white/70 text-[13px] sm:text-[14px] font-medium mb-4 sm:mb-6">{logoText}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-4">
            {logos.map((logo, idx) => (
              <React.Fragment key={logo.name}>
                <div className="flex items-center gap-2 text-white font-semibold text-[14px] sm:text-[16px]">
                  {logo.icon}
                  {logo.name}
                </div>
                {idx < logos.length - 1 && (
                  <div className="hidden sm:block text-white/30 text-lg font-light">|</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

      </div>
    </>
  );
}

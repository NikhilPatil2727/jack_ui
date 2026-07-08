"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, RotateCcw, Play, Pause } from "lucide-react";
import { motion } from "motion/react";

const COMMAND_TO_TYPE = 'ry "edit <filepath> to ..."';

export default function AiAgentTerminal() {
  const [typedInput, setTypedInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mouse tracking for dynamic glassmorphic lighting
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COMMAND_TO_TYPE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setTypedInput("");
    setIsTyping(true);
    setTimeout(() => setIsPlaying(true), 100);
  };

  // Main typewriter loop animation
  useEffect(() => {
    if (!isPlaying) return;

    let active = true;

    const playSequence = async () => {
      while (active && isPlaying) {
        setIsTyping(true);
        setTypedInput("");
        await new Promise((res) => setTimeout(res, 800));

        // Typewriter effect
        for (let i = 0; i <= COMMAND_TO_TYPE.length; i++) {
          if (!active || !isPlaying) return;
          setTypedInput(COMMAND_TO_TYPE.slice(0, i));
          const delay = Math.random() * 50 + 60; // Human-like rhythm
          await new Promise((res) => setTimeout(res, delay));
        }

        setIsTyping(false);
        // Wait at the end of the text
        await new Promise((res) => setTimeout(res, 6000));
      }
    };

    playSequence();

    return () => {
      active = false;
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 select-none perspective-[1200px]">
      
      {/* Ambient Outer Glow (expands on hover) */}
      <div
        className={cn(
          "relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "animate-[float_8s_ease-in-out_infinite]"
        )}
      >
        <div
          className={cn(
            "absolute -inset-1 rounded-3xl blur-2xl transition-all duration-500 pointer-events-none",
            "bg-gradient-to-r from-violet-600/25 via-fuchsia-500/20 to-cyan-400/25",
            isHovered 
              ? "dark:opacity-35 opacity-0 scale-105" 
              : "dark:opacity-15 opacity-0 scale-100"
          )}
        />

        {/* Main Terminal Shell */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative w-full rounded-2xl overflow-hidden backdrop-blur-2xl dark",
            "bg-[#020202] border border-white/[0.06]",
            "shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.95)]",
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "hover:-translate-y-1 hover:border-white/[0.12]",
            "hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_45px_85px_-10px_rgba(0,0,0,0.98),0_0_30px_rgba(139,92,246,0.12)]"
          )}
        >
          {/* Top-Edge Highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-30" />

          {/* Micro-CRT Texture */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.012]"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 50%)`,
              backgroundSize: "100% 4px"
            }}
          />

          {/* Mouse Spotlight */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.05) 50%, transparent 80%)`
            }}
          />

          {/* Header Title Bar */}
          <div className="relative flex items-center justify-between px-5 py-4 bg-[#08080A]/85 border-b border-white/[0.04] z-10">
            
            {/* macOS Controls */}
            <div className="flex items-center gap-2">
              <div className="group flex items-center gap-1.5 cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 stroke-[#4c0000] stroke-[2.5]" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/></svg>
                </span>
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 stroke-[#5c3e00] stroke-[2.5]" fill="none"><path d="M2 6h8"/></svg>
                </span>
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 stroke-[#004d00] stroke-[2.5]" fill="none"><path d="M6 2v8M2 6h8"/></svg>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-3 pl-3 border-l border-white/10 text-[11px] font-mono text-zinc-400">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0 select-none">
                  <span className="absolute w-2.5 h-2.5 rounded-full bg-violet-400/35 animate-ping" />
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-violet-400 fill-none stroke-current stroke-2">
                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" className="animate-[spin_12s_linear_infinite]" />
                    <circle cx="12" cy="12" r="4" className="fill-violet-400/35" />
                    <circle cx="12" cy="12" r="1.5" className="fill-violet-400" />
                  </svg>
                </div>
                <span className="font-sans font-semibold text-zinc-300 tracking-wide">jackui-agent</span>
              </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center justify-end gap-1.5">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause execution" : "Resume execution"}
                className="p-1.5 rounded-md text-[#8a8a7a] hover:text-zinc-200 hover:bg-white/[0.06] transition-colors focus:outline-none cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleRestart}
                title="Restart sequence"
                className="p-1.5 rounded-md text-[#8a8a7a] hover:text-zinc-200 hover:bg-white/[0.06] transition-colors focus:outline-none cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleCopy}
                title="Copy command"
                className="p-1.5 rounded-md text-[#8a8a7a] hover:text-zinc-200 hover:bg-white/[0.06] transition-colors focus:outline-none cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </motion.button>
            </div>
          </div>

          {/* Console Area */}
          <div className="relative p-6 font-mono text-[13px] leading-relaxed z-10 min-h-[220px] flex flex-col justify-between text-zinc-100">
            <div>
              {/* Retro Dotted Welcome Box in Violet/Cyan with more visible White dotted borders */}
              <div className="relative border-2 border-dotted border-white/40 rounded-lg py-3 px-5 bg-[#040406]/65 select-none">
                
                {/* Overlay Title on Top Border */}
                <div className="absolute -top-3.5 left-6 px-2 bg-[#020202] text-violet-400 text-[11px] font-semibold tracking-wider">
                  Claude Code v2.0.0
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left Column: Mascot, Welcome, Info (6 of 12 cols) */}
                  <div className="md:col-span-6 flex flex-col items-center justify-center text-center gap-2 border-r-0 md:border-r border-dotted border-white/25 md:pr-5">
                    <div className="text-[12px] text-zinc-100 font-medium tracking-wide">
                      Welcome back Meaghan!
                    </div>
 
                    {/* Pixel Art Robot Mascot matching original agent design */}
                    <div className="flex justify-center items-center p-1.5 h-12 w-12 rounded-lg bg-violet-950/20 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                      <svg viewBox="0 0 16 16" className="w-9 h-9 text-violet-400 fill-current">
                        {/* Antenna */}
                        <rect x="7" y="0" width="2" height="2" />
                        <rect x="6" y="2" width="4" height="1" />
                        <rect x="7" y="3" width="2" height="1" />
                        {/* Head */}
                        <rect x="3" y="4" width="10" height="7" />
                        {/* Visor Area */}
                        <rect x="4" y="5" width="8" height="4" className="text-[#050507] fill-current" />
                        {/* Eyes (Cyan glowing) */}
                        <rect x="5" y="6" width="2" height="2" className="text-cyan-400 fill-current animate-pulse" />
                        <rect x="9" y="6" width="2" height="2" className="text-cyan-400 fill-current animate-pulse" />
                        {/* Mouth */}
                        <rect x="7" y="9" width="2" height="1" className="text-violet-500 fill-current" />
                        {/* Neck */}
                        <rect x="7" y="11" width="2" height="1" />
                        {/* Body */}
                        <rect x="4" y="12" width="8" height="3" />
                        {/* Feet */}
                        <rect x="5" y="15" width="2" height="1" />
                        <rect x="9" y="15" width="2" height="1" />
                      </svg>
                    </div>

                    <div className="text-[11px] text-zinc-500 leading-relaxed font-mono">
                      <div>Sonnet 4.5 • Max 20x</div>
                      <div className="text-cyan-400 mt-0.5">/users/meaghan/code/apps</div>
                    </div>
                  </div>

                  {/* Right Column: Split vertically (6 of 12 cols) */}
                  <div className="md:col-span-6 flex flex-col justify-between gap-4">
                    {/* Top: Recent activity */}
                    <div className="text-[11px] leading-relaxed">
                      <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                        Recent activity
                      </div>
                      <div className="space-y-1 text-zinc-500">
                        <div className="flex justify-between">
                          <span>1m ago</span>
                          <span className="text-zinc-300">Updated project memory</span>
                        </div>
                        <div className="flex justify-between">
                          <span>8m ago</span>
                          <span className="text-zinc-300">Updated claw'd feet</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2d ago</span>
                          <span className="text-zinc-300">Add new words to spinner</span>
                        </div>
                        <div className="flex justify-between">
                          <span>1w ago</span>
                          <span className="text-zinc-300">Update unit tests</span>
                        </div>
                        <div className="text-[10px] text-zinc-600">
                          ... /resume for more
                        </div>
                      </div>
                    </div>

                    {/* Bottom: What's new */}
                    <div className="border-t border-dashed border-white/10 pt-3 text-[11px] leading-relaxed">
                      <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                        What's new
                      </div>
                      <div className="space-y-1 text-zinc-400">
                        <div className="hover:text-violet-400 transition-colors cursor-pointer text-zinc-300">
                          /agents to create subagents
                        </div>
                        <div className="hover:text-violet-400 transition-colors cursor-pointer text-zinc-300">
                          /security-review for review agent
                        </div>
                        <div className="hover:text-violet-400 transition-colors cursor-pointer text-zinc-300">
                          ctrl+b to background bashes
                        </div>
                        <div className="text-[10px] text-zinc-600">
                          ... /help for more
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Horizontal Line Divider */}
              <div className="border-t border-white/10 my-6" />

              {/* Input Prompt Line */}
              <div className="flex items-center gap-2 text-zinc-100 pt-2">
                <span className="text-zinc-500 font-bold select-none">&gt;</span>
                <div className="flex-1 flex items-center">
                  <span className="text-zinc-100 font-medium tracking-tight break-all">
                    {typedInput}
                  </span>
                  {isTyping ? (
                    <span className="w-2.5 h-4.5 bg-violet-400 ml-1 inline-block animate-[pulse_0.8s_infinite] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                  ) : (
                    <span className="w-2.5 h-4.5 bg-zinc-500 ml-1 inline-block animate-[blink_1.2s_infinite]" />
                  )}
                </div>
              </div>

            </div>
          </div>
          
          {/* Bottom Ambient Inner Glow */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-violet-500/[0.03] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

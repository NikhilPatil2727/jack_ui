"use client";

import React, { useState, useEffect, useRef, useCallback, forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface ActivityItem {
  time: string;
  text: string;
}

export interface AiAgentTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  commandToType?: string;
  agentName?: string;
  userName?: string;
  userPath?: string;
  agentVersion?: string;
  recentActivity?: ActivityItem[];
  whatsNew?: string[];
  autoPlay?: boolean;
}

const DEFAULT_COMMAND = 'ry "edit <filepath> to ..."';

const DEFAULT_ACTIVITY: ActivityItem[] = [
  { time: "1m ago", text: "Updated project memory" },
  { time: "8m ago", text: "Updated claw'd feet" },
  { time: "2d ago", text: "Add new words to spinner" },
  { time: "1w ago", text: "Update unit tests" }
];

const DEFAULT_WHATS_NEW = [
  "/agents to create subagents",
  "/security-review for review agent",
  "ctrl+b to background bashes"
];

const AiAgentTerminal = forwardRef<HTMLDivElement, AiAgentTerminalProps>(
  (
    {
      commandToType = DEFAULT_COMMAND,
      agentName = "JackUI Agent",
      userName = "Nikhil",
      userPath = "/users/nikhil/code/apps",
      agentVersion = "v1.0.0",
      recentActivity = DEFAULT_ACTIVITY,
      whatsNew = DEFAULT_WHATS_NEW,
      autoPlay = true,
      className,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [typedInput, setTypedInput] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [isPlaying] = useState(autoPlay);

    // Mouse tracking for dynamic glassmorphic lighting
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Sync mounted status to avoid hydration mismatch
    useEffect(() => {
      setMounted(true);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }, []);

    // Main typewriter loop animation
    useEffect(() => {
      if (!mounted || !isPlaying) return;

      let active = true;

      const playSequence = async () => {
        while (active && isPlaying) {
          setIsTyping(true);
          setTypedInput("");
          await new Promise((res) => setTimeout(res, 800));

          // Typewriter effect
          for (let i = 0; i <= commandToType.length; i++) {
            if (!active || !isPlaying) return;
            setTypedInput(commandToType.slice(0, i));
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
    }, [commandToType, isPlaying, mounted]);

    // Memoize the static header elements to optimize render performance during typing
    const headerControls = useMemo(() => (
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
      </div>
    ), []);

    // Memoize the dotted welcome box section to prevent unnecessary layout recalculations on typing ticks
    const welcomeBoxNode = useMemo(() => (
      <div className="relative border-2 border-dotted border-white/40 rounded-lg py-3 px-5 bg-[#040406]/65 select-none">
        
        {/* Overlay Title on Top Border */}
        <div className="absolute -top-3.5 left-6 px-2 bg-[#020202] text-violet-400 text-[11px] font-semibold tracking-wider">
          {agentName} {agentVersion}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Column: Mascot, Welcome, Info (6 of 12 cols) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center text-center gap-2 border-r-0 md:border-r border-dotted border-white/25 md:pr-5">
            <div className="text-[12px] text-zinc-100 font-medium tracking-wide">
              Welcome back {userName}!
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
              <div className="text-cyan-400 mt-0.5">{userPath}</div>
            </div>
          </div>

          {/* Right Column: Split vertically (6 of 12 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between gap-4">
            {/* Top: Recent activity */}
            {recentActivity.length > 0 && (
              <div className="text-[11px] leading-relaxed">
                <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  Recent activity
                </div>
                <div className="space-y-1 text-zinc-500">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{activity.time}</span>
                      <span className="text-zinc-300">{activity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom: What's new */}
            {whatsNew.length > 0 && (
              <div className="border-t border-dashed border-white/10 pt-3 text-[11px] leading-relaxed">
                <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  What's new
                </div>
                <div className="space-y-1 text-zinc-450">
                  {whatsNew.map((item, index) => (
                    <div key={index} className="hover:text-violet-400 transition-colors cursor-pointer text-zinc-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ), [agentName, agentVersion, userName, userPath, recentActivity, whatsNew]);

    return (
      <div 
        ref={ref}
        className={cn("w-full max-w-3xl mx-auto p-4 md:p-8 select-none perspective-[1200px]", className)}
        {...props}
      >
        <div
          className={cn(
            "relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "animate-[float_8s_ease-in-out_infinite]"
          )}
        >
          {/* Ambient Outer Glow (expands on hover) */}
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
              "bg-gradient-to-b from-white/20 via-white/10 to-white/5 p-[1px]",
              "shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.95)]",
              "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:-translate-y-1 hover:from-white/35 hover:via-white/20 hover:to-white/10",
              "hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_45px_85px_-10px_rgba(0,0,0,0.98),0_0_30px_rgba(139,92,246,0.12)]"
            )}
          >
            {/* Flashy White Animated Shimmer Border */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-10"
              style={{
                backgroundSize: "200% 100%",
                animation: "borderShimmer 4s infinite linear",
              }}
            />

            {/* Inner Content Wrapper */}
            <div className="relative w-full rounded-[15px] bg-[#020202] overflow-hidden z-20">
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
                {headerControls}
              </div>

              {/* Console Area */}
              <div className="relative p-6 font-mono text-[13px] leading-relaxed z-10 min-h-[220px] flex flex-col justify-between text-zinc-100">
                {mounted ? (
                  <div>
                    {welcomeBoxNode}

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
                ) : (
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-zinc-500 font-bold select-none">&gt;</span>
                  </div>
                )}
              </div>
              
              {/* Bottom Ambient Inner Glow */}
              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-violet-500/[0.03] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Localized styles that do not pollute or depend on styled-jsx bundle */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -6px, 0); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes borderShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        ` }} />
      </div>
    );
  }
);

AiAgentTerminal.displayName = "AiAgentTerminal";

export default AiAgentTerminal;

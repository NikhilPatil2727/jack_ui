"use client";

import React, { useState, useEffect, useRef, useCallback, forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, RotateCcw, Play, Pause, Terminal as TerminalIcon } from "lucide-react";
import { motion } from "motion/react";

export interface LogLine {
  text: string;
  type: "command" | "success" | "info" | "log" | "warn";
  timestamp?: string;
}

export interface DemoStep {
  command: string;
  description: string;
  output: LogLine[];
}

export interface PremiumTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: DemoStep[];
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

const DEFAULT_DEMO_STEPS: DemoStep[] = [
  {
    command: "npx jack-ui@latest init --ai-first",
    description: "Initializing core layout engines & design tokens",
    output: [
      { text: "✔ Preflight environment verification passed (Node v20.11.0)", type: "success", timestamp: "00:01" },
      { text: "ℹ Analyzing workspace architecture for Next.js 16 (Turbopack)...", type: "info", timestamp: "00:01" },
      { text: "✓ Generated optical glassmorphism design tokens (tokens.json)", type: "success", timestamp: "00:02" },
      { text: "✓ Formatted layout primitives & motion-react dependencies", type: "success", timestamp: "00:02" }
    ]
  },
  {
    command: "npx jack-ui add bento-grid --enable-gpu",
    description: "Injecting hardware-accelerated layout components",
    output: [
      { text: "🔍 Resolving dependency graph from registry.jackui.dev...", type: "info", timestamp: "00:04" },
      { text: "📥 Streaming zero-dependency source primitives (12.4 KB)...", type: "log", timestamp: "00:05" },
      { text: "✓ Compiled components/jackui/bento-grid.tsx [60fps optimized]", type: "success", timestamp: "00:05" },
      { text: "✓ Auto-registered component into global layout provider", type: "success", timestamp: "00:06" }
    ]
  },
  {
    command: "npm run dev -- --experimental-https",
    description: "Spawning local development server with instant HMR",
    output: [
      { text: "▲ Next.js 16.2.6 (Turbopack compiler active)", type: "info", timestamp: "00:08" },
      { text: "⚠ Experimental HTTPS certificate generated for localhost", type: "warn", timestamp: "00:08" },
      { text: "- Local: https://localhost:3000 (Network: 192.168.1.42:3000)", type: "log", timestamp: "00:09" },
      { text: "✓ Ready in 118ms — Waiting for incoming connections...", type: "success", timestamp: "00:09" }
    ]
  }
];

const PremiumTerminal = forwardRef<HTMLDivElement, PremiumTerminalProps>(
  (
    {
      steps = DEFAULT_DEMO_STEPS,
      title = "bash",
      autoPlay = true,
      loop = true,
      className,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [typedInput, setTypedInput] = useState("");
    const [consoleLogs, setConsoleLogs] = useState<LogLine[]>([]);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [copied, setCopied] = useState(false);

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

    const handleCopy = useCallback(async () => {
      if (!steps[currentStepIdx]) return;
      const currentCommand = steps[currentStepIdx].command;
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [steps, currentStepIdx]);

    const handleRestart = useCallback(() => {
      setIsPlaying(false);
      setCurrentStepIdx(0);
      setTypedInput("");
      setConsoleLogs([]);
      setTimeout(() => setIsPlaying(true), 100);
    }, []);

    // Main automated sequence engine
    useEffect(() => {
      if (!mounted || !isPlaying || steps.length === 0) return;

      let active = true;
      const step = steps[currentStepIdx];
      if (!step) return;

      const playSequence = async () => {
        setIsTyping(true);
        setTypedInput("");
        setConsoleLogs([]);

        // Initial pause before typing starts
        await new Promise((res) => setTimeout(res, 600));

        // 1. Typewriter effect with randomized human-like cadence
        for (let i = 0; i <= step.command.length; i++) {
          if (!active || !isPlaying) return;
          setTypedInput(step.command.slice(0, i));
          const delay = Math.random() * 25 + 20; // 20-45ms variance
          await new Promise((res) => setTimeout(res, delay));
        }

        setIsTyping(false);
        await new Promise((res) => setTimeout(res, 350));

        // 2. Sequential log rendering with realistic processing pauses
        for (let j = 0; j < step.output.length; j++) {
          if (!active || !isPlaying) return;
          setConsoleLogs((prev) => [...prev, step.output[j]]);
          await new Promise((res) => setTimeout(res, 220));
        }

        // 3. Idle dwell time before cycling to next command
        await new Promise((res) => setTimeout(res, 4000));

        if (active && isPlaying) {
          if (loop || currentStepIdx < steps.length - 1) {
            setCurrentStepIdx((prev) => (prev + 1) % steps.length);
          }
        }
      };

      playSequence();

      return () => {
        active = false;
      };
    }, [currentStepIdx, isPlaying, steps, loop, mounted]);

    // Memoize the static header elements to optimize render performance during typing
    const headerNode = useMemo(() => (
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
        {title && (
          <div className="hidden sm:flex items-center gap-1.5 ml-3 pl-3 border-l border-white/10 text-[11px] font-mono text-zinc-400">
            <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
            <span>{title}</span>
          </div>
        )}
      </div>
    ), [title]);

    return (
      <div 
        ref={ref}
        className={cn("w-full max-w-2xl mx-auto p-4 md:p-8 select-none perspective-[1200px]", className)}
        {...props}
      >
        <div
          className={cn(
            "relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "animate-[float_8s_ease-in-out_infinite]"
          )}
        >
          {/* Ambient Outer Backdrop Glow (only visible in dark mode) */}
          <div
            className={cn(
              "absolute -inset-1 rounded-3xl blur-2xl transition-all duration-500 pointer-events-none",
              "bg-gradient-to-r from-violet-600/25 via-fuchsia-500/20 to-cyan-400/25",
              isHovered 
                ? "dark:opacity-35 opacity-0 scale-105" 
                : "dark:opacity-15 opacity-0 scale-100"
            )}
          />

          {/* Main Terminal Shell (forced dark mode style internally) */}
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
              {/* Subtle Top-Edge Inner Lighting Highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-30" />

              {/* Micro-CRT Scanline Texture */}
              <div 
                className="absolute inset-0 pointer-events-none z-20 opacity-[0.012]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 50%)`,
                  backgroundSize: "100% 4px"
                }}
              />

              {/* Dynamic Ray-Traced Mouse Spotlight */}
              <div
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.05) 50%, transparent 80%)`
                }}
              />

              {/* Header / Title Bar */}
              <div className="relative flex items-center justify-between px-5 py-4 bg-[#08080A]/85 border-b border-white/[0.04] z-10">
                {headerNode}

                {/* Interactive Utility Actions */}
                <div className="flex items-center justify-end gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause execution" : "Resume execution"}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={handleRestart}
                    aria-label="Restart sequence"
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={handleCopy}
                    aria-label="Copy command"
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </motion.button>
                </div>
              </div>

              {/* Terminal Console Area */}
              <div className="relative p-6 font-mono text-[13px] leading-relaxed z-10 min-h-[280px] flex flex-col justify-between">
                {mounted ? (
                  <div>
                    {/* Prompt Line */}
                    <div className="flex items-center gap-2 text-zinc-100">
                      <span className="text-violet-400 font-semibold select-none">jackui</span>
                      <span className="text-zinc-600 select-none">@</span>
                      <span className="text-cyan-400 font-semibold select-none">workspace</span>
                      <span className="text-zinc-500 select-none">~$</span>
                      <div className="flex-1 flex items-center">
                        <span className="text-zinc-100 font-medium tracking-tight break-all">
                          {typedInput}
                        </span>
                        {isTyping && (
                          <span className="w-2 h-4 bg-violet-400 ml-1 inline-block animate-[pulse_0.8s_infinite] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                        )}
                      </div>
                    </div>

                    {/* Log Output Stream */}
                    <div className="mt-4 space-y-2 pl-1 border-l border-white/[0.04]">
                      {consoleLogs.map((log, idx) => {
                        const isSuccess = log.type === "success";
                        const isInfo = log.type === "info";
                        const isWarn = log.type === "warn";

                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                            className={cn(
                              "flex items-start justify-between text-[12.5px]",
                              isSuccess && "text-emerald-400/90",
                              isInfo && "text-cyan-400/90",
                              isWarn && "text-amber-400/90",
                              !isSuccess && !isInfo && !isWarn && "text-zinc-400"
                            )}
                          >
                            <div className="flex items-start gap-2">
                              <span className="select-none text-zinc-600 font-light">›</span>
                              <span className="tracking-wide font-normal">{log.text}</span>
                            </div>
                            {log.timestamp && (
                              <span className="text-[10px] text-zinc-600 select-none font-mono mt-0.5 ml-4 tabular-nums">
                                [{log.timestamp}]
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-violet-400/70 font-semibold select-none">jackui</span>
                    <span className="text-zinc-600 select-none">@</span>
                    <span className="text-cyan-400/70 font-semibold select-none">workspace</span>
                    <span className="text-zinc-600 select-none">~$</span>
                  </div>
                )}

                {/* Idle Command Prompt / Cursor after stream finishes */}
                {mounted && !isTyping && steps[currentStepIdx] && consoleLogs.length === steps[currentStepIdx].output.length && (
                  <div className="flex items-center gap-2 mt-6 pt-3 border-t border-white/[0.04] text-zinc-500 animate-in fade-in duration-500">
                    <span className="text-violet-400/70 font-semibold select-none">jackui</span>
                    <span className="text-zinc-600 select-none">@</span>
                    <span className="text-cyan-400/70 font-semibold select-none">workspace</span>
                    <span className="text-zinc-600 select-none">~$</span>
                    <span className="w-2 h-4 bg-zinc-500/80 inline-block animate-[blink_1.2s_infinite]" />
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

PremiumTerminal.displayName = "PremiumTerminal";

export default PremiumTerminal;
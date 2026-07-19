"use client";

import React, { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, RotateCcw, Play, Pause } from "lucide-react";
import { motion } from "motion/react";

export interface TerminalMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  loop?: boolean;
}

const TerminalMockup = forwardRef<HTMLDivElement, TerminalMockupProps>(
  ({ autoPlay = true, loop = true, className, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);
    const [typedCommand, setTypedCommand] = useState("");
    const [showOutput, setShowOutput] = useState(false);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [copied, setCopied] = useState(false);

    // Mouse tracking for dynamic lighting
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Sync mounted status to avoid hydration mismatch
    useEffect(() => {
      setMounted(true);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }, []);

    // Full syntax highlighted parts for the typewriter effect
    const commandText = `jackui-agent deploy --task "optimize interactive particles" --model "opus-3.7"`;

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(commandText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [commandText]);

    const handleRestart = useCallback(() => {
      setIsPlaying(false);
      setTypedCommand("");
      setShowOutput(false);
      setTimeout(() => setIsPlaying(true), 100);
    }, []);

    // Typing Sequence Engine
    useEffect(() => {
      if (!mounted || !isPlaying) return;

      let active = true;

      const runSequence = async () => {
        while (active && isPlaying) {
          setTypedCommand("");
          setShowOutput(false);
          await new Promise((res) => setTimeout(res, 1200));

          // Typewriter effect for the command
          for (let i = 0; i <= commandText.length; i++) {
            if (!active || !isPlaying) return;
            setTypedCommand(commandText.slice(0, i));
            const delay = Math.random() * 15 + 10;
            await new Promise((res) => setTimeout(res, delay));
          }

          if (!active || !isPlaying) return;
          await new Promise((res) => setTimeout(res, 800));
          setShowOutput(true);

          // Hold showing the output
          await new Promise((res) => setTimeout(res, 9000));
        }
      };

      runSequence();

      return () => {
        active = false;
      };
    }, [isPlaying, mounted, commandText]);

    // Helper function to colorize CLI commands for premium syntax-highlighting
    const renderSyntaxHighlightedCommand = (rawText: string) => {
      if (!rawText) return null;

      // Simple parser to separate parts of the command line
      const lines = rawText.split("\n");
      return lines.map((line, lIdx) => {
        // Highlight comments
        if (line.trim().startsWith("#")) {
          return (
            <div key={lIdx} className="text-zinc-500">
              {line}
            </div>
          );
        }

        // Colorize command line
        let elements = [];
        let remaining = line;

        // Match leading $ jackui-agent or jackui-agent
        const cmdMatch = remaining.match(/^(\s*\$?\s*jackui-agent\s+)([a-z-]+)/);
        if (cmdMatch) {
          const isPrompt = cmdMatch[1].includes("$");
          elements.push(
            <React.Fragment key="cmd-main">
              {isPrompt && <span className="text-zinc-600 font-semibold select-none mr-2">~</span>}
              <span className="text-blue-500 font-semibold">jackui-agent </span>
              <span className="text-sky-400 font-medium">{cmdMatch[2]}</span>
            </React.Fragment>
          );
          remaining = remaining.substring(cmdMatch[0].length);
        }

        // Look for parameters like --task, --model
        // Match flags
        const flagMatch = remaining.match(/^(\s*)(--[a-z-]+)(\s+)/);
        if (flagMatch) {
          elements.push(
            <React.Fragment key="param-flag">
              <span className="text-zinc-400">{flagMatch[1]}</span>
              <span className="text-zinc-400 font-semibold">{flagMatch[2]}</span>
              <span>{flagMatch[3]}</span>
            </React.Fragment>
          );
          remaining = remaining.substring(flagMatch[0].length);
        }

        if (remaining.trim().length > 0) {
          elements.push(
            <span key="string-body" className="text-zinc-300 font-medium">
              {remaining}
            </span>
          );
        }

        return (
          <div key={lIdx} className="min-h-[1.5em] leading-relaxed">
            {elements.length > 0 ? elements : line}
          </div>
        );
      });
    };

    return (
      <div {...props} ref={ref} className={cn("w-full", className)}>
        {/* Mockup Outer Container with Fluid Grainy Mesh Gradient */}
        <div
          className={cn(
            "mockup-bg-container relative w-full overflow-hidden p-8 md:p-16",
            "border border-zinc-800/20 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#a7f3d0]" // Base mint green
          )}
        >
          {/* Animated Mesh Gradient Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 saturate-150">
            {/* Top Left Cream/Yellow Blob */}
            <div 
              className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-[#fef08a] rounded-full blur-[80px] mix-blend-normal animate-[pulseBlob_18s_ease-in-out_infinite_alternate]"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
            {/* Center Right Peach/Orange Blob */}
            <div 
              className="absolute top-[10%] -right-[20%] w-[80%] h-[80%] bg-[#fdba74] rounded-full blur-[100px] mix-blend-normal animate-[pulseBlob_25s_ease-in-out_infinite_alternate-reverse]"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
            {/* Bottom Right Soft Orange Blob */}
            <div 
              className="absolute -bottom-[20%] right-[10%] w-[60%] h-[60%] bg-[#fbd38d] rounded-full blur-[90px] mix-blend-normal animate-[pulseBlob_22s_ease-in-out_infinite_alternate]"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
            {/* Bottom Left Mint Blob */}
            <div 
              className="absolute -bottom-[10%] -left-[20%] w-[70%] h-[70%] bg-[#6ee7b7] rounded-full blur-[100px] mix-blend-normal animate-[pulseBlob_20s_ease-in-out_infinite_alternate-reverse]"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
          </div>

          {/* Heavy Film Grain Noise Layer for texture (like the image) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.6] mix-blend-overlay z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Terminal Shell */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "relative z-10 w-full overflow-hidden backdrop-blur-md transition-all duration-500 ease-out",
              // Premium metallic gradient border
              "bg-gradient-to-b from-zinc-700/40 via-zinc-900/40 to-black p-[1px]",
              // Sleek, heavy shadow
              "shadow-[0_28px_64px_-10px_rgba(0,0,0,0.92)]",
              "hover:-translate-y-1 hover:shadow-[0_38px_80px_-12px_rgba(0,0,0,0.98)]"
            )}
          >
            {/* Spotlight Border Follow Effect */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-none opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.4), transparent 70%)`,
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            )}

            {/* Terminal Inner Console Frame */}
            <div className="relative w-full bg-[#09090b]/96 overflow-hidden">
              
              {/* Header Title Bar */}
              <div className="relative flex items-center justify-between px-5 py-4 bg-[#050505]/92 border-b border-zinc-800/60 z-25">
                {/* macOS window controls */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                </div>

                {/* Simulated Utility Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-blue-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Terminal Code Console */}
              <div className="p-6 font-mono text-[13px] leading-relaxed text-zinc-300 min-h-[365px] flex flex-col justify-between z-20">
                <div>
                  {/* Color-Highlight CLI command typewriter stream */}
                  <div className="space-y-1">
                    {renderSyntaxHighlightedCommand(typedCommand)}
                    {mounted && !showOutput && (
                      <span className="w-2.5 h-4.5 bg-sky-400/90 ml-0.5 inline-block animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    )}
                  </div>

                  {/* Simulated output stream */}
                  {showOutput && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="mt-6 space-y-4"
                    >
                      {/* Agent process steps tree-graph */}
                      <div className="space-y-1 text-xs text-zinc-500 font-mono">
                        <div><span className="text-blue-500">➜</span> JackUI Engine v2.0.4 loaded</div>
                        <div>├─ ⚙️ Initializing build pipeline...</div>
                        <div>├─ 🔍 Resolving dependencies...</div>
                        <div>├─ 🛠️ Compiling assets...</div>
                        <div>└─ <span className="text-blue-500">✓</span> Build completed successfully in 142ms</div>
                      </div>

                      {/* Divider line */}
                      <div className="border-t border-zinc-800/50 my-3" />

                      {/* JSON Response body with glow highlighting */}
                      <pre className="text-zinc-400 leading-relaxed overflow-x-auto text-[12.5px] select-text">
                        <span className="text-zinc-500">{`{`}</span>{"\n"}
                        <span className="text-zinc-300">{`  "status"`}</span><span className="text-zinc-500">:</span> <span className="text-blue-400">{`"success"`}</span><span className="text-zinc-500">,</span>{"\n"}
                        <span className="text-zinc-300">{`  "environment"`}</span><span className="text-zinc-500">:</span> <span className="text-blue-400">{`"production"`}</span><span className="text-zinc-500">,</span>{"\n"}
                        <span className="text-zinc-300">{`  "assets_optimized"`}</span><span className="text-zinc-500">:</span> <span className="text-zinc-400">{`true`}</span><span className="text-zinc-500">,</span>{"\n"}
                        <span className="text-zinc-300">{`  "bundle_size"`}</span><span className="text-zinc-500">:</span> <span className="text-zinc-400">{`"14.2kb"`}</span>{"\n"}
                        <span className="text-zinc-500">{`}`}</span>
                      </pre>
                    </motion.div>
                  )}
                </div>

                {/* Idle blinking cursor when waiting */}
                {showOutput && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/50 text-zinc-600">
                    <span className="font-semibold select-none">~</span>
                    <span className="w-2.5 h-4.5 bg-blue-500/40 inline-block animate-ping" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global style keyframes for micro-interactions */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes grainNoise {
            0%, 100% { transform:translate(0, 0) }
            10% { transform:translate(-1%, -1%) }
            30% { transform:translate(-2%, -2%) }
            50% { transform:translate(-1%, -3%) }
            70% { transform:translate(-3%, -2%) }
            90% { transform:translate(-2%, -1%) }
          }
          @keyframes pulseBlob {
            0% { transform: scale(1) translate3d(0, 0, 0); opacity: 0.15; }
            50% { transform: scale(1.15) translate3d(15px, -15px, 0); opacity: 0.25; }
            100% { transform: scale(1) translate3d(0, 0, 0); opacity: 0.15; }
          }
        ` }} />
      </div>
    );
  }
);

TerminalMockup.displayName = "TerminalMockup";

export default TerminalMockup;

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

    // Canvas Interactive Flow Mesh & Particle System
    useEffect(() => {
      if (!mounted) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let width = (canvas.width = canvas.offsetWidth);
      let height = (canvas.height = canvas.offsetHeight);

      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      };

      window.addEventListener("resize", handleResize);

      // Grid mesh node definition
      const cols = 25;
      const rows = 18;
      const nodes: Array<{
        x: number;
        y: number;
        origX: number;
        origY: number;
        vx: number;
        vy: number;
      }> = [];

      const colSpacing = width / (cols - 1);
      const rowSpacing = height / (rows - 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * colSpacing;
          const y = r * rowSpacing;
          nodes.push({
            x,
            y,
            origX: x,
            origY: y,
            vx: 0,
            vy: 0,
          });
        }
      }

      // Mouse tracking inside canvas coordinates
      let canvasMouse = { x: -2000, y: -2000, active: false };
      const canvasContainer = canvas.closest(".mockup-bg-container");
      
      const onMouseMove = (e: MouseEvent) => {
        if (!canvasContainer) return;
        const rect = canvasContainer.getBoundingClientRect();
        canvasMouse.x = e.clientX - rect.left;
        canvasMouse.y = e.clientY - rect.top;
        canvasMouse.active = true;
      };

      const onMouseLeave = () => {
        canvasMouse.active = false;
        canvasMouse.x = -2000;
        canvasMouse.y = -2000;
      };

      if (canvasContainer) {
        canvasContainer.addEventListener("mousemove", onMouseMove as any);
        canvasContainer.addEventListener("mouseleave", onMouseLeave);
      }

      // Floating dust particles
      const dust: Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
      }> = [];

      for (let i = 0; i < 30; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3 - 0.15,
          opacity: Math.random() * 0.4 + 0.15,
        });
      }

      let time = 0;

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        time += 0.002;

        // 1. Draw Mesh Grid
        ctx.strokeStyle = "rgba(254, 215, 170, 0.05)";
        ctx.lineWidth = 0.75;

        // Update mesh node positions (waves + mouse magnetism distortion)
        nodes.forEach((node) => {
          // Slow organic wave motion
          const waveX = Math.sin(time + node.origY * 0.005) * 6;
          const waveY = Math.cos(time + node.origX * 0.005) * 6;

          let targetX = node.origX + waveX;
          let targetY = node.origY + waveY;

          // Mouse warp push/pull
          if (canvasMouse.active) {
            const dx = node.origX - canvasMouse.x;
            const dy = node.origY - canvasMouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              // Magnetically bend grid rows slightly inwards
              targetX -= (dx / dist) * force * 24;
              targetY -= (dy / dist) * force * 24;
            }
          }

          // Smooth elastic transition to target
          node.vx += (targetX - node.x) * 0.1;
          node.vy += (targetY - node.y) * 0.1;
          node.vx *= 0.75;
          node.vy *= 0.75;
          node.x += node.vx;
          node.y += node.vy;
        });

        // Draw horizontal grid lines
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const node = nodes[idx];
            if (c === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
          ctx.stroke();
        }

        // Draw vertical grid lines
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          for (let r = 0; r < rows; r++) {
            const idx = r * cols + c;
            const node = nodes[idx];
            if (r === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
          ctx.stroke();
        }

        // 2. Draw Spotlight Aura tracking mouse
        if (canvasMouse.active) {
          const auraGrad = ctx.createRadialGradient(
            canvasMouse.x,
            canvasMouse.y,
            10,
            canvasMouse.x,
            canvasMouse.y,
            240
          );
          auraGrad.addColorStop(0, "rgba(254, 147, 54, 0.15)");
          auraGrad.addColorStop(0.5, "rgba(254, 147, 54, 0.04)");
          auraGrad.addColorStop(1, "rgba(254, 147, 54, 0)");
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(canvasMouse.x, canvasMouse.y, 240, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Draw Floating Dust Particles
        dust.forEach((d) => {
          d.x += d.speedX;
          d.y += d.speedY;

          // Wrap boundaries
          if (d.x < 0) d.x = width;
          if (d.x > width) d.x = 0;
          if (d.y < 0) d.y = height;
          if (d.y > height) d.y = 0;

          // Draw small glowing dots
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 237, 213, ${d.opacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(254, 147, 54, 0.5)";
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        });

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        if (canvasContainer) {
          canvasContainer.removeEventListener("mousemove", onMouseMove as any);
          canvasContainer.removeEventListener("mouseleave", onMouseLeave);
        }
      };
    }, [mounted]);

    // Helper function to colorize CLI commands for premium syntax-highlighting
    const renderSyntaxHighlightedCommand = (rawText: string) => {
      if (!rawText) return null;

      // Simple parser to separate parts of the command line
      const lines = rawText.split("\n");
      return lines.map((line, lIdx) => {
        // Highlight comments
        if (line.trim().startsWith("#")) {
          return (
            <div key={lIdx} className="text-orange-200/40">
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
              {isPrompt && <span className="text-orange-400/60 font-semibold select-none mr-2">$</span>}
              <span className="text-orange-400 font-semibold">jackui-agent </span>
              <span className="text-cyan-400 font-medium">{cmdMatch[2]}</span>
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
              <span className="text-[#a88d75]">{flagMatch[1]}</span>
              <span className="text-orange-350 font-semibold">{flagMatch[2]}</span>
              <span>{flagMatch[3]}</span>
            </React.Fragment>
          );
          remaining = remaining.substring(flagMatch[0].length);
        }

        if (remaining.trim().length > 0) {
          elements.push(
            <span key="string-body" className="text-orange-100/90 font-medium">
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
      <div
        ref={ref}
        className={cn(
          "w-full max-w-4xl mx-auto p-4 md:p-12 select-none",
          className
        )}
        {...props}
      >
        {/* Mockup Outer Container with Premium Ambient Lighting & Slow-moving glow mesh */}
        <div
          className={cn(
            "mockup-bg-container relative w-full overflow-hidden rounded-[2.5rem] p-8 md:p-16",
            "border border-orange-950/45 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          )}
          style={{
            background: "radial-gradient(circle at 50% 10%, #ff8c37 0%, #a84711 35%, #1d0f08 85%)",
          }}
        >
          {/* Moving Ambient Color Orb 1 */}
          <div 
            className="absolute top-[20%] left-[20%] w-96 h-96 bg-orange-400/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen animate-[pulseBlob_12s_infinite_alternate]"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />

          {/* Moving Ambient Color Orb 2 */}
          <div 
            className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none mix-blend-screen animate-[pulseBlob_16s_infinite_alternate-reverse]"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />

          {/* Authentic Film Grain Noise Layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay animate-[grainNoise_0.3s_steps(4)_infinite]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Interactive Mesh/Grid Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Edge Highlighting Ambient Flare */}
          <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-orange-350/20 to-transparent blur-3xl pointer-events-none" />

          {/* Terminal Shell with Hover Shimmer & Dynamic Border Highlight */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "relative z-10 w-full rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-500 ease-out",
              // Premium metallic gradient border
              "bg-gradient-to-b from-orange-350/40 via-orange-950/20 to-orange-950/70 p-[1.2px]",
              // Sleek, heavy shadow
              "shadow-[0_28px_64px_-10px_rgba(0,0,0,0.92)]",
              "hover:-translate-y-1 hover:shadow-[0_38px_80px_-12px_rgba(0,0,0,0.98)]"
            )}
          >
            {/* Spotlight Border Follow Effect */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(254, 215, 170, 0.35), transparent 70%)`,
                  padding: "1.2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            )}

            {/* Terminal Inner Console Frame */}
            <div className="relative w-full rounded-[14px] bg-[#1e1712]/96 overflow-hidden">
              
              {/* Header Title Bar */}
              <div className="relative flex items-center justify-between px-5 py-4 bg-[#140e0a]/92 border-b border-orange-950/40 z-25">
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
                    className="p-1 rounded text-orange-200/40 hover:text-orange-200 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="p-1 rounded text-orange-200/40 hover:text-orange-200 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded text-orange-200/40 hover:text-orange-200 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-450" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Terminal Code Console */}
              <div className="p-6 font-mono text-[13px] leading-relaxed text-[#dfcfc2] min-h-[365px] flex flex-col justify-between z-20">
                <div>
                  {/* Color-Highlight CLI command typewriter stream */}
                  <div className="space-y-1">
                    {renderSyntaxHighlightedCommand(typedCommand)}
                    {mounted && !showOutput && (
                      <span className="w-2.5 h-4.5 bg-orange-400/90 ml-0.5 inline-block animate-pulse shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
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
                      <div className="space-y-1 text-xs text-orange-200/70 font-mono">
                        <div>🤖 JackUI Agent v1.2.0 active</div>
                        <div>├─ ⚙️ Spawned agent 'VisualOptimizer'</div>
                        <div>├─ 🔍 Scanning 'components/jackui/particles-background.tsx'</div>
                        <div>├─ 🛠️ Injecting custom GPU-accelerated spring-physics</div>
                        <div>└─ ✓ Layout compilation successful</div>
                      </div>

                      {/* Divider line */}
                      <div className="border-t border-orange-950/20 my-3" />

                      {/* JSON Response body with glow highlighting */}
                      <pre className="text-orange-200/80 leading-relaxed overflow-x-auto text-[12.5px] select-text">
                        <span className="text-orange-200/40">{`{`}</span>{"\n"}
                        <span className="text-[#a88d75]">{`  "status"`}</span><span className="text-orange-200/50">:</span> <span className="text-cyan-400">{`"optimized"`}</span><span className="text-orange-200/50">,</span>{"\n"}
                        <span className="text-[#a88d75]">{`  "files_modified"`}</span><span className="text-orange-200/50">:</span> <span className="text-orange-200/40">{`[`}</span><span className="text-orange-350">{`"particles-background.tsx"`}</span><span className="text-orange-200/40">{`]`}</span><span className="text-orange-200/50">,</span>{"\n"}
                        <span className="text-[#a88d75]">{`  "fps_increase"`}</span><span className="text-orange-200/50">:</span> <span className="text-orange-300">{`"+18%"`}</span><span className="text-orange-200/50">,</span>{"\n"}
                        <span className="text-[#a88d75]">{`  "inference_latency"`}</span><span className="text-orange-200/50">:</span> <span className="text-emerald-400">{`"14ms"`}</span>{"\n"}
                        <span className="text-orange-200/40">{`}`}</span>
                      </pre>
                    </motion.div>
                  )}
                </div>

                {/* Idle blinking cursor when waiting */}
                {showOutput && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-orange-950/10 text-orange-200/20">
                    <span className="font-semibold select-none">$</span>
                    <span className="w-2.5 h-4.5 bg-orange-350/30 inline-block animate-ping" />
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

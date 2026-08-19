"use client";

import React from "react";
import { LayoutTemplate, Blocks, Image as ImageIcon, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { LmButton } from "./lm-button";

export function GlowInputBar({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-3xl mx-auto", className)}>
      <style>{`
        @keyframes shimmer-glow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-glow-effect {
          animation: shimmer-glow 8s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Animated Glowing Border Background */}
      <div className="absolute inset-x-0 -bottom-1 h-2 z-0 pointer-events-none overflow-hidden rounded-b-2xl">
        <div className="absolute inset-0 shimmer-glow-effect w-[200%] h-full bg-gradient-to-r from-transparent via-blue-500 via-purple-500 via-pink-500 via-teal-500 to-transparent blur-2xl opacity-60" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full bg-neutral-900 border border-white/10 rounded-2xl flex flex-col p-2 shadow-2xl transition-all duration-300 focus-within:border-white/20 focus-within:shadow-blue-500/10">
        
        {/* Glow bleeding outside (secondary blur) */}
        <div className="absolute inset-x-4 -bottom-px h-[2px] w-[calc(100%-2rem)] z-[-1] pointer-events-none">
          <div className="absolute inset-0 shimmer-glow-effect w-[100%] h-full bg-gradient-to-r from-transparent via-blue-500/80 via-purple-500/80 to-transparent blur-xl opacity-50" />
        </div>

        {/* Input Area */}
        <textarea
          placeholder="Create a landing page for my SaaS idea of Voice Agents"
          className="w-full bg-transparent text-white placeholder-neutral-400 p-4 outline-none resize-none min-h-[120px] text-lg font-medium"
          rows={3}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-2 pb-2 mt-2">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              <LayoutTemplate className="w-4 h-4" />
              Templates
            </button>
            <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              <Blocks className="w-4 h-4" />
              Blocks
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800">
              <Mic className="w-5 h-5" />
            </button>
            <LmButton aria-label="Submit Prompt" className="ml-2 !rounded-xl !p-3">
              <ArrowUp className="w-5 h-5" />
            </LmButton>
          </div>
        </div>
      </div>
    </div>
  );
}

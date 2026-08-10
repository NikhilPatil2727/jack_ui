"use client";

import React, { useRef, useState } from "react";
import { LayoutTemplate, Blocks, ImageIcon, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlowInputBarProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function GlowInputBar({ className, ...props }: GlowInputBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={cn("relative w-full max-w-3xl mx-auto group", className)}>
      {/* 
        Animated Glowing Border
        This sits behind the main container and bleeds out at the bottom.
      */}
      <div 
        className="absolute -inset-[2px] rounded-[18px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899, #14b8a6, #3b82f6)",
          backgroundSize: "200% 100%",
          animation: "moveGradient 8s linear infinite",
          maskImage: "linear-gradient(to bottom, transparent 60%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 60%, black 100%)",
        }}
      />
      
      {/* Component Specific Styles */}
      <style>{`
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        /* Custom scrollbar for textarea */
        .glow-input-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .glow-input-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .glow-input-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 10px;
        }
      `}</style>

      {/* Main Container */}
      <div className="relative flex flex-col w-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        
        {/* Input Area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          placeholder="Create a landing page for my SaaS idea of Voice Agents"
          className="w-full bg-transparent text-neutral-200 placeholder:text-neutral-500 px-6 pt-6 pb-2 min-h-[100px] resize-none outline-none border-none focus:ring-0 text-[15px] sm:text-base leading-relaxed glow-input-scrollbar"
          rows={1}
          {...props}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 pt-2">
          
          {/* Left: Templates & Blocks */}
          <div className="flex items-center gap-2">
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-neutral-300 text-sm font-medium">
              <LayoutTemplate className="w-4 h-4 text-neutral-400" />
              <span className="hidden sm:inline">Templates</span>
            </button>
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-neutral-300 text-sm font-medium">
              <Blocks className="w-4 h-4 text-neutral-400" />
              <span className="hidden sm:inline">Blocks</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" className="p-2 rounded-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 rounded-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={!value.trim()}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed transition-all text-white shadow-lg"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Thin Inner Bottom Glow Line (Optional touch for depth) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent, #3b82f6, #a855f7, #ec4899, #14b8a6, transparent)",
            backgroundSize: "200% 100%",
            animation: "moveGradient 8s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

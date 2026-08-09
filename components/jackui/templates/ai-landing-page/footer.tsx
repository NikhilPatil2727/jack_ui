"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  logoText?: string;
  copyrightText?: string;
}

export function Footer({
  logoText = "SphereAI",
  copyrightText = "© 2024 Your Company. All rights reserved.",
}: FooterProps) {
  return (
    <footer className="w-full bg-transparent px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 pt-12">
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E40AF] via-[#11235A] to-[#020617] px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-24 shadow-2xl">
        
        {/* Abstract Light overlay to mimic the bright diagonal blur */}
        <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-300/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full min-h-[500px] justify-between">
          
          {/* Top Row: Headline & CTA Button */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
            <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] max-w-2xl">
              Ready to innovate with AI?<br />
              start transforming your ideas<br />
              into reality with our powerful<br />
              AI solutions.
            </h2>
            <button className="group shrink-0 inline-flex items-center gap-3 rounded-full bg-black/50 border border-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 shadow-xl">
              <span>Contact Us</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </button>
          </div>

          {/* Middle Row: Contact Info & Nav Links */}
          <div className="mt-20 md:mt-32 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
            <div>
              <p className="text-[10px] sm:text-xs text-white/50 font-medium mb-1 uppercase tracking-wider">Contact Us</p>
              <a href="mailto:hourglass@gmail.com" className="text-sm sm:text-base text-white hover:text-blue-200 transition-colors">
                hourglass@gmail.com
              </a>
            </div>
            
            <nav className="flex flex-wrap gap-6 sm:gap-8 text-sm text-white/80">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Resources</a>
            </nav>
          </div>

          {/* Bottom Area: Giant Logo Wordmark */}
          <div className="mt-16 md:mt-24 mb-16 md:mb-24 flex items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
             {/* Custom Concentric Arc SVG Logo */}
             <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 text-white shrink-0">
                {/* Outer arcs */}
                <path d="M50 10 C 27.9 10 10 27.9 10 50 C 10 65.7 19.1 79.3 32.5 86.6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M50 90 C 72.1 90 90 72.1 90 50 C 90 34.3 80.9 20.7 67.5 13.4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                {/* Inner circle */}
                <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="6" />
             </svg>
             <span className="font-sans font-medium text-5xl sm:text-7xl md:text-[7rem] lg:text-[8rem] tracking-tight text-white leading-none">
               {logoText}
             </span>
          </div>

          {/* Bottom-most Row: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50 font-light border-t border-white/10 pt-6 mt-auto">
            <p>{copyrightText}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30">Cookie Settings</a>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

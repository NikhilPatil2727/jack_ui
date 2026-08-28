"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  logoText?: string;
  copyrightText?: string;
}

export function Footer({
  logoText = "Platform",
  copyrightText = "© 2024 Your Company. All rights reserved.",
}: FooterProps) {
  return (
    <footer className="w-full bg-transparent px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 pt-12 font-sans">
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FFFBEB] via-[#FFFDF5] to-white dark:from-[#0D1117] dark:via-zinc-900 dark:to-[#0D1117] px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-24 shadow-lg border border-zinc-200/50 dark:border-zinc-800/80 transition-colors duration-300">

        {/* Abstract Light overlay to mimic the bright diagonal blur */}
        <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-[#D8B4FE]/30 dark:bg-purple-900/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#E9D5FF]/25 dark:bg-fuchsia-900/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full min-h-[500px] justify-between">

          {/* Top Row: Headline & CTA Button */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] max-w-2xl">
              Ready to scale your operations?<br />
              Start automating your workflow<br />
              and transforming your ideas<br />
              into reality.
            </h2>
            <button className="group shrink-0 inline-flex items-center gap-3 rounded-full bg-[#C084FC] hover:bg-[#A855F7] dark:bg-purple-600 dark:hover:bg-purple-500 border border-purple-300/60 dark:border-purple-500/60 px-6 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white transition-all hover:scale-105 shadow-md">
              <span>Contact Sales</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60 dark:bg-zinc-800/80 border border-purple-300 dark:border-purple-500 text-zinc-900 dark:text-white group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </button>
          </div>

          {/* Middle Row: Contact Info & Nav Links */}
          <div className="mt-20 md:mt-32 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
            <div>
              <p className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-medium mb-1 uppercase tracking-wider">Contact Us</p>
              <a href="mailto:hello@automationplatform.com" className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                hello@automationplatform.com
              </a>
            </div>

            <nav className="flex flex-wrap gap-6 sm:gap-8 text-sm text-zinc-650">
              <a href="#" className="hover:text-purple-600 text-zinc-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors font-medium">Home</a>
              <a href="#features" className="hover:text-purple-600 text-zinc-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors font-medium">Features</a>
              <a href="#pricing" className="hover:text-purple-600 text-zinc-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors font-medium">Pricing</a>
              <a href="#" className="hover:text-purple-600 text-zinc-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors font-medium">Documentation</a>
            </nav>
          </div>

          {/* Bottom Area: Giant Logo Wordmark */}
          <div className="mt-16 md:mt-24 mb-16 md:mb-24 flex items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
            {/* Custom Concentric Arc SVG Logo - Colored Gold */}
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 text-[#C084FC] dark:text-purple-400 shrink-0">
              {/* Outer arcs */}
              <path d="M50 10 C 27.9 10 10 27.9 10 50 C 10 65.7 19.1 79.3 32.5 86.6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M50 90 C 72.1 90 90 72.1 90 50 C 90 34.3 80.9 20.7 67.5 13.4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              {/* Inner circle */}
              <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="6" />
            </svg>
            <span className="font-sans font-medium text-5xl sm:text-7xl md:text-[7rem] lg:text-[8rem] tracking-tight text-zinc-900 dark:text-white leading-none">
              {logoText}
            </span>
          </div>

          {/* Bottom-most Row: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-450 dark:text-zinc-500 font-light border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-auto">
            <p>{copyrightText}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-purple-500/50">Privacy Policy</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-purple-500/50">Terms of Service</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-purple-500/50">Cookie Settings</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

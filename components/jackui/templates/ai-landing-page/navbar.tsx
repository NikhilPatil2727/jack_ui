"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  logoText?: string;
  navItems?: NavItem[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export function Navbar({
  logoText = "Aether AI",
  navItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ],
  ctaText = "Get Started",
  onCtaClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full">
      <nav className="relative z-50 flex items-center justify-between px-6 sm:px-10 py-3 w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <svg className="w-4 h-4 text-white dark:text-zinc-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {logoText}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 px-6 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}

          <button
            onClick={onCtaClick}
            className="group relative hidden md:flex items-center gap-2 transition-all duration-300 text-white dark:text-zinc-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 border border-[#0f0f0f] dark:border-white/10 bg-gradient-to-b from-[#2d2d2d] to-[#171717] dark:from-white dark:to-zinc-200 hover:from-[#363636] hover:to-[#202020] dark:hover:from-white dark:hover:to-zinc-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_4px_12px_rgba(255,255,255,0.1)]"
          >
            {ctaText}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 dark:bg-black/10 group-hover:bg-white/20 dark:group-hover:bg-black/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]">
              <ArrowUpRight className="h-3 w-3 text-white dark:text-zinc-900" strokeWidth={2.5} />
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "absolute top-full left-0 w-full z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4 p-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onCtaClick?.();
            }}
            className="group relative flex items-center justify-center gap-2 transition-all duration-300 text-white dark:text-zinc-900 px-5 py-3 mt-2 rounded-full text-sm font-semibold border border-[#0f0f0f] dark:border-white/10 bg-gradient-to-b from-[#2d2d2d] to-[#171717] dark:from-white dark:to-zinc-200 hover:from-[#363636] hover:to-[#202020] dark:hover:from-white dark:hover:to-zinc-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_4px_12px_rgba(255,255,255,0.1)] w-full"
          >
            {ctaText}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 dark:bg-black/10 group-hover:bg-white/20 dark:group-hover:bg-black/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]">
              <ArrowUpRight className="h-3 w-3 text-white dark:text-zinc-900" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/*
=============================================================================
  PLAIN REACT (WITHOUT NEXT.JS / NEXT-THEMES) DARK MODE IMPLEMENTATION GUIDE
=============================================================================

If you are using plain React (e.g., Vite, Create React App) instead of Next.js,
you won't use `next-themes`. Instead, you can manage the dark mode state manually
and apply a `dark` class to the HTML root element. Tailwind CSS handles the rest
if `darkMode: 'class'` is set in your tailwind config.

Here is a simple example of how to implement the ThemeToggle in plain React:

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function PlainReactThemeToggle() {
  // Initialize state based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Update HTML class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

You would then use this toggle button in your Navbar component and remove the 
next-themes `useTheme` hook.
=============================================================================
*/

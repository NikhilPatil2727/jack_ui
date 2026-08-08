"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Cpu, Sun, Moon } from "lucide-react";
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
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
}

export function Navbar({
  logoText = "Aether AI",
  navItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaText = "Get Started",
  onCtaClick,
  theme,
  onThemeToggle,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localTheme, setLocalTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Vite/Next.js Fallback Strategy:
  // If `theme` or `onThemeToggle` are passed (controlled mode, e.g. from a Next.js layout),
  // we delegate the theme toggle up. Otherwise (uncontrolled mode, e.g. standalone Vite React page),
  // we manage state internally with localTheme.
  const activeTheme = theme || localTheme;
  const handleToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      setLocalTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md transition-all dark:border-zinc-800/50 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-sans font-bold text-xl tracking-tight text-zinc-950 dark:text-zinc-50">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <Cpu className="h-5 w-5" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity hover:opacity-100" />
          </div>
          <span>{logoText}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA & Theme Toggle Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white/50 text-zinc-600 shadow-xs backdrop-blur-xs transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {mounted ? (
              activeTheme === "dark" ? (
                <Sun className="h-[16px] w-[16px] text-amber-500" />
              ) : (
                <Moon className="h-[16px] w-[16px] text-indigo-600" />
              )
            ) : (
              <div className="h-[16px] w-[16px]" />
            )}
          </button>

          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-zinc-950 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-900 hover:shadow-lg dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            {mounted ? (
              activeTheme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 border-b border-zinc-200 bg-white/95 p-6 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden dark:border-zinc-800 dark:bg-zinc-950/95",
          isOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
        )}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-zinc-800 hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-indigo-400"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onCtaClick?.();
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

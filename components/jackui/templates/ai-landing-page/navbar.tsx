"use client";

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

  return (
    <div className="relative w-full">
      <nav className="relative z-50 flex items-center justify-between px-6 sm:px-10 py-3 w-full">
        {/* Logo (Stylish White Cursive Text Only) */}
        <div className="flex items-center cursor-pointer group">
          <span className="font-instrument italic font-normal text-2xl tracking-normal text-white transition-colors">
            {logoText}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 px-6 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCtaClick}
            className="group relative hidden md:flex items-center gap-2 cursor-pointer transition-all duration-300 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] hover:from-[#363636] hover:to-[#202020] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)]"
          >
            {ctaText}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <ArrowUpRight className="h-3 w-3 text-white" strokeWidth={2.5} />
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "absolute top-full left-0 w-full z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md shadow-lg border-b border-zinc-200/50",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4 p-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onCtaClick?.();
            }}
            className="group relative flex items-center justify-center gap-2 transition-all duration-300 text-white px-5 py-3 mt-2 rounded-full text-sm font-semibold border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] hover:from-[#363636] hover:to-[#202020] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)] w-full"
          >
            {ctaText}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <ArrowUpRight className="h-3 w-3 text-white" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

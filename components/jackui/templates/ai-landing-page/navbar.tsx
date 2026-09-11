"use client";

import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6 w-full -mb-20 sm:-mb-24">
      <div
        className={cn(
          "pointer-events-auto relative z-50 flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "mt-3 sm:mt-4 max-w-3xl rounded-full px-5 sm:px-7 py-2 sm:py-2.5 bg-black/35 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]"
            : "mt-0 max-w-7xl rounded-none px-2 sm:px-4 py-5 sm:py-6 bg-transparent border border-transparent shadow-none"
        )}
      >
        {/* Logo (Stylish White Cursive Text Only) */}
        <div className="flex items-center cursor-pointer group">
          <span className="font-instrument italic font-normal text-2xl tracking-normal text-white transition-colors">
            {logoText}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCtaClick}
            className="group relative hidden md:flex items-center gap-2 cursor-pointer transition-all duration-300 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] hover:from-[#363636] hover:to-[#202020] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)]"
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
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 shadow-2xl",
            isOpen ? "max-h-64 opacity-100 p-5" : "max-h-0 opacity-0 p-0 border-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-white/90 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onCtaClick?.();
              }}
              className="group relative flex items-center justify-center gap-2 transition-all duration-300 text-white px-5 py-2.5 mt-2 rounded-full text-sm font-semibold border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] hover:from-[#363636] hover:to-[#202020] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)] w-full"
            >
              {ctaText}
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <ArrowUpRight className="h-3 w-3 text-white" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

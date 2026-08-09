"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Aperture, Sun, Moon } from "lucide-react";
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
  logoText = "SphereAI",
  navItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#" },
  ],
  ctaText = "Get Started",
  onCtaClick,
  theme,
  onThemeToggle,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localTheme, setLocalTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeTheme = theme || localTheme;
  const handleToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      setLocalTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
  };

  return (
    <header 
      className={cn(
        "absolute top-6 inset-x-0 flex justify-center z-50 px-4 pointer-events-none transition-all duration-300",
        scrolled ? "top-4" : "top-6"
      )}
    >
      <div className="pointer-events-auto w-full max-w-4xl rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="mx-auto flex h-14 items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-sans font-medium text-lg tracking-tight text-white transition-opacity hover:opacity-80">
            <Aperture className="h-5 w-5" />
            <span>{logoText}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0D1117] transition-all hover:bg-white/90 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer - rendered inside the pill for a unified glass look */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-64 border-t border-white/10" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 p-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onCtaClick?.();
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-white/90"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sun, Moon, Menu, X, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "green";
interface Badge { text: string; variant: BadgeVariant; }
type NavLinkItem = { label: string; href: string; badge?: Badge | null; };

const NAV_LINKS: NavLinkItem[] = [
  { label: "Components", href: "/docs",      badge: null },
  { label: "Templates",  href: "/templates", badge: { text: "New", variant: "green" } },
  { label: "Pricing",    href: "/pricing",   badge: null },
  { label: "Docs",       href: "/docs",      badge: { text: "v2",  variant: "default" } },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-[16px]",
        isDark
          ? "border-white/[0.06] bg-[#0a0a0a]/97"
          : "border-black/[0.06] bg-white/97"
      )}
    >
      {/* ── Top bar ── */}
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8">

        {/* LEFT: Logo + Desktop nav */}
        <div className="flex items-center">
          <Link
            href="/"
            className={cn(
              "flex shrink-0 items-center gap-2.5 pr-5 mr-5",
              isDark ? "border-r border-white/[0.07]" : "border-r border-black/[0.07]"
            )}
          >
            <Image
              src="/logo.png"
              alt="Jack UI logo"
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-[8px]"
            />
            <span
              className={cn(
                "text-[15px] font-bold tracking-[-0.4px]",
                isDark ? "text-white" : "text-black"
              )}
            >
              Jack UI
            </span>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden sm:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href, badge }) => (
              <NavLink key={label} href={href} badge={badge} isDark={isDark}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* Live chip — desktop only */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px]",
              isDark
                ? "border-white/[0.07] bg-white/[0.02] text-white/35"
                : "border-black/[0.07] bg-black/[0.02] text-black/35"
            )}
          >
            <PulseDot />
            Updated weekly
          </div>

          {/* Divider — desktop only */}
          <div
            className={cn("hidden sm:block h-5 w-px mx-0.5", isDark ? "bg-white/[0.07]" : "bg-black/[0.07]")}
            aria-hidden
          />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
              "flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-1",
              isDark
                ? "border-white/[0.08] text-white/40 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/80 focus-visible:ring-white/20"
                : "border-black/[0.08] text-black/40 hover:border-black/[0.14] hover:bg-black/[0.06] hover:text-black/80 focus-visible:ring-black/20"
            )}
          >
            {isDark
              ? <Sun className="h-[15px] w-[15px]" aria-hidden />
              : <Moon className="h-[15px] w-[15px]" aria-hidden />
            }
          </button>

          {/* Get Pro — always visible */}
          <Link
            href="#"
            target="_blank"
            className={cn(
              "inline-flex h-[34px] items-center gap-1.5 rounded-[9px] px-3.5",
              "text-[12.5px] font-[650] tracking-[-0.2px]",
              "transition-opacity duration-150 hover:opacity-85 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isDark
                ? "bg-white text-[#0a0a0a] focus-visible:ring-white/30 focus-visible:ring-offset-[#0a0a0a]"
                : "bg-black text-white focus-visible:ring-black/30 focus-visible:ring-offset-white"
            )}
          >
            Get Pro
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={cn(
              "flex sm:hidden h-[34px] w-[34px] items-center justify-center rounded-[9px] border transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-1",
              isDark
                ? "border-white/[0.08] text-white/40 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/80 focus-visible:ring-white/20"
                : "border-black/[0.08] text-black/40 hover:border-black/[0.14] hover:bg-black/[0.06] hover:text-black/80 focus-visible:ring-black/20"
            )}
          >
            {menuOpen
              ? <X className="h-[15px] w-[15px]" aria-hidden />
              : <Menu className="h-[15px] w-[15px]" aria-hidden />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "sm:hidden overflow-hidden transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          isDark ? "border-white/[0.06]" : "border-black/[0.06]",
          menuOpen ? "max-h-[320px] opacity-100 border-b" : "max-h-0 opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-0.5 px-4 pb-4 pt-3" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href, badge }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-[10px] px-3 py-2.5",
                "text-[14px] font-[450] transition-all duration-[140ms]",
                isDark
                  ? "text-white/55 hover:bg-white/[0.05] hover:text-white/90"
                  : "text-black/55 hover:bg-black/[0.05] hover:text-black/90"
              )}
            >
              <span className="flex items-center gap-2">
                {label}
                {badge && <NavBadge badge={badge} isDark={isDark} />}
              </span>
              <ChevronRight
                className={cn("h-3.5 w-3.5", isDark ? "text-white/20" : "text-black/20")}
                aria-hidden
              />
            </Link>
          ))}

          {/* Divider */}
          <div className={cn("my-2 h-px", isDark ? "bg-white/[0.05]" : "bg-black/[0.05]")} aria-hidden />

          {/* Mobile CTA — full width */}
          <Link
            href="#"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-[10px] py-2.5",
              "text-[13.5px] font-[650] tracking-[-0.2px]",
              "transition-opacity duration-150 hover:opacity-85",
              isDark ? "bg-white text-[#0a0a0a]" : "bg-black text-white"
            )}
          >
            Get Pro
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ── Sub-components ── */

function NavLink({
  href, children, badge, isDark,
}: {
  href: string; children: React.ReactNode; badge?: Badge | null; isDark: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[8px] px-3 py-[6px]",
        "text-[13px] font-[450] transition-all duration-[140ms]",
        "focus-visible:outline-none focus-visible:ring-1",
        isDark
          ? "text-white/45 hover:bg-white/[0.05] hover:text-white/88 focus-visible:ring-white/20"
          : "text-black/45 hover:bg-black/[0.05] hover:text-black/88 focus-visible:ring-black/20"
      )}
    >
      {children}
      {badge && <NavBadge badge={badge} isDark={isDark} />}
    </Link>
  );
}

function NavBadge({ badge, isDark }: { badge: Badge; isDark: boolean }) {
  return (
    <span
      className={cn(
        "rounded-[4px] border px-1 py-px text-[9px] font-bold uppercase tracking-[0.5px]",
        badge.variant === "green"
          ? "border-green-400/[0.22] bg-green-400/[0.10] text-green-400"
          : isDark
            ? "border-white/[0.09] bg-white/[0.05] text-white/35"
            : "border-black/[0.09] bg-black/[0.05] text-black/35"
      )}
    >
      {badge.text}
    </span>
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
    </span>
  );
}
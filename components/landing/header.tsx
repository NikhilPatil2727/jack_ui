"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sun, Moon, Menu, X, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
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
  const { setTheme, resolvedTheme } = useTheme() || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-[16px] border-b border-black/[0.05] dark:border-white/[0.05]",
        "bg-white/30 dark:bg-[#0a0a0a]/30"
      )}
    >
      {/* ── Top bar ── */}
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8">

        {/* LEFT: Logo + Desktop nav */}
        <div className="flex items-center">
          <Link
            href="/"
            className={cn(
              "flex shrink-0 items-center gap-2.5 pr-5 mr-5 cursor-pointer",
              "border-r border-black/[0.07] dark:border-white/[0.07]"
            )}
          >
            <Image
              src="/JackUi.png"
              alt="Jack UI logo"
              width={44}
              height={44}
              className="h-[44px] w-[44px] rounded-[8px] object-cover"
              priority
              unoptimized
            />
            <span
              className={cn(
                "text-[15px] font-bold tracking-[-0.4px]",
                "text-black dark:text-white"
              )}
            >
              Jack UI
            </span>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden sm:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href, badge }) => (
              <NavLink key={label} href={href} badge={badge}>
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
              "border-black/[0.07] bg-black/[0.02] text-black/35 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-white/35"
            )}
          >
            <PulseDot />
            Updated weekly
          </div>

          {/* Divider — desktop only */}
          <div
            className={cn("hidden sm:block h-5 w-px mx-0.5", "bg-black/[0.07] dark:bg-white/[0.07]")}
            aria-hidden
          />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme?.(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
              "flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[9px] border transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-1",
              "border-black/[0.08] text-black/40 hover:border-black/[0.14] hover:bg-black/[0.06] hover:text-black/80 focus-visible:ring-black/20",
              "dark:border-white/[0.08] dark:text-white/40 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.06] dark:hover:text-white/80 dark:focus-visible:ring-white/20"
            )}
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="h-[15px] w-[15px]" aria-hidden />
              ) : (
                <Moon className="h-[15px] w-[15px]" aria-hidden />
              )
            ) : (
              <span className="h-[15px] w-[15px]" />
            )}
          </button>

          {/* Get Pro — always visible */}
          <Link
            href="#"
            target="_blank"
            className={cn(
              "inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[9px] px-3.5",
              "text-[12.5px] font-[650] tracking-[-0.2px]",
              "transition-opacity duration-150 hover:opacity-85 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "bg-black text-white focus-visible:ring-black/30 focus-visible:ring-offset-white",
              "dark:bg-white dark:text-[#0a0a0a] dark:focus-visible:ring-white/30 dark:focus-visible:ring-offset-[#0a0a0a]"
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
              "flex sm:hidden h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[9px] border transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-1",
              "border-black/[0.08] text-black/40 hover:border-black/[0.14] hover:bg-black/[0.06] hover:text-black/80 focus-visible:ring-black/20",
              "dark:border-white/[0.08] dark:text-white/40 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.06] dark:hover:text-white/80 dark:focus-visible:ring-white/20"
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
          "border-black/[0.06] dark:border-white/[0.06]",
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
                "flex cursor-pointer items-center justify-between rounded-[10px] px-3 py-2.5",
                "text-[14px] font-[450] transition-all duration-[140ms]",
                "text-black/55 hover:bg-black/[0.05] hover:text-black/90 dark:text-white/55 dark:hover:bg-white/[0.05] dark:hover:text-white/90"
              )}
            >
              <span className="flex items-center gap-2">
                {label}
                {badge && <NavBadge badge={badge} />}
              </span>
              <ChevronRight
                className={cn("h-3.5 w-3.5", "text-black/20 dark:text-white/20")}
                aria-hidden
              />
            </Link>
          ))}

          {/* Divider */}
          <div className={cn("my-2 h-px", "bg-black/[0.05] dark:bg-white/[0.05]")} aria-hidden />

          {/* Mobile CTA — full width */}
          <Link
            href="#"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-1.5 rounded-[10px] py-2.5",
              "text-[13.5px] font-[650] tracking-[-0.2px]",
              "transition-opacity duration-150 hover:opacity-85",
              "bg-black text-white dark:bg-white dark:text-[#0a0a0a]"
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
  href, children, badge,
}: {
  href: string; children: React.ReactNode; badge?: Badge | null;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-[8px] px-3 py-[6px]",
        "text-[13px] font-[450] transition-all duration-[140ms]",
        "focus-visible:outline-none focus-visible:ring-1",
        "text-black/45 hover:bg-black/[0.05] hover:text-black/88 focus-visible:ring-black/20",
        "dark:text-white/45 dark:hover:bg-white/[0.05] dark:hover:text-white/88 dark:focus-visible:ring-white/20"
      )}
    >
      {children}
      {badge && <NavBadge badge={badge} />}
    </Link>
  );
}

function NavBadge({ badge }: { badge: Badge }) {
  return (
    <span
      className={cn(
        "rounded-[4px] border px-1 py-px text-[9px] font-bold uppercase tracking-[0.5px]",
        badge.variant === "green"
          ? "border-green-400/[0.22] bg-green-400/[0.10] text-green-400"
          : "border-black/[0.09] bg-black/[0.05] text-black/35 dark:border-white/[0.09] dark:bg-white/[0.05] dark:text-white/35"
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
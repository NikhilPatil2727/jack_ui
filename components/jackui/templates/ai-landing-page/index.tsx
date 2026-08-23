"use client";

import React, { useState, useEffect } from "react";
import { Navbar, type NavbarProps } from "./navbar";
import { Hero, type HeroProps } from "./hero";
import { Features, type FeaturesProps } from "./features";
import { Showcase, type ShowcaseProps } from "./showcase";
import { Pricing, type PricingProps } from "./pricing";
import { Testimonials, type TestimonialsProps } from "./testimonials";
import { FAQ, type FaqProps } from "./faq";
import { CTA, type CtaProps } from "./cta";
import { Footer, type FooterProps } from "./footer";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export {
  Navbar,
  Hero,
  Features,
  Showcase,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
};

export interface AILandingPageProps {
  navbarProps?: NavbarProps;
  heroProps?: HeroProps;
  featuresProps?: FeaturesProps;
  showcaseProps?: ShowcaseProps;
  pricingProps?: PricingProps;
  testimonialsProps?: TestimonialsProps;
  faqProps?: FaqProps;
  ctaProps?: CtaProps;
  footerProps?: FooterProps;
  previewMode?: boolean;
  defaultExpanded?: boolean;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
}

/**
 * AI Landing Page Template
 * Supports Next.js (via `next-themes`) and Plain React (via custom theme state / class toggling).
 */
export default function AILandingPage({
  navbarProps,
  heroProps,
  featuresProps,
  showcaseProps,
  pricingProps,
  testimonialsProps,
  faqProps,
  ctaProps,
  footerProps,
  previewMode = false,
  defaultExpanded = false,
  theme,
  onThemeToggle,
}: AILandingPageProps) {
  // -------------------------------------------------------------
  // 1. NEXT.JS IMPLEMENTATION (Using `next-themes`)
  // -------------------------------------------------------------
  const themeContext = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = theme !== undefined
    ? theme
    : (mounted ? (themeContext?.resolvedTheme || themeContext?.theme || "light") : "light");

  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else if (themeContext?.setTheme) {
      themeContext.setTheme(activeTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <div className={cn("relative min-h-screen w-full bg-white p-2 sm:p-3 md:p-3 lg:p-3 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 antialiased selection:bg-[#C084FC] selection:text-zinc-900 transition-colors duration-300", previewMode && "max-h-[480px] overflow-hidden p-2")}>
      <div className="relative mx-auto flex w-full max-w-[100rem] flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-[#FFFDF6] shadow-2xl ring-1 ring-zinc-200/50 dark:bg-[#0D1117] dark:ring-zinc-800/50 transition-colors duration-300">
        <Hero
          {...heroProps}
        />

        {!previewMode && (
          <>
            <Features {...featuresProps} />
            <Showcase {...showcaseProps} />
            <Pricing {...pricingProps} />
            <Testimonials {...testimonialsProps} />
            <FAQ {...faqProps} />
            <CTA {...ctaProps} />
            <Footer {...footerProps} />
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================================================
   PLANT / PLAIN REACT IMPLEMENTATION GUIDE & COMMENTED CODE (Vite / CRA / React SPA)
   =========================================================================================

   If you are using PLAIN REACT (without Next.js or `next-themes`), here is how to use 
   Dark Mode easily in your React App:

   -----------------------------------------------------------------------------------------
   METHOD A: Direct Root Class Toggling (Easiest for Plain React)
   -----------------------------------------------------------------------------------------

   ```tsx
   import React, { useState, useEffect } from "react";
   import AILandingPage from "@/components/jackui/templates/ai-landing-page";

   export function PlainReactLandingPage() {
     const [theme, setTheme] = useState<"light" | "dark">(() => {
       if (typeof window !== "undefined") {
         return (localStorage.getItem("theme") as "light" | "dark") || "dark";
       }
       return "dark";
     });

     useEffect(() => {
       const root = document.documentElement;
       if (theme === "dark") {
         root.classList.add("dark");
       } else {
         root.classList.remove("dark");
       }
       localStorage.setItem("theme", theme);
     }, [theme]);

     const toggleTheme = () => {
       setTheme((prev) => (prev === "dark" ? "light" : "dark"));
     };

     return (
       <AILandingPage
         theme={theme}
         onThemeToggle={toggleTheme}
       />
     );
   }
   ```

   -----------------------------------------------------------------------------------------
   METHOD B: React Context Provider (Recommended for Scalable Plain React Apps)
   -----------------------------------------------------------------------------------------

   ```tsx
   import React, { createContext, useContext, useEffect, useState } from "react";

   type Theme = "light" | "dark";
   interface ThemeContextType {
     theme: Theme;
     toggleTheme: () => void;
   }

   const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

   export function ThemeProvider({ children }: { children: React.ReactNode }) {
     const [theme, setTheme] = useState<Theme>(() => {
       return (localStorage.getItem("theme") as Theme) || "dark";
     });

     useEffect(() => {
       const root = document.documentElement;
       if (theme === "dark") {
         root.classList.add("dark");
       } else {
         root.classList.remove("dark");
       }
       localStorage.setItem("theme", theme);
     }, [theme]);

     const toggleTheme = () => {
       setTheme((prev) => (prev === "dark" ? "light" : "dark"));
     };

     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   }

   export function usePlainReactTheme() {
     const context = useContext(ThemeContext);
     if (!context) throw new Error("usePlainReactTheme must be used within ThemeProvider");
     return context;
   }
   ```

   -----------------------------------------------------------------------------------------
   METHOD C: Next.js Integration Guide (`next-themes`)
   -----------------------------------------------------------------------------------------

   In Next.js `app/providers.tsx`:

   ```tsx
   "use client";
   import { ThemeProvider as NextThemesProvider } from "next-themes";

   export function Providers({ children }: { children: React.ReactNode }) {
     return (
       <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
         {children}
       </NextThemesProvider>
     );
   }
   ```

   And wrap your root `layout.tsx` with `<Providers>{children}</Providers>`.
   `AILandingPage` will automatically detect `next-themes` and handle theme switching!
   =========================================================================================
*/


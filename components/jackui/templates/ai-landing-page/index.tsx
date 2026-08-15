"use client";

import React, { useState, useEffect } from "react";
import { Navbar, type NavbarProps } from "./navbar";
import { Hero, type HeroProps } from "./hero";
import { Features, type FeaturesProps } from "./features";
import { Showcase, type ShowcaseProps } from "./showcase"; // force ts refresh
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
}

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
}: AILandingPageProps) {
  // 1. NEXT.JS WITH next-themes (Default Integration)
  const { theme, setTheme, resolvedTheme } = useTheme() || {};
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = (mounted ? (resolvedTheme || theme) : "light") as "light" | "dark";

  const handleThemeToggle = () => {
    if (setTheme) {
      setTheme(activeTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <div className={cn("relative min-h-screen w-full bg-white p-2 sm:p-4 md:p-4 lg:p-4 dark:bg-zinc-950 font-sans text-zinc-900 antialiased selection:bg-[#FBBF24] selection:text-zinc-900", previewMode && "max-h-[480px] overflow-hidden p-2")}>
      <div className="relative mx-auto flex w-full max-w-[100rem] flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-[#FFFDF6] shadow-2xl ring-1 ring-zinc-200/50 dark:bg-[#0D1117] dark:ring-zinc-800/50 transition-colors duration-300">
        <Hero {...heroProps} />
        
        {!previewMode && (
          <>
            <Features {...featuresProps} />
            <Showcase {...showcaseProps} />
            <Pricing {...pricingProps} />
            <Testimonials {...testimonialsProps} />
            {/* FAQ kept for flexibility, though not explicitly in the brief */}
            <FAQ {...faqProps} />
            <CTA {...ctaProps} />
            <Footer {...footerProps} />
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Navbar, type NavbarProps } from "./navbar";
import { Hero, type HeroProps } from "./hero";
import { LogoCloud, type LogoCloudProps } from "./logo-cloud";
import { Features, type FeaturesProps } from "./features";
import { HowItWorks, type HowItWorksProps } from "./how-it-works";
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
  LogoCloud,
  Features,
  HowItWorks,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
};

export interface AILandingPageProps {
  navbarProps?: NavbarProps;
  heroProps?: HeroProps;
  logoCloudProps?: LogoCloudProps;
  featuresProps?: FeaturesProps;
  howItWorksProps?: HowItWorksProps;
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
  logoCloudProps,
  featuresProps,
  howItWorksProps,
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

  const activeTheme = (mounted ? (resolvedTheme || theme) : "dark") as "light" | "dark";

  const handleThemeToggle = () => {
    if (setTheme) {
      setTheme(activeTheme === "dark" ? "light" : "dark");
    }
  };

  // 2. VITE / PLAIN REACT IMPLEMENTATION (NO next-themes package)
  // If you are using Vite + React, remove the Next.js/next-themes code above and use this:
  /*
  const [localTheme, setLocalTheme] = useState<"light" | "dark">("dark");
  const activeTheme = localTheme;
  const handleThemeToggle = () => {
    setLocalTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  */

  return (
    <div className={cn("relative w-full bg-background font-sans text-foreground antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-300", activeTheme, previewMode && "max-h-[480px] overflow-hidden")}>
      <Navbar theme={activeTheme} onThemeToggle={handleThemeToggle} {...navbarProps} />
      <Hero {...heroProps} />
      
      {!previewMode && (
        <>
          <LogoCloud {...logoCloudProps} />
          <Features {...featuresProps} />
          <HowItWorks {...howItWorksProps} />
          <Pricing {...pricingProps} />
          <Testimonials {...testimonialsProps} />
          <FAQ {...faqProps} />
          <CTA {...ctaProps} />
          <Footer {...footerProps} />
        </>
      )}
    </div>
  );
}

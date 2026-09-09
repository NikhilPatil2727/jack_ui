"use client";

import React from "react";
import { Navbar, type NavbarProps } from "./navbar";
import { Hero, type HeroProps } from "./hero";
import { Features, type FeaturesProps } from "./features";
import { Pricing, type PricingProps } from "./pricing";
import { Testimonials, type TestimonialsProps } from "./testimonials";
import { FAQ, type FaqProps } from "./faq";
import { CTA, type CtaProps } from "./cta";
import { Footer, type FooterProps } from "./footer";
import { cn } from "@/lib/utils";

export {
  Navbar,
  Hero,
  Features,
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
  pricingProps?: PricingProps;
  testimonialsProps?: TestimonialsProps;
  faqProps?: FaqProps;
  ctaProps?: CtaProps;
  footerProps?: FooterProps;
  previewMode?: boolean;
  defaultExpanded?: boolean;
}

/**
 * AI Landing Page Template
 */
export default function AILandingPage({
  navbarProps,
  heroProps,
  featuresProps,
  pricingProps,
  testimonialsProps,
  faqProps,
  ctaProps,
  footerProps,
  previewMode = false,
  defaultExpanded = false,
}: AILandingPageProps) {
  return (
    <div className={cn("relative min-h-screen w-full bg-white p-2 sm:p-3 md:p-3 lg:p-3 font-sans text-zinc-900 antialiased selection:bg-zinc-800 selection:text-white transition-colors duration-300", previewMode && "max-h-[480px] overflow-hidden p-2")}>
      <div className="relative mx-auto flex w-full max-w-[100rem] flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white shadow-2xl ring-1 ring-zinc-200/50 transition-colors duration-300">
        <Navbar {...navbarProps} />
        <Hero hideNavbar {...heroProps} />

        {!previewMode && (
          <>
            <Features {...featuresProps} />
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



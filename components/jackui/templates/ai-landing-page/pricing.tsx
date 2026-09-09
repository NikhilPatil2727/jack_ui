"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingFeature {
  name: string;
  included?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  monthlyPrice?: string;
  annualPrice?: string;
  originalPrice?: string;
  period?: string;
  description: string;
  subDescription?: string;
  highlightText?: string;
  discountBadge?: string;
  features: (string | PricingFeature)[];
  isPopular?: boolean;
  ctaText: string;
  onCtaClick?: () => void;
}

export interface PricingProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

export function Pricing({
  badge = "Pricing",
  title = "Beautiful captions,\nsimple pricing",
  subtitle = "Start free with welcome credits. Paid\nplans work out to about 37¢ a video.",
  plans,
}: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const defaultPlans: PricingPlan[] = [
    {
      name: "Free",
      price: "$0",
      monthlyPrice: "$0",
      annualPrice: "$0",
      period: "forever",
      description: "Try it out, no card needed",
      subDescription: "No card needed",
      highlightText: "200 welcome credits",
      ctaText: "Start free",
      features: [
        "1080p export",
        "Up to 3 projects",
        "1 min per video",
        "300 MB per upload",
        "500 MB storage",
        "Curated templates",
        "Motion elements",
        "Selected caption styles & effects",
        "99+ languages",
      ],
    },
    {
      name: "Creator",
      price: "$5.56",
      monthlyPrice: "$7.42",
      annualPrice: "$5.56",
      originalPrice: "$7.42",
      period: "/mo + tax",
      description: "For creators who post regularly",
      discountBadge: "Extra 25% off first year",
      subDescription: "$66.74 now, then $88.99",
      highlightText: "2,500 credits/month",
      isPopular: true,
      ctaText: "Claim 25% off",
      features: [
        "2K export",
        "Unlimited projects",
        "5 min per video",
        "500 MB per upload",
        "10 GB storage",
        "Curated templates + variations",
        "Motion elements",
        "All caption styles & effects",
        "Custom font uploads",
        "99+ languages",
        "Credit rollover",
        "SRT / subtitle export",
      ],
    },
    {
      name: "Studio",
      price: "$12.37",
      monthlyPrice: "$16.50",
      annualPrice: "$12.37",
      originalPrice: "$16.50",
      period: "/mo + tax",
      description: "For power users & teams",
      discountBadge: "Extra 25% off first year",
      subDescription: "$148.49 now, then $197.99",
      highlightText: "8,000 credits/month",
      ctaText: "Claim 25% off",
      features: [
        "4K export",
        "Unlimited projects",
        "10 min per video",
        "750 MB per upload",
        "30 GB storage",
        "Curated templates + variations",
        "Motion elements",
        "All caption styles & effects",
        "Custom font uploads",
        "99+ languages",
        "Credit rollover",
        "SRT / subtitle export",
        "Priority support",
      ],
    },
  ];

  const displayPlans = plans || defaultPlans;

  return (
    <section id="pricing" className="w-full flex justify-center py-20 px-4 sm:px-6 lg:px-8 font-sans bg-transparent">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lastik&display=swap');
      `}</style>
      <div className="w-full max-w-5xl flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          {badge && (
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-1 text-xs font-medium text-zinc-600 shadow-2xs">
              {badge}
            </div>
          )}
          <h2
            style={{ fontFamily: "'Lastik', serif" }}
            className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-900 leading-[1.15] max-w-2xl"
          >
            {title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </h2>
          {subtitle && (
            <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-md leading-relaxed font-normal">
              {subtitle.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br className="hidden sm:block" />}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="inline-flex items-center rounded-full bg-zinc-100 p-1 border border-zinc-200/80 shadow-2xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                  billingCycle === "monthly"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                  billingCycle === "annual"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Annual
              </button>
            </div>

            {/* Discount Tag */}
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 border border-blue-200/60 shadow-2xs">
              Save 18%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={cn(
          "mt-16 grid w-full gap-4 sm:gap-5 lg:gap-6 items-stretch",
          displayPlans.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl" : "grid-cols-1 md:grid-cols-3"
        )}>
          {displayPlans.map((plan, index) => {
            const activePrice = billingCycle === "annual"
              ? (plan.annualPrice || plan.price)
              : (plan.monthlyPrice || plan.price);

            return (
              <div
                key={plan.name || index}
                className={cn(
                  "relative flex flex-col justify-between rounded-[24px] bg-white border p-5 sm:p-6 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]",
                  plan.isPopular ? "border-violet-500/50 ring-1 ring-violet-500/20" : "border-zinc-200/90"
                )}
              >
                {/* Most Popular Floating Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-b from-violet-500 via-violet-600 to-violet-700 px-3.5 py-1 text-xs font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-violet-400/40">
                      Most popular
                    </span>
                  </div>
                )}

                {/* Card Header & Content */}
                <div>
                  {/* Plan Name & Description */}
                  <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 font-medium min-h-[18px]">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mt-6 flex items-baseline flex-wrap gap-x-1.5">
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
                      {activePrice}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {plan.period || (activePrice === "$0" ? "forever" : "/mo + tax")}
                    </span>
                    {billingCycle === "annual" && plan.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through font-medium ml-1">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Optional Discount Badge */}
                  {plan.discountBadge && (
                    <div className="mt-2.5">
                      <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-medium text-violet-600 border border-violet-100">
                        {plan.discountBadge}
                      </span>
                    </div>
                  )}

                  {/* Sub-description line */}
                  {plan.subDescription && (
                    <p className="mt-1.5 text-[11px] text-zinc-400 font-medium">
                      {plan.subDescription}
                    </p>
                  )}

                  {/* Highlight text / Credits */}
                  {plan.highlightText && (
                    <div className="mt-4 pt-1">
                      <span className="text-xs font-semibold text-zinc-800 border-b border-dashed border-zinc-400 pb-0.5">
                        {plan.highlightText}
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={plan.onCtaClick}
                    className={cn(
                      "mt-8 w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
                      plan.isPopular
                        ? "bg-gradient-to-b from-violet-500 via-violet-600 to-violet-700 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_14px_rgba(124,58,237,0.35)] border border-violet-400/40 hover:from-violet-600 hover:to-violet-800"
                        : "bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200/90"
                    )}
                  >
                    {plan.ctaText}
                  </button>

                  {/* Horizontal Divider */}
                  <div className="my-7 h-px w-full bg-zinc-100" />

                  {/* Feature List */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => {
                      const featureName = typeof feature === "string" ? feature : feature.name;
                      const isIncluded = typeof feature === "string" ? true : feature.included !== false;

                      return (
                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-650">
                          <div className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                            isIncluded ? "bg-violet-50 text-violet-600" : "bg-zinc-100 text-zinc-400"
                          )}>
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </div>
                          <span className={isIncluded ? "text-zinc-700" : "text-zinc-400 line-through"}>
                            {featureName}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

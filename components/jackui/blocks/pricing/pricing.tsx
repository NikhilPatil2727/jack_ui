"use client";

import React, { useState } from "react";
import { PricingHeader } from "./pricing-header";
import { PricingCard } from "./pricing-card";

export interface PricingFeature {
  name: string;
}

export interface PricingTier {
  name: string;
  description: string;
  priceMonthly: string | number;
  priceAnnually: string | number;
  billedAnnuallyText?: string;
  features: PricingFeature[];
  ctaText: string;
  isPopular?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Launch",
    description: "For small teams turning their first repeatable process live.",
    priceMonthly: 29,
    priceAnnually: 23,
    billedAnnuallyText: "BILLED ANNUALLY · $276",
    features: [
      { name: "Three active workspaces" },
      { name: "25k monthly runs" },
      { name: "Core integrations" },
      { name: "Seven-day activity history" },
      { name: "Community support" },
    ],
    ctaText: "Start building ↗",
  },
  {
    name: "Scale",
    description: "For product teams that need more control as volume grows.",
    priceMonthly: 79,
    priceAnnually: 63,
    billedAnnuallyText: "BILLED ANNUALLY · $756",
    isPopular: true,
    features: [
      { name: "Everything in Launch" },
      { name: "Unlimited workspaces" },
      { name: "500k monthly runs" },
      { name: "Advanced permissions" },
      { name: "Priority support" },
    ],
    ctaText: "Choose Scale ↗",
  },
  {
    name: "Enterprise",
    description: "For organizations with custom security and scale requirements.",
    priceMonthly: "Custom",
    priceAnnually: "Custom",
    billedAnnuallyText: "ANNUAL AGREEMENT",
    features: [
      { name: "Everything in Scale" },
      { name: "SAML and directory sync" },
      { name: "Custom data retention" },
      { name: "Security review support" },
      { name: "Dedicated success lead" },
    ],
    ctaText: "Talk to sales ↗",
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950 font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <PricingHeader
          title={"One plan for every\nstage of the work."}
          subtitle="Start lean, then add capacity when the signal is clear."
          isAnnual={isAnnual}
          setIsAnnual={setIsAnnual}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;

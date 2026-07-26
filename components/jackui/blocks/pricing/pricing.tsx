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
    description: "For solo founders testing the waters and finding signal.",
    priceMonthly: 14,
    priceAnnually: 10,
    billedAnnuallyText: "Billed $120 yearly",
    features: [
      { name: "1 Active Workspace" },
      { name: "Core data reporting" },
      { name: "Standard email support" },
      { name: "Community Discord access" },
    ],
    ctaText: "Start Building",
  },
  {
    name: "Velocity",
    description: "For scaling teams that have found product-market fit.",
    priceMonthly: 59,
    priceAnnually: 47,
    billedAnnuallyText: "Billed $564 yearly",
    isPopular: true,
    features: [
      { name: "Everything in Launch" },
      { name: "Unlimited Workspaces" },
      { name: "Advanced cohort analytics" },
      { name: "Priority 1-hour response" },
      { name: "Custom domains & branding" },
      { name: "Team collaboration roles" },
    ],
    ctaText: "Start 14-Day Trial",
  },
  {
    name: "Enterprise",
    description: "For mature organizations requiring scale and compliance.",
    priceMonthly: "Custom",
    priceAnnually: "Custom",
    billedAnnuallyText: "Contact for tailored pricing",
    features: [
      { name: "Everything in Velocity" },
      { name: "Dedicated Success Manager" },
      { name: "SAML SSO & SCIM provisioning" },
      { name: "Guaranteed 99.99% SLA" },
      { name: "Audit logs & export" },
    ],
    ctaText: "Contact Sales",
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950 font-sans">
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
        <PricingHeader
          title={"Simple pricing for\nevery stage of growth."}
          subtitle="Choose the plan that fits your team's current needs and scale effortlessly as you grow."
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

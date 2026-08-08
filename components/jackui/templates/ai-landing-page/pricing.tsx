"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Cpu } from "lucide-react";

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

export interface PricingProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

export function Pricing({
  title = "Simple, scale-ready pricing",
  subtitle = "Choose a plan tailored to your team's size and integration needs.",
  tiers = [
    {
      name: "Starter",
      description: "Perfect for testing automation pipelines locally.",
      priceMonthly: 19,
      priceAnnually: 15,
      billedAnnuallyText: "Billed annually ($180)",
      features: [
        { name: "Up to 3 Active Agents" },
        { name: "10,000 monthly executions" },
        { name: "2 data integration endpoints" },
        { name: "Standard community support" },
      ],
      ctaText: "Start building",
    },
    {
      name: "Scale",
      description: "For teams growing workflow throughput rapidly.",
      priceMonthly: 79,
      priceAnnually: 59,
      billedAnnuallyText: "Billed annually ($708)",
      isPopular: true,
      features: [
        { name: "Unlimited Active Agents" },
        { name: "100,000 monthly executions" },
        { name: "Unlimited integrations" },
        { name: "Explainable Run Traces" },
        { name: "SSO & Advanced Security" },
        { name: "1-hour priority email support" },
      ],
      ctaText: "Start 14-day trial",
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring strict SLA and privacy.",
      priceMonthly: "Custom",
      priceAnnually: "Custom",
      billedAnnuallyText: "Contact for custom quotas",
      features: [
        { name: "Bespoke custom agent templates" },
        { name: "Unlimited monthly executions" },
        { name: "Private VPC cloud deployments" },
        { name: "Dedicated technical engineer" },
        { name: "99.99% uptime guarantee SLA" },
      ],
      ctaText: "Contact Sales",
    },
  ],
}: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            {subtitle}
          </p>

          {/* Toggle button */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? "font-bold text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative flex h-6 w-11 items-center rounded-full bg-zinc-200 p-1 transition-colors dark:bg-zinc-800"
              aria-label="Toggle Billing Interval"
            >
              <motion.div
                layout
                className="h-4 w-4 rounded-full bg-indigo-600"
                animate={{ x: isAnnual ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "font-bold text-indigo-600 dark:text-indigo-400" : "text-zinc-500"}`}>
              Annually <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-600 dark:text-indigo-400">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:items-center">
          {tiers.map((tier, index) => {
            const price = isAnnual ? tier.priceAnnually : tier.priceMonthly;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-3xl bg-white p-8 dark:bg-zinc-900 border ${
                  tier.isPopular
                    ? "border-indigo-600 shadow-xl shadow-indigo-600/10 md:py-10"
                    : "border-zinc-200 dark:border-zinc-800 shadow-xs"
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white tracking-wide uppercase">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{tier.name}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{tier.description}</p>
                </div>

                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-zinc-950 dark:text-zinc-50">
                    {typeof price === "number" ? `$${price}` : price}
                  </span>
                  {typeof price === "number" && (
                    <span className="ml-1 text-sm font-semibold text-zinc-500">/mo</span>
                  )}
                </div>

                {isAnnual && tier.billedAnnuallyText && (
                  <p className="-mt-4 mb-6 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {tier.billedAnnuallyText}
                  </p>
                )}

                <button
                  className={`w-full rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
                    tier.isPopular
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg"
                      : "border border-zinc-200 bg-white/80 hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  }`}
                >
                  {tier.ctaText}
                </button>

                <ul className="mt-8 space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                  {tier.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

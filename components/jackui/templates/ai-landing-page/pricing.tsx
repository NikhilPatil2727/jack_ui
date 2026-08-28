"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
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
  title = "Simple, Transparent Pricing",
  subtitle = "Choose the right plan for your team.\nScale your workflow without hidden fees.",
  plans = [
    {
      name: "Basic",
      price: "Free",
      description: "For individuals exploring intelligent automation and basic workflows.",
      ctaText: "Start for Free",
      features: [
        { name: "100 Automation runs/month", included: true },
        { name: "Core productivity tools", included: true },
        { name: "Standard integrations", included: true },
        { name: "Community support", included: true },
        { name: "1 user seat", included: true },
      ],
    },
    {
      name: "Premium",
      price: "$49",
      description: "Advanced workflow automation, premium integrations, and priority support.",
      isPopular: true,
      ctaText: "Upgrade to Premium",
      features: [
        { name: "Unlimited Automation runs", included: true },
        { name: "Custom API \u0026 Webhooks", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Priority 24/7 support", included: true },
        { name: "Up to 10 user seats", included: true },
        { name: "Audit logs \u0026 history", included: true },
        { name: "Team collaboration tools", included: true },
      ],
    },
  ],
}: PricingProps) {
  return (
    <section id="pricing" className="w-full flex justify-center py-20 px-4 sm:px-6 font-sans">
      {/* Outer Container */}
      <div className="w-full max-w-[1100px] bg-white dark:bg-zinc-900/80 rounded-[32px] pt-[64px] px-[20px] sm:px-[40px] md:px-[80px] pb-[80px] shadow-sm border border-zinc-100 dark:border-zinc-800/80 flex flex-col items-center transition-colors duration-300">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center">
          {badge && (
            <div className="mb-6 inline-flex rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-50 dark:bg-purple-950/60 px-4 py-1.5 text-[13px] font-semibold text-purple-700 dark:text-purple-300 shadow-sm">
              {badge}
            </div>
          )}
          <h2 className="text-[36px] sm:text-[42px] font-medium text-zinc-900 dark:text-white tracking-tight leading-[1.15] max-w-2xl">
            {title}
          </h2>
          <p className="mt-5 text-[15px] text-zinc-500 dark:text-zinc-400 leading-[1.6] max-w-[650px]">
            {subtitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Cards Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-12 w-full max-w-[900px]">

          {/* Starter Card (Left) */}
          {plans[0] && (
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-[400px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-[24px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] z-10 md:mt-8 flex flex-col animate-fade-in transition-colors duration-300"
            >
              <h3 className="text-[24px] font-medium text-zinc-900 dark:text-white">
                {plans[0].name}
              </h3>
              <div className="mt-4 text-[44px] font-bold text-zinc-900 dark:text-white tracking-tight leading-none">
                {plans[0].price}
              </div>
              <p className="mt-3 text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[42px]">
                {plans[0].description}
              </p>

              <button
                onClick={plans[0].onCtaClick}
                className="group mt-8 flex w-full h-[48px] items-center justify-center gap-2 rounded-full border border-purple-400 dark:border-purple-600 bg-white dark:bg-zinc-800 px-5 text-[15px] font-semibold text-zinc-800 dark:text-zinc-200 transition-all hover:bg-purple-50 dark:hover:bg-zinc-700 hover:scale-[1.02] shadow-sm"
              >
                <span>{plans[0].ctaText}</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 transition-colors">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </button>

              <div className="mt-10 h-px w-full bg-zinc-100 dark:bg-zinc-800" />

              <ul className="mt-8 space-y-4">
                {plans[0].features.map((feature, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    key={feature.name}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-[18px] w-[18px] text-purple-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-[15px] text-zinc-700 dark:text-zinc-300">{feature.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Pro Card (Right, Overlapping) */}
          {plans[1] && (
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-[440px] rounded-[24px] shadow-[0_20px_50px_rgba(192,132,252,0.15)] z-20 md:-ml-6 md:-mt-12 mt-8 flex flex-col overflow-hidden border border-purple-200 dark:border-purple-800"
            >
              {/* Top Gradient Half */}
              <div className="bg-gradient-to-br from-[#E9D5FF] to-[#C084FC] dark:from-purple-950 dark:to-purple-900 p-[32px] sm:p-[40px] pb-[40px] flex flex-col relative overflow-hidden">
                {/* Decorative glows inside */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/40 dark:bg-purple-600/30 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#FEF9C3]/35 dark:bg-fuchsia-600/20 rounded-full blur-[60px] pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-[28px] sm:text-[32px] font-medium text-zinc-900 dark:text-white tracking-tight">
                    {plans[1].name}
                  </h3>
                  {plans[1].isPopular && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-purple-300 dark:border-purple-700 px-3.5 py-1.5 text-[12px] font-semibold text-purple-800 dark:text-purple-300 shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-2 text-[56px] font-bold text-zinc-900 dark:text-white tracking-tight leading-none relative z-10">
                  {plans[1].price}
                </div>
                <p className="mt-6 text-[14px] text-zinc-800/80 dark:text-purple-200/90 leading-relaxed max-w-[280px] relative z-10">
                  {plans[1].description}
                </p>

                <button
                  onClick={plans[1].onCtaClick}
                  className="group mt-10 flex w-full h-[52px] items-center justify-between rounded-full bg-white dark:bg-zinc-900 pl-6 pr-2 py-2 text-[15px] font-semibold text-zinc-900 dark:text-white border border-purple-300 dark:border-purple-700 shadow-sm transition-all hover:scale-[1.02] hover:bg-purple-50 dark:hover:bg-zinc-800 relative z-10"
                >
                  <span>{plans[1].ctaText}</span>
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 transition-colors">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
              </div>

              {/* Bottom Light/Dark Half */}
              <div className="bg-[#FFFDF5] dark:bg-zinc-900/95 p-[32px] flex-1 flex flex-col relative border-t border-purple-100 dark:border-purple-900/50">
                {/* A subtle shadow overlapping the top half */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-purple-500/[0.02] to-transparent pointer-events-none" />

                <ul className="space-y-4">
                  {plans[1].features.map((feature, i) => (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      key={feature.name}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-[18px] w-[18px] text-purple-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-[15px] text-zinc-700 dark:text-zinc-300">{feature.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Link, Activity, ArrowRight } from "lucide-react";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export function Features({
  badge = "Capabilities",
  title = "Unlock the potential of your team\nwith smart automation.",
  subtitle = "Streamline your processes, connect your data, and optimize performance\nacross your entire organization.",
  features = [
    {
      icon: <Zap className="h-5 w-5 text-yellow-950" />,
      title: "Automated Workflows",
      description: "Eliminate repetitive tasks and focus on what truly matters to your business.",
    },
    {
      icon: <Link className="h-5 w-5 text-yellow-950" />,
      title: "Data Synchronization",
      description: "Keep your tools in sync with real-time data integrations and robust APIs.",
    },
    {
      icon: <Activity className="h-5 w-5 text-yellow-950" />,
      title: "Performance Analytics",
      description: "Gain actionable insights with our comprehensive dashboard and reporting tools.",
    },
  ],
  ctaText = "Explore Features",
  onCtaClick,
}: FeaturesProps) {
  return (
    <section id="features" className="py-24 sm:py-32 font-sans bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {badge && (
            <div className="mb-6 inline-flex rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-700 shadow-sm">
              {badge}
            </div>
          )}
          <h2 className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50 leading-[1.2]">
            {title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </h2>
          <p className="mt-6 text-sm text-zinc-500 sm:text-base md:text-sm max-w-[600px] leading-relaxed dark:text-zinc-400">
            {subtitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col justify-start overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm backdrop-blur-md transition-all hover:border-yellow-400/40 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/40"
            >
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-[#FEF08A]/15 to-transparent dark:from-yellow-900/20" />
              
              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FEF08A] to-[#FBBF24] shadow-[inset_0_-2px_4px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.05)] border border-yellow-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centered CTA */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#FBBF24] px-6 py-2.5 text-sm font-semibold text-zinc-900 border border-yellow-300 shadow-md transition-all hover:bg-[#F59E0B] hover:shadow-lg"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

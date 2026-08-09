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
  badge = "Our Goals",
  title = "Empowering to accelerate projects\nwith AI solutions.",
  subtitle = "Our embedded widget allows you to engage with our AI directly on this\npage. Chat, brainstorm ideas, or generate code effortlessly.",
  features = [
    {
      icon: <Zap className="h-5 w-5 text-white" />,
      title: "Efficiency",
      description: "Designed for speed and efficiency, perfect for dynamic teams.",
    },
    {
      icon: <Link className="h-5 w-5 text-white" />,
      title: "Versatile",
      description: "Unleash creativity and productivity with our versatile AI capabilities.",
    },
    {
      icon: <Activity className="h-5 w-5 text-white" />,
      title: "Seamless",
      description: "Integrate AI into your workflow and enhance your team's performance.",
    },
  ],
  ctaText = "Learn More",
  onCtaClick,
}: FeaturesProps) {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {badge && (
            <div className="mb-6 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {badge}
            </div>
          )}
          <h2 className="text-3xl font-medium tracking-tight text-[#0D1117] sm:text-4xl md:text-5xl dark:text-zinc-50 leading-[1.2]">
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
              className="relative flex flex-col justify-start overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/60 p-8 shadow-sm backdrop-blur-md transition-all hover:border-blue-500/20 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/40"
            >
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20" />
              
              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2)]">
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
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0D1117] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-black hover:shadow-lg dark:bg-white dark:text-[#0D1117] dark:hover:bg-zinc-200"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

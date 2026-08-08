"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Database, Sliders, Play } from "lucide-react";

export interface StepItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: StepItem[];
}

export function HowItWorks({
  title = "How it works in three steps",
  subtitle = "From zero integration to deploying fully autonomous pipelines in minutes.",
  steps = [
    {
      number: "01",
      icon: <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Connect Data Sources",
      description: "Securely link your SQL databases, cloud file shares, or live Slack workspaces in a single step.",
    },
    {
      number: "02",
      icon: <Sliders className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Customize Agent Rules",
      description: "Define boundaries, target outputs, and available tools using natural language or code settings.",
    },
    {
      number: "03",
      icon: <Play className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
      title: "Deploy & Scale",
      description: "Deploy the active agent to production. Let it automatically trigger on events and run at scale.",
    },
  ],
}: HowItWorksProps) {
  return (
    <section id="how-it-works" className="relative bg-zinc-50 py-24 dark:bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-20 flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex w-full flex-col items-center text-center lg:max-w-xs"
              >
                {/* Visual Step bubble */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50">
                  {step.icon}
                  <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  {step.description}
                </p>
              </motion.div>

              {/* Connecting arrows */}
              {index < steps.length - 1 && (
                <>
                  <div className="hidden lg:block">
                    <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-700" />
                  </div>
                  <div className="block lg:hidden">
                    <ArrowDown className="h-6 w-6 text-zinc-300 dark:text-zinc-700" />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

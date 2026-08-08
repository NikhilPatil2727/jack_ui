"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Eye, GitBranch, Layers } from "lucide-react";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}

export function Features({
  title = "Unlock superhuman capabilities",
  subtitle = "Our modular system brings enterprise-grade AI execution to your fingertips.",
  features = [
    {
      icon: <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Self-Improving Reasoning",
      description: "Agents refine their logic paths based on task outcome feedback loops, raising efficiency with every invocation.",
      badge: "Exclusive",
    },
    {
      icon: <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Real-time Processing",
      description: "Perform streaming telemetry operations at the edge, reducing end-to-end routing latency below 50ms.",
      badge: "Ultra Fast",
    },
    {
      icon: <Database className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
      title: "Hybrid Vector Memory",
      description: "Stores session history across transactional, relational, and long-term embedding stores automatically.",
    },
    {
      icon: <Layers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Multi-Agent Orchestration",
      description: "Assign distinct subtasks to specialist agents and let our central coordinator merge their output.",
    },
    {
      icon: <GitBranch className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: "One-Click Tool Integrations",
      description: "Seamlessly deploy database connectors, Slack bots, Stripe interfaces, and local file editors in seconds.",
    },
    {
      icon: <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Explainable Run Traces",
      description: "Visualize exact execution steps, search queries, and prompt parameters in our developer dashboard.",
      badge: "Developer Friendly",
    },
  ],
}: FeaturesProps) {
  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-xs transition-all hover:border-indigo-500/20 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Learn more &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";

export interface CtaProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function CTA({
  title = "Ready to deploy your first agent?",
  description = "Get started for free. Deploy active automation tasks in minutes and trace performance with zero setup.",
  ctaText = "Start building now",
  onCtaClick,
}: CtaProps) {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-950 to-zinc-950 px-8 py-16 shadow-2xl text-center md:py-24"
        >
          {/* Neon background circle decoration */}
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-zinc-300 sm:text-lg">
              {description}
            </p>

            <div className="mt-10 flex justify-center">
              <button
                onClick={onCtaClick}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 shadow-lg hover:bg-zinc-100 hover:shadow-white/10 transition-all"
              >
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4 text-zinc-950 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

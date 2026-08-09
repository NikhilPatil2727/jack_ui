"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo: React.ReactNode;
  color: string;
}

export interface TestimonialsProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
}

export function Testimonials({
  badge = "Testimonials",
  title = "Built with AI. Backed by People.",
  subtitle = "Whether you're building products, writing content, or automating workflows, our users are turning big ideas into\nreality faster than ever—with the help of our AI platform.",
  testimonials = [
    {
      company: "airbnb",
      quote: "This AI replaced hours of work across writing, design, and dev. We now launch and test faster than ever—with a leaner team.",
      author: "Alex R",
      role: "Founder at NovaLab",
      color: "from-rose-500",
      logo: <div className="flex items-center gap-1.5 font-bold text-rose-500"><div className="h-4 w-4 bg-rose-500 rounded-sm rounded-br-full" /> airbnb</div>
    },
    {
      company: "Evernote",
      quote: "This AI replaced hours of work across writing, design, and dev. We now launch and test faster than ever—with a leaner team.",
      author: "Alex R",
      role: "Founder at NovaLab",
      color: "from-emerald-500",
      logo: <div className="flex items-center gap-1.5 font-bold text-emerald-600"><div className="h-4 w-4 bg-emerald-500 rounded-sm rounded-br-full rounded-tl-full" /> Evernote</div>
    },
    {
      company: "customer.io",
      quote: "This AI replaced hours of work across writing, design, and dev. We now launch and test faster than ever—with a leaner team.",
      author: "Alex R",
      role: "Founder at NovaLab",
      color: "from-amber-400",
      logo: <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white"><div className="h-4 w-4 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full" /> customer.io</div>
    },
    {
      company: "Clearbit",
      quote: "This AI replaced hours of work across writing, design, and dev. We now launch and test faster than ever—with a leaner team.",
      author: "Alex R",
      role: "Founder at NovaLab",
      color: "from-blue-500",
      logo: <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white"><div className="h-4 w-4 bg-blue-500 rounded-sm" /> Clearbit</div>
    },
    {
      company: "stripe",
      quote: "This AI replaced hours of work across writing, design, and dev. We now launch and test faster than ever—with a leaner team.",
      author: "Alex R",
      role: "Founder at NovaLab",
      color: "from-indigo-500",
      logo: <div className="flex items-center gap-1.5 font-bold text-indigo-600"><div className="h-4 w-4 bg-indigo-500 rounded-sm" /> stripe</div>
    },
    {
      company: "Spotify",
      quote: "This AI replaced hours of work across writing, design, and dev. We now launch and test faster than ever—with a leaner team.",
      author: "Alex R",
      role: "Founder at NovaLab",
      color: "from-green-500",
      logo: <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white"><div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center"><div className="h-2 w-2 bg-white rounded-full" /></div> Spotify</div>
    },
  ],
}: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {badge && (
            <div className="mb-6 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {badge}
            </div>
          )}
          <h2 className="text-3xl font-medium tracking-tight text-[#0D1117] sm:text-4xl md:text-5xl dark:text-zinc-50 leading-[1.2]">
            {title}
          </h2>
          <p className="mt-6 text-sm text-zinc-500 sm:text-base md:text-sm max-w-[700px] leading-relaxed dark:text-zinc-400">
            {subtitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.company + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/60 bg-white/60 p-8 shadow-sm backdrop-blur-md transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/40"
            >
              {/* Subtle top-left gradient based on brand color */}
              <div className={cn("absolute top-0 left-0 h-32 w-32 -translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br to-transparent blur-3xl opacity-40 dark:opacity-20", item.color)} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  {item.logo}
                </div>
                
                <p className="text-sm text-zinc-500 leading-relaxed flex-1 dark:text-zinc-400 mb-8">
                  {item.quote}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.author}</h4>
                  <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

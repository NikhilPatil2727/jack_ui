"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Box, Triangle, Hexagon, Circle, Diamond, Shield } from "lucide-react";
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
  title = "Built for Scale. Backed by Operators.",
  subtitle = "Whether you are automating workflows, syncing data, or generating insights, teams rely on our platform to move faster and operate smarter.",
  testimonials = [
    {
      company: "Acme Corp",
      quote: "This platform replaced hours of manual data entry. We now execute processes significantly faster—with complete accuracy and a leaner team.",
      author: "Sarah J.",
      role: "Operations Lead",
      color: "from-yellow-300",
      logo: <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-white"><Triangle className="h-4 w-4 text-yellow-500 fill-yellow-400" /> Acme Corp</div>
    },
    {
      company: "Lumina",
      quote: "The seamless integrations transformed our fragmented tech stack into a unified powerhouse. Truly a game-changer for our daily operations.",
      author: "Michael T.",
      role: "CTO",
      color: "from-yellow-400",
      logo: <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-white"><Circle className="h-4 w-4 text-yellow-500 fill-yellow-400" /> Lumina</div>
    },
    {
      company: "Vertex",
      quote: "We scaled our customer outreach tenfold without adding overhead. The automation rules are incredibly intuitive and robust.",
      author: "Emily R.",
      role: "VP of Growth",
      color: "from-yellow-500",
      logo: <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-white"><Diamond className="h-4 w-4 text-yellow-500 fill-yellow-500" /> Vertex</div>
    },
    {
      company: "Nova",
      quote: "It's rare to find software that is both enterprise-grade and user-friendly. We onboarded our entire team in less than a week.",
      author: "David L.",
      role: "Director of Product",
      color: "from-yellow-300",
      logo: <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-white"><Hexagon className="h-4 w-4 text-yellow-500 fill-yellow-400" /> Nova</div>
    },
    {
      company: "Zenith",
      quote: "The analytics dashboards gave us visibility into workflow bottlenecks we didn't even know we had. Highly recommended.",
      author: "Jessica M.",
      role: "Data Analyst",
      color: "from-yellow-400",
      logo: <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-white"><Box className="h-4 w-4 text-yellow-500 fill-yellow-400" /> Zenith</div>
    },
    {
      company: "Pulse",
      quote: "We migrated from a legacy system to this platform and the performance jump was instant. The support team is also fantastic.",
      author: "Daniel K.",
      role: "Engineering Manager",
      color: "from-yellow-500",
      logo: <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-white"><Shield className="h-4 w-4 text-yellow-500 fill-yellow-500" /> Pulse</div>
    },
  ],
}: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 sm:py-32 font-sans bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {badge && (
            <div className="mb-6 inline-flex rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-700 shadow-sm">
              {badge}
            </div>
          )}
          <h2 className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50 leading-[1.2]">
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
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/60 bg-white p-8 shadow-sm backdrop-blur-md transition-all hover:border-yellow-400/40 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/40"
            >
              {/* Subtle top-left gradient based on brand color */}
              <div className={cn("absolute top-0 left-0 h-32 w-32 -translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br to-transparent blur-3xl opacity-30 dark:opacity-20", item.color)} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  {item.logo}
                </div>
                
                <p className="text-sm text-zinc-500 leading-relaxed flex-1 dark:text-zinc-400 mb-8">
                  "{item.quote}"
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

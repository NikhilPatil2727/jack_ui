"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  rating?: number;
}

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
}

export function Testimonials({
  title = "Accelerating teams worldwide",
  subtitle = "See what developers and tech leaders are building with our autonomous agents.",
  testimonials = [
    {
      quote: "Aether transformed our batch processing pipelines. Tasks that took engineers three days now finish in under ten minutes with zero intervention.",
      author: "Sarah Jenkins",
      role: "VP of Engineering",
      company: "LinearFlow",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
      quote: "The ability to define agent rules in plain Markdown and let it auto-connect to Supabase changed how we build internal microservices.",
      author: "Marcus Chen",
      role: "Lead Architect",
      company: "StripeX",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      quote: "We deployed explainable run traces across our customer support workflow. Transparency is perfect — we audit step reasoning easily.",
      author: "Elena Rostova",
      role: "Head of Support Ops",
      company: "Karta.io",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
  ],
}: TestimonialsProps) {
  return (
    <section id="testimonials" className="bg-zinc-50 dark:bg-zinc-950/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/50 bg-white p-8 shadow-xs dark:border-zinc-800/50 dark:bg-zinc-900/50"
            >
              <div>
                {item.rating && (
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                )}
                <p className="text-zinc-700 italic leading-relaxed dark:text-zinc-300">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                {item.avatarUrl && (
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{item.author}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {item.role}, {item.company}
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

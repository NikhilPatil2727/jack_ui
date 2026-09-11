"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  handle?: string;
  avatar?: string;
  logo?: React.ReactNode;
  color?: string;
}

export interface TestimonialsProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
}

export function Testimonials({
  badge,
  title = "What humans are saying.",
  subtitle,
  testimonials,
}: TestimonialsProps) {

  const defaultTestimonials: TestimonialItem[] = [
    {
      quote: "Scoped spend limits + agent-specific cards feels like the safest path for real autonomous workflows.",
      author: "Strakyo",
      handle: "@Strakyo",
      role: "Operations Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "Giving agents scoped spending power, instead of full card access, is exactly the kind of guardrail this ecosystem needs to scale safely.",
      author: "EvanDataForge",
      handle: "@EvanDataForge",
      role: "CTO",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "Smart approach. The token waste from agents navigating checkout forms was one of those hidden costs nobody talks about.",
      author: "Brian Johnson",
      handle: "@_brian_johnson",
      role: "VP of Growth",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "This platform replaced hours of manual data entry. We now execute complex pipelines significantly faster with 100% accuracy.",
      author: "Sarah Jenkins",
      handle: "@sarah_ops",
      role: "Director of Product",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "The seamless integrations transformed our fragmented tech stack into a unified powerhouse. Truly a game-changer for daily operations.",
      author: "Michael T.",
      handle: "@michaelt_dev",
      role: "Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "The analytics dashboards gave us visibility into workflow bottlenecks we didn't even know existed. Highly recommended.",
      author: "Jessica M.",
      handle: "@jess_data",
      role: "Lead Data Architect",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
  ];

  const items = testimonials || defaultTestimonials;

  // Quadruple items list for seamless continuous infinite marquee loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section id="testimonials" className="py-20 sm:py-28 font-sans bg-transparent relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lastik&display=swap');

        @keyframes marquee-slide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-continuous-marquee {
          animation: marquee-slide 32s linear infinite;
        }

        .animate-continuous-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-continuous-marquee {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center mb-16 sm:mb-20">
          {badge && (
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/80 px-3.5 py-1 text-xs font-medium text-zinc-600 shadow-2xs">
              {badge}
            </div>
          )}
          <h2
            style={{ fontFamily: "'Lastik', serif" }}
            className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-900 leading-[1.15] max-w-2xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-xl leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Marquee Viewport Container with Subtle Edge Fades */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
          <div className="flex w-max space-x-6 animate-continuous-marquee py-2">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.author}-${index}`}
                className="w-[300px] sm:w-[360px] shrink-0 flex flex-col justify-between rounded-[20px] border border-zinc-200/80 bg-white/90 backdrop-blur-xs p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
              >
                {/* Quote Text */}
                <p className="text-[14px] sm:text-[15px] text-zinc-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>

                {/* Author Section at Bottom */}
                <div className="mt-8 pt-4 flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-200/80 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-900 text-white font-semibold text-xs flex items-center justify-center shrink-0">
                      {item.author.charAt(0)}
                    </div>
                  )}

                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-zinc-900 tracking-tight leading-snug">
                      {item.author}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium tracking-tight">
                      {item.handle || item.role || item.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}



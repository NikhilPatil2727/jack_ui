"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { featureImg } from "./image-data";


export interface FeatureItem {
  id?: string;
  title: string;
  description: string;
  className?: string;
  visual?: React.ReactNode;
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
  features,
  ctaText = "Explore Features",
  onCtaClick,
}: FeaturesProps) {
  
  const defaultFeatures: FeatureItem[] = [
    {
      id: "f1",
      title: "",
      description: "",
      className: "md:col-span-3 !bg-transparent !border-none !shadow-none hover:!shadow-none !p-0 overflow-visible",
      visual: (
        <div className="w-full flex items-center justify-center px-4 sm:px-8">
          <div className="relative w-full max-w-5xl rounded-[24px] sm:rounded-[32px] p-[3px] sm:p-[4px] group mx-auto">
            
            {/* Default Subtle Border */}
            <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] border border-zinc-200/40 transition-opacity duration-500 group-hover:opacity-0 z-0"></div>

            {/* Solid Pink Gradient Border (Fades in on hover) - Very Faint */}
            <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-0"></div>

            {/* Glowing Pink Smoke Outer Blurs (Only on hover) - Very Faint */}
            <div className="absolute -inset-[1px] rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-400 blur-md sm:blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0"></div>
            <div className="absolute -inset-[2px] rounded-[24px] sm:rounded-[32px] bg-gradient-to-tr from-fuchsia-300 to-pink-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 animate-pulse z-0"></div>
            
            {/* The Image Container */}
            <div className="relative w-full rounded-[21px] sm:rounded-[28px] overflow-hidden bg-white z-10 shadow-2xl">
               <img src={featureImg} alt="Feature Showcase" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[21px] sm:rounded-[28px] pointer-events-none z-20"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const items = features || defaultFeatures;

  return (
    <section id="features" className="py-24 sm:py-32 font-sans bg-transparent relative overflow-hidden">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-70 z-0" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex rounded-full border border-zinc-200/60 bg-white/60 backdrop-blur-xl px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              {badge}
            </motion.div>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold tracking-tighter text-zinc-900 sm:text-5xl md:text-[3.5rem] dark:text-zinc-50 leading-[1.05]"
          >
            {title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-[17px] text-zinc-500 sm:text-[19px] max-w-[640px] leading-relaxed dark:text-zinc-400 tracking-tight font-medium"
          >
            {subtitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((feature, index) => (
            <motion.div
              key={feature.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={cn(
                "group relative flex flex-col justify-start overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]",
                feature.className
              )}
            >
              {/* Inner subtle glare */}
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none z-20" />
              
              {/* Content */}
              {(feature.title || feature.description) && (
                <div className="relative z-30 p-8 sm:p-10 flex flex-col h-full justify-start max-w-[380px] pointer-events-none">
                  <div>
                    <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 pointer-events-auto">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[16px] text-zinc-500 leading-relaxed dark:text-zinc-400 font-medium tracking-tight pointer-events-auto">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Visual Element */}
              {feature.visual && (
                <div className={cn("z-10", (feature.title || feature.description) ? "absolute inset-0" : "relative w-full")}>
                  {feature.visual}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Centered CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center relative z-20"
        >
          <button
            onClick={onCtaClick}
            className="group relative flex items-center gap-2 transition-all duration-300 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] hover:from-[#363636] hover:to-[#202020] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)]"
          >
            <span className="tracking-wide">{ctaText}</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <ArrowRight className="h-3 w-3 text-white transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

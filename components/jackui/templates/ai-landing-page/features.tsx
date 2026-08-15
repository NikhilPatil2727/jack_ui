"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
      title: "Autonomous Workflows",
      description: "Chain together complex logic with intelligent agents that adapt to dynamic data structures automatically.",
      className: "md:col-span-2 min-h-[360px]",
      visual: (
        <div className="absolute right-0 top-0 w-full md:w-[60%] h-full pointer-events-none flex items-center justify-end overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] bg-purple-400/5 blur-[80px] rounded-full" />
          
          <div className="relative w-full max-w-[340px] h-[240px] translate-x-12 translate-y-12 md:translate-y-0 md:translate-x-4 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-700 ease-out z-10">
            {/* UI Mockup: Workflow Canvas */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-tl-2xl rounded-bl-2xl border border-white/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="h-10 border-b border-zinc-200/50 flex items-center px-4 gap-2 bg-white/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                </div>
              </div>
              {/* Canvas body */}
              <div className="flex-1 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [background-position:-8px_-8px] opacity-70">
                
                {/* Node 1 */}
                <div className="absolute top-6 left-6 px-3 py-2 bg-white rounded-lg shadow-sm border border-zinc-200 flex items-center gap-2 z-10">
                  <div className="w-4 h-4 rounded-[4px] bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-purple-500" />
                  </div>
                  <div className="w-16 h-1.5 bg-zinc-200 rounded-full" />
                </div>
                
                {/* Node 2 */}
                <div className="absolute top-20 left-32 px-3 py-2 bg-white rounded-lg shadow-sm border border-zinc-200 flex items-center gap-2 z-10">
                  <div className="w-4 h-4 rounded-[4px] bg-blue-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-blue-500" />
                  </div>
                  <div className="w-16 h-1.5 bg-zinc-200 rounded-full" />
                </div>
                
                {/* Node 3 */}
                <div className="absolute top-36 left-12 px-3 py-2 bg-white rounded-lg shadow-sm border border-zinc-200 flex items-center gap-2 z-10">
                  <div className="w-4 h-4 rounded-[4px] bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-green-500" />
                  </div>
                  <div className="w-16 h-1.5 bg-zinc-200 rounded-full" />
                </div>

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full z-0" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}>
                  <path d="M 80 40 C 120 40, 100 90, 140 90" stroke="#d4d4d8" strokeWidth="2" fill="none" />
                  <path d="M 140 100 C 120 100, 100 150, 120 150" stroke="#d4d4d8" strokeWidth="2" fill="none" />
                  {/* Animated dot on path */}
                  <circle r="3" fill="#a855f7">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 80 40 C 120 40, 100 90, 140 90" />
                  </circle>
                </svg>

              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "f2",
      title: "Real-time Sync",
      description: "Sub-second data synchronization across all your platforms.",
      className: "md:col-span-1 min-h-[360px]",
      visual: (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent z-10" />
          <div className="absolute -bottom-12 -right-12 z-0">
            <div className="relative w-64 h-64 group-hover:scale-105 transition-transform duration-700">
              {/* Outer ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" stroke="#f4f4f5" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="46" stroke="url(#syncGrad)" strokeWidth="2" fill="none" strokeDasharray="289" strokeDashoffset="289" className="animate-[dash_4s_ease-in-out_infinite]" strokeLinecap="round" />
                <defs>
                  <linearGradient id="syncGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner ring */}
              <svg className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" stroke="#f4f4f5" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="46" stroke="#e4e4e7" strokeWidth="2" fill="none" strokeDasharray="289" strokeDashoffset="0" className="animate-[dash_6s_linear_infinite_reverse]" />
              </svg>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-zinc-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "f3",
      title: "Intelligent Routing",
      description: "Dynamically route tasks to the most capable models.",
      className: "md:col-span-1 min-h-[360px]",
      visual: (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.05),transparent_60%)]" />
          <div className="absolute -bottom-4 -right-4 flex flex-col items-end gap-3 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 ease-out z-0">
            {/* Pill 1 */}
            <div className="w-56 h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-200/80 flex items-center px-4 gap-3 relative overflow-hidden group-hover:w-64 transition-all duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-400" />
              <div className="w-5 h-5 rounded-md bg-zinc-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-fuchsia-500" />
              </div>
              <div className="flex-1 h-2 bg-zinc-200 rounded-full" />
            </div>
            {/* Pill 2 */}
            <div className="w-48 h-12 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-200/60 flex items-center px-4 gap-3 relative overflow-hidden mr-6 group-hover:-translate-x-2 transition-all duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400" />
              <div className="w-5 h-5 rounded-md bg-zinc-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
              </div>
              <div className="flex-1 h-2 bg-zinc-200 rounded-full" />
            </div>
            {/* Pill 3 */}
            <div className="w-52 h-12 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-200/40 flex items-center px-4 gap-3 relative overflow-hidden -mr-8 group-hover:translate-x-2 transition-all duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400" />
              <div className="w-5 h-5 rounded-md bg-zinc-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
              </div>
              <div className="flex-1 h-2 bg-zinc-200 rounded-full" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "f4",
      title: "Enterprise Grade Security",
      description: "Bank-level encryption and SOC2 compliance built in from day one.",
      className: "md:col-span-2 min-h-[360px]",
      visual: (
        <div className="absolute right-0 top-0 w-full md:w-[60%] h-full pointer-events-none flex items-center justify-center md:justify-end md:pr-12">
          {/* Subtle grid bg */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          <div className="relative w-full max-w-[280px] h-[200px] flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="relative w-32 h-32">
               {/* Center Badge */}
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-zinc-200 flex items-center justify-center">
                   <div className="w-5 h-5 border-[2px] border-zinc-800 rounded-md flex items-center justify-center">
                     <div className="w-1 h-1 bg-zinc-800 rounded-sm" />
                   </div>
                 </div>
               </div>
               
               {/* Orbital rings */}
               <div className="absolute inset-0 rounded-full border border-zinc-200/80" />
               <div className="absolute -inset-8 rounded-full border border-zinc-200/40 border-dashed" />
               
               {/* Glowing dots */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
               <div className="absolute bottom-[15%] right-0 translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
               <div className="absolute bottom-[15%] left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const items = features || defaultFeatures;


  return (
    <section id="features" className="py-24 sm:py-32 font-sans bg-transparent relative overflow-hidden">
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
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
                "group relative flex flex-col justify-start overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1",
                feature.className
              )}
            >
              {/* Inner subtle glare */}
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none z-20" />
              
              {/* Content */}
              <div className="relative z-30 p-8 sm:p-10 flex flex-col h-full justify-start max-w-[380px]">

                <div>
                  <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[16px] text-zinc-500 leading-relaxed dark:text-zinc-400 font-medium tracking-tight">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Visual Element */}
              {feature.visual && (
                <div className="absolute inset-0 z-10">
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

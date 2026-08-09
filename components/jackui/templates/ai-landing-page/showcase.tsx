"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Sparkles, Boxes, Layout, Code, Cpu, MonitorPlay } from "lucide-react";

export interface ShowcaseProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export function Showcase({
  badge = "Our Goals",
  title = "What sets our AI apart: Innovation,\nspeed, and versatility.",
  subtitle = "Our embedded widget allows you to engage with our AI directly on this\npage. Chat, brainstorm ideas, or generate code effortlessly.", // force ts refresh
}: ShowcaseProps) {
  return (
    <section id="showcase" className="py-24 sm:py-32">
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

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Tall Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Experience the future of AI with<br />our SmartPrompt
              </h3>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-[300px]">
                Craft better prompts in seconds with ready-made templates for writing, coding, and more
              </p>
            </div>
            
            <div className="relative mt-12 w-full rounded-2xl bg-gradient-to-b from-[#3B82F6] to-[#0A1A2F] p-6 pb-0 overflow-hidden min-h-[350px]">
               {/* Mock Chat Interface */}
               <div className="flex w-full items-start justify-end gap-3 mb-6">
                 <div className="rounded-2xl rounded-tr-sm bg-white/20 backdrop-blur-md px-4 py-3 text-sm text-white max-w-[80%] border border-white/10">
                   Create a 3D illustration of a glowing blue orb floating above a clean white surface.
                 </div>
                 <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                   <User className="h-4 w-4 text-white" />
                 </div>
               </div>
               
               <div className="flex w-full items-start gap-3">
                 <div className="mt-1 shrink-0">
                   <Sparkles className="h-5 w-5 text-blue-200" />
                 </div>
                 <div className="rounded-2xl rounded-tl-sm bg-white/10 backdrop-blur-md border border-white/10 p-4 max-w-[90%]">
                   <p className="text-sm text-blue-50 leading-relaxed">
                     A 3D glowing orb, translucent with soft blue gradients, floating above a white matte surface. Surrounded by subtle ambient light and soft shadows. Minimal, futuristic, clean background, tech-inspired, iridescent edges, high resolution.
                   </p>
                   <div className="mt-4 h-[140px] w-[200px] rounded-xl bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-900 overflow-hidden relative shadow-[inset_0_-10px_20px_rgba(0,0,0,0.4),_0_10px_20px_rgba(0,0,0,0.5)] border-[2px] border-blue-400/30">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent" />
                      {/* Simulating an orb graphic inside the mock image block */}
                      <div className="absolute bottom-[-20%] right-[-20%] h-32 w-32 rounded-full bg-blue-300/30 blur-2xl" />
                      <div className="absolute top-[20%] left-[20%] h-16 w-16 rounded-full bg-white/40 blur-md" />
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-6">
            
            {/* Top Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-gradient-to-b from-blue-50 to-white p-8 shadow-sm dark:from-zinc-900 dark:to-zinc-900"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-900/20" />
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-start gap-4">
                  <div className="flex h-12 w-48 items-center justify-evenly rounded-full bg-[#3B82F6] shadow-lg shadow-blue-500/20">
                     <Boxes className="h-5 w-5 text-white/90" />
                     <Layout className="h-5 w-5 text-white/90" />
                     <Code className="h-5 w-5 text-white/90" />
                     <Cpu className="h-5 w-5 text-white/90" />
                     <MonitorPlay className="h-5 w-5 text-white/90" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Seamless integration with a simple<br />API and powerful SDKs.
                </h3>
                <p className="mt-4 text-sm text-zinc-500 leading-relaxed dark:text-zinc-400">
                  Whether you're building a prototype or scaling a production system, our intuitive API and robust SDKs make it easy to connect, customize, and launch AI-powered features—fast, reliably, and with minimal setup time.
                </p>
              </div>
            </motion.div>

            {/* Bottom Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#0A1A2F] p-8 shadow-sm dark:bg-zinc-950"
            >
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Multimodal capabilities to generate<br />text, images, and code effortlessly.
                  </h3>
                  <p className="mt-4 text-sm text-white/60 leading-relaxed">
                    Empower your workflow with unified AI intelligence—write, design, and build in parallel using one intuitive interface.
                  </p>
                </div>
                <div className="mt-8">
                  <button className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10">
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Zap, Boxes, Layout, Code, Cpu, MonitorPlay } from "lucide-react";

export interface ShowcaseProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export function Showcase({
  badge = "Platform Overview",
  title = "What sets our platform apart:\nScale, precision, and automation.",
  subtitle = "Connect your entire tech stack and streamline operations.\nBuild custom automation pipelines with zero friction.",
}: ShowcaseProps) {
  return (
    <section id="showcase" className="py-24 sm:py-32 font-sans bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          {badge && (
            <div className="mb-6 inline-flex rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-700 shadow-sm">
              {badge}
            </div>
          )}
          <h2 className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50 leading-[1.2]">
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
                Experience frictionless integration with<br />our Workflow Engine
              </h3>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-[300px]">
                Build complex data pipelines in seconds with ready-made templates for CRM, marketing, and sales.
              </p>
            </div>
            
            <div className="relative mt-12 w-full rounded-2xl bg-gradient-to-b from-[#FEF08A] to-[#FBBF24] p-6 pb-0 overflow-hidden min-h-[350px] border border-yellow-300">
               {/* Mock Chat Interface */}
               <div className="flex w-full items-start justify-end gap-3 mb-6">
                 <div className="rounded-2xl rounded-tr-sm bg-white/60 px-4 py-3 text-sm text-zinc-850 max-w-[80%] border border-white/80 shadow-sm">
                   Trigger sequence when new user registers: Add to CRM, send welcome email, and notify sales team.
                 </div>
                 <div className="h-8 w-8 rounded-full bg-white/60 flex items-center justify-center shrink-0 shadow-sm">
                   <User className="h-4 w-4 text-zinc-700" />
                 </div>
               </div>
               
               <div className="flex w-full items-start gap-3">
                 <div className="mt-1 shrink-0">
                   <Zap className="h-5 w-5 text-yellow-700" />
                 </div>
                 <div className="rounded-2xl rounded-tl-sm bg-white/70 border border-white/80 p-4 max-w-[90%] shadow-sm">
                   <p className="text-sm text-zinc-800 leading-relaxed font-medium">
                     Sequence configured. Webhook attached to registration endpoint. Conditional logic applied for enterprise accounts. Ready to deploy.
                   </p>
                   <div className="mt-4 h-[140px] w-[200px] rounded-xl bg-gradient-to-br from-[#FEF9C3] via-[#FEF08A] to-[#F59E0B] overflow-hidden relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_0_10px_20px_rgba(0,0,0,0.05)] border-[2px] border-white/50">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent" />
                      {/* Simulating an orb graphic inside the mock image block */}
                      <div className="absolute bottom-[-20%] right-[-20%] h-32 w-32 rounded-full bg-[#FEF08A]/50 blur-2xl" />
                      <div className="absolute top-[20%] left-[20%] h-16 w-16 rounded-full bg-white/60 blur-md" />
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-gradient-to-b from-[#FEF3C7]/40 to-white p-8 shadow-sm dark:from-zinc-900 dark:to-zinc-900"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDE047]/10 to-transparent dark:from-yellow-900/20" />
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-start gap-4">
                  <div className="flex h-12 w-48 items-center justify-evenly rounded-full bg-[#FBBF24] border border-yellow-300 shadow-md shadow-yellow-200/25">
                     <Boxes className="h-5 w-5 text-zinc-800" />
                     <Layout className="h-5 w-5 text-zinc-800" />
                     <Code className="h-5 w-5 text-zinc-800" />
                     <Cpu className="h-5 w-5 text-zinc-800" />
                     <MonitorPlay className="h-5 w-5 text-zinc-800" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Unify your operations with<br />powerful automation blocks.
                </h3>
                <p className="mt-4 text-sm text-zinc-500 leading-relaxed dark:text-zinc-400">
                  Whether you are a startup or an enterprise, our platform adapts to your data flow. Connect APIs, customize modules, and launch automated features—fast, reliably, and with minimal setup time.
                </p>
              </div>
            </motion.div>

            {/* Bottom Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm dark:bg-zinc-950"
            >
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#FDE047]/15 blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    Advanced analytics to monitor<br />your workflow performance instantly.
                  </h3>
                  <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
                    Empower your team with actionable insights—track data flow, identify bottlenecks, and optimize execution with our intuitive dashboard.
                  </p>
                </div>
                <div className="mt-8">
                  <button className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-yellow-400 bg-[#FBBF24] px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-[#F59E0B] shadow-sm">
                    <span>View Analytics</span>
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

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <section id="showcase" className="py-24 sm:py-32 font-sans bg-transparent relative overflow-hidden">
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
        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Tall Left Card: Workflow Engine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] min-h-[500px]"
          >
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none z-20" />
            
            <div className="relative z-30 p-8 sm:p-10">
              <h3 className="text-[26px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.2]">
                Experience frictionless integration with<br />our Workflow Engine
              </h3>
              <p className="mt-4 text-[16px] text-zinc-500 dark:text-zinc-400 max-w-[340px] leading-relaxed font-medium tracking-tight">
                Build complex data pipelines in seconds with ready-made templates for CRM, marketing, and sales.
              </p>
            </div>
            
            {/* Visual: Realistic Code / Config Editor Mockup */}
            <div className="relative flex-1 w-full flex items-end justify-center px-8 pb-0 pt-8 overflow-hidden z-10">
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/50 to-transparent" />
               <div className="w-full max-w-[400px] h-[260px] bg-zinc-950 rounded-t-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col translate-y-4 group-hover:translate-y-2 transition-transform duration-500 ease-out">
                 {/* MacOS Window Header */}
                 <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-2 bg-zinc-900/50">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-zinc-700" />
                     <div className="w-3 h-3 rounded-full bg-zinc-700" />
                     <div className="w-3 h-3 rounded-full bg-zinc-700" />
                   </div>
                   <div className="ml-auto text-[11px] font-mono text-zinc-500">pipeline.yaml</div>
                 </div>
                 {/* Code Content */}
                 <div className="flex-1 p-5 font-mono text-[13px] leading-relaxed text-zinc-400">
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">1</span>
                      <span><span className="text-fuchsia-400">name</span>: user_registration</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">2</span>
                      <span><span className="text-fuchsia-400">trigger</span>:</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">3</span>
                      <span className="ml-4"><span className="text-fuchsia-400">event</span>: <span className="text-emerald-400">'on_signup'</span></span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">4</span>
                      <span><span className="text-fuchsia-400">actions</span>:</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">5</span>
                      <span className="ml-4">- <span className="text-blue-400">create_record</span>:</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">6</span>
                      <span className="ml-8"><span className="text-fuchsia-400">table</span>: <span className="text-emerald-400">'users'</span></span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">7</span>
                      <span className="ml-4">- <span className="text-blue-400">send_email</span>:</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-zinc-600 select-none">8</span>
                      <span className="ml-8"><span className="text-fuchsia-400">template</span>: <span className="text-emerald-400">'welcome_v2'</span></span>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-6">
            
            {/* Top Right Card: Automation Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] min-h-[280px]"
            >
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none z-20" />
              
              <div className="relative z-30 p-8 sm:p-10 pb-0">
                <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.2]">
                  Unify your operations with<br />powerful automation blocks.
                </h3>
                <p className="mt-3 text-[16px] text-zinc-500 leading-relaxed dark:text-zinc-400 font-medium tracking-tight">
                  Connect APIs, customize modules, and launch automated features—fast and reliably.
                </p>
              </div>

              {/* Visual: Static Grid of UI Components */}
              <div className="relative flex-1 mt-8 w-full px-8 pb-8 flex items-end justify-end">
                <div className="grid grid-cols-2 gap-3 w-[80%] max-w-[280px]">
                  {/* Block 1 */}
                  <div className="col-span-2 bg-white rounded-xl border border-zinc-200/80 shadow-sm p-3 flex items-center gap-3 transition-colors duration-300 group-hover:border-zinc-300">
                    <div className="w-6 h-6 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-sm bg-zinc-800" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-1.5 w-1/2 bg-zinc-200 rounded-full" />
                      <div className="h-1.5 w-1/3 bg-zinc-100 rounded-full" />
                    </div>
                  </div>
                  {/* Block 2 */}
                  <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-3 flex flex-col gap-3 transition-colors duration-300 group-hover:border-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                    </div>
                    <div className="h-1.5 w-2/3 bg-zinc-200 rounded-full" />
                  </div>
                  {/* Block 3 */}
                  <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-sm p-3 flex flex-col gap-3 group-hover:bg-zinc-800 transition-colors duration-300">
                    <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-zinc-400 rounded-sm" />
                    </div>
                    <div className="h-1.5 w-full bg-zinc-700 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Card: Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] min-h-[280px]"
            >
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none z-20" />
              
              <div className="relative z-30 p-8 sm:p-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
                    Advanced analytics to monitor<br />your workflow instantly.
                  </h3>
                  <p className="mt-3 text-[16px] text-zinc-500 leading-relaxed dark:text-zinc-400 font-medium tracking-tight max-w-[90%]">
                    Empower your team with actionable insights—track data flow and identify bottlenecks.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-between items-end">
                  <button className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] px-6 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.2)] transition-all hover:scale-105">
                    <span>View Analytics</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                  
                  {/* Visual: Realistic Bar Chart Mockup */}
                  <div className="flex items-end gap-1.5 h-16 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div initial={{ height: "40%" }} whileInView={{ height: "40%" }} className="w-6 rounded-t-sm bg-zinc-200" />
                    <motion.div initial={{ height: "10%" }} whileInView={{ height: "65%" }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-6 rounded-t-sm bg-zinc-300" />
                    <motion.div initial={{ height: "10%" }} whileInView={{ height: "50%" }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="w-6 rounded-t-sm bg-zinc-300" />
                    <motion.div initial={{ height: "10%" }} whileInView={{ height: "85%" }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="w-6 rounded-t-sm bg-zinc-800" />
                    <motion.div initial={{ height: "10%" }} whileInView={{ height: "100%" }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="w-6 rounded-t-sm bg-zinc-900 relative">
                       {/* Tooltip on hover */}
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                         +24%
                       </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

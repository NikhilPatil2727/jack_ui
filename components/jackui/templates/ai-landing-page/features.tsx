"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Workflow,
  Brain,
  Zap,
  Sparkles,
  Send,
  Database,
  Activity
} from "lucide-react";
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

// ==========================================
// CARD 1: Workflow Builder Split Component
// ==========================================
function WorkflowBuilderSplit() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 items-center h-full w-full">
      {/* Left Panel: Text & Checklist */}
      <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-6">

        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Autonomous Workflows
          </h3>
          <p className="mt-3.5 text-zinc-500 dark:text-zinc-400 font-medium tracking-tight text-[15px] sm:text-[16px] leading-relaxed">
            Construct, deploy, and monitor complex automated pipelines inside a clean, visual editor. Connect your API nodes in minutes with zero friction.
          </p>
        </div>

        {/* Feature List Checklist */}
        <ul className="space-y-3 pt-2">
          {[
            "Visual node-based logic constructor",
            "Real-time event logging and debugging",
            "Universal third-party API webhooks",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 text-sm font-medium">
              <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Showcase Image with Smoke Border GLows */}
      <div className="lg:col-span-7 relative w-full h-full flex items-center justify-center">
        <div className="relative w-full rounded-[20px] p-[2px] group">
          {/* Default Subtle Border */}
          <div className="absolute inset-0 rounded-[20px] border border-zinc-200/40 dark:border-zinc-800/40 transition-opacity duration-500 group-hover:opacity-0 z-0"></div>

          {/* Solid Pink Gradient Border (Fades in on hover) */}
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-0"></div>

          {/* Glowing Pink Smoke Outer Blurs (Only on hover) */}
          <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-400 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0"></div>
          <div className="absolute -inset-[2px] rounded-[20px] bg-gradient-to-tr from-fuchsia-350 to-pink-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 animate-pulse z-0"></div>

          {/* The Image Container */}
          <div className="relative w-full rounded-[18px] overflow-hidden bg-white dark:bg-[#0a0a0a] z-10 shadow-lg">
            <img
              src={featureImg}
              alt="Feature Showcase"
              className="relative z-0 w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Premium Cosmic Smoke Layer A (Clockwise slow rotation) */}
            <div
              className="absolute inset-[-15%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10"
              style={{
                background: "radial-gradient(ellipse 55% 45% at 30% 35%, rgba(244, 63, 94, 0.15) 0%, transparent 60%), radial-gradient(ellipse 45% 55% at 75% 65%, rgba(168, 85, 247, 0.15) 0%, transparent 65%)",
                animation: shouldReduceMotion ? "none" : "jack-inner-smoke-clockwise 20s linear infinite",
              }}
            />

            {/* Premium Cosmic Smoke Layer B (Counter-clockwise slow rotation) */}
            <div
              className="absolute inset-[-15%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10"
              style={{
                background: "radial-gradient(ellipse 65% 45% at 70% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 70%), radial-gradient(ellipse 45% 45% at 25% 70%, rgba(6, 182, 212, 0.12) 0%, transparent 60%)",
                animation: shouldReduceMotion ? "none" : "jack-inner-smoke-counter 24s linear infinite",
              }}
            />

            {/* Premium Moving Glass Highlight / Shimmer sweep on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-[1200ms] translate-y-full group-hover:translate-y-[-100%] pointer-events-none z-15"
            />

            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/30 rounded-[18px] pointer-events-none z-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CARD 2: Rules Engine Node Component
// ==========================================
// Custom Bespoke Geometric Icons (Strict Square Edges)
const GeoSquare = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="9" height="9" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const GeoCircle = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const GeoTriangle = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 3L11.5 10H2.5L7 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
  </svg>
);

interface Rule {
  id: string;
  label: string;
  action: string;
  icon: React.ReactNode;
  color: string;
}

function AIDecisionConsole() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const rules: Rule[] = [
    { id: "r1", label: "type == 'payment'", action: "Ledger DB", icon: <GeoSquare />, color: "text-blue-400" },
    { id: "r2", label: "fraud_score > 90", action: "Flag Account", icon: <GeoTriangle />, color: "text-rose-400" },
    { id: "r3", label: "default_fallback", action: "Log Event", icon: <GeoCircle />, color: "text-zinc-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rules.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [rules.length]);

  return (
    <div className="group flex flex-col h-full w-full p-6 sm:p-8 justify-between space-y-6 relative overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* Header Block */}
      <div className="space-y-2 relative z-20">
        <h3 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          Rules Engine
        </h3>
        <p className="text-sm text-zinc-500 font-medium leading-relaxed tracking-tight max-w-[220px]">
          Evaluate payloads against logical conditions in real-time.
        </p>
      </div>

      {/* Interactive Environment - Strict Square Brutalist Aesthetic */}
      <div className="relative flex-1 w-full bg-[#0a0a0a] border border-zinc-200 dark:border-[#222] p-4 sm:p-5 flex flex-col z-10 shadow-inner overflow-hidden font-mono">
        
        {/* Subtle internal animated glow */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-30"
          animate={shouldReduceMotion ? {} : { background: ["radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)", "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.08) 0%, transparent 60%)", "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Incoming Payload Box */}
        <div className="relative bg-[#111] border border-white/5 p-3 z-20 shadow-md">
          <div className="flex items-center justify-between mb-2">
             <span className="text-xs text-zinc-500">{"// payload.json"}</span>
          </div>
          <div className="text-[11px] text-zinc-400 leading-relaxed">
            <span className="text-purple-400">{"{"}</span><br/>
            &nbsp;&nbsp;<span className="text-blue-400">"type"</span>: <span className="text-amber-300">"payment"</span>,<br/>
            &nbsp;&nbsp;<span className="text-blue-400">"score"</span>: <span className="text-amber-300">{activeIndex === 1 ? '95' : '12'}</span><br/>
            <span className="text-purple-400">{"}"}</span>
          </div>
        </div>

        {/* Layout with Tree SVG on Left, Rules on Right */}
        <div className="flex-1 flex mt-4 relative">
          
          {/* SVG Line Drawing (Tree) */}
          <div className="w-[24px] flex-shrink-0 relative">
             <svg width="24" height="150" className="absolute inset-0 overflow-visible">
                <defs>
                  <linearGradient id="smoke-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="60%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="100%" stopColor="white" />
                  </linearGradient>
                  <mask id="smoke-mask">
                     <motion.rect
                        x="-10" y="-150"
                        width="44" height="150"
                        fill="url(#smoke-gradient)"
                        animate={{ y: [0, 300] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     />
                  </mask>
                </defs>

                {/* Base faint tracks */}
                <path d="M 12 0 L 12 21 L 24 21" fill="none" className="stroke-zinc-800" strokeWidth="1.5" strokeLinejoin="miter" />
                <path d="M 12 0 L 12 71 L 24 71" fill="none" className="stroke-zinc-800" strokeWidth="1.5" strokeLinejoin="miter" />
                <path d="M 12 0 L 12 121 L 24 121" fill="none" className="stroke-zinc-800" strokeWidth="1.5" strokeLinejoin="miter" />
                
                {/* Animated active path (Core drawn line) */}
                {!shouldReduceMotion && (
                   <motion.path 
                     d={
                       activeIndex === 0 ? "M 12 0 L 12 21 L 24 21" :
                       activeIndex === 1 ? "M 12 0 L 12 71 L 24 71" :
                       "M 12 0 L 12 121 L 24 121"
                     }
                     fill="none" 
                     className="stroke-zinc-500"
                     strokeWidth="1.5"
                     strokeLinejoin="miter"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                     key={`tree-core-${activeIndex}`}
                   />
                )}

                {/* Flowing Smoke / Energy Beam Effect */}
                {!shouldReduceMotion && (
                   <motion.path 
                     d={
                       activeIndex === 0 ? "M 12 0 L 12 21 L 24 21" :
                       activeIndex === 1 ? "M 12 0 L 12 71 L 24 71" :
                       "M 12 0 L 12 121 L 24 121"
                     }
                     fill="none" 
                     className="stroke-white"
                     strokeWidth="2"
                     strokeLinejoin="miter"
                     filter="blur(1px)"
                     mask="url(#smoke-mask)"
                     key={`tree-smoke-${activeIndex}`}
                   />
                )}
             </svg>
          </div>

          {/* Rules List demonstrating layout animations and spring physics */}
          <LayoutGroup>
            <div className="flex-1 flex flex-col gap-2 z-20">
              {rules.map((rule, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    layout
                    key={rule.id}
                    initial={false}
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1 : 0.98
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={cn(
                      "flex items-center justify-between p-2.5 h-[42px] border overflow-hidden transition-colors duration-500",
                      isActive 
                        ? "bg-white/5 border-white/10" 
                        : "bg-transparent border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-1 bg-[#111] border border-white/5 transition-colors duration-500", rule.color)}>
                        {rule.icon}
                      </div>
                      <span className="text-[11px] text-zinc-300 tracking-tight transition-colors duration-500">
                        {rule.label}
                      </span>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {isActive && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
                          className="bg-white/10 px-2 py-1 border border-white/10 shadow-none"
                        >
                          <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-100">
                            {rule.action}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </LayoutGroup>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// CARD 3: SVG Node Pipeline Component
// ==========================================
function OrchestrationPipeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="group flex flex-col h-full w-full p-6 sm:p-8 justify-between space-y-6 relative overflow-hidden bg-[#050505] transition-all duration-500">

      {/* Background Dots Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={shouldReduceMotion ? {} : { opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header Block */}
      <div className="space-y-2 relative z-20">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug">
          Real-time Orchestration
        </h3>
        <p className="text-sm text-zinc-400 font-medium leading-relaxed tracking-tight">
          Trace data transmission between endpoints with dynamic visual routing and state verification.
        </p>
      </div>

      {/* Interactive Environment */}
      <div className="relative flex-1 min-h-[220px] w-full flex items-center justify-center p-4 mt-4 z-10">

        {/* Glows */}
        <motion.div
          className="absolute right-[15%] top-[10%] w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-blue-500/20 group-hover:scale-110"
          animate={shouldReduceMotion ? {} : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[15%] bottom-[10%] w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-orange-500/20 group-hover:scale-110"
          animate={shouldReduceMotion ? {} : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Outer connecting network paths */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <svg className="w-full h-full max-w-[500px]" viewBox="0 0 500 250">
            {/* Minimal circuit lines extending outwards */}
            <path d="M 250 125 L 100 125 L 100 50 L 20 50" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <motion.path
              d="M 250 125 L 100 125 L 100 50 L 20 50" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeDasharray="20 400"
              initial={shouldReduceMotion ? {} : { strokeDashoffset: 420 }} animate={shouldReduceMotion ? {} : { strokeDashoffset: -420 }} transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />

            <path d="M 250 125 L 400 125 L 400 200 L 480 200" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <motion.path
              d="M 250 125 L 400 125 L 400 200 L 480 200" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeDasharray="20 400"
              initial={shouldReduceMotion ? {} : { strokeDashoffset: -420 }} animate={shouldReduceMotion ? {} : { strokeDashoffset: 420 }} transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1.2 }}
            />

            <path d="M 250 125 L 350 125 L 350 40 L 450 40" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <motion.path
              d="M 250 125 L 350 125 L 350 40 L 450 40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeDasharray="20 400"
              initial={shouldReduceMotion ? {} : { strokeDashoffset: 420 }} animate={shouldReduceMotion ? {} : { strokeDashoffset: -420 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 2.5 }}
            />

            <path d="M 250 125 L 150 125 L 150 200 L 50 200" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <motion.path
              d="M 250 125 L 150 125 L 150 200 L 50 200" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeDasharray="20 400"
              initial={shouldReduceMotion ? {} : { strokeDashoffset: -420 }} animate={shouldReduceMotion ? {} : { strokeDashoffset: 420 }} transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 3.1 }}
            />
          </svg>
        </div>

        {/* Center Card */}
        <motion.div
          className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] z-20 group-hover:brightness-110"
          animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />

          {/* SVG Centerpiece Container */}
          <motion.div
            animate={shouldReduceMotion ? {} : { scale: [1, 1.015, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative transition-transform duration-500 group-hover:scale-[1.02]"
          >
            {/* SVG Drawing Layer - Existing SVG Unchanged except color adaptions for dark mode */}
            {/* SVG Drawing Layer - Existing SVG Unchanged except color adaptions for dark mode */}
            <svg className="w-full max-w-[420px] h-[140px] z-10 overflow-visible" viewBox="0 0 400 140">
              <defs>
                <linearGradient id="smoke-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="smoke-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="smoke-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>

                <linearGradient id="mask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="black" />
                  <stop offset="70%" stopColor="white" />
                  <stop offset="100%" stopColor="black" />
                </linearGradient>

                <mask id="sweep-mask-1">
                  <motion.rect
                    y="-50" height="240" width="180"
                    fill="url(#mask-grad)"
                    animate={shouldReduceMotion ? { x: 150 } : { x: [-180, 450] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                </mask>
                <mask id="sweep-mask-2">
                  <motion.rect
                    y="-50" height="240" width="180"
                    fill="url(#mask-grad)"
                    animate={shouldReduceMotion ? { x: 150 } : { x: [-180, 450] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 1.25 }}
                  />
                </mask>

                <filter id="smoke-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                </filter>
              </defs>

              {/* Connector Paths (Background Lines) */}
              <path d="M 50 70 L 150 70" className="stroke-zinc-800/80" strokeWidth="2.5" fill="none" />
              <path d="M 210 70 C 250 70, 250 35, 290 35" className="stroke-zinc-800/80" strokeWidth="2.5" fill="none" />
              <path d="M 210 70 C 250 70, 250 105, 290 105" className="stroke-zinc-800/80" strokeWidth="2.5" fill="none" />

              {/* Masked Sweeping Energy - Pulse 1 */}
              <g mask="url(#sweep-mask-1)">
                {/* Smoke Trails */}
                <path d="M 50 70 L 150 70" stroke="url(#smoke-grad-1)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#smoke-blur)" />
                <path d="M 210 70 C 250 70, 250 35, 290 35" stroke="url(#smoke-grad-2)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#smoke-blur)" />
                <path d="M 210 70 C 250 70, 250 105, 290 105" stroke="url(#smoke-grad-3)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#smoke-blur)" />
                {/* Sharp Cores */}
                <path d="M 50 70 L 150 70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 210 70 C 250 70, 250 35, 290 35" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 210 70 C 250 70, 250 105, 290 105" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>

              {/* Masked Sweeping Energy - Pulse 2 */}
              <g mask="url(#sweep-mask-2)">
                {/* Smoke Trails */}
                <path d="M 50 70 L 150 70" stroke="url(#smoke-grad-1)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#smoke-blur)" />
                <path d="M 210 70 C 250 70, 250 35, 290 35" stroke="url(#smoke-grad-2)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#smoke-blur)" />
                <path d="M 210 70 C 250 70, 250 105, 290 105" stroke="url(#smoke-grad-3)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#smoke-blur)" />
                {/* Sharp Cores */}
                <path d="M 50 70 L 150 70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 210 70 C 250 70, 250 35, 290 35" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 210 70 C 250 70, 250 105, 290 105" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>

              {/* Node 1: Webhook Trigger (A) */}
              <g transform="translate(50, 70)">
                <circle r="22" className="fill-zinc-950 stroke-zinc-850" strokeWidth="2.5" />
                <circle r="15" className="fill-zinc-900" />
                <foreignObject x="-8" y="-8" width="16" height="16">
                  <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-zinc-50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </foreignObject>
                <text x="0" y="36" textAnchor="middle" className="text-[9px] font-sans font-bold fill-zinc-400 tracking-wider">GITHUB</text>
              </g>

              {/* Node 2: AI Routing Logic (B) */}
              <g transform="translate(180, 70)">
                <circle r="26" className="fill-zinc-950 stroke-zinc-850" strokeWidth="2.5" />
                <circle r="19" className="fill-zinc-900" />
                <foreignObject x="-10" y="-10" width="20" height="20">
                  <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-zinc-50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                  </svg>
                </foreignObject>
                <text x="0" y="40" textAnchor="middle" className="text-[9px] font-sans font-bold fill-zinc-400 tracking-wider">OPENAI</text>
              </g>

              {/* Node 3: Slack Alert (C) */}
              <g transform="translate(310, 35)">
                <circle r="20" className="fill-zinc-950 stroke-zinc-850" strokeWidth="2.5" />
                <circle r="13" className="fill-zinc-900" />
                <foreignObject x="-9" y="-9" width="18" height="18">
                  <svg viewBox="0 0 127 127" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
                    <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
                    <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D" />
                    <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E" />
                  </svg>
                </foreignObject>
                <text x="30" y="3" textAnchor="start" className="text-[9px] font-sans font-bold fill-zinc-400 tracking-wider">SLACK</text>
              </g>

              {/* Node 4: DB Update (D) */}
              <g transform="translate(310, 105)">
                <circle r="20" className="fill-zinc-950 stroke-zinc-850" strokeWidth="2.5" />
                <circle r="13" className="fill-emerald-950/20" />
                <foreignObject x="-7" y="-7" width="14" height="14">
                  <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-[#3ECF8E]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
                  </svg>
                </foreignObject>
                <text x="30" y="3" textAnchor="start" className="text-[9px] font-sans font-bold fill-zinc-400 tracking-wider">SUPABASE</text>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN FEATURES COMPONENT
// ==========================================
export function Features({

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
      className: "md:col-span-3 bg-white/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-white/40 p-0 overflow-hidden",
      visual: <WorkflowBuilderSplit />
    },
    {
      id: "f2",
      title: "",
      description: "",
      className: "md:col-span-1 bg-white/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-white/40 p-0 overflow-hidden",
      visual: <AIDecisionConsole />
    },
    {
      id: "f3",
      title: "",
      description: "",
      className: "md:col-span-2 bg-white/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-white/40 p-0 overflow-hidden",
      visual: <OrchestrationPipeline />
    }
  ];

  const items = features || defaultFeatures;

  return (
    <section id="features" className="py-24 sm:py-32 font-sans bg-transparent dark:bg-black relative overflow-hidden">
      {/* Custom keyframes for premium inner cosmic smoke hover effect */}
      <style>{`
        @keyframes jack-inner-smoke-clockwise {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes jack-inner-smoke-counter {
          0% { transform: rotate(360deg) scale(1.04); }
          50% { transform: rotate(180deg) scale(0.96); }
          100% { transform: rotate(0deg) scale(1.04); }
        }
        :root {
          --grid-color: rgba(24, 24, 27, 0.06);
        }
        .dark {
          --grid-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Premium Grid Background */}
      <div
        className="absolute inset-0 bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-100 z-0"
        style={{
          backgroundImage: "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)"
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">

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
                "group relative flex flex-col justify-start overflow-hidden rounded-[2rem] bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]",
                feature.className
              )}
            >
              {/* Inner subtle glare */}
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] pointer-events-none z-20" />

              {/* Content (Title & Description overlays if passed custom) */}
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
                <div className={cn("z-10 h-full w-full", (feature.title || feature.description) ? "absolute inset-0" : "relative w-full")}>
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
            className="group relative flex items-center gap-2 transition-all duration-300 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 border border-[#0f0f0f] bg-gradient-to-b from-[#2d2d2d] to-[#171717] hover:from-[#363636] hover:to-[#202020] dark:border-[#2d2d2d] dark:from-[#1f1f1f] dark:to-[#0f0f0f] dark:hover:from-[#2e2e2e] dark:hover:to-[#171717] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)] cursor-pointer"
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

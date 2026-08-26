"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 w-fit">

          <span>Workflow Core</span>
        </div>
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
// CARD 2: Interactive AI Console Component
// ==========================================
interface ConsoleItem {
  prompt: string;
  category: string;
  action: string;
  confidence: string;
  status: "success" | "warning" | "info";
}

function AIDecisionConsole() {
  const shouldReduceMotion = useReducedMotion();

  const consoleData: ConsoleItem[] = [
    {
      prompt: "If customer sentiment is negative, escalate directly to premium support.",
      category: "Sentiment / Escalation",
      action: "Route to Tier-2 Agent",
      confidence: "99.4%",
      status: "warning",
    },
    {
      prompt: "Analyze billing webhook and sync updated record to PostgreSQL database.",
      category: "Integrations / DB Sync",
      action: "Query Stripe API & Update PG",
      confidence: "98.7%",
      status: "success",
    },
    {
      prompt: "Alert Slack Dev Channel if server health check yields 500 error code.",
      category: "Ops / Alerts",
      action: "Trigger Slack & PagerDuty",
      confidence: "99.9%",
      status: "info",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");

  // Cycle prompt every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % consoleData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Simple typewriter effect for the active prompt
  useEffect(() => {
    const fullText = consoleData[activeIndex].prompt;
    setTypedPrompt("");

    if (shouldReduceMotion) {
      setTypedPrompt(fullText);
      return;
    }

    let currentText = "";
    let i = 0;
    let isMounted = true;

    const type = () => {
      if (i < fullText.length && isMounted) {
        currentText += fullText.charAt(i);
        setTypedPrompt(currentText);
        i++;
        setTimeout(type, 20);
      }
    };
    type();

    return () => {
      isMounted = false;
    };
  }, [activeIndex, shouldReduceMotion]);

  const currentItem = consoleData[activeIndex];

  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-8 justify-between space-y-6">
      {/* Title Block */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1  bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 w-fit">

          <span>Decision Node</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug">
          AI Decision Nodes
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed tracking-tight">
          Evaluate natural language conditions and route workflows dynamically using semantic understanding.
        </p>
      </div>

      {/* Simulated Console Window */}
      <div className="relative flex-1 min-h-[190px] bg-zinc-950 border border-zinc-800 dark:border-zinc-800/80 rounded-xl p-4 font-mono text-[11px] text-zinc-300 shadow-2xl overflow-hidden flex flex-col justify-between">
        {/* Console Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/60" />
          </div>
          <span className="text-[10px] text-zinc-500 tracking-wider">model: aether-flash</span>
        </div>

        {/* Console Body */}
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Input Block */}
          <div className="space-y-1">
            <div className="text-zinc-500 flex items-center justify-between">
              <span>cond_prompt.txt</span>
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-1 rounded text-purple-400 font-semibold uppercase">input</span>
            </div>
            <p className="text-zinc-200 min-h-[38px] font-sans text-xs tracking-tight leading-relaxed">
              "{typedPrompt}"
              <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-0.5 animate-pulse" />
            </p>
          </div>

          {/* Analyzing loading state / result */}
          <div className="space-y-2 pt-2 border-t border-zinc-900">
            <div className="text-zinc-500 flex items-center justify-between">
              <span>decision_output</span>
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-1 rounded text-emerald-400 font-semibold uppercase">output</span>
            </div>

            <div className="space-y-1.5 font-sans">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Class:</span>
                <span className="text-zinc-100 font-semibold text-[11px] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-850">
                  {currentItem.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Action:</span>
                <span className="text-zinc-100 font-semibold text-[11px]">
                  {currentItem.action}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Confidence:</span>
                <span className="text-emerald-400 font-mono font-bold text-[11px]">
                  {currentItem.confidence}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Tab Selectors */}
        <div className="flex gap-2.5 pt-3 border-t border-zinc-900 mt-3 justify-center">
          {consoleData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                activeIndex === index
                  ? "bg-purple-500 scale-125 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  : "bg-zinc-700 hover:bg-zinc-500"
              )}
              aria-label={`Show prompt example ${index + 1}`}
            />
          ))}
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
    <div className="flex flex-col h-full w-full p-6 sm:p-8 justify-between space-y-6">
      {/* Header Block */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 w-fit">

          <span>Real-time Flow</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug">
          Real-time Orchestration
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed tracking-tight">
          Trace data transmission between endpoints with dynamic visual routing and state verification.
        </p>
      </div>

      {/* Interactive Node Graph */}
      <div className="relative flex-1 min-h-[190px] w-full rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 overflow-hidden flex items-center justify-center p-4">
        {/* Lines Background in Graph container */}
        <div
          className="absolute inset-0 bg-[size:100%_0.5rem] text-zinc-200/30 dark:text-white/10 z-0"
          style={{
            backgroundImage: "linear-gradient(to bottom, currentColor 1px, transparent 1px)"
          }}
        />

        {/* SVG Drawing Layer */}
        <svg className="w-full max-w-[420px] h-[140px] z-10 overflow-visible" viewBox="0 0 400 140">
          <defs>
            <linearGradient id="gradient-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="15%" stopColor="#fbbf24" />
              <stop offset="30%" stopColor="#a3e635" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#818cf8" />
              <stop offset="85%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#D8B4FE" stopOpacity="1" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#93C5FD" stopOpacity="1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Connector Paths (Background Lines) */}
          <path
            d="M 50 70 L 150 70"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 210 70 C 250 70, 250 35, 290 35"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 210 70 C 250 70, 250 105, 290 105"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Animated Glowing Pulses */}
          <motion.path
            d="M 50 70 L 150 70"
            stroke="url(#gradient-rainbow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="30 100"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -130] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "linear"
            }}
          />
          <motion.path
            d="M 210 70 C 250 70, 250 35, 290 35"
            stroke="url(#gradient-rainbow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="25 80"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -105] }}
            transition={{
              repeat: Infinity,
              duration: 2.0,
              delay: 0.6,
              ease: "linear"
            }}
          />
          <motion.path
            d="M 210 70 C 250 70, 250 105, 290 105"
            stroke="url(#gradient-rainbow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="25 80"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -105] }}
            transition={{
              repeat: Infinity,
              duration: 2.0,
              delay: 0.8,
              ease: "linear"
            }}
          />

          {/* Node 1: Webhook Trigger (A) */}
          <g transform="translate(50, 70)">
            <circle r="22" className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-850" strokeWidth="2.5" />
            <circle r="15" className="fill-zinc-50 dark:fill-zinc-900" />
            <foreignObject x="-8" y="-8" width="16" height="16">
              <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-zinc-900 dark:fill-zinc-50" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </foreignObject>
            <text x="0" y="36" textAnchor="middle" className="text-[9px] font-sans font-bold fill-zinc-500 dark:fill-zinc-400 tracking-wider">GITHUB</text>
          </g>

          {/* Node 2: AI Routing Logic (B) */}
          <g transform="translate(180, 70)">
            <circle r="26" className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-850" strokeWidth="2.5" />
            <circle r="19" className="fill-zinc-50 dark:fill-zinc-900" />
            <foreignObject x="-10" y="-10" width="20" height="20">
              <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-zinc-900 dark:fill-zinc-50" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
              </svg>
            </foreignObject>
            <text x="0" y="40" textAnchor="middle" className="text-[9px] font-sans font-bold fill-zinc-500 dark:fill-zinc-400 tracking-wider">OPENAI</text>
          </g>

          {/* Node 3: Slack Alert (C) */}
          <g transform="translate(310, 35)">
            <circle r="20" className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-850" strokeWidth="2.5" />
            <circle r="13" className="fill-zinc-50 dark:fill-zinc-900" />
            <foreignObject x="-9" y="-9" width="18" height="18">
              <svg viewBox="0 0 127 127" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
                <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
                <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D" />
                <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E" />
              </svg>
            </foreignObject>
            <text x="30" y="3" textAnchor="start" className="text-[9px] font-sans font-bold fill-zinc-500 dark:fill-zinc-400 tracking-wider">SLACK</text>
          </g>

          {/* Node 4: DB Update (D) */}
          <g transform="translate(310, 105)">
            <circle r="20" className="fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-850" strokeWidth="2.5" />
            <circle r="13" className="fill-emerald-50 dark:fill-emerald-950/20" />
            <foreignObject x="-7" y="-7" width="14" height="14">
              <svg role="img" viewBox="0 0 24 24" className="w-full h-full fill-[#3ECF8E]" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
              </svg>
            </foreignObject>
            <text x="30" y="3" textAnchor="start" className="text-[9px] font-sans font-bold fill-zinc-500 dark:fill-zinc-400 tracking-wider">SUPABASE</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// MAIN FEATURES COMPONENT
// ==========================================
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
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex rounded-full border border-zinc-200/60 bg-white/60 dark:bg-zinc-900/60 dark:border-zinc-800/60 dark:text-zinc-300 backdrop-blur-xl px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
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

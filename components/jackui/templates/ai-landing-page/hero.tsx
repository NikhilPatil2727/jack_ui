"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import { Workflow, Database, BarChart3, Zap, MoreHorizontal } from "lucide-react";
import { Schibsted_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { GlassInput } from "./glass-input";
import { Navbar } from "./navbar";

const schibstedFont = Schibsted_Grotesk({
  subsets: ["latin"],
});

const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

export interface HeroProps {
  hideNavbar?: boolean;
  badgeText?: string;
  titlePart1?: string;
  titlePart2?: string;
  chips?: { icon: React.ReactNode; label: string }[];
  placeholder?: string;
  logoText?: string;
  logos?: { name: string; icon: React.ReactNode }[];
  heroImageSrc?: string;
  heroImageAlt?: string;
}

export function Hero({
  hideNavbar = false,
  titlePart1 = "Scale",
  titlePart2 = "automate\nwith intelligent logic.",
  chips = [
    { icon: <Workflow className="h-4 w-4" />, label: "Workflows" },
    { icon: <Database className="h-4 w-4" />, label: "Data" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Insights" },
    { icon: <Zap className="h-4 w-4" />, label: "Automation" },
    { icon: <MoreHorizontal className="h-4 w-4" />, label: "More" },
  ],
  placeholder = "Define your workflow...",
  heroImageSrc = "https://ik.imagekit.io/7k3exsyaa/heroSection.png",
  heroImageAlt = "AI Workspace Dashboard Preview",
}: HeroProps) {
  const fullTitle = `${titlePart1} ${titlePart2}`;
  const titleLines = fullTitle.split("\n");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lastik&display=swap');
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.05); }
          66% { transform: translate(20px, -20px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>

      <div className="relative w-full min-h-[98vh] rounded-b-[32px] overflow-hidden bg-transparent flex flex-col font-sans">

        {/* Background Mesh Gradients, Background Image & Ribbon */}
        <div className="absolute inset-0 z-0 rounded-b-[32px] overflow-hidden pointer-events-none">
          {/* Hero Background Image */}
          {heroImageSrc && (
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                className="w-full h-full object-cover object-center opacity-100"
              />
            </div>
          )}

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />
        </div>

        {/* Navbar */}
        {!hideNavbar && <Navbar />}

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-24 sm:pt-28 mb-4">

          {/* Headline with Word-by-Word Reveal */}
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            style={{ fontFamily: "'Lastik', serif" }}
            className="text-center mb-8 pb-20 text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight leading-[1.05] max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] font-normal"
          >
            {titleLines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {line.split(" ").map((word, wordIdx) => (
                  <motion.span
                    key={`${lineIdx}-${wordIdx}`}
                    variants={titleWordVariants}
                    className="inline-block mr-[0.25em] text-white"
                  >
                    {word}
                  </motion.span>
                ))}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={cn(
              schibstedFont.className,
              "mt-4 text-center text-white/90 text-[15px] sm:text-[17px] max-w-lg font-medium tracking-tight leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
            )}
          >
            The easiest way to build, deploy, and manage your autonomous agents. No complex coding required.
          </motion.p>

          {/* Glass Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative w-full max-w-[720px] mt-5 sm:mt-8 px-4 sm:px-0"
          >
            <div className="relative z-10 drop-shadow-2xl">
              <GlassInput
                placeholder={placeholder}
                onSubmit={(val) => console.log("Submitted:", val)}
                showFilters={false}
              />
            </div>
          </motion.div>

        </div>

        {/* Trust / Logo Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 w-full pb-4 sm:pb-6 flex flex-col items-center mt-auto px-4"
        >

        </motion.div>

      </div>
    </>
  );
}


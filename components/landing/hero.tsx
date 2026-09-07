"use client";

import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrowseComponentsButton } from "../ui/browse-button";
import { BrowseBlocksButton } from "../ui/browse-blocks";
import Features from "./feature-block";
import { useState, useRef } from "react";

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [opacity, setOpacity] = useState(0);

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    setOpacity(1);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    setOpacity(0);
  }

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, var(--cursor-glow-color), transparent 80%)`;

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center group/hero"
    >
      {/* Faint Sky Blue cursor glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{ background, opacity }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl min-h-screen flex flex-col items-center justify-center gap-8 px-4 sm:px-6 py-16 text-center">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          className="font-geist text-5xl sm:text-6xl md:text-[72px] lg:text-[72px] font-bold tracking-tight leading-[1.12] cursor-default flex flex-col items-center justify-center gap-y-1 md:gap-y-2"
          style={{ perspective: 1000 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2">
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{
                rotateY: 8,
                translateZ: 15,
                scale: 1.03,
                transition: { type: "spring", stiffness: 220, damping: 14 },
              }}
              className="font-geist font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 transition-all duration-300 inline-block origin-center cursor-pointer select-none"
            >
              Interactive
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="font-geist tracking-tight text-zinc-500 dark:text-zinc-400 inline-block origin-center px-2 relative cursor-pointer select-none align-middle"
            >
              by design,
            </motion.span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2">
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{
                rotateY: -8,
                translateZ: 15,
                scale: 1.03,
                transition: { type: "spring", stiffness: 220, damping: 14 },
              }}
              className="font-geist font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 transition-all duration-300 inline-block origin-center cursor-pointer select-none"
            >
              premium
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="font-geist tracking-tight text-zinc-500 dark:text-zinc-400 inline-block origin-center px-2 relative cursor-pointer select-none align-middle"
            >
              by default.
            </motion.span>
          </div>
        </motion.h1>

        <p className="mt-2 text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
          A curated collection of{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            100+ premium UI components
          </span>{" "}
          crafted with{" "}
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
            Tailwind CSS
          </span>{" "}
          and{" "}
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
            shadcn/ui
          </span>{" "}
          for modern React and Next.js applications.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
      >
        <BrowseComponentsButton />
        <BrowseBlocksButton />
      </motion.div>

      {/* Features row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full"
      >
        <Features />
      </motion.div>
    </div>
    </div>
  );
}

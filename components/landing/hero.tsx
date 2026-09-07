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
      <div className="flex flex-col items-center gap-4">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08, // 80ms delay per word (0ms, 80ms, 160ms, 240ms...)
              },
            },
          }}
          className="font-geist text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.12] cursor-default flex flex-col items-center justify-center gap-y-1 md:gap-y-2"
          style={{ perspective: 1000 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{
                rotateY: 8,
                translateZ: 15,
                scale: 1.03,
                transition: { type: "spring", stiffness: 220, damping: 14 },
              }}
              className="font-geist font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 inline-block origin-center cursor-pointer select-none"
            >
              Interactive
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-geist tracking-tight text-zinc-500 dark:text-zinc-400 inline-block origin-center cursor-pointer select-none align-middle"
            >
              by
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-geist tracking-tight text-zinc-500 dark:text-zinc-400 inline-block origin-center cursor-pointer select-none align-middle"
            >
              design,
            </motion.span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{
                rotateY: -8,
                translateZ: 15,
                scale: 1.03,
                transition: { type: "spring", stiffness: 220, damping: 14 },
              }}
              className="font-geist font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(110deg,#27272a_0%,#27272a_42%,#ffffff_50%,#27272a_58%,#27272a_100%)] dark:bg-[linear-gradient(110deg,#f4f4f5_0%,#f4f4f5_42%,#ffffff_50%,#a1a1aa_58%,#f4f4f5_100%)] animate-premium-sweep inline-block origin-center cursor-pointer select-none"
            >
              premium
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-geist tracking-tight text-zinc-500 dark:text-zinc-400 inline-block origin-center cursor-pointer select-none align-middle"
            >
              by
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-geist tracking-tight text-zinc-500 dark:text-zinc-400 inline-block origin-center cursor-pointer select-none align-middle"
            >
              default.
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
        </p>
      </div>

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

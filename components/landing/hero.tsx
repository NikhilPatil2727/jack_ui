"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrowseComponentsButton } from "../ui/browse-button";
import { BrowseBlocksButton } from "../ui/browse-blocks";
import Features from "./feature-block";

export default function HeroSection() {
  return (
    <div className="mx-auto w-full max-w-5xl min-h-screen flex flex-col items-center justify-center gap-8 px-4 sm:px-6 py-16 text-center">
      {/* Announcement badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/changelog"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-200/50 dark:border-zinc-700/50 px-3.5 py-1 text-sm text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Changelog — v1.0.0</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

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
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] cursor-default"
          style={{ perspective: 1000 }}
        >
          <motion.span
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                filter:
                  "blur(8px) drop-shadow(0px 0px 0px rgba(250, 204, 21, 0))",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter:
                  "blur(0px) drop-shadow(0px 0px 0px rgba(250, 204, 21, 0))",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{
              rotateY: 5,
              translateZ: 10,
              scale: 1.01,
              // Premium yellow drop shadow
              filter:
                "blur(0px) drop-shadow(0px 8px 16px rgba(255, 400, 0, 0.6))",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 inline-block origin-center"
          >
            Interactive
          </motion.span>

          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{
              opacity: 0.8,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="text-zinc-400 dark:text-zinc-600 font-normal inline-block"
          >
            &nbsp;by design,
          </motion.span>
          <br />

          <motion.span
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                filter:
                  "blur(8px) drop-shadow(0px 0px 0px rgba(250, 204, 21, 0))",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter:
                  "blur(0px) drop-shadow(0px 0px 0px rgba(250, 204, 21, 0))",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{
              rotateY: 5,
              translateZ: 10,
              scale: 1.01,
              // Premium yellow drop shadow
              filter:
                "blur(0px) drop-shadow(0px 8px 16px rgba(255, 400, 0, 0.6))",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 inline-block origin-center"
          >
            premium
          </motion.span>

          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{
              opacity: 0.8,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="text-zinc-400 dark:text-zinc-600 font-normal inline-block"
          >
            &nbsp;by default.
          </motion.span>
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
        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
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
  );
}

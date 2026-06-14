"use client";

import { Link } from "next-view-transitions";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

export function BrowseComponentsButton() {
  return (
    <Link
      href="/docs"
      className="group flex items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.45,
            ease: "easeOut",
          },
        }}
        whileHover={{
          x: 4,
          transition: {
            duration: 0.2,
          },
        }}
      >
        <Button
          className={cn(
            // Layout
            "relative h-12 min-w-72 overflow-hidden rounded-2xl px-6 md:min-w-56",

            // Flex
            "inline-flex items-center justify-center gap-3",

            // Base colors
            "bg-black text-white",
            "dark:bg-white dark:text-black",

            // Border
            "border border-white/10 dark:border-black/10",

            // Modern lime glow
            "shadow-[0_10px_30px_-10px_rgba(132,204,22,0.45),0_0_25px_-5px_rgba(190,242,100,0.25)]",

            // Hover glow
            "hover:shadow-[0_18px_40px_-12px_rgba(132,204,22,0.65),0_0_40px_-4px_rgba(190,242,100,0.45)]",

            // Hover scale
            "hover:scale-[1.015]",

            // Smooth transition
            "transition-all duration-300 ease-out",

            // Blur effect
            "backdrop-blur-xl"
          )}
        >
          {/* Glow layer */}
          <div
            className={cn(
              "absolute inset-0 opacity-0",
              "bg-[radial-gradient(circle_at_top,rgba(190,242,100,0.18),transparent_70%)]",
              "transition-opacity duration-300",
              "group-hover:opacity-100"
            )}
          />

          {/* Text */}
          <span className="relative z-10 font-medium tracking-tight">
            Browse Components
          </span>

          {/* Icon */}
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowDownRight className="h-5 w-5 rotate-[270deg]" />
          </motion.div>
        </Button>
      </motion.div>
    </Link>
  );
}
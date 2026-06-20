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
      >
        <Button
          className={cn(
            "relative h-12 min-w-72 overflow-hidden rounded-2xl px-6 md:min-w-56",
            "inline-flex items-center justify-center gap-3",
            "bg-zinc-900 text-white",
            "dark:bg-white dark:text-zinc-900",
            "border border-white/15 dark:border-zinc-900/15",
            "shadow-lg shadow-zinc-900/10",
            "hover:shadow-xl hover:shadow-zinc-900/15 hover:-translate-y-0.5",
            "transition-all duration-300 ease-out",
            "backdrop-blur-xl"
          )}
        >
          {/* Top edge highlight */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-zinc-900/20",
              "opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100"
            )}
          />

          {/* Subtle glow layer */}
          <div
            className={cn(
              "absolute inset-0 opacity-0",
              "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]",
              "dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),transparent_70%)]",
              "transition-opacity duration-300",
              "group-hover:opacity-100"
            )}
          />

          <span className="relative z-10 font-medium tracking-tight">
            Browse Components
          </span>

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
"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Btn04Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Btn04({
  className,
  children,
  ...props
}: Btn04Props) {
  return (
    <motion.div
      className="inline-block [perspective:1000px]"
      whileHover={{
        rotateX: 8,
        rotateY: -8,
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        rotateX: 0,
        rotateY: 0,
        y: 0,
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <Button
        className={cn(
          "group relative isolate overflow-hidden rounded-2xl",
          "border border-white/10 px-6 py-5",
          "bg-slate-950 text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)]",
          "transform-gpu transition-none",
          "hover:shadow-[0_18px_55px_rgba(0,0,0,0.45)]",
          className
        )}
        {...props}
      >
        {/* Rainbow border */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(90deg,#ff4d6d,#ffb84d,#7cff6b,#4dd9ff,#b84dff,#ff4d6d)] bg-[length:300%_300%] opacity-90"
        />

        {/* Inner glass layer */}
        <span
          aria-hidden="true"
          className="absolute inset-[1px] rounded-[inherit] bg-slate-950/90 backdrop-blur-md"
        />

        {/* Soft moving glow */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] opacity-0 blur-xl group-hover:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,77,109,0.18), rgba(255,184,77,0.18), rgba(124,255,107,0.18), rgba(77,217,255,0.18), rgba(184,77,255,0.18))",
            backgroundSize: "300% 300%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Shimmer sweep */}
        <motion.span
          aria-hidden="true"
          className="absolute -inset-y-2 left-[-40%] w-1/2 rotate-12 bg-white/20 opacity-0 blur-md group-hover:opacity-100"
          animate={{ x: ["0%", "260%"] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1.2,
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 shadow-[0_0_14px_rgba(255,255,255,0.35)]" />
          {children ?? "Hover me"}
        </span>
      </Button>
    </motion.div>
  );
}
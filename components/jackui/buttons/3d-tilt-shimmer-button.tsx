"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ThreeDTiltShimmerButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  /**
   * Maximum X axis rotation on hover (in degrees).
   * @default 8
   */
  tiltMaxX?: number;
  /**
   * Maximum Y axis rotation on hover (in degrees).
   * @default -8
   */
  tiltMaxY?: number;
  /**
   * The perspective depth in pixels for the 3D effect.
   * @default 1000
   */
  perspective?: number;
  /**
   * Whether to show the multi-stop gradient border.
   * @default true
   */
  showRainbowBorder?: boolean;
  /**
   * Whether to show the soft moving ambient glow.
   * @default true
   */
  showGlow?: boolean;
  /**
   * Whether to show the shimmer sweep sheen on hover.
   * @default true
   */
  showShimmerSweep?: boolean;
  /**
   * Whether to show the pulse dot indicator inside the button.
   * @default true
   */
  showPulseDot?: boolean;
  /**
   * Custom duration in seconds for the moving glow animation loop.
   * @default 6
   */
  glowDuration?: number;
  /**
   * Custom duration in seconds for the shimmer sweep animation loop.
   * @default 1.8
   */
  shimmerDuration?: number;
}

/**
 * ThreeDTiltShimmerButton is a premium button component that combines a 3D tilt
 * effect on hover, a rotating background glow, an active shimmer sweep,
 * and standard design system integrations (ref forwarding, theme compatibility, etc.).
 *
 * It automatically respects users' system settings for reduced motion.
 */
const ThreeDTiltShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ThreeDTiltShimmerButtonProps
>(
  (
    {
      className,
      children,
      tiltMaxX = 8,
      tiltMaxY = -8,
      perspective = 1000,
      showRainbowBorder = true,
      showGlow = true,
      showShimmerSweep = true,
      showPulseDot = true,
      glowDuration = 6,
      shimmerDuration = 1.8,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        className="inline-block"
        style={{ perspective: shouldReduceMotion ? undefined : `${perspective}px` }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                rotateX: tiltMaxX,
                rotateY: tiltMaxY,
                y: -2,
                scale: 1.01,
              }
        }
        whileTap={
          shouldReduceMotion
            ? {}
            : {
                rotateX: 0,
                rotateY: 0,
                y: 0,
                scale: 0.98,
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Button
          ref={ref}
          className={cn(
            "group relative isolate overflow-hidden rounded-2xl",
            "border border-white/10 px-6 py-5",
            "bg-slate-950 text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)]",
            "transform-gpu transition-none",
            "hover:shadow-[0_18px_55px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
            className
          )}
          {...props}
        >
          {/* Rainbow border */}
          {showRainbowBorder && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(90deg,#ff4d6d,#ffb84d,#7cff6b,#4dd9ff,#b84dff,#ff4d6d)] bg-[length:300%_300%] opacity-90"
            />
          )}

          {/* Inner glass layer */}
          <span
            aria-hidden="true"
            className="absolute inset-[1px] rounded-[inherit] bg-slate-950/90 backdrop-blur-md"
          />

          {/* Soft moving glow */}
          {showGlow && !shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,77,109,0.18), rgba(255,184,77,0.18), rgba(124,255,107,0.18), rgba(77,217,255,0.18), rgba(184,77,255,0.18))",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: glowDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}

          {/* Shimmer sweep */}
          {showShimmerSweep && !shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute -inset-y-2 left-[-40%] w-1/2 rotate-12 bg-white/20 opacity-0 blur-md group-hover:opacity-100 transition-opacity duration-300"
              animate={{ x: ["0%", "260%"] }}
              transition={{
                duration: shimmerDuration,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.2,
              }}
            />
          )}

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide">
            {showPulseDot && (
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 shadow-[0_0_14px_rgba(255,255,255,0.35)] animate-pulse" />
            )}
            {children ?? "Hover me"}
          </span>
        </Button>
      </motion.div>
    );
  }
);

ThreeDTiltShimmerButton.displayName = "ThreeDTiltShimmerButton";

export default ThreeDTiltShimmerButton;

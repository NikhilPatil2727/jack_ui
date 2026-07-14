"use client";

import * as React from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface ThreeDTiltShimmerButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
  > {
  /**
   * Maximum X axis rotation on hover (in degrees).
   * @default -12
   */
  tiltMaxX?: number;
  /**
   * Maximum Y axis rotation on hover (in degrees).
   * @default 12
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
   * Whether to show the soft moving ambient glow behind the button.
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
   * @default 2
   */
  shimmerDuration?: number;
  /**
   * Sizing variant of the button.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * ThreeDTiltShimmerButton is a premium button component that tilts to a fixed
 * 3D angle when hovered to show off its premium depth, combined with an animated
 * rainbow border, soft ambient background glow, and a cursor-tracking spotlight reflection.
 */
export const ThreeDTiltShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ThreeDTiltShimmerButtonProps
>(
  (
    {
      className,
      children,
      tiltMaxX = -12,
      tiltMaxY = 12,
      perspective = 1000,
      showRainbowBorder = true,
      showGlow = true,
      showShimmerSweep = true,
      showPulseDot = true,
      glowDuration = 6,
      shimmerDuration = 2,
      size = "md",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Track state
    const [hovered, setHovered] = React.useState(false);

    // Dynamic rotation values (spring-controlled)
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const scale = useMotionValue(1);

    // Dynamic spotlight coordinates relative to the button boundary
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics configuration for smooth, natural movement
    const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 15 });
    const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 15 });
    const springScale = useSpring(scale, { stiffness: 200, damping: 15 });
    const springMouseX = useSpring(mouseX, { stiffness: 250, damping: 20 });
    const springMouseY = useSpring(mouseY, { stiffness: 250, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || shouldReduceMotion || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Spotlight tracks cursor position in real-time
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => {
      if (disabled) return;
      setHovered(true);
      scale.set(1.04);
      // Tilt to the opposite premium 3D angle immediately on hover
      rotateX.set(tiltMaxX);
      rotateY.set(tiltMaxY);
    };

    const handleMouseLeave = () => {
      setHovered(false);
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
    };

    const handleMouseDown = () => {
      if (disabled) return;
      scale.set(0.96);
    };

    const handleMouseUp = () => {
      if (disabled) return;
      scale.set(1.04);
    };

    // Spotlight gradient background style
    const spotlightBg = useTransform(
      [springMouseX, springMouseY],
      ([x, y]) => `radial-gradient(140px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, transparent 80%)`
    );

    const sizeClasses = {
      sm: "px-4 py-2.5 text-xs rounded-xl",
      md: "px-6 py-4 text-sm rounded-2xl",
      lg: "px-8 py-5.5 text-base rounded-3xl",
    };

    return (
      <div
        ref={containerRef}
        className="relative inline-block group select-none"
        style={{
          perspective: shouldReduceMotion ? undefined : `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Dynamic Keyframe Animations */}
        <style>{`
          @keyframes tilt-shimmer-rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes tilt-shimmer-sweep {
            0% { left: -120%; }
            100% { left: 220%; }
          }
        `}</style>

        {/* Ambient background glow blooming outward on hover (tilts with the button for 3D realism) */}
        {showGlow && !shouldReduceMotion && (
          <motion.div
            className="absolute -inset-3 opacity-0 group-hover:opacity-60 blur-2xl pointer-events-none"
            style={{
              background: "linear-gradient(90deg,#ff4d6d,#ffb84d,#7cff6b,#4dd9ff,#b84dff,#ff4d6d)",
              backgroundSize: "300% 300%",
              animation: `tilt-shimmer-rainbow ${glowDuration}s linear infinite`,
              borderRadius: "inherit",
              rotateX: springRotateX,
              rotateY: springRotateY,
              scale: springScale,
              z: -10,
            }}
          />
        )}

        {/* Button Wrapper with 3D Transforms */}
        <motion.button
          ref={ref}
          disabled={disabled}
          className={cn(
            "relative w-full h-full font-semibold tracking-wide border-0 bg-transparent text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] cursor-pointer outline-none select-none overflow-hidden",
            "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
            "transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
            sizeClasses[size],
            className
          )}
          style={{
            rotateX: shouldReduceMotion ? 0 : springRotateX,
            rotateY: shouldReduceMotion ? 0 : springRotateY,
            scale: shouldReduceMotion ? 1 : springScale,
            transformStyle: "preserve-3d",
          }}
          {...props}
        >
          {/* Animated Rainbow Border */}
          {showRainbowBorder && (
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,#ff4d6d,#ffb84d,#7cff6b,#4dd9ff,#b84dff,#ff4d6d)] bg-[length:300%_300%] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                animation: `tilt-shimmer-rainbow ${glowDuration}s linear infinite`,
                borderRadius: "inherit",
              }}
            />
          )}

          {/* Premium Glass/Dark Inner Container */}
          <span
            aria-hidden="true"
            className="absolute inset-[1px] bg-slate-950/90 backdrop-blur-xl transition-colors duration-300 group-hover:bg-slate-950/80"
            style={{
              borderRadius: "inherit",
              transformStyle: "preserve-3d",
            }}
          />

          {/* Subtly animated linear sheen overlay */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
            style={{ borderRadius: "inherit" }}
          />

          {/* Spotlight Cursor-following Reflection */}
          {!shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: spotlightBg,
                borderRadius: "inherit",
              }}
            />
          )}

          {/* Shimmer Sweep Sheen on Hover */}
          {showShimmerSweep && !shouldReduceMotion && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-[60%] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                animation: `tilt-shimmer-sweep ${shimmerDuration}s ease-in-out infinite`,
              }}
            />
          )}

          {/* Inner Content Layer (with physical 3D lift/depth effect) */}
          <span
            className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300"
            style={{
              transform: hovered && !shouldReduceMotion ? "translateZ(30px)" : "translateZ(0px)",
              transformStyle: "preserve-3d",
            }}
          >
            {showPulseDot && (
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />
              </span>
            )}
            {children ?? "Hover me"}
          </span>
        </motion.button>
      </div>
    );
  }
);

ThreeDTiltShimmerButton.displayName = "ThreeDTiltShimmerButton";

export default ThreeDTiltShimmerButton;

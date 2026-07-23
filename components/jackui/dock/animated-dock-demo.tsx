"use client";

/**
 * @component
 * @name Spatial 3D Dock
 * @author Jack UI (@Nikhil_PATIL)
 * @description An ultra-premium, market-first 3D Spatial Dock. It breaks free from the flat macOS clone paradigm by introducing a desk-mounted, cover-flow physical interaction.
 * 
 * Features:
 * - 3D Perspective & preserve-3d hardware acceleration (No layout thrashing)
 * - 5-Point Cascading Cover Flow (rotateY)
 * - Domino Flip-up effect (rotateX)
 * - Spatial Z-axis popping
 * - Liquid lighting & Aura effects
 */
import React, { createContext, useContext, useRef, useState, useId } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
  Transition,
  HTMLMotionProps
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  Mail,
  Calendar,
  Music,
  Settings,
  User
} from "lucide-react";

type DockContextValue = {
  mouseX: import("motion/react").MotionValue<number>;
  distance: number;
  pillLayoutId: string;
};

const DockContext = createContext<DockContextValue | null>(null);

export interface DockProps extends HTMLMotionProps<any> {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

// Ultra-snappy, physical spring
const SPRING_CONFIG = { mass: 0.1, stiffness: 350, damping: 25 };

export function Dock({
  children,
  className,
  distance = 150,
  ...rest
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const pillLayoutId = useId();

  return (
    <DockContext.Provider value={{ mouseX, distance, pillLayoutId }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{ perspective: 1200 }}
        className={cn(
          "relative mx-auto flex h-auto w-max items-end gap-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-gradient-to-b from-white/80 to-neutral-50/90 dark:from-neutral-950/80 dark:to-neutral-900/90 px-4 py-2.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.03),inset_0_1px_1.5px_rgba(255,255,255,0.15)] ring-1 ring-white/50 dark:ring-transparent backdrop-blur-3xl",
          className
        )}
        {...rest}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export interface DockItemProps extends HTMLMotionProps<any> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  label?: string;
}

export function DockItem({
  children,
  className,
  onClick,
  active,
  label,
  ...rest
}: DockItemProps) {
  const dock = useContext(DockContext);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  if (!dock) {
    throw new Error("DockItem must be used within a Dock provider");
  }

  const { mouseX, distance, pillLayoutId } = dock;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const maxDist = distance;
  const halfDist = distance / 2;

  // 3D Spatial Transforms
  const rotateXSync = useTransform(
    distanceCalc,
    [-maxDist, -halfDist, 0, halfDist, maxDist],
    [0, 15, 0, 15, 0]
  );
  const rotateYSync = useTransform(
    distanceCalc,
    [-maxDist, -halfDist, 0, halfDist, maxDist],
    [0, -35, 0, 35, 0]
  );
  const ySync = useTransform(
    distanceCalc,
    [-maxDist, -halfDist, 0, halfDist, maxDist],
    [0, -10, -25, -10, 0]
  );
  const zSync = useTransform(
    distanceCalc,
    [-maxDist, -halfDist, 0, halfDist, maxDist],
    [0, -15, 40, -15, 0]
  );
  const scaleSync = useTransform(
    distanceCalc,
    [-maxDist, -halfDist, 0, halfDist, maxDist],
    [1, 1.05, 1.35, 1.05, 1]
  );
  const opacitySync = useTransform(
    distanceCalc,
    [-maxDist, -halfDist, 0, halfDist, maxDist],
    [0.7, 0.9, 1, 0.9, 0.7]
  );

  const rotateX = useSpring(rotateXSync, SPRING_CONFIG);
  const rotateY = useSpring(rotateYSync, SPRING_CONFIG);
  const y = useSpring(ySync, SPRING_CONFIG);
  const z = useSpring(zSync, SPRING_CONFIG);
  const scale = useSpring(scaleSync, SPRING_CONFIG);
  const opacity = useSpring(opacitySync, SPRING_CONFIG);

  const Component = onClick ? motion.button : motion.div;

  return (
    <div className="relative flex flex-col items-center group" style={{ transformStyle: "preserve-3d" }}>
      <AnimatePresence>
        {hovered && label && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 5, scale: 0.8, filter: "blur(4px)" }}
            transition={{ type: "spring", mass: 0.1, stiffness: 250, damping: 20 }}
            className="absolute -top-18 z-50 whitespace-nowrap rounded-md border border-black/[0.1] dark:border-white/[0.1] bg-white/90 dark:bg-white/[0.05] px-2 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-100 shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.6)] backdrop-blur-xl pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <Component
        ref={ref as any}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ 
          rotateX, 
          rotateY, 
          y, 
          z, 
          scale, 
          opacity,
          transformStyle: "preserve-3d"
        }}
        whileTap={{ scale: 0.85, z: 20 }}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-lg border border-neutral-200/75 dark:border-white/[0.15] bg-white/50 dark:bg-neutral-900/50 shadow-sm transition-colors duration-300 backdrop-blur-md",
          "h-9 w-9",
          hovered && "border-neutral-300/90 dark:border-white/[0.3] bg-white/80 dark:bg-neutral-800/80 shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.05)]",
          active && "border-cyan-500/50 bg-white/80 dark:bg-neutral-800/80 text-cyan-600 dark:text-cyan-300",
          !active && "text-neutral-600 dark:text-neutral-400",
          onClick && "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-500",
          className
        )}
        {...rest}
      >
        <motion.div
          className="flex items-center justify-center transition-transform duration-300"
        >
          {children}
        </motion.div>
      </Component>

      {/* Spatial 3D Floor Glow for Active Item */}
      {active && (
        <motion.div
          layoutId={`${pillLayoutId}-platform`}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
          className="absolute -bottom-2 h-1 w-6 rounded-[100%] bg-cyan-500/30 dark:bg-cyan-400/40 shadow-[0_0_12px_3px_rgba(34,211,238,0.2)] dark:shadow-[0_0_12px_3px_rgba(34,211,238,0.3)] blur-[1.5px] pointer-events-none"
          style={{ rotateX: 60 }}
        />
      )}
    </div>
  );
}

export interface DockSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function DockSeparator({ className, ...rest }: DockSeparatorProps) {
  return (
    <div className="relative flex flex-col items-center group h-9 justify-end pb-1.5" {...rest}>
      <span
        aria-hidden
        className={cn("mx-1.5 h-5 w-[1px] bg-black/[0.1] dark:bg-white/[0.06] rounded-full", className)}
      />
    </div>
  );
}

export default function AnimatedDockDemo() {
  const [active, setActive] = useState("home");

  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <Dock>
        <Link href="#">
          <DockItem label="Home" active={active === "home"} onClick={() => setActive("home")}>
            <Home className="h-4.5 w-4.5" />
          </DockItem>
        </Link>
        <Link href="#">
          <DockItem label="Messages" active={active === "messages"} onClick={() => setActive("messages")}>
            <Mail className="h-4.5 w-4.5" />
          </DockItem>
        </Link>
        <Link href="#">
          <DockItem label="Calendar" active={active === "calendar"} onClick={() => setActive("calendar")}>
            <Calendar className="h-4.5 w-4.5" />
          </DockItem>
        </Link>
        <Link href="#">
          <DockItem label="Music" active={active === "music"} onClick={() => setActive("music")}>
            <Music className="h-4.5 w-4.5" />
          </DockItem>
        </Link>

        <DockSeparator />

        <Link href="#">
          <DockItem label="Settings" active={active === "settings"} onClick={() => setActive("settings")}>
            <Settings className="h-4.5 w-4.5" />
          </DockItem>
        </Link>
        <Link href="#">
          <DockItem label="Profile" active={active === "profile"} onClick={() => setActive("profile")}>
            <User className="h-4.5 w-4.5" />
          </DockItem>
        </Link>
      </Dock>
    </div>
  );
}

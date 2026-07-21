"use client";

/**
 * @component
 * @name Animated Dock
 * @author Jack UI (@Nikhil_PATIL)
 * @description A premium macOS-style animated dock. It features fluid magnification on hover, physics-based spring animations, tooltips, and active state indicators, perfect for bottom navigation or quick-access toolbars.
 * 
 * Use Cases:
 * - Floating Navigation: Use it at the bottom of the screen as a modern, space-saving alternative to traditional sidebars or top navbars.
 * - Quick Action Bars: Perfect for web apps (like photo editors or AI tools) to house primary tools and actions in a compact, interactive format.
 * - Social Link Bars: Great for portfolio hero sections to display social media or contact links with a wow-factor.
 * 
 * Features:
 * - Physics-based magnification using Framer Motion springs.
 * - Reduced motion support for accessibility.
 * - Context-driven item layout with smart distance calculation.
 */
import React, { createContext, useContext, useRef, useState, useId } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
  Transition
} from "motion/react";
import { cn } from "@/lib/utils";
import {
  Home,
  Mail,
  Calendar,
  Music,
  Sparkles,
  Settings,
  User
} from "lucide-react";

// --- Context & Types ---

type DockContextValue = {
  mouseX: import("motion/react").MotionValue<number>;
  size: number;
  magnification: number;
  distance: number;
  pillLayoutId: string;
};

const DockContext = createContext<DockContextValue | null>(null);

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  magnification?: number;
  distance?: number;
}

const SPRING_CONFIG = { mass: 0.1, stiffness: 150, damping: 12 };
const SPRING_LAYOUT: Transition = { type: "spring", bounce: 0, duration: 0.3 };

export function Dock({
  children,
  className,
  size = 50,
  magnification = 80,
  distance = 140,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const pillLayoutId = useId();

  return (
    <DockContext.Provider value={{ mouseX, size, magnification, distance, pillLayoutId }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "relative mx-auto flex h-auto w-max items-end gap-3 rounded-3xl border border-white/10 bg-black/40 px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
          className
        )}
      >
        {/* Colorful animated glowing border effect */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl transition-all duration-500" />
        <div className="absolute inset-0 -z-10 rounded-3xl opacity-50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />

        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export interface DockItemProps {
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

  const { mouseX, size, magnification, distance, pillLayoutId } = dock;

  // Calculate distance from mouse to the center of this item
  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to width/height
  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const width = useSpring(widthSync, SPRING_CONFIG);

  const Component = onClick ? motion.button : motion.div;

  const pill = active ? (
    <motion.span
      layoutId={pillLayoutId}
      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
      className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:from-white/20 dark:to-white/5"
    />
  ) : null;

  return (
    <div className="relative flex flex-col items-center group">
      <AnimatePresence>
        {hovered && label && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md"
          >
            {label}
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-black/80" />
          </motion.div>
        )}
      </AnimatePresence>

      <Component
        ref={ref as any}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width, height: width }}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-2xl text-foreground transition-colors duration-200",
          onClick && "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
          className
        )}
        {...rest}
      >
        {pill}

        {/* Icon container scales slightly less than the background for a nice parallax-like feel */}
        <motion.div
          style={{ width: "60%", height: "60%" }}
          className="flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors"
        >
          {children}
        </motion.div>
      </Component>

      {/* Active Dot Indicator */}
      {active && (
        <motion.div
          layoutId={`${pillLayoutId}-dot`}
          className="absolute -bottom-2.5 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        />
      )}
    </div>
  );
}

export function DockSeparator({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("mx-2 h-10 w-px self-center bg-white/10 rounded-full", className)}
    />
  );
}

export default function AnimatedDockDemo() {
  const [active, setActive] = useState("home");

  return (
    <div className="flex h-[400px] w-full items-center justify-center bg-black/5 rounded-xl border border-white/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#0a0a0a] to-black">
      <Dock>
        <DockItem
          label="Home"
          active={active === "home"}
          onClick={() => setActive("home")}
        >
          <Home className="h-6 w-6" />
        </DockItem>
        <DockItem
          label="Messages"
          active={active === "messages"}
          onClick={() => setActive("messages")}
        >
          <Mail className="h-6 w-6" />
        </DockItem>
        <DockItem
          label="Calendar"
          active={active === "calendar"}
          onClick={() => setActive("calendar")}
        >
          <Calendar className="h-6 w-6" />
        </DockItem>
        <DockItem
          label="Music"
          active={active === "music"}
          onClick={() => setActive("music")}
        >
          <Music className="h-6 w-6" />
        </DockItem>
        <DockItem
          label="AI Magic"
          active={active === "magic"}
          onClick={() => setActive("magic")}
        >
          <Sparkles className="h-6 w-6" />
        </DockItem>

        <DockSeparator />

        <DockItem
          label="Settings"
          active={active === "settings"}
          onClick={() => setActive("settings")}
        >
          <Settings className="h-6 w-6" />
        </DockItem>
        <DockItem
          label="Profile"
          active={active === "profile"}
          onClick={() => setActive("profile")}
        >
          <User className="h-6 w-6" />
        </DockItem>
      </Dock>
    </div>
  );
}

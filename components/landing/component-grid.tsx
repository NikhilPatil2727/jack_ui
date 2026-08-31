"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { LazyViewport } from "@/components/ui/lazy-viewport";
import { motion } from "motion/react";

const InboxDeck = dynamic(() => import("@/components/jackui/cards/InboxDeck"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />
});

const EnvelopeCard = dynamic(() => import("@/components/jackui/cards/envelope-card"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />
});

const InkFillBtn = dynamic(() => import("@/components/jackui/buttons/InkFillBtn"), {
  ssr: false,
  loading: () => <div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />
});

const SmokeFlareButton = dynamic(() => import("@/components/jackui/buttons/smoke-flare-button"), {
  ssr: false,
  loading: () => <div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />
});

const SparkButton = dynamic(() => import("@/components/jackui/buttons/spark-button"), {
  ssr: false,
  loading: () => <div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />
});

const ThreeDTiltShimmerButton = dynamic(() => import("@/components/jackui/buttons/3d-tilt-shimmer-button"), {
  ssr: false,
  loading: () => <div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />
});

const StarBurstButton = dynamic(() => import("@/components/jackui/buttons/star-burst-button"), {
  ssr: false,
  loading: () => <div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />
});



const AnimatedDockDemo = dynamic(() => import("@/components/jackui/dock/animated-dock"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />
});



interface ComponentItem {
  id: string;
  name: string;
  category: string;
  preview: () => React.ReactNode;
}

// Components list defined outside of the component to prevent recreation on every render
const componentsList: ComponentItem[] = [
  {
    id: "inbox-deck",
    name: "Inbox Deck Card Stack",
    category: "Cards",
    preview: () => (
      <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
        <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
          {() => (
            <div className="absolute scale-[0.38] origin-center translate-y-10">
              <InboxDeck className="min-h-0 h-[220px] p-0 justify-center" />
            </div>
          )}
        </LazyViewport>
      </div>
    ),
  },
  {
    id: "envelope-card",
    name: "Envelope Card",
    category: "Cards",
    preview: () => (
      <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
        <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
          {() => (
            <div className="absolute scale-[0.5] origin-center -translate-y-4">
              <EnvelopeCard
                className="p-0 flex-nowrap"
                items={[
                  {
                    id: "1",
                    label: "Cabin · Cozy Woods",
                    title: "The A-Frame Retreat",
                    description: "Deep forest escape · Wood fireplace",
                    price: "From $180 / night",
                    imageUrl: "/nature_cabin_1.png",
                    imageAlt: "Cozy A-frame cabin in autumn woods",
                    theme: "crimson",
                  },
                ]}
              />
            </div>
          )}
        </LazyViewport>
      </div>
    ),
  },

  {
    id: "btn-ink",
    name: "Button - Ink Fill (InkFillBtn)",
    category: "Buttons",
    preview: () => (
      <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
        <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
          {() => (
            <>
              <InkFillBtn />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Hover to see ink fill effect</span>
            </>
          )}
        </LazyViewport>
      </div>
    ),
  },
  {
    id: "btn-shadow",
    name: "Button - Smoke Flare (SmokeFlareButton)",
    category: "Buttons",
    preview: () => (
      <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
        <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
          {() => (
            <>
              <SmokeFlareButton />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Rotating cosmic smoke & twinkling flares</span>
            </>
          )}
        </LazyViewport>
      </div>
    ),
  },
  {
    id: "btn-ghost",
    name: "Button - Spark (SparkButton)",
    category: "Buttons",
    preview: () => (
      <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
        <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
          {() => (
            <>
              <SparkButton />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Magnetic pull & canvas click particles</span>
            </>
          )}
        </LazyViewport>
      </div>
    ),
  },
  {
    id: "btn-glass",
    name: "Button - 3D Tilt Shimmer (ThreeDTiltShimmerButton)",
    category: "Buttons",
    preview: () => (
      <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
        <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
          {() => (
            <>
              <ThreeDTiltShimmerButton />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Premium 3D-tilting & shimmering buttons</span>
            </>
          )}
        </LazyViewport>
      </div>
    ),
  },
  {
    id: "btn-star",
    name: "Button - Star Burst Particle (StarBurstButton)",
    category: "Buttons",
    preview: () => (
      <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
        <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
          {() => (
            <>
              <StarBurstButton />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Click to trigger star particles</span>
            </>
          )}
        </LazyViewport>
      </div>
    ),
  },
  {
    id: "spatial-3d-dock",
    name: "Spatial 3D Dock",
    category: "Components",
    preview: () => (
      <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
        <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
          {() => (
            <div className="absolute scale-[0.6] origin-center mb-13 translate-y-12">
              <AnimatedDockDemo />
            </div>
          )}
        </LazyViewport>
      </div>
    ),
  },

];

export default function ComponentGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseEnter = () => {
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            draw();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Grid mesh settings (fewer cols/rows for component grid height)
    const cols = 28;
    const rows = 20;
    const nodes: Array<{
      x: number;
      y: number;
      origX: number;
      origY: number;
      vx: number;
      vy: number;
    }> = [];

    const colSpacing = width / (cols - 1);
    const rowSpacing = height / (rows - 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * colSpacing;
        const y = r * rowSpacing;
        nodes.push({
          x,
          y,
          origX: x,
          origY: y,
          vx: 0,
          vy: 0,
        });
      }
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003;

      const isDark = document.documentElement.classList.contains("dark");
      const mouse = mouseRef.current;

      // Update mesh node positions
      nodes.forEach((node) => {
        const waveX = Math.sin(time + node.origY * 0.004) * 6;
        const waveY = Math.cos(time + node.origX * 0.004) * 6;

        let targetX = node.origX + waveX;
        let targetY = node.origY + waveY;

        if (mouse.active) {
          const dx = node.origX - mouse.x;
          const dy = node.origY - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 260) {
            const force = (260 - dist) / 260;
            targetX -= (dx / dist) * force * 24;
            targetY -= (dy / dist) * force * 24;
          }
        }

        node.vx += (targetX - node.x) * 0.08;
        node.vy += (targetY - node.y) * 0.08;
        node.vx *= 0.8;
        node.vy *= 0.8;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Pass 1: Glowing shadow path (wider, very faint orange)
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = isDark
        ? "rgba(251, 146, 60, 0.025)"
        : "rgba(249, 115, 22, 0.02)";

      // Draw horizontal glow
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const node = nodes[idx];
          if (node) {
            if (c === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical glow
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const node = nodes[idx];
          if (node) {
            if (r === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      // Pass 2: Core line path (thinner, more defined orange)
      ctx.lineWidth = 0.6;

      // Horizontal cores
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const node = nodes[idx];
          if (node) {
            if (c === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
        }
        ctx.strokeStyle = isDark
          ? "rgba(251, 146, 60, 0.12)"
          : "rgba(249, 115, 22, 0.09)";
        ctx.stroke();
      }

      // Vertical cores
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const node = nodes[idx];
          if (node) {
            if (r === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
          }
        }
        ctx.strokeStyle = isDark
          ? "rgba(251, 146, 60, 0.10)"
          : "rgba(249, 115, 22, 0.08)";
        ctx.stroke();
      }

      // Draw Spotlight Aura tracking mouse
      if (mouse.active) {
        // Cyan Spotlight (underlying)
        const cyanGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          300
        );
        cyanGrad.addColorStop(0, isDark ? "rgba(56, 189, 248, 0.06)" : "rgba(14, 165, 233, 0.03)");
        cyanGrad.addColorStop(0.6, isDark ? "rgba(56, 189, 248, 0.015)" : "rgba(14, 165, 233, 0.005)");
        cyanGrad.addColorStop(1, "transparent");

        ctx.fillStyle = cyanGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 300, 0, Math.PI * 2);
        ctx.fill();

        // Flashy faint Orange highlight tracking mouse
        const orangeGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200
        );
        orangeGrad.addColorStop(0, isDark ? "rgba(251, 146, 60, 0.08)" : "rgba(249, 115, 22, 0.05)");
        orangeGrad.addColorStop(0.5, isDark ? "rgba(251, 146, 60, 0.02)" : "rgba(249, 115, 22, 0.01)");
        orangeGrad.addColorStop(1, "transparent");

        ctx.fillStyle = orangeGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();

        // Rose Highlight Center
        const roseGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          100
        );
        roseGrad.addColorStop(0, isDark ? "rgba(251, 113, 133, 0.04)" : "rgba(225, 29, 72, 0.02)");
        roseGrad.addColorStop(1, "transparent");

        ctx.fillStyle = roseGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isVisible) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        animationFrameId = 0;
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full py-16 px-4 md:px-8 bg-background relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, transparent 40%, var(--background) 100%),
          repeating-linear-gradient(-45deg, var(--stripe-color) 0px, var(--stripe-color) 1px, transparent 1px, transparent 3px)
        `
      }}
    >
      {/* Interactive Glowing Canvas Background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 w-full h-full"
      />
      {/* Header Container */}
      <div className="max-w-6xl mx-auto text-left mb-12 relative z-10">
        <span className="text-rose-600 dark:text-rose-400 font-bold text-sm tracking-widest uppercase block mb-3 font-sans">

        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 font-sans leading-tight flex flex-wrap items-center gap-x-2">
          Interactive{" "}
          <motion.span
            whileHover="hover"
            initial="initial"
            className="font-instrument tracking-tight text-zinc-500 dark:text-zinc-400 block sm:inline-block origin-left relative cursor-pointer select-none px-2 align-middle"
          >
            Components
            <svg
              className="absolute left-1 bottom-0 w-[95%] h-2 text-zinc-300 dark:text-zinc-700 pointer-events-none"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 5 3 C 35 6, 65 6, 95 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={{
                  initial: { pathLength: 0, opacity: 0 },
                  hover: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 140, damping: 12 }
                  }
                }}
              />
            </svg>
          </motion.span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mb-6 font-sans font-light leading-relaxed">
          A preview of the layout blocks, including card overlays, simple spring gestures, and clean SVG animations.
        </p>
      </div>

      {/* Components Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {componentsList.map((item) => (
          <div
            key={item.id}
            className="group/card relative rounded-2xl bg-card p-1 transition-all duration-200 dark:bg-muted/70 dark:group-hover/card:brightness-110 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_2px_4px_-1px_rgba(0,0,0,0.1),0px_4px_8px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_2px_4px_-1px_rgba(255,255,255,0.05),0px_4px_8px_0px_rgba(0,0,0,0.3)]"
          >
            {/* Card Inner Content */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col justify-between h-full gap-4">
              {/* Component Preview Container */}
              <div className="w-full flex-1">
                {item.preview()}
              </div>

              {/* Title / Meta */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

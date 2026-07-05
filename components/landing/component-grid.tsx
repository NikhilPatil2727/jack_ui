"use client";

import React, { useState } from "react";
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

const AudienceHubAnimation = dynamic(() => import("@/components/jackui/svganimations/AudienceHubAnimation"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />
});

const NeuralCircuitOrchestrator = dynamic(() => import("@/components/jackui/svganimations/NeuralCircuitOrchestrator"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />
});

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  preview: React.ReactNode;
}

export default function ComponentGrid() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Components list importing the actual components from card.mdx, button.mdx, and svg-animations.mdx
  const componentsList: ComponentItem[] = [
    {
      id: "inbox-deck",
      name: "Inbox Deck Card Stack",
      category: "Cards",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
          <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
            <div className="absolute scale-[0.38] origin-center translate-y-10">
              <InboxDeck className="min-h-0 h-[220px] p-0 justify-center" />
            </div>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "envelope-card",
      name: "Envelope Card",
      category: "Cards",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
          <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
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
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "audience-hub",
      name: "Audience Hub Animation",
      category: "SVG Animations",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl">
          <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
            <div className="absolute scale-[0.55] origin-center">
              <AudienceHubAnimation animated={true} />
            </div>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "neural-circuit",
      name: "Neural Circuit Orchestrator",
      category: "SVG Animations",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none pointer-events-none">
          <LazyViewport placeholder={<div className="w-full h-full bg-zinc-100/50 dark:bg-zinc-800/20 animate-pulse rounded-xl" />}>
            <div className="absolute w-[800px] scale-[0.22] origin-center">
              <NeuralCircuitOrchestrator />
            </div>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "btn-ink",
      name: "Button - Ink Fill (InkFillBtn)",
      category: "Buttons",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
            <InkFillBtn />
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Hover to see ink fill effect</span>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "btn-shadow",
      name: "Button - Smoke Flare (SmokeFlareButton)",
      category: "Buttons",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
            <SmokeFlareButton />
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Rotating cosmic smoke & twinkling flares</span>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "btn-ghost",
      name: "Button - Spark (SparkButton)",
      category: "Buttons",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
            <SparkButton />
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Magnetic pull & canvas click particles</span>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "btn-glass",
      name: "Button - 3D Tilt Shimmer (ThreeDTiltShimmerButton)",
      category: "Buttons",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
            <ThreeDTiltShimmerButton />
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Premium 3D-tilting & shimmering buttons</span>
          </LazyViewport>
        </div>
      ),
    },
    {
      id: "btn-star",
      name: "Button - Star Burst Particle (StarBurstButton)",
      category: "Buttons",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <LazyViewport placeholder={<div className="h-10 w-28 bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse rounded-md" />}>
            <StarBurstButton />
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3">Click to trigger star particles</span>
          </LazyViewport>
        </div>
      ),
    },
  ];

  return (
    <section 
      className="w-full py-16 px-4 md:px-8 bg-background relative overflow-hidden"
      style={{
        backgroundImage: `repeating-linear-gradient(-45deg, var(--stripe-color) 0px, var(--stripe-color) 1px, transparent 1px, transparent 6px)`
      }}
    >
      {/* Header Container */}
      <div className="max-w-6xl mx-auto text-left mb-12">
        <span className="text-rose-600 dark:text-rose-400 font-bold text-sm tracking-widest uppercase block mb-3 font-outfit">
          Gallery
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 font-outfit leading-tight flex flex-wrap items-center gap-x-2">
          Interactive{" "}
          <motion.span
            whileHover="hover"
            initial="initial"
            className="font-lavishly-yours text-rose-600 dark:text-rose-400 font-normal lowercase tracking-wide text-5xl md:text-7xl lg:text-8xl block sm:inline-block rotate-[-2deg] origin-left relative cursor-pointer select-none px-2 align-middle translate-y-[2px]"
          >
            elements
            <svg
              className="absolute left-1 bottom-[-8px] w-[95%] h-2.5 text-rose-600/70 dark:text-rose-400/80 pointer-events-none"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 5 3 C 35 6, 65 6, 95 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={{
                  initial: { pathLength: 0 },
                  hover: {
                    pathLength: 1,
                    transition: { type: "spring", stiffness: 140, damping: 12 }
                  }
                }}
              />
            </svg>
          </motion.span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mb-6 font-outfit font-light leading-relaxed">
          A preview of the layout blocks, including card overlays, simple spring gestures, and clean SVG animations.
        </p>
      </div>

      {/* Components Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentsList.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveCard(item.id)}
            onMouseLeave={() => setActiveCard(null)}
            className="group relative rounded-2xl bg-card p-1 transition-all duration-200 dark:bg-muted/70 dark:group-hover:brightness-110 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_2px_4px_-1px_rgba(0,0,0,0.1),0px_4px_8px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_2px_4px_-1px_rgba(255,255,255,0.05),0px_4px_8px_0px_rgba(0,0,0,0.3)]"
          >
            {/* Card Inner Content */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col justify-between h-full gap-4">
              {/* Component Preview Container */}
              <div className="w-full flex-1">
                {item.preview}
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

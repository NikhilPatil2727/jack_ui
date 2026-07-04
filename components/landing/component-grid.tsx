"use client";

import React, { useState } from "react";
import InboxDeck from "@/components/jackui/cards/InboxDeck";
import EnvelopeCard from "@/components/jackui/cards/envelope-card";
import InkFillBtn from "@/components/jackui/buttons/InkFillBtn";
import Btn02 from "@/components/jackui/buttons/btn-02";
import Btn03 from "@/components/jackui/buttons/btn-03";
import Btn04 from "@/components/jackui/buttons/btn-04";
import Btn07 from "@/components/jackui/buttons/btn-07";
import AudienceHubAnimation from "@/components/jackui/svganimations/AudienceHubAnimation";
import NeuralCircuitOrchestrator from "@/components/jackui/svganimations/NeuralCircuitOrchestrator";

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
      category: "Cards (card.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
          <div className="absolute scale-[0.38] origin-center translate-y-10">
            <InboxDeck className="min-h-0 h-[220px] p-0 justify-center" />
          </div>
        </div>
      ),
    },
    {
      id: "envelope-card",
      name: "Envelope Card",
      category: "Cards (card.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none">
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
        </div>
      ),
    },
    {
      id: "audience-hub",
      name: "Audience Hub Animation",
      category: "SVG Animations (svg-animations.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl">
          <div className="absolute scale-[0.55] origin-center">
            <AudienceHubAnimation animated={true} />
          </div>
        </div>
      ),
    },
    {
      id: "neural-circuit",
      name: "Neural Circuit Orchestrator",
      category: "SVG Animations (svg-animations.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-xl select-none pointer-events-none">
          <div className="absolute w-[800px] scale-[0.22] origin-center">
            <NeuralCircuitOrchestrator />
          </div>
        </div>
      ),
    },
    {
      id: "btn-ink",
      name: "Button - Ink Fill (InkFillBtn)",
      category: "Buttons (button.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <InkFillBtn />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Hover to see ink fill effect</span>
        </div>
      ),
    },
    {
      id: "btn-shadow",
      name: "Button - Shadow (Btn02)",
      category: "Buttons (button.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <Btn02 />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Smooth hover transitions & ambient shadow</span>
        </div>
      ),
    },
    {
      id: "btn-ghost",
      name: "Button - Ghost (Btn03)",
      category: "Buttons (button.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <Btn03 />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Magnetic pull & canvas click particles</span>
        </div>
      ),
    },
    {
      id: "btn-glass",
      name: "Button - Glassmorphism (Btn04)",
      category: "Buttons (button.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <Btn04 />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Premium backdrop-blur buttons</span>
        </div>
      ),
    },
    {
      id: "btn-star",
      name: "Button - Star Burst Particle (Btn07)",
      category: "Buttons (button.mdx)",
      preview: (
        <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-6">
          <Btn07 />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Click to trigger star particles</span>
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
        <span className="text-pink-500 dark:text-pink-400 font-semibold text-lg tracking-wide uppercase block mb-2">
          Premium Components
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
          Interactive by design.
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mb-6">
          Elevate your interface with fluid transitions, tactile feedback, and highly-polished micro-interactions.
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

"use client";

import HeroSection from "@/components/landing/hero";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const dotColor =
    resolvedTheme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)";
  return (
    <div>
      <main
        className="bg-white dark:bg-black/5 overflow-x-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
          backgroundSize: "16px 16px",
          backgroundRepeat: "repeat",
        }}
      >
        <HeroSection />
      </main>
    </div>
  );
}

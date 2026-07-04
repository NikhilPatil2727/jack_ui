import HeroSection from "@/components/landing/hero";
import dynamic from "next/dynamic";

const ComponentGrid = dynamic(() => import("@/components/landing/component-grid"), {
  loading: () => (
    <div className="max-w-6xl mx-auto py-16 px-4 text-center min-h-[400px] flex flex-col items-center justify-center gap-4">
      <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md" />
      <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[260px] bg-zinc-100 dark:bg-zinc-900/50 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <div>
      <main
        className="bg-white dark:bg-black/5 overflow-x-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--dot-color) 0.75px, transparent 0)`,
          backgroundSize: "16px 16px",
          backgroundRepeat: "repeat",
        }}
      >
        <HeroSection />
        
        {/* Divider Line */}
        <div className="w-full border-b border-zinc-200 dark:border-zinc-800" />

        <ComponentGrid />
      </main>
    </div>
  );
}

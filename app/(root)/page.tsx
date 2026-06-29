import HeroSection from "@/components/landing/hero";
import ComponentGrid from "@/components/landing/component-grid";

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

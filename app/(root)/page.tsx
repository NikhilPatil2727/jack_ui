import HeroSection from "@/components/landing/hero";

export default function Home() {
  return (
    <div>
      <main
        className="bg-white dark:bg-black/5 overflow-x-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--dot-color) 1px, transparent 0)`,
          backgroundSize: "16px 16px",
          backgroundRepeat: "repeat",
        }}
      >
        <HeroSection />
      </main>
    </div>
  );
}

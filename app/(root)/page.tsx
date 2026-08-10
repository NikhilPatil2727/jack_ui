import { GlowInputBar } from "@/components/ui/glow-input-bar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background dotted pattern or glow could go here */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* The main component showcase */}
      <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-white font-bold text-4xl text-center mb-12 tracking-tight">
          What will you build today?
        </h1>
        <GlowInputBar />
      </div>
    </div>
  );
}

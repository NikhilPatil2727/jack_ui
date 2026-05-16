import HeroSection from "@/components/landing/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
       <main className="bg-white dark:bg-black/5 overflow-x-hidden">
         <HeroSection />
       </main>
    </div>
  );
}

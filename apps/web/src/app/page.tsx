import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { Features } from "@/components/landing/features";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-text-primary overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <CTA />
    </main>
  );
}

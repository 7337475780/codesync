import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { Features } from "@/components/landing/features";
import { AIShowcase } from "@/components/landing/ai-showcase";
import dynamic from 'next/dynamic';
import { 
  getOrganizationSchema, 
  getSoftwareApplicationSchema, 
  getFAQSchema, 
  getWebSiteSchema 
} from "@/lib/structured-data";

// Lazy load below-the-fold components
const CollaborationShowcase = dynamic(() => import('@/components/landing/collaboration-showcase').then(mod => mod.CollaborationShowcase));
const TemplatesShowcase = dynamic(() => import('@/components/landing/templates-showcase').then(mod => mod.TemplatesShowcase));
const Pricing = dynamic(() => import('@/components/landing/pricing').then(mod => mod.Pricing));
const SuccessStories = dynamic(() => import('@/components/landing/success-stories').then(mod => mod.SuccessStories));
const CTA = dynamic(() => import('@/components/landing/cta').then(mod => mod.CTA));
const Footer = dynamic(() => import('@/components/landing/footer').then(mod => mod.Footer));

export default function Home() {
  const jsonLd = [
    getOrganizationSchema(),
    getSoftwareApplicationSchema(),
    getFAQSchema(),
    getWebSiteSchema()
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-text-primary overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <AIShowcase />
      <CollaborationShowcase />
      <TemplatesShowcase />
      <Pricing />
      <SuccessStories />
      <CTA />
      <Footer />
    </main>
  );
}

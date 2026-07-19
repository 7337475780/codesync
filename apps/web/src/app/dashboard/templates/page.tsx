"use client";

import { Search, Copy, Star, Download, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@codesync/ui/components/ui/button";
import Image from "next/image";

const TEMPLATES = [
  { id: 1, name: "Next.js Enterprise", desc: "Production-ready Next.js boilerplate with auth, database, and UI components.", framework: "Next.js", stars: 1205, uses: "4.5k", color: "from-black to-zinc-900" },
  { id: 2, name: "Vue Admin Dashboard", desc: "Sleek and modern admin dashboard built with Vue 3 and Tailwind CSS.", framework: "Vue", stars: 850, uses: "2.1k", color: "from-emerald-900/50 to-emerald-950" },
  { id: 3, name: "React Native Mobile App", desc: "Cross-platform mobile app template with Expo and React Navigation.", framework: "React Native", stars: 2100, uses: "10k+", color: "from-blue-900/50 to-blue-950" },
  { id: 4, name: "SvelteKit Blog", desc: "Minimalist MDX blog template powered by SvelteKit.", framework: "SvelteKit", stars: 430, uses: "1.2k", color: "from-orange-900/50 to-orange-950" },
  { id: 5, name: "Express API Starter", desc: "Robust Node.js API with TypeScript, Prisma, and JWT authentication.", framework: "Express", stars: 1500, uses: "8.4k", color: "from-yellow-900/50 to-yellow-950" },
  { id: 6, name: "Nuxt E-commerce", desc: "Full-stack e-commerce solution using Nuxt 3 and Stripe.", framework: "Nuxt", stars: 950, uses: "3.2k", color: "from-green-900/50 to-green-950" },
];

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Copy className="w-8 h-8 text-blue-500" />
            Starter Templates
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Kickstart your next project with production-ready templates.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full bg-[#111] border border-white/5 focus:border-blue-500/50 rounded-xl h-12 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {["All", "Next.js", "React", "Vue", "Node.js", "Mobile", "E-commerce", "Blog"].map((filter, i) => (
          <button 
            key={filter}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${i === 0 ? 'bg-white text-black font-medium' : 'bg-[#111] border border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <div key={template.id} className="bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 flex flex-col">
            
            {/* Visual Cover */}
            <div className={`h-40 bg-gradient-to-br ${template.color} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white shadow-xl flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {template.stars}
              </div>
              <h3 className="text-2xl font-bold text-white/90 drop-shadow-xl font-mono">{template.framework}</h3>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{template.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-6">{template.desc}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 text-[13px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Download className="w-4 h-4" />
                    {template.uses} uses
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-9 w-9 bg-[#111] border-white/5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-900/20">
                    Use <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

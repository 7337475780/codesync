"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Play, Download, Star, Clock, LayoutTemplate, ExternalLink, Activity, Globe, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const templates = [
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS Boilerplate',
    desc: 'Production-ready full-stack SaaS with auth, billing, and database.',
    difficulty: 'Intermediate',
    time: '2m',
    stars: '12.4k',
    downloads: '85k',
    updated: '2 days ago',
    stack: ['Next.js', 'React', 'Prisma', 'Stripe'],
    color: '#000000',
    logo: 'N',
    gradient: 'from-gray-800 to-black'
  },
  {
    id: 'react-dashboard',
    name: 'React Admin Dashboard',
    desc: 'Modern admin panel with charts, tables, and dark mode support.',
    difficulty: 'Beginner',
    time: '1m',
    stars: '8.2k',
    downloads: '42k',
    updated: '5 days ago',
    stack: ['React', 'Tailwind', 'Recharts'],
    color: '#61DAFB',
    logo: 'R',
    gradient: 'from-[#61DAFB]/20 to-blue-900/20'
  },
  {
    id: 'python-fastapi',
    name: 'FastAPI AI Agent',
    desc: 'High-performance Python backend ready for AI integrations.',
    difficulty: 'Advanced',
    time: '5m',
    stars: '5.1k',
    downloads: '28k',
    updated: '1 week ago',
    stack: ['Python', 'FastAPI', 'Redis'],
    color: '#009688',
    logo: 'F',
    gradient: 'from-[#009688]/20 to-teal-900/20'
  },
  {
    id: 'node-express',
    name: 'Node.js Microservice',
    desc: 'Scalable REST API boilerplate with Docker and CI/CD setup.',
    difficulty: 'Intermediate',
    time: '3m',
    stars: '9.8k',
    downloads: '64k',
    updated: '3 days ago',
    stack: ['Node.js', 'Express', 'MongoDB'],
    color: '#339933',
    logo: 'Node',
    gradient: 'from-[#339933]/20 to-green-900/20'
  }
];

export function TemplatesShowcase() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.02]">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#8b5cf6]/10 blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/10 blur-[150px] mix-blend-screen"></div>

      </div>

      <Container className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 border border-[#8b5cf6]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            <LayoutTemplate className="text-[#c084fc] w-6 h-6" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[40px] font-bold text-white mb-4 tracking-tight"
          >
            Start instantly with templates.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] text-gray-400 font-medium max-w-[500px]"
          >
            Deploy production-ready applications in seconds with one-click templates for your favorite frameworks.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Template List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveTemplate(template)}
              >
                <Card className={`p-5 backdrop-blur-md cursor-pointer transition-all duration-300 rounded-2xl group ${
                  activeTemplate.id === template.id 
                  ? 'bg-[#1a1a1a]/80 border-[#8b5cf6]/50 shadow-[0_0_30px_rgba(139,92,246,0.15)]' 
                  : 'bg-[#0a0a0a]/50 border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0f0f0f]'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 items-start">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[18px] shrink-0 border border-white/10 bg-gradient-to-br ${template.gradient} shadow-inner`}>
                        {template.logo}
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-white mb-1 group-hover:text-[#a78bfa] transition-colors">{template.name}</h3>
                        <p className="text-[13px] text-gray-400 leading-snug mb-3 line-clamp-2">{template.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {template.stack.map(tech => (
                            <span key={tech} className="px-2 py-0.5 rounded-[4px] bg-white/5 border border-white/5 text-gray-300 text-[10px] font-medium tracking-wide">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-[#141414] px-2 py-1 rounded-md border border-white/5">
                        <Clock size={12} className="text-[#a78bfa]" /> {template.time}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right: Live Preview Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/60 backdrop-blur-xl shadow-[0_0_80px_rgba(139,92,246,0.1)] flex flex-col overflow-hidden h-[550px]"
          >
            {/* Top Bar */}
            <div className="h-12 bg-[#050505]/80 border-b border-white/[0.05] flex items-center px-4 justify-between select-none">
              <div className="flex gap-2 w-20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-[#141414] border border-white/5 rounded-md px-3 py-1 flex items-center gap-2 text-[11px] font-medium text-gray-400 min-w-[200px] justify-center">
                  <Globe size={12} className="text-gray-500" /> preview.codesync.dev
                </div>
              </div>
              <div className="w-20 flex justify-end">
                <ExternalLink size={14} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-6 flex flex-col relative overflow-hidden bg-cover bg-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTemplate.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Status & Stats */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[18px] border border-white/10 bg-gradient-to-br ${activeTemplate.gradient} shadow-lg`}>
                        {activeTemplate.logo}
                      </div>
                      <div>
                        <h4 className="text-[18px] font-bold text-white leading-tight">{activeTemplate.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 font-medium">
                            <Activity size={10} /> Online
                          </span>
                          <span className="text-[11px] text-gray-500">Updated {activeTemplate.updated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-[#141414] border border-white/5 rounded-lg px-3 py-1.5 flex flex-col items-center">
                        <Star size={12} className="text-yellow-500 mb-0.5" />
                        <span className="text-[11px] font-bold text-gray-300">{activeTemplate.stars}</span>
                      </div>
                      <div className="bg-[#141414] border border-white/5 rounded-lg px-3 py-1.5 flex flex-col items-center">
                        <Download size={12} className="text-blue-400 mb-0.5" />
                        <span className="text-[11px] font-bold text-gray-300">{activeTemplate.downloads}</span>
                      </div>
                    </div>
                  </div>

                  {/* Browser Mockup Image / Graphic */}
                  <div className="flex-1 bg-[#101010] rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group flex flex-col">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/5 to-transparent pointer-events-none"></div>
                     <div className="h-6 bg-[#050505] border-b border-white/5 flex items-center px-3 gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-white/20"></div>
                       <div className="w-2 h-2 rounded-full bg-white/20"></div>
                       <div className="w-2 h-2 rounded-full bg-white/20"></div>
                     </div>
                     <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeTemplate.gradient} blur-xl absolute opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeTemplate.gradient} border border-white/20 flex items-center justify-center text-[24px] font-bold text-white shadow-xl relative z-10 mb-4`}>
                          {activeTemplate.logo}
                        </div>
                        <h5 className="text-white font-bold text-[18px] mb-2">{activeTemplate.name}</h5>
                        <p className="text-gray-400 text-[13px] max-w-[80%]">This is a live interactive preview of the {activeTemplate.name} template running securely in a CodeSync sandbox.</p>
                     </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#050505] border-t border-white/[0.08] relative z-20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-medium">Difficulty:</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  activeTemplate.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  activeTemplate.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {activeTemplate.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="h-9 px-4 text-[12px] font-medium border-white/10 hover:bg-white/5 text-gray-300 gap-2">
                  <Github size={14} /> View Source
                </Button>
                <Button className="h-9 px-5 text-[12px] font-medium bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white border-0 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] gap-2 transition-all">
                  <Play size={12} className="fill-white" /> Use Template
                </Button>
              </div>
            </div>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}

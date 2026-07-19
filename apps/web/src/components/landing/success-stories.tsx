"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Sparkles, ArrowRight, Github, Code2, Globe2, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const caseStudies = [
  {
    type: "Startup Team",
    quote: "Reduced onboarding time by 70%",
    stats: ["40 Developers", "150 Projects", "4× Faster Reviews"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    name: "Felix Marcus",
    role: "CTO, NextGen Startup"
  },
  {
    type: "Freelancer",
    quote: "Ships client work twice as fast",
    stats: ["80+ Projects", "AI Assisted", "Instant Deployments"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    name: "Mia Wong",
    role: "Independent Full-Stack Developer"
  },
  {
    type: "Engineering Team",
    quote: "Live collaboration transformed our workflow.",
    stats: ["300 Engineers", "99.99% Uptime", "Shared Workspaces"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    name: "James Anderson",
    role: "VP of Engineering, Enterprise Co."
  },
  {
    type: "University",
    quote: "Teaching programming has never been easier.",
    stats: ["12,000 Students", "Classroom Workspaces", "Live Coding"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    name: "Dr. Sarah Jenkins",
    role: "Computer Science Professor"
  }
];

const metrics = [
  { value: "500K+", label: "Developers", icon: <Github size={16} className="text-gray-400" /> },
  { value: "50M+", label: "Lines of Code", icon: <Code2 size={16} className="text-[#a78bfa]" /> },
  { value: "180+", label: "Countries", icon: <Globe2 size={16} className="text-blue-400" /> },
  { value: "99.99%", label: "Uptime", icon: <Activity size={16} className="text-emerald-400" /> },
  { value: "2M+", label: "Projects Created", icon: <Zap size={16} className="text-yellow-400" /> },
  { value: "150M+", label: "AI Suggestions", icon: <Sparkles size={16} className="text-pink-400" /> }
];

const logos = [
  "GitHub", "Microsoft", "Google", "OpenAI", "Docker", "Vercel", "Supabase", "Cloudflare", "Neon", "Railway"
];

export function SuccessStories() {
  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.02]">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-[100%] bg-[#8b5cf6]/5 blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <Container className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-[13px] font-medium tracking-wide mb-6"
          >
            <CheckCircle2 size={14} className="text-[#a78bfa]" /> Trusted Worldwide
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[40px] md:text-[52px] font-bold text-white mb-4 tracking-tight leading-tight"
          >
            Teams build faster with CodeSync.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[17px] text-gray-400 font-medium max-w-[600px]"
          >
            Thousands of developers, startups, and engineering teams use CodeSync every day.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-8 bg-[#0a0a0a]/60 backdrop-blur-md border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0f0f15] transition-all duration-300 rounded-2xl group hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#a78bfa] bg-[#a78bfa]/10 px-2.5 py-1 rounded-full border border-[#a78bfa]/20">
                    {study.type}
                  </span>
                </div>
                
                <h3 className="text-[22px] font-bold text-white mb-8 leading-tight">
                  "{study.quote}"
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {study.stats.map(stat => (
                    <span key={stat} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] border border-white/5 text-[12px] text-gray-300 font-medium group-hover:bg-[#1a1a1a] transition-colors">
                      <CheckCircle2 size={12} className="text-[#a78bfa]" /> {stat}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <Image src={study.avatar} alt={study.name} width={40} height={40} unoptimized className="rounded-full border border-white/10 bg-[#141414]" />
                    <div>
                      <div className="text-[14px] font-bold text-white">{study.name}</div>
                      <div className="text-[12px] text-gray-500">{study.role}</div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-[#a78bfa] group-hover:border-[#a78bfa] transition-all cursor-pointer"
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {metrics.map((metric, i) => (
            <div key={metric.label} className="flex flex-col items-center justify-center p-6 bg-[#0a0a0a]/40 border border-white/5 rounded-2xl hover:bg-[#141414]/60 transition-colors">
              <div className="mb-3 p-2 bg-[#141414] rounded-lg border border-white/5 shadow-inner">
                {metric.icon}
              </div>
              <div className="text-[28px] font-bold text-white tracking-tight mb-1">{metric.value}</div>
              <div className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Logo Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t border-white/5 pt-12 text-center"
        >
          <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-widest mb-8">
            Powering modern engineering teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
            {logos.map((logo) => (
              <div key={logo} className="text-[18px] font-bold text-gray-400 tracking-tight select-none">
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}

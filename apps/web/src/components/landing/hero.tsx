"use client";

import { Button } from '@codesync/ui/components/ui/button';
import { Container } from '@codesync/ui/components/layout/container';
import { Play, ArrowRight, Zap, CheckCircle2, Bot, Cloud, Rocket } from 'lucide-react';
import { IDEPreview } from './ide-preview';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function Hero() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center bg-[#030303]">
      {/* Background Effects (Grid, Noise, Mesh Gradients) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Mesh Gradients / Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-[#4f46e5]/20 blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-5%] w-[50%] h-[60%] rounded-full bg-[#7c3aed]/15 blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[40%] rounded-full bg-[#2563eb]/10 blur-[100px] mix-blend-screen"></div>
      </div>

      <Container className="mx-auto w-full max-w-[1440px] px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[600px] flex-shrink-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#a78bfa] text-[13px] font-medium tracking-wide mb-8 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Zap size={14} className="fill-[#a78bfa]" /> The next-gen collaborative IDE
            </motion.div>
            
            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-[56px] lg:text-[72px] font-bold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              Code Together.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#c084fc]">
                Ship Smarter.
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-[17px] text-[#9ca3af] max-w-[500px] leading-[1.6] mb-10 font-medium">
              CodeSync is an AI-powered collaborative cloud IDE that helps developers write, run, and deploy applications together in real-time.
            </motion.p>
            
            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-14">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#4338ca] hover:to-[#6d28d9] text-white border-0 rounded-full px-7 h-12 text-[15px] font-medium shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300">
                Start Coding Free <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 rounded-full px-7 h-12 border-white/10 hover:bg-white/5 text-white text-[15px] font-medium transition-colors">
                <Play size={16} className="text-[#a78bfa]" /> Watch Demo
              </Button>
            </motion.div>
            
            {/* Feature Checklist */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-4 text-[13px] text-[#9ca3af] font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#8b5cf6]"/> Real-time Collaboration</span>
              <span className="flex items-center gap-2"><Bot size={16} className="text-[#8b5cf6]"/> AI Code Assistant</span>
              <span className="flex items-center gap-2"><Cloud size={16} className="text-[#8b5cf6]"/> Cloud Workspaces</span>
              <span className="flex items-center gap-2"><Rocket size={16} className="text-[#8b5cf6]"/> One-Click Deploy</span>
            </motion.div>
          </motion.div>
          
          {/* Right IDE Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-[800px] relative z-20"
          >
             {/* Huge background glow specifically for the IDE */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#4f46e5]/10 to-[#a855f7]/10 blur-[100px] rounded-full -z-10" />
             <IDEPreview />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from 'react';
import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Users, Bot, Cloud, Terminal, Globe, Rocket, Layers, GitBranch, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const categories = ["All", "Collaboration", "AI", "Productivity", "Deployment"];

const featureCards = [
  {
    id: "collab",
    category: "Collaboration",
    icon: Users,
    color: "#8b5cf6",
    colorClass: "from-[#8b5cf6]/20",
    borderClass: "border-[#8b5cf6]/20",
    textClass: "text-[#a78bfa]",
    glowClass: "bg-purple-500",
    title: "Real-time Collaboration",
    desc: "Code together with your team in real-time. See changes instantly with live cursors."
  },
  {
    id: "ai",
    category: "AI",
    icon: Bot,
    color: "#3b82f6",
    colorClass: "from-blue-500/20",
    borderClass: "border-blue-500/20",
    textClass: "text-blue-400",
    glowClass: "bg-blue-500",
    title: "AI Code Assistant",
    desc: "Get intelligent suggestions, auto-completions, and even full function generation."
  },
  {
    id: "workspaces",
    category: "Deployment",
    icon: Cloud,
    color: "#10b981",
    colorClass: "from-emerald-500/20",
    borderClass: "border-emerald-500/20",
    textClass: "text-emerald-400",
    glowClass: "bg-emerald-500",
    title: "Cloud Workspaces",
    desc: "Your environment, always ready. Access your projects from anywhere."
  },
  {
    id: "terminal",
    category: "Productivity",
    icon: Terminal,
    color: "#f97316",
    colorClass: "from-orange-500/20",
    borderClass: "border-orange-500/20",
    textClass: "text-orange-400",
    glowClass: "bg-orange-500",
    title: "Integrated Terminal",
    desc: "Use a powerful terminal right in the editor. Run commands, manage Git, and more."
  },
  {
    id: "language",
    category: "Productivity",
    icon: Globe,
    color: "#ec4899",
    colorClass: "from-pink-500/20",
    borderClass: "border-pink-500/20",
    textClass: "text-pink-400",
    glowClass: "bg-pink-500",
    title: "Multi-language Support",
    desc: "Work with all your favorite languages and frameworks out of the box."
  },
  {
    id: "deploy",
    category: "Deployment",
    icon: Rocket,
    color: "#4f46e5",
    colorClass: "from-[#4f46e5]/20",
    borderClass: "border-[#4f46e5]/20",
    textClass: "text-[#818cf8]",
    glowClass: "bg-[#4f46e5]",
    title: "One-Click Deploy",
    desc: "Deploy your applications to the cloud instantly with zero configuration."
  },
  {
    id: "extensions",
    category: "Productivity",
    icon: Layers,
    color: "#6366f1",
    colorClass: "from-indigo-500/20",
    borderClass: "border-indigo-500/20",
    textClass: "text-indigo-400",
    glowClass: "bg-indigo-500",
    title: "Extensions Marketplace",
    desc: "Extend CodeSync with powerful extensions and themes."
  },
  {
    id: "version",
    category: "Collaboration",
    icon: GitBranch,
    color: "#14b8a6",
    colorClass: "from-teal-500/20",
    borderClass: "border-teal-500/20",
    textClass: "text-teal-400",
    glowClass: "bg-teal-500",
    title: "Version Control",
    desc: "Built-in Git support makes version control seamless and intuitive."
  },
  {
    id: "security",
    category: "Deployment",
    icon: ShieldCheck,
    color: "#f43f5e",
    colorClass: "from-rose-500/20",
    borderClass: "border-rose-500/20",
    textClass: "text-rose-400",
    glowClass: "bg-rose-500",
    title: "Secure & Private",
    desc: "Your code is encrypted and secure. We never access your code."
  }
];

export function Features() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCards = featureCards.filter(
    (card) => activeCategory === "All" || card.category === activeCategory
  );

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden min-h-screen">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#4f46e5]/10 blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/10 blur-[150px] mix-blend-screen"></div>
      </div>

      <Container className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[40px] font-bold text-white mb-4 tracking-tight"
          >
            Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] text-gray-400 font-medium max-w-[500px]"
          >
            Powerful features to supercharge your development workflow.
          </motion.p>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-1 mt-10 bg-[#0a0a0a] p-1 rounded-full border border-white/5"
          >
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-1.5 text-[13px] font-medium rounded-full cursor-pointer transition-all duration-300 ${
                  activeCategory === cat 
                  ? 'bg-[#4f46e5] text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                  : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-8 bg-[#0a0a0a]/50 backdrop-blur-md border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0f0f0f] transition-all duration-300 rounded-2xl shadow-lg h-full group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 ${card.glowClass}/10 blur-[50px] pointer-events-none group-hover:${card.glowClass}/20 transition-colors duration-500`} />
                    <div className={`w-11 h-11 rounded-[10px] bg-gradient-to-b ${card.colorClass} to-transparent flex items-center justify-center mb-6 border ${card.borderClass} group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={20} className={card.textClass} />
                    </div>
                    <h3 className="text-[17px] font-semibold mb-3 text-white tracking-tight">{card.title}</h3>
                    <p className="text-[14px] text-gray-400 leading-[1.6]">{card.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative rounded-2xl border border-white/[0.05] bg-[#0a0a0a]/80 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center justify-between p-8"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4f46e5]/10 blur-[80px] pointer-events-none" />
          <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-1">Built for developers. Loved by teams.</h3>
            <p className="text-[14px] text-gray-400">Join thousands of developers who build better, together.</p>
          </div>
          <Link href="/signup">
            <button className="relative z-10 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[14px] font-medium px-6 py-2.5 rounded-md shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-colors">
              Get Started Free <span className="ml-1">→</span>
            </button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

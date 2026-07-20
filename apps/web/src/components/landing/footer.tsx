"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Moon, Globe, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "AI Assistant", "Collaboration", "Templates", "Pricing", "Roadmap", "Changelog"]
  },
  {
    title: "Resources",
    links: ["Documentation", "API", "Blog", "Community", "Tutorials", "Examples", "Status"]
  },
  {
    title: "Company",
    links: ["About", "Careers", "Open Source", "Contact", "Press Kit", "Partners"]
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "Licenses", "Security", "GDPR"]
  }
];

const socials = [
  { icon: <Github size={18} />, label: "GitHub" },
  { icon: <Twitter size={18} />, label: "X" },
  { icon: <Linkedin size={18} />, label: "LinkedIn" },
  { icon: <Youtube size={18} />, label: "YouTube" },
  { icon: <span className="font-bold text-lg leading-none shrink-0" style={{ fontFamily: 'sans-serif' }}>D</span>, label: "Discord" } // Approximate Discord icon with text
];

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] relative overflow-hidden text-gray-400">
      
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-[#8b5cf6]/20 blur-[10px]"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-[100%] bg-[#3b82f6]/5 blur-[120px] mix-blend-screen"></div>

      </div>

      <Container className="mx-auto w-full max-w-[1200px] px-6 pt-24 pb-12 relative z-10">
        
        {/* Desktop 5-Column & Mobile Accordion */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:w-[35%] flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl text-white font-bold leading-none mt-0.5">C</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">CodeSync</span>
            </div>
            
            <p className="text-[15px] leading-relaxed text-gray-400 max-w-[300px] mb-8">
              AI-powered collaborative cloud IDE for modern development teams.
            </p>
            
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <motion.a 
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#8b5cf6]/20 hover:border-[#8b5cf6]/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Columns 2-5: Links */}
          <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="border-b border-white/5 sm:border-0 pb-4 sm:pb-0">
                {/* Mobile Header */}
                <button 
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between sm:hidden py-2"
                >
                  <h4 className="text-white font-bold text-[15px]">{section.title}</h4>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${openSections[section.title] ? 'rotate-180 text-white' : 'text-gray-500'}`} />
                </button>
                
                {/* Desktop Header */}
                <h4 className="hidden sm:block text-white font-bold text-[15px] mb-6">{section.title}</h4>
                
                {/* Links Container */}
                <motion.ul 
                  initial={false}
                  animate={openSections[section.title] ? "open" : "closed"}
                  variants={{
                    open: { height: 'auto', opacity: 1, display: 'flex' },
                    closed: { height: 0, opacity: 0, transitionEnd: { display: 'none' } }
                  }}
                  className="flex-col gap-3 overflow-hidden sm:!h-auto sm:!opacity-100 sm:!flex mt-2 sm:mt-0"
                >
                  {section.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-gray-400 hover:text-[#a78bfa] transition-colors relative group inline-block">
                        {link}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#a78bfa] transition-all duration-300 group-hover:w-full opacity-50"></span>
                      </a>
                    </li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Status */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="text-white">© 2026 CodeSync</span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="text-gray-500">Built for developers worldwide.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 bg-white/5 px-2 py-0.5 rounded font-mono text-[11px]">v1.0.0</span>
              <div className="flex items-center gap-1.5 hover:bg-white/5 px-2 py-1 rounded cursor-pointer transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-emerald-400 font-medium text-[12px]">All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[13px] text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
              <Globe size={14} /> English
            </button>
            <button className="flex items-center gap-2 text-[13px] text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
              <Moon size={14} /> Theme
            </button>
            <button 
              onClick={scrollToTop}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#8b5cf6] bg-white/5 rounded-lg border border-white/5 transition-colors shadow-lg group relative"
              aria-label="Back to top"
            >
              <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          
        </div>

      </Container>
    </footer>
  );
}

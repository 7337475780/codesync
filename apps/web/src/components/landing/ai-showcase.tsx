"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Sparkles, Terminal, Code2, Play, Wand2, Send, Lightbulb, Zap, ArrowRight, ShieldCheck, Database, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function AIShowcase() {
  const [activeChip, setActiveChip] = useState(0);

  const chips = [
    { icon: <Code2 size={14} />, text: "Explain selected code" },
    { icon: <Wand2 size={14} />, text: "Generate new components" },
    { icon: <Zap size={14} />, text: "Refactor functions" },
    { icon: <ShieldCheck size={14} />, text: "Generate tests" },
    { icon: <Database size={14} />, text: "Optimize SQL queries" },
    { icon: <RefreshCw size={14} />, text: "Convert to TypeScript" },
  ];

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.02]">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4f46e5]/10 blur-[120px] mix-blend-screen"></div>
        {/* Subtle grid background */}

        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(circle at center, black, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 70%)' }}></div>
      </div>

      <Container className="mx-auto w-full max-w-[1000px] px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5]/20 to-[#a855f7]/20 border border-[#8b5cf6]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            <Sparkles className="text-[#a78bfa] w-6 h-6" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[40px] font-bold text-white mb-4 tracking-tight"
          >
            Ask AI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] text-gray-400 font-medium max-w-[500px]"
          >
            Your intelligent pair programmer. Write better code, faster.
          </motion.p>
        </div>

        {/* AI Conversation Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/60 backdrop-blur-xl shadow-[0_0_80px_rgba(79,70,229,0.15)] flex flex-col overflow-hidden"
        >
          {/* Top Window Bar */}
          <div className="h-12 bg-[#050505]/80 border-b border-white/[0.05] flex items-center px-4 justify-between select-none">
            <div className="flex gap-2 w-20">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]/50" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]/50" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]/50" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 text-[12px] font-medium text-gray-400">
              <Sparkles size={14} className="text-[#a78bfa]" /> CodeSync AI
            </div>
            <div className="w-20 flex justify-end">
              <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
              </div>
            </div>
          </div>

          {/* Chat History Area */}
          <div className="p-6 md:p-8 flex flex-col gap-8 h-[450px] overflow-y-auto scrollbar-hide relative bg-[#030303]/40">
            
            {/* User Message */}
            <div className="flex items-start gap-4 self-end max-w-[85%] md:max-w-[75%]">
              <div className="bg-[#141414] border border-white/10 rounded-2xl rounded-tr-none px-5 py-4 text-[14px] text-gray-300 leading-relaxed shadow-lg">
                Can you refactor this authentication function to be more efficient and add error handling?
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center shrink-0 shadow-md">
                <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="User" width={24} height={24} unoptimized className="rounded-full" />
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start gap-4 max-w-[95%] md:max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#a855f7] border border-[#8b5cf6]/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="bg-gradient-to-br from-[#0f0f15] to-[#0a0a10] border border-white/5 rounded-2xl rounded-tl-none p-5 text-[14px] text-gray-300 leading-relaxed shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  <p className="mb-4">I've refactored your authentication function to use early returns, improved the error handling structure, and made it more efficient. Here's the updated version:</p>
                  
                  {/* Code Snippet */}
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-[#050505]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-white/5 text-[11px] font-mono text-gray-400 select-none">
                      <span className="flex items-center gap-2"><Layers size={12} className="text-[#61dafb]" /> auth.ts</span>
                      <span className="cursor-pointer hover:text-white flex items-center gap-1"><Code2 size={12}/> Copy Code</span>
                    </div>
                    <div className="p-4 font-mono text-[13px] leading-[1.6] text-gray-300 overflow-x-auto">
                      <span className="text-[#c678dd]">export async function</span> <span className="text-[#61afef]">authenticateUser</span>(credentials: <span className="text-[#e5c07b]">LoginData</span>) {'{'}<br/>
                      &nbsp;&nbsp;<span className="text-[#c678dd]">try</span> {'{'}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#5c6370] italic">// Early return if missing data</span><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">if</span> (!credentials.email || !credentials.password) {'{'}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">throw new</span> <span className="text-[#e5c07b]">Error</span>(<span className="text-[#98c379]">'Missing required credentials'</span>);<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/><br/>
                      
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">const</span> user = <span className="text-[#c678dd]">await</span> db.users.<span className="text-[#61afef]">findOne</span>({'{'} <span className="text-[#d19a66]">email</span>: credentials.email {'}'});<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">if</span> (!user) <span className="text-[#c678dd]">throw new</span> <span className="text-[#e5c07b]">Error</span>(<span className="text-[#98c379]">'User not found'</span>);<br/><br/>
                      
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">const</span> isValid = <span className="text-[#c678dd]">await</span> <span className="text-[#61afef]">verifyPassword</span>(credentials.password, user.hash);<br/>
                      <div className="bg-[#10b981]/10 -mx-4 px-4 py-0.5 border-l-2 border-[#10b981]">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">if</span> (!isValid) <span className="text-[#c678dd]">throw new</span> <span className="text-[#e5c07b]">Error</span>(<span className="text-[#98c379]">'Invalid password'</span>);
                      </div>
                      <br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">return</span> <span className="text-[#61afef]">generateToken</span>(user.id);<br/>
                      &nbsp;&nbsp;{'}'} <span className="text-[#c678dd]">catch</span> (error) {'{'}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#5c6370] italic">// Structured error logging</span><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;logger.<span className="text-[#61afef]">error</span>(<span className="text-[#98c379]">'Authentication failed'</span>, {'{'} <span className="text-[#d19a66]">error</span> {'}'});<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c678dd]">throw</span> error;<br/>
                      &nbsp;&nbsp;{'}'}<br/>
                      {'}'}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <button className="flex items-center gap-1.5 bg-[#4f46e5]/10 hover:bg-[#4f46e5]/20 text-[#818cf8] border border-[#4f46e5]/30 px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition-colors">
                      <Play size={12} /> Apply Changes
                    </button>
                    <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition-colors">
                      <Lightbulb size={12} /> Explain Logic
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Thinking / Typing Indicator */}
            <div className="flex items-center gap-4 max-w-[85%] mt-2">
              <div className="w-8 h-8 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-gray-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 bg-[#141414] border border-white/5 rounded-full px-4 py-2.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
            
            {/* Invisible spacer for scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Bottom Input Area */}
          <div className="p-4 bg-[#0a0a0a] border-t border-white/[0.08] relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            
            {/* Suggested Chips */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
              {chips.map((chip, i) => (
                <button 
                  key={i}
                  onMouseEnter={() => setActiveChip(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-300 border ${
                    activeChip === i 
                    ? 'bg-[#4f46e5]/10 border-[#4f46e5]/30 text-[#a78bfa]' 
                    : 'bg-[#141414] border-white/5 text-gray-400 hover:text-gray-300 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {chip.icon} {chip.text}
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#4f46e5]/30 via-[#a855f7]/30 to-[#4f46e5]/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-[#050505] border border-white/10 rounded-xl flex items-center p-1.5 shadow-inner transition-colors duration-300 group-focus-within:border-[#8b5cf6]/50 group-focus-within:bg-[#030303]">
                <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
                  <Wand2 size={18} />
                </button>
                <input 
                  type="text" 
                  placeholder="Ask AI to explain, generate, or refactor code..." 
                  className="flex-1 bg-transparent border-0 text-[14px] text-white px-2 py-2 focus:outline-none placeholder:text-gray-600"
                />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] hover:from-[#4338ca] hover:to-[#6d28d9] flex items-center justify-center shrink-0 transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] hover:scale-105">
                  <Send size={16} className="text-white ml-0.5" />
                </button>
              </div>
            </div>
          </div>
          
        </motion.div>
      </Container>
    </section>
  );
}

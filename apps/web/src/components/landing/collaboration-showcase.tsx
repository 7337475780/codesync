"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Users, MousePointer2, MessageSquare, Terminal, GitBranch, Headphones, Wifi, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function CollaborationShowcase() {
  const [typingText, setTypingText] = useState("");
  const fullText = "function initializeWebSocket() {\\n  const ws = new WebSocket('wss://api.codesync.dev');\\n  ws.onopen = () => console.log('Connected');\\n}";

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        i = 0; // reset for infinite looping
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const features = [
    {
      icon: <Users size={20} className="text-[#3b82f6]" />,
      title: "Live Multiplayer Editing",
      desc: "Code together in real-time with zero latency. See exactly what your team is typing.",
      colorClass: "from-[#3b82f6]/20",
      borderClass: "border-[#3b82f6]/30"
    },
    {
      icon: <MessageSquare size={20} className="text-[#10b981]" />,
      title: "Instant Comments",
      desc: "Leave inline comments and reviews directly in the editor, just like Google Docs.",
      colorClass: "from-[#10b981]/20",
      borderClass: "border-[#10b981]/30"
    },
    {
      icon: <Terminal size={20} className="text-[#f59e0b]" />,
      title: "Shared Terminal",
      desc: "Run scripts and see terminal outputs together. Sync your environment instantly.",
      colorClass: "from-[#f59e0b]/20",
      borderClass: "border-[#f59e0b]/30"
    },
    {
      icon: <Headphones size={20} className="text-[#ec4899]" />,
      title: "Voice-Ready Audio",
      desc: "Jump into a quick audio huddle with your pair programming partner instantly.",
      colorClass: "from-[#ec4899]/20",
      borderClass: "border-[#ec4899]/30"
    }
  ];

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.02]">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#3b82f6]/10 blur-[120px] mix-blend-screen"></div>
        {/* Subtle grid background */}

      </div>

      <Container className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          >
            <Users className="text-[#60a5fa] w-6 h-6" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[40px] font-bold text-white mb-4 tracking-tight"
          >
            Code with your team in real-time.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] text-gray-400 font-medium max-w-[500px]"
          >
            Experience true multiplayer coding. See cursors, share terminals, and build together without friction.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Collaboration Editor Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/60 backdrop-blur-xl shadow-[0_0_80px_rgba(59,130,246,0.15)] flex flex-col overflow-hidden h-[450px]"
          >
            {/* Window Bar */}
            <div className="h-12 bg-[#050505]/80 border-b border-white/[0.05] flex items-center px-4 justify-between select-none relative z-20">
              <div className="flex gap-2 w-20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-4 text-[12px] font-medium text-gray-400">
                <span className="flex items-center gap-2"><GitBranch size={14} className="text-[#10b981]" /> main</span>
                <span className="flex items-center gap-2"><Activity size={14} className="text-[#3b82f6]" /> Live Share</span>
              </div>
              
              {/* Presence Indicators */}
              <div className="w-20 flex justify-end">
                <div className="flex -space-x-2">
                  <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" width={24} height={24} unoptimized className="rounded-full border border-[#050505] relative z-30" />
                  <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" alt="Sam" width={24} height={24} unoptimized className="rounded-full border border-[#050505] relative z-20" />
                  <div className="w-6 h-6 rounded-full border border-[#050505] bg-[#3b82f6] text-white flex items-center justify-center text-[10px] font-bold relative z-10">+2</div>
                </div>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="p-6 font-mono text-[14px] leading-[1.7] text-gray-300 relative h-full bg-[#030303]/40 overflow-hidden">
              
              {/* Other User Cursor 1 */}
              <motion.div 
                animate={{ x: [0, 50, 20, 100, 0], y: [0, -20, 40, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-[80px] left-[150px] z-30 pointer-events-none"
              >
                <MousePointer2 size={16} className="text-[#f59e0b] fill-[#f59e0b] -ml-2 -mt-2" style={{ transform: 'rotate(-15deg)' }} />
                <div className="bg-[#f59e0b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full rounded-tl-none ml-2 shadow-lg whitespace-nowrap">
                  Sarah
                </div>
              </motion.div>

              {/* Inline Comment */}
              <div className="absolute top-[35px] right-[40px] bg-[#141414] border border-white/10 rounded-lg p-3 shadow-2xl w-[250px] z-20">
                <div className="flex items-start gap-3">
                  <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" alt="Sam" width={24} height={24} unoptimized className="rounded-full" />
                  <div>
                    <div className="text-[12px] font-bold text-white mb-1">Sam</div>
                    <div className="text-[11px] text-gray-400 font-sans leading-relaxed">Let's make sure we handle the reconnection logic here if the socket drops.</div>
                  </div>
                </div>
              </div>

              {/* Code */}
              <div>
                <span className="text-[#c678dd]">import</span> {'{'} useEffect {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span>;<br/><br/>
                
                <span className="bg-[#f59e0b]/20 text-[#e5c07b] px-1 rounded">const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL;</span><br/><br/>
                
                <div className="text-[#61afef] min-h-[100px]">
                  {typingText.split('\n').map((line, i, arr) => (
                    <div key={i} className="flex items-center h-[24px]">
                      <span className="whitespace-pre">
                        {line.includes('function') ? (
                           <><span className="text-[#c678dd]">function</span> <span className="text-[#61afef]">initializeWebSocket</span>() {'{'}</>
                        ) : line.includes('new WebSocket') ? (
                           <>&nbsp;&nbsp;<span className="text-[#c678dd]">const</span> ws = <span className="text-[#c678dd]">new</span> <span className="text-[#e5c07b]">WebSocket</span>(<span className="text-[#98c379]">'wss://api.codesync.dev'</span>);</>
                        ) : line.includes('console.log') ? (
                           <>&nbsp;&nbsp;ws.onopen = () {'=>'} console.<span className="text-[#61afef]">log</span>(<span className="text-[#98c379]">'Connected'</span>);</>
                        ) : line.includes('}') ? (
                           <>{'}'}</>
                        ) : (
                           line
                        )}
                      </span>
                      
                      {i === arr.length - 1 && (
                        <div className="inline-block relative z-30 ml-[1px] h-4">
                          <div className="w-0.5 h-full bg-[#3b82f6] animate-pulse"></div>
                          <div className="absolute top-full left-0 mt-1 bg-[#3b82f6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full rounded-tl-none shadow-lg whitespace-nowrap pointer-events-none">
                            Alex
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
              </div>
            </div>

            {/* Status Bar */}
            <div className="h-8 bg-[#050505] border-t border-white/[0.05] flex items-center px-4 justify-between text-[11px] text-gray-500 font-sans z-20">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#10b981]" /> Synced</span>
                <span className="flex items-center gap-1.5"><Wifi size={12} className="text-[#3b82f6]" /> 12ms ping</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hover:text-gray-300 cursor-pointer transition-colors">UTF-8</span>
                <span className="hover:text-gray-300 cursor-pointer transition-colors">TypeScript React</span>
              </div>
            </div>
          </motion.div>

          {/* Right Features Grid */}
          <div className="w-full lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 bg-[#0a0a0a]/50 backdrop-blur-md border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0f0f0f] transition-all duration-300 rounded-2xl shadow-lg h-full group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-b ${feature.colorClass} to-transparent flex items-center justify-center mb-4 border ${feature.borderClass} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-[1.6]">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

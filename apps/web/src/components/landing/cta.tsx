"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { Button } from '@codesync/ui/components/ui/button';
import { HelpCircle, ChevronDown, Rocket, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    q: "Is CodeSync free to use?",
    a: "Yes! We offer a generous Free plan that includes 3 projects, 1 GB of storage, and basic AI assistance. You can upgrade anytime as your needs grow."
  },
  {
    q: "Can I collaborate in real time?",
    a: "Absolutely. CodeSync features Google Docs-style real-time collaboration. You can see your teammates' cursors, share terminals, and pair program instantly."
  },
  {
    q: "Which programming languages are supported?",
    a: "CodeSync supports over 50 programming languages out of the box, including full IntelliSense and debugging support for JavaScript, TypeScript, Python, Go, Rust, and more."
  },
  {
    q: "Does AI work inside the editor?",
    a: "Yes, our AI assistant is deeply integrated into the editor. It can generate code, write tests, explain complex logic, and even refactor entire files right where you type."
  },
  {
    q: "Can I deploy directly?",
    a: "Yes! With our One-Click Deployments, you can push your code to production securely in seconds. We handle the CI/CD pipeline, preview environments, and hosting automatically."
  },
  {
    q: "Is GitHub supported?",
    a: "CodeSync features native, bi-directional GitHub synchronization. Any changes made in CodeSync can be committed directly to your repos, and pushes to GitHub will reflect in CodeSync immediately."
  },
  {
    q: "Can I invite my team?",
    a: "Of course. The Teams plan allows you to create shared workspaces, assign granular roles and permissions, and manage billing centrally for your entire organization."
  },
  {
    q: "Is there a student plan?",
    a: "Yes, we believe in supporting the next generation of developers. verified students and educators receive full access to our Pro features completely free."
  },
  {
    q: "How secure is my code?",
    a: "Security is our top priority. We use end-to-end encryption for all real-time sessions, enforce strict RBAC, and regularly complete third-party security audits. Enterprise customers also get SSO and detailed audit logs."
  },
  {
    q: "Can I self-host CodeSync?",
    a: "Self-hosting is available for our Enterprise customers who require strict compliance or on-premise deployments. Contact our sales team for custom deployment options."
  }
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className="text-[16px] font-medium text-gray-200 group-hover:text-white transition-colors">{q}</span>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-gray-400 group-hover:bg-[#8b5cf6]/20 group-hover:text-[#a78bfa] group-hover:border-[#8b5cf6]/30 transition-all duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[#8b5cf6]/20 text-[#a78bfa] border-[#8b5cf6]/30' : ''}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[14px] text-gray-400 leading-relaxed pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CTA() {
  return (
    <>
      {/* FAQ Section */}
      <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.02]">
        
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[800px] h-[800px] rounded-full bg-[#8b5cf6]/5 blur-[150px] mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <Container className="mx-auto w-full max-w-[800px] px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-[13px] font-medium tracking-wide mb-6"
            >
              <HelpCircle size={14} className="text-[#a78bfa]" /> FAQ
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[40px] md:text-[48px] font-bold text-white mb-4 tracking-tight leading-tight"
            >
              Questions? We've got answers.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[17px] text-gray-400 font-medium max-w-[500px]"
            >
              Everything you need to know before getting started.
            </motion.p>
          </div>

          {/* Accordions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {faqs.map((faq, index) => (
              <FaqItem key={index} q={faq.q} a={faq.a} />
            ))}
          </motion.div>

        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden bg-[#000000]">
        
        {/* Dramatic Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-[100%] bg-[#8b5cf6]/20 blur-[150px] mix-blend-screen"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#3b82f6]/20 blur-[120px] mix-blend-screen"></div>
          
          {/* Decorative blurred circles / particles */}
          <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-pink-500/20 blur-[40px] rounded-full"></div>
          <div className="absolute bottom-[30%] right-[20%] w-48 h-48 bg-purple-500/20 blur-[50px] rounded-full"></div>
          <div className="absolute top-[40%] right-[30%] w-20 h-20 bg-blue-500/20 blur-[30px] rounded-full"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558603/grid_vncjwg.svg')] opacity-[0.05] bg-center [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"></div>
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
        </div>

        <Container className="mx-auto w-full max-w-[1000px] px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center p-8 md:p-16 rounded-[40px] border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-2xl shadow-[0_0_100px_rgba(139,92,246,0.15)] relative overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#c084fc] text-[13px] font-bold tracking-wide mb-8 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              <Rocket size={16} className="text-[#c084fc]" /> Start Building Today
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[48px] md:text-[64px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 tracking-tight leading-[1.1]"
            >
              The fastest way to build software together.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[18px] md:text-[20px] text-gray-400 font-medium max-w-[600px] mb-12 leading-relaxed"
            >
              Join thousands of developers already shipping faster with AI-powered collaboration.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-[16px] font-bold bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white border-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] gap-2 transition-all hover:-translate-y-0.5">
                Start Building Free <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-[16px] font-bold border-white/10 hover:bg-white/5 text-gray-300 rounded-full transition-all hover:-translate-y-0.5">
                Book a Demo
              </Button>
            </motion.div>
            
          </motion.div>
        </Container>
      </section>
    </>
  );
}

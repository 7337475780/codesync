"use client";

import Link from 'next/link';
import { Button } from '@codesync/ui/components/ui/button';
import { Container } from '@codesync/ui/components/layout/container';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-[100] bg-[#030303]/70 backdrop-blur-xl border-b border-white/[0.08]"
    >
      <Container className="mx-auto w-full flex h-16 items-center justify-between px-6 max-w-[1440px]">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] overflow-hidden flex items-center justify-center p-[1px] shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-500">
               <Image src="/logo.png" alt="CodeSync Logo" width={32} height={32} priority className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6]">CodeSync</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7 text-[14px] text-gray-400 font-medium">
            <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">Product <ChevronDown size={14} className="opacity-70"/></Link>
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">Solutions <ChevronDown size={14} className="opacity-70"/></Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Docs</Link>
            <Link href="#" className="hover:text-white transition-colors">Changelog</Link>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex text-gray-300 hover:text-white hover:bg-white/5 h-9 px-5 rounded-full text-[14px] font-medium transition-colors">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#4338ca] hover:to-[#6d28d9] text-white border-0 h-9 px-5 rounded-full text-[14px] font-medium shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all duration-300">
              Get Started Free <span className="ml-1 text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
            </Button>
          </Link>
        </div>
      </Container>
    </motion.nav>
  );
}

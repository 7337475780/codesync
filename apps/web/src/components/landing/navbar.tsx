import Link from 'next/link';
import { Button } from '@codesync/ui/components/ui/button';
import { Container } from '@codesync/ui/components/layout/container';
import { Github, ChevronDown } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[var(--z-navbar)] bg-background/80 backdrop-blur-md border-b border-white/5">
      <Container className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-[1400px]">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            {/* Hexagon/C logo */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center p-0.5">
               <div className="w-full h-full bg-background rounded-[6px] flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-purple-600 font-bold text-lg leading-none">C</span>
               </div>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">CodeSync</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary font-medium">
            <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">Product <ChevronDown size={14}/></Link>
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">Solutions <ChevronDown size={14}/></Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Docs</Link>
            <Link href="#" className="hover:text-white transition-colors">Changelog</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 text-text-secondary hover:text-white border border-white/10 rounded-full px-4 h-8 bg-white/5">
            <Github size={14} /> Star on GitHub <span className="bg-white/10 px-1.5 py-0.5 rounded text-xs ml-1">12.4k</span>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex border-white/10 text-white hover:bg-white/5 h-8 px-6 rounded-full">Login</Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 h-8 px-4 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Get Started Free →
          </Button>
        </div>
      </Container>
    </nav>
  );
}

"use client";

import { Container } from '@codesync/ui/components/layout/container';
import { motion } from 'framer-motion';

export function LogoCloud() {
  return (
    <section className="py-20 bg-[#030303] border-t border-white/[0.02]">
      <Container className="mx-auto w-full max-w-[1200px] px-6">
        <div className="flex flex-col items-center">
          <p className="text-[11px] font-semibold text-gray-500 tracking-[0.2em] uppercase mb-10 text-center">
            Trusted by developers and teams at
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Google */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.85-2.22.83-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-white text-xl font-medium tracking-tight">Google</span>
            </div>
            
            {/* Microsoft */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/></svg>
              <span className="text-white text-xl font-semibold tracking-tight">Microsoft</span>
            </div>

            {/* Vercel */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
              <span className="text-white text-xl font-bold tracking-tighter">vercel</span>
            </div>

            {/* Stripe */}
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-100 transition-opacity">
              <span className="text-white text-2xl font-bold tracking-tighter">stripe</span>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              <span className="text-white text-xl font-semibold tracking-tight">GitHub</span>
            </div>

            {/* Hashnode */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 00-7.962 0l-6.37 6.37a5.63 5.63 0 000 7.962l6.37 6.37a5.63 5.63 0 007.962 0l6.37-6.37a5.63 5.63 0 000-7.962zM12 15.953a3.953 3.953 0 110-7.906 3.953 3.953 0 010 7.906z"/></svg>
              <span className="text-white text-xl font-bold tracking-tight">hashnode</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

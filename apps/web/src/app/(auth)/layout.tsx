import { AuthBackground } from "@codesync/ui/components/auth/auth-background";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#030303] selection:bg-[#8b5cf6]/30 selection:text-white">
      {/* Left Panel - Branding & Features (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden border-r border-white/5 bg-[#0a0a0a]">
        <AuthBackground />
        
        <div className="relative z-10 flex flex-col h-full p-12 lg:p-16 justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-[1px] shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-shadow duration-500">
                 <Image src="/logo.png" alt="CodeSync Logo" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6]">
                CodeSync
              </span>
            </Link>
          </div>

          <div className="max-w-md mt-20">
            <h2 className="text-[32px] font-bold text-white tracking-tight mb-6 leading-[1.1]">
              The premium cloud IDE for modern engineering teams.
            </h2>
            <div className="space-y-4">
              {[
                "Instant zero-config development environments",
                "Real-time multiplayer collaboration",
                "Deep AI integration context-aware",
                "Enterprise-grade security and compliance"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400">
                  <CheckCircle2 className="w-5 h-5 text-[#8b5cf6]" />
                  <span className="text-[15px] font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["Alex", "Sam", "Jordan", "Taylor"].map((seed) => (
                  <Image 
                    key={seed} 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} 
                    alt={seed} 
                    width={32} 
                    height={32} 
                    unoptimized
                    className="rounded-full border border-[#0a0a0a] bg-[#141414]" 
                  />
                ))}
              </div>
              <p className="text-[13px] text-gray-500 font-medium">
                Join over <span className="text-gray-300">10,000+</span> developers building the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

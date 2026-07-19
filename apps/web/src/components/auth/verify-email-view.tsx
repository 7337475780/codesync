"use client";

import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { Button } from "@codesync/ui/components/ui/button";
import { Mail, ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export function VerifyEmailView() {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleResend = () => {
    setIsResending(true);
    // TODO: Supabase resend email integration
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  return (
    <AuthCard className="max-w-[450px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-6"
      >
        <div className="w-20 h-20 bg-[#8b5cf6]/20 rounded-2xl flex items-center justify-center mb-8 border border-[#8b5cf6]/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6]/20 to-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Mail className="w-10 h-10 text-[#8b5cf6]" />
        </div>
        
        <h2 className="text-[28px] font-bold text-white tracking-tight mb-3">
          Verify your email
        </h2>
        
        <p className="text-[15px] text-gray-400 mb-8 max-w-[320px] leading-relaxed">
          We've sent a verification link to your email address. Please click the link to activate your account.
        </p>

        <div className="w-full space-y-4">
          <Button
            onClick={() => window.open('https://gmail.com', '_blank')}
            className="w-full bg-white hover:bg-gray-200 text-black shadow-lg h-11 text-[15px]"
          >
            Open email app <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button
            onClick={handleResend}
            disabled={isResending || countdown > 0}
            variant="outline"
            className="w-full bg-[#111111] hover:bg-[#1a1a1a] border-white/[0.08] text-white h-11"
          >
            {isResending ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : countdown > 0 ? (
              <span className="text-gray-400">Resend email in {countdown}s</span>
            ) : (
              <>
                <RefreshCcw className="w-4 h-4 mr-2 text-gray-400" />
                Resend verification email
              </>
            )}
          </Button>
        </div>

        <p className="text-[13px] text-gray-500 mt-8">
          Wrong email address?{" "}
          <Link href="/signup" className="text-white hover:text-[#a78bfa] transition-colors">
            Change email
          </Link>
        </p>
      </motion.div>
    </AuthCard>
  );
}

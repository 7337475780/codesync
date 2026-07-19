"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@codesync/validators";
import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { FormField } from "@codesync/ui/components/auth/form-field";
import { Button } from "@codesync/ui/components/ui/button";
import { Mail, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsSubmitting(true);
    // TODO: Supabase forgot password integration
    setTimeout(() => {
      setEmail(data.email);
      setIsSent(true);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <AuthCard>
      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <Link href="/login" className="inline-flex items-center text-[13px] text-gray-500 hover:text-white transition-colors mb-6 w-fit gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>

            <AuthHeader 
              title="Reset password" 
              description="Enter your email address and we'll send you a link to reset your password." 
              className="text-left"
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
              <FormField
                id="email"
                type="email"
                label="Email address"
                placeholder="name@company.com"
                icon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register("email")}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-gray-200 text-black shadow-lg transition-all h-11"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <div className="w-16 h-16 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-[#8b5cf6]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
            <p className="text-[14px] text-gray-400 mb-8 max-w-[280px]">
              We sent a password reset link to <span className="text-white font-medium">{email}</span>.
            </p>
            
            <Link href="/login" className="w-full">
              <Button className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border-0 h-11">
                Return to log in
              </Button>
            </Link>
            
            <p className="text-[13px] text-gray-500 mt-6">
              Didn't receive the email?{" "}
              <button className="text-white hover:text-[#a78bfa] transition-colors" onClick={() => setIsSent(false)}>
                Click to resend
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}

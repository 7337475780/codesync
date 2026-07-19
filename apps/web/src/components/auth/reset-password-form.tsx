"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@codesync/validators";
import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { FormField } from "@codesync/ui/components/auth/form-field";
import { Button } from "@codesync/ui/components/ui/button";
import { PasswordStrength } from "@codesync/ui/components/auth/password-strength";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsSubmitting(true);
    // TODO: Supabase reset password integration
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <AuthCard>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <AuthHeader 
              title="Create new password" 
              description="Your new password must be different from previous used passwords." 
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <div className="relative">
                  <FormField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    placeholder="••••••••"
                    icon={<Lock className="w-4 h-4" />}
                    error={errors.password?.message}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordValue && <PasswordStrength password={passwordValue} />}
              </div>

              <FormField
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all h-11"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password reset</h2>
            <p className="text-[14px] text-gray-400 mb-8 max-w-[280px]">
              Your password has been successfully reset. Click below to log in magically.
            </p>
            
            <Link href="/login" className="w-full">
              <Button className="w-full bg-white hover:bg-gray-200 text-black shadow-lg h-11">
                Continue to login
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}

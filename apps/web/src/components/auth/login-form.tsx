"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@codesync/validators";
import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { FormField } from "@codesync/ui/components/auth/form-field";
import { AuthDivider } from "@codesync/ui/components/auth/auth-divider";
import { OAuthButtons } from "@codesync/ui/components/auth/oauth-buttons";
import { Button } from "@codesync/ui/components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginWithEmail, oauthSignIn } from "@/lib/auth/actions";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    const result = await loginWithEmail(data);
    
    if (result?.error) {
      setError("root", { message: result.error });
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader 
        title="Welcome back" 
        description="Enter your credentials to access your workspace." 
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormField
            id="email"
            type="email"
            label="Email address"
            placeholder="name@company.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <FormField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              inputClassName="!pr-10"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/[0.08] bg-[#141414] text-[#8b5cf6] focus:ring-[#8b5cf6]/20 transition-all cursor-pointer"
              {...register("rememberMe")}
            />
            <span className="text-[13px] text-gray-400">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[13px] text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {errors.root && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-[13px] text-red-400 text-center"
              >
                {errors.root.message}
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all h-11"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AuthDivider />
        <OAuthButtons onOAuth={oauthSignIn} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-[13px] text-gray-500"
      >
        Don't have an account?{" "}
        <Link href="/signup" className="text-white hover:text-[#a78bfa] transition-colors">
          Create an account
        </Link>
      </motion.p>
    </AuthCard>
  );
}

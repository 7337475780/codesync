"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@codesync/validators";
import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { FormField } from "@codesync/ui/components/auth/form-field";
import { AuthDivider } from "@codesync/ui/components/auth/auth-divider";
import { OAuthButtons } from "@codesync/ui/components/auth/oauth-buttons";
import { PasswordStrength } from "@codesync/ui/components/auth/password-strength";
import { Button } from "@codesync/ui/components/ui/button";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signupWithEmail, oauthSignIn } from "@/lib/auth/actions";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: undefined,
      newsletter: false,
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: SignupInput) => {
    setIsSubmitting(true);
    const result = await signupWithEmail(data);
    
    if (result?.error) {
      setError("root", { message: result.error });
      setIsSubmitting(false);
    } else if (result?.redirect) {
      // In a Client Component, we can use window.location or next/navigation router
      // But server actions usually redirect automatically. 
      // If the action returned { redirect: '...' }, we handle it manually.
      window.location.href = result.redirect;
    }
  };

  return (
    <AuthCard className="max-w-[500px]">
      <AuthHeader 
        title="Create your account" 
        description="Join thousands of developers building the future." 
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <FormField
              id="fullName"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              icon={<User className="w-4 h-4" />}
              error={errors.fullName?.message}
              {...register("fullName")}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <FormField
              id="username"
              type="text"
              label="Username"
              placeholder="johndoe"
              icon={<span className="font-mono text-gray-500">@</span>}
              error={errors.username?.message}
              {...register("username")}
            />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
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
          {passwordValue && <PasswordStrength password={passwordValue} />}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <FormField
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-white/[0.08] bg-[#141414] text-[#8b5cf6] focus:ring-[#8b5cf6]/20 transition-all cursor-pointer"
              {...register("acceptTerms")}
            />
            <span className="text-[13px] text-gray-400 leading-snug">
              I accept the <Link href="/terms" className="text-white hover:text-[#a78bfa] transition-colors">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:text-[#a78bfa] transition-colors">Privacy Policy</Link>.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-[12px] text-red-400 pl-7">{errors.acceptTerms.message}</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-white/[0.08] bg-[#141414] text-[#8b5cf6] focus:ring-[#8b5cf6]/20 transition-all cursor-pointer"
              {...register("newsletter")}
            />
            <span className="text-[13px] text-gray-400 leading-snug">
              Send me product updates and community news.
            </span>
          </label>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
            className="w-full mt-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all h-11"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Workspace"
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
        <AuthDivider />
        <OAuthButtons onOAuth={oauthSignIn} />
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center text-[13px] text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-white hover:text-[#a78bfa] transition-colors">
          Sign in
        </Link>
      </motion.p>
    </AuthCard>
  );
}

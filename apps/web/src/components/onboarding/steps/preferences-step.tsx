"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@codesync/ui/components/ui/button";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingPreferencesSchema, OnboardingPreferencesInput } from "@codesync/validators";
import { useState } from "react";
import { cn } from "@codesync/ui/utils/cn";

export function PreferencesStep() {
  const router = useRouter();
  const { preferences, updatePreferences, setStep, markStepComplete } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardingPreferencesInput>({
    resolver: zodResolver(onboardingPreferencesSchema),
    defaultValues: {
      theme: preferences.theme || "Dark",
      editorFont: preferences.editorFont || "JetBrains Mono",
      tabSize: preferences.tabSize || 2,
      fontSize: preferences.fontSize || 14,
      autoSave: preferences.autoSave ?? true,
      wordWrap: preferences.wordWrap ?? true,
      miniMap: preferences.miniMap ?? true,
      languages: preferences.languages || [],
      frameworks: preferences.frameworks || [],
      aiEnabled: preferences.aiEnabled ?? true,
      gitIntegration: preferences.gitIntegration ?? true,
      telemetry: preferences.telemetry ?? true,
      notifications: preferences.notifications ?? true,
      reducedMotion: preferences.reducedMotion ?? false,
      highContrast: preferences.highContrast ?? false,
    },
  });

  const watchLanguages = watch("languages");
  const watchTheme = watch("theme");
  const watchFont = watch("editorFont");

  const toggleLanguage = (lang: string) => {
    const current = watchLanguages || [];
    if (current.includes(lang)) {
      setValue("languages", current.filter((l) => l !== lang));
    } else {
      setValue("languages", [...current, lang]);
    }
  };

  const onSubmit = async (data: OnboardingPreferencesInput) => {
    setIsSubmitting(true);
    updatePreferences(data);
    
    setTimeout(() => {
      markStepComplete('PREFERENCES');
      setStep('INVITE');
      setIsSubmitting(false);
      router.push('/onboarding/invite');
    }, 500);
  };

  const goBack = () => {
    setStep('WORKSPACE');
    router.push('/onboarding/workspace');
  };

  return (
    <div className="space-y-6">
      <AuthHeader 
        title="Editor Preferences" 
        description="Tailor CodeSync to match your workflow." 
        className="text-left"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[13px] font-medium text-gray-300 mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {["Dark", "OLED", "Light"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue("theme", t as any)}
                className={cn(
                  "py-2 px-3 rounded-xl border text-[13px] font-medium transition-all text-center",
                  watchTheme === t 
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-white" 
                    : "bg-[#141414] border-white/5 text-gray-400 hover:border-white/20"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-gray-300 mb-2">Primary Languages</label>
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "JavaScript", "Python", "Rust", "Go", "C++", "Java"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={cn(
                  "py-1.5 px-4 rounded-full border text-[13px] font-medium transition-all",
                  watchLanguages?.includes(lang)
                    ? "bg-[#8b5cf6] border-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                    : "bg-[#141414] border-white/10 text-gray-400 hover:border-white/30"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
          {errors.languages && <p className="text-[12px] text-red-400 mt-1">{errors.languages.message}</p>}
        </div>

        <div>
          <label className="block text-[13px] font-medium text-gray-300 mb-2">Editor Font</label>
          <div className="grid grid-cols-2 gap-3">
            {["JetBrains Mono", "Fira Code", "Geist Mono", "Cascadia Code"].map((font) => (
              <button
                key={font}
                type="button"
                onClick={() => setValue("editorFont", font as any)}
                className={cn(
                  "py-2 px-3 rounded-xl border text-[13px] transition-all text-left",
                  watchFont === font 
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-white" 
                    : "bg-[#141414] border-white/5 text-gray-400 hover:border-white/20"
                )}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-white/[0.08] bg-[#141414] text-[#8b5cf6] focus:ring-[#8b5cf6]/20 transition-all cursor-pointer"
              {...register("aiEnabled")}
            />
            <div>
              <span className="block text-[13px] font-medium text-gray-200">AI Features</span>
              <span className="text-[12px] text-gray-500 leading-snug block mt-0.5">Enable autocomplete and chat.</span>
            </div>
          </label>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-white/[0.08] bg-[#141414] text-[#8b5cf6] focus:ring-[#8b5cf6]/20 transition-all cursor-pointer"
              {...register("telemetry")}
            />
            <div>
              <span className="block text-[13px] font-medium text-gray-200">Telemetry</span>
              <span className="text-[12px] text-gray-500 leading-snug block mt-0.5">Send anonymous usage data.</span>
            </div>
          </label>
        </div>
        
        <div className="pt-4 flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="bg-transparent border-white/10 hover:bg-white/5 text-white h-11 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-white hover:bg-gray-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] h-11 text-md font-semibold"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>Continue <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

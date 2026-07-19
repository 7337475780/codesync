"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@codesync/ui/components/ui/button";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { FormField } from "@codesync/ui/components/auth/form-field";
import { ArrowRight, ArrowLeft, Building2, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingWorkspaceSchema, OnboardingWorkspaceInput } from "@codesync/validators";
import { useState, useEffect } from "react";
import { cn } from "@codesync/ui/utils/cn";

export function WorkspaceStep() {
  const router = useRouter();
  const { workspace, updateWorkspace, setStep, markStepComplete } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardingWorkspaceInput>({
    resolver: zodResolver(onboardingWorkspaceSchema),
    defaultValues: {
      name: workspace.name || "",
      slug: workspace.slug || "",
      icon: workspace.icon || "",
      theme: workspace.theme || "blue",
      type: workspace.type || "Personal",
    },
  });

  const watchName = watch("name");
  const watchTheme = watch("theme");
  const watchType = watch("type");

  // Auto-generate slug from name
  useEffect(() => {
    if (watchName && !workspace.slug) {
      const generatedSlug = watchName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      setValue("slug", generatedSlug);
    }
  }, [watchName, workspace.slug, setValue]);

  const onSubmit = async (data: OnboardingWorkspaceInput) => {
    setIsSubmitting(true);
    updateWorkspace(data);
    
    setTimeout(() => {
      markStepComplete('WORKSPACE');
      setStep('PREFERENCES');
      setIsSubmitting(false);
      router.push('/onboarding/preferences');
    }, 500);
  };

  const goBack = () => {
    setStep('PROFILE');
    router.push('/onboarding/profile');
  };

  const themes = [
    { id: "blue", color: "bg-blue-500" },
    { id: "purple", color: "bg-purple-500" },
    { id: "green", color: "bg-emerald-500" },
    { id: "orange", color: "bg-orange-500" },
    { id: "neutral", color: "bg-gray-500" },
  ];

  return (
    <div className="space-y-6">
      <AuthHeader 
        title="Create your Workspace" 
        description="This is your team's home on CodeSync." 
        className="text-left"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="name"
          type="text"
          label="Workspace Name"
          placeholder="Acme Corp"
          icon={<Building2 className="w-4 h-4" />}
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-300">Workspace URL</label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/[0.08] bg-[#1a1a1a] text-gray-500 text-sm">
              codesync.app/
            </span>
            <input
              type="text"
              {...register("slug")}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-[#141414] border border-white/[0.08] text-white focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20 text-sm"
              placeholder="acme-corp"
            />
          </div>
          {errors.slug && <p className="text-[12px] text-red-400 mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block text-[13px] font-medium text-gray-300 mb-2">Workspace Type</label>
          <div className="grid grid-cols-3 gap-3">
            {["Personal", "Startup", "Company", "Education", "Open Source"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setValue("type", type as any)}
                className={cn(
                  "py-2 px-3 rounded-xl border text-[13px] font-medium transition-all text-center",
                  watchType === type 
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-white" 
                    : "bg-[#141414] border-white/5 text-gray-400 hover:border-white/20"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-gray-300 mb-2">Accent Color</label>
          <div className="flex items-center gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setValue("theme", theme.id as any)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  theme.color,
                  watchTheme === theme.id ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "opacity-50 hover:opacity-100"
                )}
              />
            ))}
          </div>
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

"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@codesync/ui/components/ui/button";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { FormField } from "@codesync/ui/components/auth/form-field";
import { ArrowRight, ArrowLeft, Upload, User, Globe, MapPin, AlignLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingProfileSchema, OnboardingProfileInput } from "@codesync/validators";
import { useState } from "react";

import { useRef } from "react";

export function ProfileStep() {
  const router = useRouter();
  const { profile, updateProfile, setStep, markStepComplete } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingProfileInput>({
    resolver: zodResolver(onboardingProfileSchema),
    defaultValues: {
      displayName: profile.displayName || "",
      username: profile.username || "",
      country: profile.country || "",
      timezone: profile.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      bio: profile.bio || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: OnboardingProfileInput) => {
    setIsSubmitting(true);
    updateProfile(data);
    
    // Simulate DB sync
    setTimeout(() => {
      markStepComplete('PROFILE');
      setStep('WORKSPACE');
      setIsSubmitting(false);
      router.push('/onboarding/workspace');
    }, 500);
  };

  const goBack = () => {
    setStep('WELCOME');
    router.push('/onboarding');
  };

  return (
    <div className="space-y-6">
      <AuthHeader 
        title="Your Profile" 
        description="Set up your identity in the CodeSync community." 
        className="text-left"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center gap-6">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif"
            className="hidden" 
          />
          <div 
            onClick={handleAvatarClick}
            className="w-20 h-20 rounded-full bg-[#141414] border border-white/[0.08] flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#8b5cf6] transition-colors"
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-[14px] font-medium text-white mb-1">Profile Picture</h3>
            <p className="text-[12px] text-gray-400">Upload a JPG, PNG, or GIF. Max size 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="displayName"
            type="text"
            label="Display Name"
            placeholder="John Doe"
            icon={<User className="w-4 h-4" />}
            error={errors.displayName?.message}
            {...register("displayName")}
          />
          <FormField
            id="username"
            type="text"
            label="Username"
            placeholder="johndoe"
            icon={<span className="font-mono text-gray-500">@</span>}
            error={errors.username?.message}
            {...register("username")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="country"
            type="text"
            label="Country"
            placeholder="United States"
            icon={<MapPin className="w-4 h-4" />}
            error={errors.country?.message}
            {...register("country")}
          />
          <FormField
            id="timezone"
            type="text"
            label="Timezone"
            placeholder="America/New_York"
            icon={<Globe className="w-4 h-4" />}
            error={errors.timezone?.message}
            {...register("timezone")}
          />
        </div>

        <FormField
          id="bio"
          type="text"
          label="Bio (Optional)"
          placeholder="Frontend engineer at Acme Corp..."
          icon={<AlignLeft className="w-4 h-4" />}
          error={errors.bio?.message}
          {...register("bio")}
        />
        
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

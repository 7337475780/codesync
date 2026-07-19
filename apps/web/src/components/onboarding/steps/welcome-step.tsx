"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@codesync/ui/components/ui/button";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function WelcomeStep() {
  const router = useRouter();
  const { setStep, markStepComplete } = useOnboardingStore();

  const handleNext = () => {
    markStepComplete('WELCOME');
    setStep('PROFILE');
    router.push('/onboarding/profile');
  };

  return (
    <div className="space-y-6">
      <AuthHeader 
        title="Welcome to CodeSync" 
        description="Let's personalize your development workspace. Setup takes about 2 minutes." 
        className="text-left"
      />
      
      <div className="pt-4 flex justify-end">
        <Button onClick={handleNext} type="button" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] h-11 px-8 text-md font-semibold">
          Get Started <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

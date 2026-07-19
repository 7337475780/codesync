"use client";

import { ReactNode } from "react";
import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { ProgressIndicator } from "@codesync/ui/components/onboarding/progress-indicator";
import { useOnboardingStore, ONBOARDING_STEPS } from "@/store/onboarding-store";

export function OnboardingShell({ children }: { children: ReactNode }) {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const currentStepIndex = ONBOARDING_STEPS.indexOf(currentStep);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-[#000000]">
      <AuthCard className="max-w-[700px] w-full relative overflow-visible shadow-2xl shadow-[#8b5cf6]/5">
        <div className="mb-6">
          <ProgressIndicator steps={ONBOARDING_STEPS} currentStepIndex={currentStepIndex} />
        </div>
        
        <div className="relative w-full overflow-hidden min-h-[400px]">
          {children}
        </div>
      </AuthCard>
    </div>
  );
}

import { ReactNode } from "react";
import { OnboardingShell } from "@/components/onboarding/layout/onboarding-shell";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingShell>
      {children}
    </OnboardingShell>
  );
}

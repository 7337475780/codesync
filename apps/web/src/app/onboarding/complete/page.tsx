import { CompletionStep } from "@/components/onboarding/steps/completion-step";

export const metadata = {
  title: "Setup Complete - CodeSync",
  description: "CodeSync workspace is ready",
};

export default function OnboardingCompletePage() {
  return <CompletionStep />;
}

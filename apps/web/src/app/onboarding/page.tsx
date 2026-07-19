import { WelcomeStep } from "@/components/onboarding/steps/welcome-step";

export const metadata = {
  title: "Onboarding - CodeSync",
  description: "Setup your CodeSync workspace",
};

export default function OnboardingPage() {
  return <WelcomeStep />;
}

import { ProfileStep } from "@/components/onboarding/steps/profile-step";

export const metadata = {
  title: "Profile Setup - CodeSync",
  description: "Set up your CodeSync profile",
};

export default function OnboardingProfilePage() {
  return <ProfileStep />;
}

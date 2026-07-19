import { WorkspaceStep } from "@/components/onboarding/steps/workspace-step";

export const metadata = {
  title: "Workspace Setup - CodeSync",
  description: "Set up your CodeSync workspace",
};

export default function OnboardingWorkspacePage() {
  return <WorkspaceStep />;
}

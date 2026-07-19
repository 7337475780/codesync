"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@codesync/ui/components/ui/button";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { ArrowRight, ArrowLeft, Mail, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingTeamSchema, OnboardingTeamInput, InviteMemberInput } from "@codesync/validators";
import { useState } from "react";
import { cn } from "@codesync/ui/utils/cn";

export function InviteStep() {
  const router = useRouter();
  const { team, updateTeam, setStep, markStepComplete } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentRole, setCurrentRole] = useState<"Owner" | "Admin" | "Developer" | "Viewer">("Developer");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardingTeamInput>({
    resolver: zodResolver(onboardingTeamSchema),
    defaultValues: {
      invites: team.invites || [],
    },
  });

  const invites = watch("invites") || [];

  const handleAddInvite = () => {
    if (!currentEmail.includes("@")) return; // Very basic validation
    const exists = invites.some((i) => i.email === currentEmail);
    if (!exists) {
      setValue("invites", [...invites, { email: currentEmail, role: currentRole }]);
    }
    setCurrentEmail("");
  };

  const handleRemoveInvite = (email: string) => {
    setValue("invites", invites.filter((i) => i.email !== email));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInvite();
    }
  };

  const onSubmit = async (data: OnboardingTeamInput) => {
    setIsSubmitting(true);
    updateTeam(data);
    
    setTimeout(() => {
      markStepComplete('INVITE');
      setStep('COMPLETE');
      setIsSubmitting(false);
      router.push('/onboarding/complete');
    }, 500);
  };

  const skipAndComplete = () => {
    markStepComplete('INVITE');
    setStep('COMPLETE');
    router.push('/onboarding/complete');
  };

  const goBack = () => {
    setStep('PREFERENCES');
    router.push('/onboarding/preferences');
  };

  return (
    <div className="space-y-6">
      <AuthHeader 
        title="Invite your Team" 
        description="Collaboration is at the heart of CodeSync." 
        className="text-left"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div>
          <label className="block text-[13px] font-medium text-gray-300 mb-2">Invite by Email</label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full pl-10 pr-3 py-2 rounded-l-md bg-[#141414] border border-white/[0.08] text-white focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20 text-sm h-10"
                placeholder="colleague@company.com"
              />
            </div>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as any)}
              className="px-3 py-2 border border-l-0 border-white/[0.08] bg-[#1a1a1a] text-gray-300 text-sm h-10 appearance-none focus:outline-none focus:ring-[#8b5cf6]/20"
            >
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button
              type="button"
              onClick={handleAddInvite}
              className="px-4 py-2 rounded-r-md bg-[#222222] border border-l-0 border-white/[0.08] text-white hover:bg-[#333333] transition-colors text-sm font-medium h-10"
            >
              Add
            </button>
          </div>
        </div>

        {invites.length > 0 && (
          <div className="space-y-2 mt-4">
            <label className="block text-[13px] font-medium text-gray-400">Pending Invites ({invites.length})</label>
            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              {invites.map((invite) => (
                <div key={invite.email} className="flex items-center justify-between p-2.5 rounded-lg bg-[#141414] border border-white/[0.05]">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-gray-200">{invite.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-medium px-2 py-1 bg-[#1a1a1a] text-gray-400 rounded-md uppercase tracking-wider">{invite.role}</span>
                    <button type="button" onClick={() => handleRemoveInvite(invite.email)} className="text-gray-500 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
            type="button"
            variant="ghost"
            onClick={skipAndComplete}
            className="text-gray-400 hover:text-white h-11"
          >
            Skip
          </Button>

          <Button 
            type="submit" 
            disabled={isSubmitting || invites.length === 0}
            className={cn(
              "flex-1 h-11 text-md font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]",
              invites.length > 0 ? "bg-white hover:bg-gray-200 text-black" : "bg-[#1a1a1a] text-gray-500 hover:bg-[#1a1a1a] cursor-not-allowed shadow-none border border-white/[0.05]"
            )}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>Send Invites <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

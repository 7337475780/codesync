"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@codesync/ui/components/ui/button";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// We would ideally use canvas-confetti here for a celebration effect, simulating it
import { createBrowserClient } from "@supabase/ssr";

export function CompletionStep() {
  const router = useRouter();
  const { workspace, profile, preferences, markStepComplete } = useOnboardingStore();
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Just marking completion
    markStepComplete('COMPLETE');
  }, [markStepComplete]);

  const handleEnterWorkspace = async () => {
    setIsFinishing(true);
    setError(null);

    try {
      // Create Supabase client
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) throw authError;

      if (user) {
        // We will insert the dummy onboarding progress completion to satisfy the middleware
        const { error: upsertError } = await supabase
          .from('onboarding_progress')
          .upsert({
            user_id: user.id,
            current_step: 'COMPLETE',
            finished: true,
            updated_at: new Date().toISOString()
          });
          
        if (upsertError) throw upsertError;
      } else {
        throw new Error("No authenticated user found.");
      }

      // After saving, route to dashboard
      setTimeout(() => {
        setIsFinishing(false);
        router.push('/dashboard');
      }, 1000);
    } catch (e: any) {
      console.error("Failed to save progress", e);
      setIsFinishing(false);
      setError(e.message || "Failed to finalize onboarding. Please try again.");
    }
  };

  return (
    <div className="space-y-8 flex flex-col items-center text-center py-6">
      <div className="w-20 h-20 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center mb-2">
        <Sparkles className="w-10 h-10 text-[#8b5cf6]" />
      </div>

      <AuthHeader 
        title="You're all set!" 
        description={`Your workspace "${workspace.name || 'CodeSync'}" is ready for you and your team.`} 
      />
      
      <div className="w-full bg-[#141414] border border-white/[0.08] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-left">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[14px] text-white font-medium">Profile configured</span>
            <span className="text-[12px] text-gray-500">@{profile.username || 'user'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-left">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[14px] text-white font-medium">Workspace provisioned</span>
            <span className="text-[12px] text-gray-500">{workspace.slug || 'codesync'}.codesync.app</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-left">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[14px] text-white font-medium">Preferences saved</span>
            <span className="text-[12px] text-gray-500">{preferences.theme} Theme • {preferences.editorFont}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-left">
          <p className="text-[13px] text-red-400 font-medium">{error}</p>
        </div>
      )}

      <Button 
        onClick={handleEnterWorkspace}
        disabled={isFinishing}
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] h-12 text-lg font-semibold mt-4"
      >
        {isFinishing ? (
          <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>Enter Workspace <ArrowRight className="w-5 h-5 ml-2" /></>
        )}
      </Button>
    </div>
  );
}

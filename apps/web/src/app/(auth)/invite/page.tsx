import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@codesync/ui/components/ui/button";

export default function InvitePage() {
  return (
    <AuthCard className="text-center">
      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Users className="w-8 h-8 text-blue-500" />
      </div>
      <AuthHeader title="You've been invited" description="Acme Corp invited you to join their workspace on CodeSync." />
      
      <div className="flex flex-col gap-3 mt-6">
        <Link href="/signup" className="w-full">
          <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg h-11">
            Accept Invitation
          </Button>
        </Link>
        <Link href="/login" className="text-[13px] text-gray-400 hover:text-white transition-colors mt-2">
          Already have an account? Sign in
        </Link>
      </div>
    </AuthCard>
  );
}

import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@codesync/ui/components/ui/button";

export default function SessionExpiredPage() {
  return (
    <AuthCard className="text-center">
      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Clock className="w-8 h-8 text-yellow-500" />
      </div>
      <AuthHeader title="Session Expired" description="Your session has expired for security reasons. Please log in again." />
      <Link href="/login" className="w-full mt-6 block">
        <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg h-11">
          Log in again
        </Button>
      </Link>
    </AuthCard>
  );
}

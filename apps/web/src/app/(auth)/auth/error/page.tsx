import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@codesync/ui/components/ui/button";

export default function AuthErrorPage() {
  return (
    <AuthCard className="text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <AuthHeader title="Authentication Error" description="There was a problem signing you in." />
      <Link href="/login" className="w-full mt-6 block">
        <Button className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border-0 h-11">
          Back to login
        </Button>
      </Link>
    </AuthCard>
  );
}

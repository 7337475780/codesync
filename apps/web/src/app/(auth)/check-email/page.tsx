import { AuthCard } from "@codesync/ui/components/auth/auth-card";
import { AuthHeader } from "@codesync/ui/components/auth/auth-header";
import { Button } from "@codesync/ui/components/ui/button";
import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <AuthCard className="text-center">
      <div className="w-16 h-16 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <MailCheck className="w-8 h-8 text-[#8b5cf6]" />
      </div>
      <AuthHeader title="Check your email" description="If an account exists, we've sent instructions." />
      <Link href="/login" className="w-full mt-6 block">
        <Button className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border-0 h-11">
          Back to login
        </Button>
      </Link>
    </AuthCard>
  );
}

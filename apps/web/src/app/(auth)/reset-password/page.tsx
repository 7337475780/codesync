import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Reset Password - CodeSync",
  description: "Set a new password for your CodeSync workspace",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

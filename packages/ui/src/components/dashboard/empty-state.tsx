import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: ReactNode;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  illustration,
  children
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-3xl bg-[#0a0a0a]/50">
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-[#8b5cf6]/20 rounded-full blur-xl group-hover:bg-[#8b5cf6]/30 transition-colors duration-500" />
        <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
          {illustration ? illustration : <Icon className="w-8 h-8 text-[#8b5cf6]" />}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mb-8">{description}</p>
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all h-11 px-8 rounded-full"
        >
          {actionLabel}
        </Button>
      )}

      {children && (
        <div className="mt-8 w-full max-w-md">
          {children}
        </div>
      )}
    </div>
  );
}

import { cn } from "../../utils/cn";
import { ReactNode } from "react";

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function AuthHeader({ title, description, className }: AuthHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-[14px] text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

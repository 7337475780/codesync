import { cn } from "../../utils/cn";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  steps: string[];
  currentStepIndex: number;
}

export function ProgressIndicator({ steps, currentStepIndex }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8 relative w-full">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -z-10" />
      <div 
        className="absolute top-1/2 left-0 h-[2px] bg-[#8b5cf6] -z-10 transition-all duration-500 ease-out" 
        style={{ width: `${(currentStepIndex / (Math.max(steps.length - 1, 1))) * 100}%` }} 
      />
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div
            key={step}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-500 shadow-xl",
              isCompleted && "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]",
              isCurrent && "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] ring-4 ring-[#8b5cf6]/20",
              !isCompleted && !isCurrent && "bg-[#141414] text-gray-500 border border-white/10"
            )}
          >
            {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
          </div>
        );
      })}
    </div>
  );
}

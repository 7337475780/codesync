"use client";

import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  inputClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, icon, inputClassName, ...props }, ref) => {
    return (
      <div className={cn("space-y-1.5", className)}>
        <label htmlFor={id} className="block text-[13px] font-medium text-gray-300">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {icon}
            </div>
          )}
          <Input
            id={id}
            ref={ref}
            style={{ 
              paddingLeft: icon ? '2.5rem' : undefined,
              paddingRight: inputClassName?.includes('pr-10') ? '2.5rem' : undefined 
            }}
            className={cn(
              "w-full bg-[#141414] border-white/[0.08] text-white focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20 transition-all",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              inputClassName
            )}
            {...props}
          />
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[12px] text-red-400 mt-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FormField.displayName = "FormField";

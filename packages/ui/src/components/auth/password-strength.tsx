"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character", met: /[\W_]/.test(password) },
  ];

  const strength = requirements.filter((req) => req.met).length;
  
  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-700";
    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Strength Bar */}
      <div className="flex gap-1 h-1.5 w-full">
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            className={`flex-1 rounded-full ${
              index <= strength ? getStrengthColor() : "bg-white/10"
            }`}
            layout
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {requirements.map((req, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-[12px] transition-colors duration-300 ${
              req.met ? "text-green-400" : "text-gray-500"
            }`}
          >
            {req.met ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <X className="w-3.5 h-3.5 opacity-50" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

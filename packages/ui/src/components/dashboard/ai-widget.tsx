import { Sparkles, ArrowRight, Zap, Code2 } from "lucide-react";
import Link from "next/link";

export function AIWidget() {
  const suggestions = [
    { title: "Refactor auth-middleware.ts", desc: "Found 3 potential edge cases in your latest commit.", icon: Code2, type: "Code Quality" },
    { title: "Optimize UsageChart rendering", desc: "Recharts is causing unnecessary re-renders. Use useMemo.", icon: Zap, type: "Performance" },
  ];

  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8b5cf6]/10 rounded-full blur-3xl group-hover:bg-[#8b5cf6]/20 transition-colors duration-700" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-white font-medium">AI Insights</h3>
        </div>
        <Link href="/dashboard/ai" className="text-[12px] text-gray-400 hover:text-white flex items-center gap-1 group/link">
          Open Assistant <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors cursor-pointer group/card">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-amber-400 shrink-0">
                <suggestion.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[13px] font-medium text-gray-200 group-hover/card:text-white">{suggestion.title}</h4>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 uppercase tracking-wider">{suggestion.type}</span>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed">{suggestion.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

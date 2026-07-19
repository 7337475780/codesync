import { FileCode, FolderGit2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProductivityWidget() {
  const recentFiles = [
    { name: "page.tsx", path: "apps/web/src/app", time: "10m ago", icon: FileCode, color: "text-[#3b82f6]" },
    { name: "dashboard-widgets.tsx", path: "packages/ui/src/components", time: "1h ago", icon: FileCode, color: "text-[#3b82f6]" },
    { name: "schema.sql", path: "packages/database", time: "3h ago", icon: FolderGit2, color: "text-[#8b5cf6]" },
  ];

  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Continue Working</h3>
        <Link href="/dashboard/projects" className="text-[12px] text-gray-400 hover:text-white flex items-center gap-1 group">
          View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {recentFiles.map((file, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className={`w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0 ${file.color}`}>
              <file.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 group-hover:text-white truncate">{file.name}</h4>
              <p className="text-[12px] text-gray-500 truncate">{file.path}</p>
            </div>
            <span className="text-[11px] text-gray-600 shrink-0">{file.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

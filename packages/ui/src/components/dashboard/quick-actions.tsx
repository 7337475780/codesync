import { FolderGit2, Github, Copy, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    { title: "New Project", desc: "Start from scratch", icon: FolderGit2, href: "/dashboard/projects/new", color: "from-[#8b5cf6]/20 to-[#8b5cf6]/5", text: "text-[#8b5cf6]", border: "group-hover:border-[#8b5cf6]/50" },
    { title: "Import", desc: "From GitHub URL", icon: Github, href: "/dashboard/projects/import", color: "from-blue-500/20 to-blue-500/5", text: "text-blue-500", border: "group-hover:border-blue-500/50" },
    { title: "Templates", desc: "Use a starter kit", icon: Copy, href: "/dashboard/templates", color: "from-emerald-500/20 to-emerald-500/5", text: "text-emerald-500", border: "group-hover:border-emerald-500/50" },
    { title: "Invite Team", desc: "Collaborate together", icon: Users, href: "/dashboard/team", color: "from-pink-500/20 to-pink-500/5", text: "text-pink-500", border: "group-hover:border-pink-500/50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, i) => (
        <Link 
          key={i} 
          href={action.href}
          className={`relative overflow-hidden bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 ${action.border}`}
        >
          {/* Gradient background hover effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className={`w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-[#222] transition-colors ${action.text}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
          
          <div className="relative z-10 mt-auto pt-4">
            <h3 className="text-white font-medium text-sm">{action.title}</h3>
            <p className="text-[12px] text-gray-500 mt-1">{action.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

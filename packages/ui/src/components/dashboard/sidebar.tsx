"use client";

import { useSidebarStore } from "../../store/sidebar-store";
import { cn } from "../../utils/cn";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Copy, 
  Github, 
  Sparkles, 
  Rocket, 
  Activity, 
  Users, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Database,
  User as UserIcon,
  Box
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useNotificationStore } from "../../store/notification-store";
import { useEffect } from "react";
export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const { unreadCount, setUnreadCount } = useNotificationStore();
  const pathname = usePathname();

  useEffect(() => {
    // Poll for unread count every 30 seconds
    const fetchUnread = async () => {
      try {
        const res = await fetch('/api/notifications/unread?userId=mock-user-id');
        const data = await res.json();
        if (data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      } catch (e) {}
    };
    
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [setUnreadCount]);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
    { label: "Templates", href: "/dashboard/templates", icon: Copy },
    { label: "GitHub", href: "/dashboard/github", icon: Github },
    { label: "AI Assistant", href: "/dashboard/ai", icon: Sparkles },
    { label: "Deployments", href: "/dashboard/deployments", icon: Rocket },
    { label: "Activity", href: "/dashboard/activity", icon: Activity },
    { label: "Team", href: "/dashboard/team", icon: Users },
  ];

  const bottomItems = [
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out z-40",
          isCollapsed ? "w-[72px]" : "w-[260px] hidden lg:flex"
        )}
      >
        {/* Workspace Switcher / Logo Area */}
        <div className="h-16 flex items-center px-4 border-b border-white/5 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 w-full group overflow-hidden">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow shrink-0 bg-[#141414]">
               <Image src="/logo.png" alt="CodeSync" width={24} height={24} className="w-full h-full object-contain" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] truncate">
                CodeSync
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group",
                  isActive 
                    ? "bg-[#8b5cf6]/10 text-white" 
                    : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active" 
                    className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#8b5cf6] rounded-r-full" 
                  />
                )}
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-[#8b5cf6]" : "")} />
                {!isCollapsed && <span className="text-[14px] font-medium truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-white/5 flex flex-col gap-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-gray-400 hover:text-gray-100 hover:bg-white/5 group"
              title={isCollapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="text-[14px] font-medium truncate">{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className="bg-[#8b5cf6] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#8b5cf6] rounded-full border border-[#0a0a0a]" />
              )}
            </Link>
          ))}
        </div>

        {/* Usage & Collapse */}
        <div className="p-4 border-t border-white/5 bg-[#080808]">
          {!isCollapsed ? (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-[12px] text-gray-500">
                <span>Storage</span>
                <span>8.2 GB / 10 GB</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-[#8b5cf6] w-[82%]" />
              </div>
            </div>
          ) : (
             <div className="flex justify-center mb-4 text-gray-500">
               <Database className="w-5 h-5" />
             </div>
          )}
          
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center justify-center w-full py-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors",
              isCollapsed ? "" : "gap-2"
            )}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[13px] font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

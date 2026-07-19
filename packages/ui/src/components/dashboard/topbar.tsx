"use client";

import { useSidebarStore } from "../../store/sidebar-store";
import { cn } from "../../utils/cn";
import { Search, Menu, Plus, Bell, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { useSearchStore } from "../../store/search-store";
import { useNotificationStore } from "../../store/notification-store";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Topbar() {
  const { setMobileOpen } = useSidebarStore();
  const { setOpen } = useSearchStore();
  const { unreadCount } = useNotificationStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isNotificationsOpen) {
      fetch('/api/notifications?limit=5&userId=mock-user-id')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setRecentNotifications(data);
        })
        .catch(() => {});
    }
  }, [isNotificationsOpen]);

  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between shrink-0">
      
      {/* Left section - Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[14px]">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 cursor-pointer transition-colors text-gray-300 hover:text-white">
            <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Acme`} alt="Acme Corp" width={20} height={20} className="rounded-full bg-[#141414] border border-white/10" unoptimized />
            <span className="font-medium">Acme Corp</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium px-2">Dashboard</span>
        </div>
      </div>

      {/* Middle section - Global Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button 
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-white/5 hover:border-white/10 rounded-lg text-sm text-gray-400 transition-colors group"
        >
          <Search className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
          <span className="flex-1 text-left">Search anything...</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#222] border border-white/5 rounded text-[10px] font-medium font-sans">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#222] border border-white/5 rounded text-[10px] font-medium font-sans">K</kbd>
          </div>
        </button>
      </div>

      {/* Right section - Actions & Profile */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-white/5 hover:border-[#8b5cf6]/50 rounded-lg text-sm text-gray-300 transition-colors">
          <Globe className="w-4 h-4 text-[#8b5cf6]" />
          <span>Deploy</span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg transition-colors relative",
              isNotificationsOpen ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8b5cf6] rounded-full border-2 border-[#0a0a0a]" />
            )}
          </button>
          
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
              >
                <div className="p-3 border-b border-white/5 flex items-center justify-between bg-[#141414]">
                  <h3 className="font-medium text-white text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-[#8b5cf6]/20 text-[#8b5cf6] px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  {recentNotifications.length > 0 ? (
                    recentNotifications.map(n => (
                      <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors flex gap-3">
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${n.status === 'UNREAD' || n.status === 'unread' ? 'bg-[#8b5cf6]' : 'bg-transparent'}`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-200 truncate">{n.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{n.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No recent notifications
                    </div>
                  )}
                </div>
                
                <div className="p-2 border-t border-white/5 bg-[#141414]">
                  <Link 
                    href="/dashboard/notifications" 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="block w-full text-center py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition-colors shadow-[0_0_15px_rgba(139,92,246,0.2)]">
          <Plus className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors">
          <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User`} alt="User" width={28} height={28} className="rounded-full bg-[#141414] border border-white/10" unoptimized />
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
      
    </header>
  );
}

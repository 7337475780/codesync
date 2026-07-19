"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Terminal, Database, Package, History, Settings, Play, RefreshCw, StopCircle } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

const NAV_ITEMS = [
  { href: '', label: 'Overview', icon: LayoutDashboard },
  { href: '/logs', label: 'Logs', icon: Terminal },
  { href: '/environment', label: 'Environment', icon: Database },
  { href: '/packages', label: 'Packages', icon: Package },
  { href: '/terminal', label: 'Terminal', icon: Terminal },
  { href: '/snapshots', label: 'Snapshots', icon: History },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const pathname = usePathname();
  const basePath = `/dashboard/projects/${params.projectId}/workspace`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-background">
      {/* Global Workspace Header */}
      <div className="px-8 py-4 border-b border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workspace Console</h1>
          <p className="text-sm text-muted-foreground mt-1">Project ID: {params.projectId}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <StopCircle className="w-4 h-4 mr-2" /> Stop
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" /> Restart
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="w-4 h-4 mr-2 fill-current" /> Open Editor
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Persistent Sidebar */}
        <aside className="w-64 border-r border-border bg-card/50 flex-shrink-0 overflow-y-auto p-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const fullHref = `${basePath}${item.href}`;
              const isActive = pathname === fullHref;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content with Animated Transitions */}
        <main className="flex-1 overflow-y-auto bg-background p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

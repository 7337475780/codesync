"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Terminal, Globe, Lock, Settings } from 'lucide-react';

const tabs = [
  { name: 'Overview', href: '/dashboard/deployments', icon: LayoutDashboard, exact: true },
  { name: 'History', href: '/dashboard/deployments/history', icon: History, exact: false },
  { name: 'Logs', href: '/dashboard/deployments/logs', icon: Terminal, exact: false },
  { name: 'Domains', href: '/dashboard/deployments/domains', icon: Globe, exact: false },
  { name: 'Environment', href: '/dashboard/deployments/environment', icon: Lock, exact: false },
  { name: 'Settings', href: '/dashboard/deployments/settings', icon: Settings, exact: false },
];

export const DeploymentLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="border-b border-border bg-surface px-6 py-4 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Deployments</h1>
          <p className="text-text-secondary text-sm">Manage builds, domains, and environment configurations.</p>
        </div>
        <nav className="flex gap-6">
          {tabs.map(tab => {
            const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
            return (
              <Link 
                key={tab.name} 
                href={tab.href}
                className={`flex items-center gap-2 pb-2 text-sm font-medium border-b-2 transition-colors ${
                  isActive ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 md:p-8">
        <div className="max-w-6xl mx-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

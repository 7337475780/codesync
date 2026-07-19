"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BookMarked, Activity, Download, GitPullRequest, CircleDot, PlayCircle, Settings } from 'lucide-react';
import { OrganizationSwitcher } from './organization-switcher';
import { usePathname } from 'next/navigation';

export const GithubLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/github', icon: LayoutDashboard },
    { name: 'Repositories', href: '/dashboard/github/repositories', icon: BookMarked },
    { name: 'Pull Requests', href: '/dashboard/github/pull-requests', icon: GitPullRequest },
    { name: 'Issues', href: '/dashboard/github/issues', icon: CircleDot },
    { name: 'Actions', href: '/dashboard/github/actions', icon: PlayCircle },
    { name: 'Import', href: '/dashboard/github/import', icon: Download },
    { name: 'Settings', href: '/dashboard/github/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Top Navigation for GitHub Module */}
      <header className="flex-shrink-0 border-b border-border bg-surface flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4 lg:gap-8 min-w-0 flex-1 mr-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center text-primary font-bold text-xl">
              G
            </div>
            <h1 className="text-xl font-bold hidden sm:block">GitHub Integration</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide flex-nowrap min-w-0">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-muted text-text-primary' 
                      : 'text-text-muted hover:bg-muted/50 hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <OrganizationSwitcher />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 relative">
        <div className="max-w-[1400px] mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

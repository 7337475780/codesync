'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Settings, Shield, Briefcase, Palette, Bell } from 'lucide-react';

export function SettingsNav() {
  const pathname = usePathname();

  const items = [
    { href: '/dashboard/settings/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings/account', label: 'Account', icon: Settings },
    { href: '/dashboard/settings/workspace', label: 'Workspace', icon: Briefcase },
    { href: '/dashboard/settings/appearance', label: 'Appearance', icon: Palette },
    { href: '/dashboard/settings/notifications', label: 'Notifications', icon: Bell },
    { href: '/dashboard/settings/security', label: 'Security', icon: Shield },
  ];
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

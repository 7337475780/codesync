import React from 'react';
import { SettingsNav } from '@/components/settings/settings-nav';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 mt-8">
          <aside className="lg:w-1/5 shrink-0">
            <SettingsNav />
          </aside>
          <div className="flex-1 lg:max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Search } from 'lucide-react';

const shortcuts = [
  { action: 'Command Palette', keys: ['⌘', 'K'] },
  { action: 'Search Files', keys: ['⌘', 'P'] },
  { action: 'Toggle Terminal', keys: ['⌘', '`'] },
  { action: 'Close Tab', keys: ['⌘', 'W'] },
  { action: 'Save File', keys: ['⌘', 'S'] },
  { action: 'Format Document', keys: ['⌥', '⇧', 'F'] },
  { action: 'Toggle Sidebar', keys: ['⌘', 'B'] },
];

export default function KeyboardShortcutsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Keyboard Shortcuts" 
        description="Customize your IDE keybindings for maximum productivity."
      />
      
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search shortcuts..." 
            className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Card className="p-0 overflow-hidden border-border/50">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4 text-right">Keybinding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {shortcuts.map((shortcut, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-medium group-hover:text-primary transition-colors">{shortcut.action}</td>
                  <td className="px-6 py-4 text-right space-x-1">
                    {shortcut.keys.map((key, j) => (
                      <kbd key={j} className="inline-flex items-center justify-center px-2 py-1 bg-secondary border border-border rounded text-xs font-sans font-medium text-foreground min-w-[24px]">
                        {key}
                      </kbd>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

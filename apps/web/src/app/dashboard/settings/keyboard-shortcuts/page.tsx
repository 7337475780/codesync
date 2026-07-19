import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';

export const metadata = {
  title: 'Keyboard Shortcuts | CodeSync',
};

export default function KeyboardShortcutsSettingsPage() {
  const shortcuts = [
    { label: 'Global Search', keys: ['Ctrl', 'K'] },
    { label: 'Command Palette', keys: ['Ctrl', 'Shift', 'P'] },
    { label: 'Toggle Sidebar', keys: ['Ctrl', 'B'] },
    { label: 'New File', keys: ['Ctrl', 'N'] },
    { label: 'Save', keys: ['Ctrl', 'S'] },
    { label: 'Format Code', keys: ['Shift', 'Alt', 'F'] },
    { label: 'Close Tab', keys: ['Ctrl', 'W'] },
    { label: 'Toggle Terminal', keys: ['Ctrl', '`'] },
  ];

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Keyboard Shortcuts" 
        description="View and customize your keyboard shortcuts."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="rounded-md border">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center p-4 border-b last:border-0 hover:bg-muted/50 transition-colors">
                <span className="font-medium text-sm">{shortcut.label}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, i) => (
                    <kbd key={i} className="pointer-events-none inline-flex h-6 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

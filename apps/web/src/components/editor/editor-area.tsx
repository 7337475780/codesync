import React from 'react';
import { EditorTabs } from './editor-tabs';
import { EditorToolbar } from './editor-toolbar';
import { WelcomeScreen } from './welcome-screen';
import { EditorContainer } from './EditorContainer';
import { useFileTabsStore } from '@/store/file-tabs-store';

export function EditorArea() {
  const { openTabs, activeFileId } = useFileTabsStore();

  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e] overflow-hidden relative">
      <EditorTabs />
      <EditorToolbar />
      <div className="flex-1 relative overflow-hidden bg-[#141414]">
        {openTabs.length === 0 || !activeFileId ? (
          <WelcomeScreen />
        ) : activeFileId === 'welcome' ? (
          <WelcomeScreen />
        ) : (
          <EditorContainer />
        )}
      </div>
    </div>
  );
}

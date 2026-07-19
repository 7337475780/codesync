import React from 'react';
import { useFileTabsStore } from '@/store/file-tabs-store';
import { EditorBreadcrumb } from './EditorBreadcrumb';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(
  () => import('./MonacoEditor').then((mod) => mod.MonacoEditor),
  { ssr: false }
);

export function EditorContainer() {
  const { activeFileId, models } = useFileTabsStore();
  
  if (!activeFileId || !models[activeFileId]) return null;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-[#141414]">
      <EditorBreadcrumb path={models[activeFileId].id} />
      <div className="flex-1 relative">
        <MonacoEditor fileId={activeFileId} />
      </div>
    </div>
  );
}

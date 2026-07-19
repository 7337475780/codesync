'use client';

import React from 'react';
import { PanelLayout } from '@/components/editor/panel-layout';
import { CollaborationManager } from '@/components/collaboration/CollaborationManager';
import { AIManager } from '@/components/ai/AIManager';
import { RuntimeManager } from '@/components/runtime/RuntimeManager';

export default function EditorPage() {
  return (
    <>
      <AIManager />
      <CollaborationManager />
      <RuntimeManager />
      <PanelLayout />
    </>
  );
}

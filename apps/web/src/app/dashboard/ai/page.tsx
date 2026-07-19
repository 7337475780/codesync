"use client";

import React from 'react';
import { AiLayoutShell } from '@/components/ai/ai-layout-shell';
import { ChatUI } from '@/components/ai/chat-ui';

export default function AiDashboardPage() {
  return (
    <AiLayoutShell>
      <ChatUI />
    </AiLayoutShell>
  );
}

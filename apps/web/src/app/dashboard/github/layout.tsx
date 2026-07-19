import React from 'react';
import { GithubLayoutShell } from '@/components/github/github-layout-shell';

export default function GithubLayout({ children }: { children: React.ReactNode }) {
  return (
    <GithubLayoutShell>
      {children}
    </GithubLayoutShell>
  );
}

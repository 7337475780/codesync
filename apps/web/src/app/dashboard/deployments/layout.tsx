import React from 'react';
import { DeploymentLayoutShell } from '@/components/deployments/deployment-layout-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deployments - CodeSync',
  description: 'Manage your deployments and hosting.',
};

export default function DeploymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DeploymentLayoutShell>
      {children}
    </DeploymentLayoutShell>
  );
}

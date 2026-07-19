import React from 'react';
import { PlanOverview } from '@/components/billing/plan-overview';
import { UsageAnalytics } from '@/components/billing/usage-analytics';
import { PaymentMethods } from '@/components/billing/payment-methods';
import { InvoiceHistory } from '@/components/billing/invoice-history';

export const metadata = {
  title: 'Billing & Usage | CodeSync Enterprise',
};

export default function BillingDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing & Usage</h2>
          <p className="text-muted-foreground mt-1">Manage your team's plan, view usage analytics, and download invoices.</p>
        </div>
      </div>
      
      <div className="grid gap-8">
        <PlanOverview />
        <UsageAnalytics />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <PaymentMethods />
          <InvoiceHistory />
        </div>
      </div>
    </div>
  );
}

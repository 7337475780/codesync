import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { CheckCircle2, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Billing Settings | CodeSync',
};

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Billing & Subscription" 
        description="Manage your subscription plan, payment methods, and billing history."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
            <div>
              <h3 className="text-xl font-bold">Pro Plan</h3>
              <p className="text-muted-foreground mt-1">
                You are currently on the Pro plan. Your next billing cycle starts on <strong>Aug 1, 2026</strong>.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Unlimited public & private repositories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Advanced AI code generation (GPT-4 / Claude 3.5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
            </div>
            <div className="bg-primary/10 p-6 rounded-lg text-center min-w-[200px]">
              <div className="text-3xl font-bold">$20<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
              <Button className="mt-4 w-full">Manage Subscription</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            Payment Method
          </h3>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 border rounded-md">
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-2 rounded-md">
                <CreditCard className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/28</p>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

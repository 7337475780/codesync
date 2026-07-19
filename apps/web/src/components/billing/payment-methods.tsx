import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { CreditCard, Plus } from 'lucide-react';

export function PaymentMethods() {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold">Payment Methods</h3>
          <p className="text-sm text-muted-foreground mt-1">Manage cards used for subscription billing.</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/20">
          <div className="flex items-center gap-4">
            <div className="bg-background border p-2 rounded-md h-10 w-14 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/28</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
            <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="bg-background border p-2 rounded-md h-10 w-14 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Mastercard ending in 5555</p>
              <p className="text-xs text-muted-foreground">Expires 08/25</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Make Default</Button>
            <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

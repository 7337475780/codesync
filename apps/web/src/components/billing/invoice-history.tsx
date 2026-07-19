import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Download, Receipt } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-008', date: 'Jul 1, 2026', amount: '$20.00', status: 'Paid' },
  { id: 'INV-2026-007', date: 'Jun 1, 2026', amount: '$20.00', status: 'Paid' },
  { id: 'INV-2026-006', date: 'May 1, 2026', amount: '$20.00', status: 'Paid' },
  { id: 'INV-2026-005', date: 'Apr 1, 2026', amount: '$20.00', status: 'Paid' },
];

export function InvoiceHistory() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Invoice History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
            <tr>
              <th className="px-4 py-3 rounded-l-md">Invoice</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right rounded-r-md">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4 font-medium">{invoice.id}</td>
                <td className="px-4 py-4 text-muted-foreground">{invoice.date}</td>
                <td className="px-4 py-4">{invoice.amount}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

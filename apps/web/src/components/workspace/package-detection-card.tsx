import React from 'react';
import { Package, CheckCircle2 } from 'lucide-react';

const PACKAGES = [
  { name: 'react', version: '^18.2.0', category: 'UI' },
  { name: 'next', version: '14.1.0', category: 'Framework' },
  { name: 'tailwindcss', version: '^3.4.1', category: 'Styling' },
  { name: 'prisma', version: '^5.8.1', category: 'Database' },
  { name: 'lucide-react', version: '^0.312.0', category: 'UI' },
  { name: 'zod', version: '^3.22.4', category: 'Validation' },
  { name: 'eslint', version: '^8.56.0', category: 'Linting' },
  { name: 'typescript', version: '^5.3.3', category: 'Runtime' },
];

export const PackageDetectionCard = () => {
  // Group by category
  const categories = PACKAGES.reduce((acc, pkg) => {
    if (!acc[pkg.category]) acc[pkg.category] = [];
    acc[pkg.category].push(pkg);
    return acc;
  }, {} as Record<string, typeof PACKAGES>);

  return (
    <div className="bg-card border rounded-xl overflow-hidden mt-8">
      <div className="p-6 border-b bg-muted/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Package Graph</h3>
            <p className="text-sm text-muted-foreground">Detected dependencies and modules</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold">{PACKAGES.length}</span>
          <div className="text-sm text-muted-foreground mt-1">Total Packages</div>
        </div>
      </div>
      <div className="p-6 bg-background space-y-6">
        {Object.entries(categories).map(([category, pkgs]) => (
          <div key={category}>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 tracking-wider">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {pkgs.map(pkg => (
                <div key={pkg.name} className="flex items-center space-x-2 bg-muted/50 border px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium">{pkg.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{pkg.version}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

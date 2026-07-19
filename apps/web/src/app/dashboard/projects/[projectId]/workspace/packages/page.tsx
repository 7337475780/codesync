"use client";

import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldAlert, CheckCircle2, Package as PackageIcon } from 'lucide-react';
import { Input } from '@codesync/ui/components/ui/input';

interface PkgInfo {
  name: string;
  version: string;
  type: 'dependency' | 'devDependency' | 'peerDependency';
  status: 'up-to-date' | 'outdated' | 'vulnerable';
}

const MOCK_PACKAGES: PkgInfo[] = [
  { name: 'react', version: '^18.2.0', type: 'dependency', status: 'up-to-date' },
  { name: 'react-dom', version: '^18.2.0', type: 'dependency', status: 'up-to-date' },
  { name: 'next', version: '14.1.0', type: 'dependency', status: 'outdated' },
  { name: 'tailwindcss', version: '^3.4.1', type: 'devDependency', status: 'up-to-date' },
  { name: 'typescript', version: '^5.3.3', type: 'devDependency', status: 'up-to-date' },
  { name: 'axios', version: '0.21.1', type: 'dependency', status: 'vulnerable' },
  { name: 'lucide-react', version: '^0.364.0', type: 'peerDependency', status: 'up-to-date' },
];

export default function PackagesPage({ params }: { params: { projectId: string } }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPkgs = MOCK_PACKAGES.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: PkgInfo['status']) => {
    switch (status) {
      case 'up-to-date':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Up to date</span>;
      case 'outdated':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500"><AlertTriangle className="w-3 h-3 mr-1" /> Outdated</span>;
      case 'vulnerable':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-500"><ShieldAlert className="w-3 h-3 mr-1" /> Vulnerable</span>;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Packages</h2>
          <p className="text-muted-foreground mt-1">Manage project dependencies and security alerts.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              aria-label="Search packages"
              placeholder="Search packages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Package</th>
                <th className="px-6 py-3 font-medium">Version</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPkgs.map((p, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium flex items-center">
                    <PackageIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                    {p.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{p.version}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground capitalize">
                      {p.type.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {getStatusBadge(p.status)}
                  </td>
                </tr>
              ))}
              {filteredPkgs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <PackageIcon className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm font-medium">No packages found</p>
                      <p className="text-xs opacity-70 mt-1">Try adjusting your search query.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

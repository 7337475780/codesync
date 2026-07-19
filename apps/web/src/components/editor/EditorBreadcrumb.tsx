import React from 'react';
import { ChevronRight } from 'lucide-react';

export function EditorBreadcrumb({ path }: { path: string }) {
  const parts = path.split('/');
  
  return (
    <div className="flex items-center gap-1 px-4 py-1 text-xs text-gray-400 bg-[#1e1e1e] border-b border-[#2d2d2d] shrink-0">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <span className="hover:text-white cursor-pointer transition-colors">{part}</span>
          {index < parts.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
        </React.Fragment>
      ))}
    </div>
  );
}

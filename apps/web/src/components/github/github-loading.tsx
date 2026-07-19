import React from 'react';
import { Loader2 } from 'lucide-react';

export const GithubLoading = ({ text = 'Loading GitHub Data...' }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-muted-foreground w-full h-full min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

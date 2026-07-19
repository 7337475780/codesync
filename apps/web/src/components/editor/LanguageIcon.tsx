import React from 'react';
import { FileCode2, FileJson, FileText, ImageIcon, TerminalSquare, Database, Code2 } from 'lucide-react';
import { getLanguageFromPath } from '@/lib/editor/languages';

export function LanguageIcon({ path, className }: { path: string; className?: string }) {
  const language = getLanguageFromPath(path);

  switch (language) {
    case 'typescript':
    case 'javascript':
      return <FileCode2 className={className || "w-4 h-4 text-blue-400"} />;
    case 'json':
      return <FileJson className={className || "w-4 h-4 text-yellow-400"} />;
    case 'markdown':
      return <FileText className={className || "w-4 h-4 text-gray-400"} />;
    case 'html':
      return <Code2 className={className || "w-4 h-4 text-orange-400"} />;
    case 'css':
    case 'scss':
      return <Code2 className={className || "w-4 h-4 text-blue-500"} />;
    case 'sql':
      return <Database className={className || "w-4 h-4 text-gray-300"} />;
    case 'shell':
      return <TerminalSquare className={className || "w-4 h-4 text-green-400"} />;
    default:
      if (path.match(/\.(png|jpg|svg|gif)$/i)) {
        return <ImageIcon className={className || "w-4 h-4 text-purple-400"} />;
      }
      return <FileText className={className || "w-4 h-4 text-gray-400"} />;
  }
}

import React from 'react';
import { GitFileChange } from '@/lib/git/types';
import { Plus, Minus, FileText } from 'lucide-react';
import { useGitStore } from '@/store/git-store';

interface ChangesListProps {
  title: string;
  files: GitFileChange[];
  staged: boolean;
}

export function ChangesList({ title, files, staged }: ChangesListProps) {
  const { stage, unstage } = useGitStore();
  
  if (files.length === 0) return null;

  const handleAction = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    if (staged) {
      unstage([path]);
    } else {
      stage([path]);
    }
  };

  const handleActionAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const paths = files.map(f => f.path);
    if (staged) {
      unstage(paths);
    } else {
      stage(paths);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'modified': return 'text-blue-400';
      case 'added':
      case 'untracked': return 'text-green-400';
      case 'deleted': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusLetter = (status: string) => {
    switch (status) {
      case 'modified': return 'M';
      case 'added': return 'A';
      case 'untracked': return 'U';
      case 'deleted': return 'D';
      default: return '?';
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center justify-between px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider group cursor-pointer hover:text-gray-300">
        <span className="flex items-center gap-2">
          {title} <span className="bg-[#3d3d3d] text-white px-1.5 py-0.5 rounded-full text-[10px] leading-none">{files.length}</span>
        </span>
        <button 
          onClick={handleActionAll}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded"
          title={staged ? "Unstage All Changes" : "Stage All Changes"}
        >
          {staged ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="flex flex-col">
        {files.map(file => (
          <div 
            key={file.path}
            className="flex items-center justify-between py-1 px-4 hover:bg-[#2a2d2e] cursor-pointer group"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-sm text-gray-300 truncate">{file.path.split('/').pop()}</span>
              <span className="text-xs text-gray-500 truncate">{file.path.split('/').slice(0, -1).join('/')}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={(e) => handleAction(e, file.path)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                title={staged ? "Unstage Change" : "Stage Change"}
              >
                {staged ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
              <span className={`text-xs font-bold w-4 text-center ${getStatusColor(file.status)}`}>
                {getStatusLetter(file.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useGitStore } from '@/store/git-store';
import { Check } from 'lucide-react';

export function CommitBox() {
  const { commit, changes } = useGitStore();
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  
  const hasStaged = changes.some(c => c.staged);

  const handleCommit = async () => {
    if (!message.trim() || !hasStaged) return;
    
    const fullMessage = description ? `${message}\n\n${description}` : message;
    await commit(fullMessage);
    setMessage('');
    setDescription('');
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-b border-[#2d2d2d]">
      <input 
        type="text"
        placeholder="Message (Press Ctrl+Enter to commit)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-[#3c3c3c] border border-transparent focus:border-[#007acc] rounded px-2 py-1.5 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none transition-colors"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            handleCommit();
          }
        }}
      />
      <textarea 
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full bg-[#3c3c3c] border border-transparent focus:border-[#007acc] rounded px-2 py-1.5 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none transition-colors resize-none custom-scrollbar"
      />
      <button 
        onClick={handleCommit}
        disabled={!message.trim() || !hasStaged}
        className="w-full flex items-center justify-center gap-2 bg-[#007acc] hover:bg-[#0066aa] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-1.5 rounded transition-colors"
      >
        <Check className="w-4 h-4" />
        Commit
      </button>
    </div>
  );
}

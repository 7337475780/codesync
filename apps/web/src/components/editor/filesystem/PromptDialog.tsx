import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PromptDialogProps {
  isOpen: boolean;
  title: string;
  defaultValue?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export function PromptDialog({ isOpen, title, defaultValue = '', onClose, onSubmit }: PromptDialogProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d]">
          <h3 className="text-sm font-medium text-gray-200">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) {
              onSubmit(value.trim());
              onClose();
            }
          }}
          className="p-4"
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-[#141414] border border-[#3d3d3d] rounded px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#007acc] transition-colors"
            placeholder="Type a name..."
          />
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white bg-transparent hover:bg-white/5 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-4 py-1.5 text-sm font-medium text-white bg-[#007acc] hover:bg-[#0066aa] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

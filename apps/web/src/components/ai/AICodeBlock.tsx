import React, { useState } from 'react';
import { Check, Copy, Terminal, Play } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AICodeBlockProps {
  language: string;
  value: string;
}

export function AICodeBlock({ language, value }: AICodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTerminal = language === 'bash' || language === 'sh' || language === 'shell';

  return (
    <div className="relative group my-4 rounded-md overflow-hidden border border-[#3e3e42] bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d2d2d] border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          {isTerminal ? <Terminal className="w-3.5 h-3.5 text-gray-400" /> : null}
          <span className="text-xs text-gray-400 font-sans">{language || 'text'}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isTerminal && (
            <button className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors">
              <Play className="w-3 h-3" />
              Run
            </button>
          )}
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="text-[13px] custom-scrollbar">
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
          PreTag="div"
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

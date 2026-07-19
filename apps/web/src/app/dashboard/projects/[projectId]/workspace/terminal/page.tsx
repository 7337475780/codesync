"use client";

import React, { useState } from 'react';
import { TerminalSquare, RefreshCw, XCircle, Copy, Play } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

interface TerminalSession {
  id: string;
  name: string;
  status: 'running' | 'stopped';
  command: string;
  output: string[];
}

const MOCK_SESSIONS: TerminalSession[] = [
  {
    id: 'term-1',
    name: 'Build Process',
    status: 'running',
    command: 'npm run build',
    output: [
      '> codesync@0.1.0 build',
      '> next build',
      'info  - Loaded env from .env.local',
      'info  - Checking validity of types...',
      'info  - Creating an optimized production build...',
      'info  - Compiled successfully',
      'info  - Collecting page data...',
      'info  - Generating static pages (0/5)',
      'info  - Generating static pages (5/5)',
      'info  - Finalizing page optimization...'
    ]
  },
  {
    id: 'term-2',
    name: 'Development Server',
    status: 'stopped',
    command: 'npm run dev',
    output: [
      '> codesync@0.1.0 dev',
      '> next dev',
      'ready - started server on 0.0.0.0:3000, url: http://localhost:3000',
      'event - compiled client and server successfully in 1250 ms (147 modules)',
      'wait  - compiling...',
      'event - compiled client and server successfully in 320 ms (147 modules)',
      '^C',
      'Terminated by user'
    ]
  }
];

export default function TerminalPage({ params }: { params: { projectId: string } }) {
  const [sessions, setSessions] = useState<TerminalSession[]>(MOCK_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>(MOCK_SESSIONS[0].id);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const copyOutput = () => {
    navigator.clipboard.writeText(activeSession.output.join('\n'));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Terminal Sessions</h2>
          <p className="text-muted-foreground mt-1">Manage running processes and terminal history.</p>
        </div>
        <Button variant="outline">
          <Play className="w-4 h-4 mr-2" /> New Session
        </Button>
      </div>

      <div className="flex flex-1 border rounded-xl overflow-hidden shadow-sm bg-card min-h-0">
        {/* Sidebar for Sessions */}
        <div className="w-64 border-r border-border bg-muted/20 flex flex-col">
          <div className="p-3 border-b border-border bg-muted/50 font-medium text-sm text-muted-foreground">
            Active Sessions
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map(session => (
              <button
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                aria-current={activeSessionId === session.id ? "true" : "false"}
                className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeSessionId === session.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <TerminalSquare className="w-4 h-4 mr-2 opacity-70" />
                <span className="truncate flex-1">{session.name}</span>
                <span className={`w-2 h-2 rounded-full ${session.status === 'running' ? 'bg-green-500' : 'bg-muted-foreground/50'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 flex flex-col bg-surface min-w-0">
          {/* Terminal Toolbar */}
          <div className="px-4 py-2 bg-surface-elevated border-b border-white/10 flex items-center justify-between text-text-primary text-sm">
            <div className="flex items-center">
              <span className="font-mono text-xs px-2 py-1 bg-white/5 rounded text-text-secondary mr-3">
                $ {activeSession.command}
              </span>
              <span className={`text-xs flex items-center ${activeSession.status === 'running' ? 'text-green-400' : 'text-text-muted'}`}>
                {activeSession.status === 'running' ? 'Running' : 'Stopped'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" title="Restart Terminal" aria-label="Restart Terminal">
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" onClick={copyOutput} title="Copy Output" aria-label="Copy Output">
                <Copy className="w-3.5 h-3.5" />
              </Button>
              {activeSession.status === 'running' && (
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-900/20" title="Kill Terminal" aria-label="Kill Terminal">
                  <XCircle className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="flex-1 p-4 font-mono text-[13px] text-text-primary overflow-y-auto whitespace-pre-wrap">
            {activeSession.output.map((line, i) => (
              <div key={i} className="min-h-[1.25rem]">{line}</div>
            ))}
            {activeSession.status === 'running' && (
              <div className="flex items-center mt-1">
                <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

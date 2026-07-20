import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import { WebglAddon } from '@xterm/addon-webgl';
import { ServerTerminalProvider } from '@/lib/terminal/providers/ServerTerminalProvider';
import 'xterm/css/xterm.css';

interface TerminalProps {
  id: string;
}

export function Terminal({ id }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const providerRef = useRef<ServerTerminalProvider | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    const xterm = new XTerm({
      fontFamily: 'Consolas, "Courier New", monospace',
      fontSize: 13,
      windowsMode: true,
      theme: {
        background: '#141414',
        foreground: '#cccccc',
        cursor: '#ffffff',
        selectionBackground: '#264f78',
      },
      cursorBlink: true,
    });
    
    xtermRef.current = xterm;

    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    xterm.loadAddon(fitAddon);
    
    xterm.loadAddon(new WebLinksAddon());
    xterm.loadAddon(new SearchAddon());
    
    try {
      xterm.loadAddon(new WebglAddon());
    } catch (e) {
      console.warn("WebGL addon failed to load, falling back to canvas", e);
    }

    const provider = new ServerTerminalProvider(id);
    providerRef.current = provider;

    provider.onData((data) => {
      xterm.write(data);
    });

    xterm.onData((data) => {
      provider.write(data);
    });
    
    xterm.onResize(({ cols, rows }) => {
      provider.resize(cols, rows);
    });

    let hasOpened = false;
    let resizeObserver: ResizeObserver | null = null;

    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          if (!hasOpened && terminalRef.current) {
            hasOpened = true;
            xterm.open(terminalRef.current);
            
            try {
              fitAddon.fit();
            } catch (e) {
              console.debug('Initial fit failed', e);
            }

            provider.start(xterm.cols, xterm.rows).then(() => {
              setIsReady(true);
            }).catch(console.error);
            
          } else if (hasOpened) {
            try {
              fitAddon.fit();
            } catch (e) {
              console.debug('Terminal resize skipped', e);
            }
          }
        }
      }
    });

    resizeObserver.observe(terminalRef.current);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      provider.dispose();
      xterm.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full p-2 relative bg-[#141414]">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] z-10 text-gray-500 font-mono text-sm">
          Connecting to PTY...
        </div>
      )}
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
}


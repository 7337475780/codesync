import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import { WebglAddon } from '@xterm/addon-webgl';
import { MockRuntimeProvider } from '@/lib/terminal/providers/MockRuntimeProvider';
import 'xterm/css/xterm.css';

interface TerminalProps {
  id: string;
}

export function Terminal({ id }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const runtimeRef = useRef<MockRuntimeProvider | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm instance (but don't open it yet)
    const xterm = new XTerm({
      fontFamily: 'Consolas, "Courier New", monospace',
      fontSize: 13,
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

    const runtime = new MockRuntimeProvider();
    runtimeRef.current = runtime;

    let currentInput = '';
    
    xterm.onData((data) => {
      const code = data.charCodeAt(0);
      
      if (code === 13) { // Enter
        runtime.execute(currentInput, (out) => xterm.write(out));
        currentInput = '';
      } else if (code === 127) { // Backspace
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          xterm.write('\b \b');
        }
      } else if (code === 3) { // Ctrl+C
        runtime.kill();
        currentInput = '';
      } else {
        currentInput += data;
        xterm.write(data);
      }
    });

    let hasOpened = false;
    let resizeObserver: ResizeObserver | null = null;

    // Use ResizeObserver to ensure we only open and fit when the element actually has dimensions
    // This prevents the "Cannot read properties of undefined (reading 'dimensions')" error in xterm.js
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

            runtime.start().then(() => {
              runtime.printPrompt();
            });
            setIsReady(true);
          } else if (hasOpened) {
            // Already opened, just resize
            try {
              fitAddon.fit();
              runtime.resize(xterm.cols, xterm.rows);
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
      runtime.stop();
      xterm.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full p-2 relative bg-[#141414]">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] z-10 text-gray-500 font-mono text-sm">
          Initializing Terminal Engine...
        </div>
      )}
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
}

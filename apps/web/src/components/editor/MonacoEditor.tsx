import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

loader.config({ monaco });
import { useEditorSettingsStore } from '@/store/editor-settings-store';
import { getEditorOptions } from '@/lib/editor/editor-config';
import { defineThemes } from '@/lib/editor/themes';
import { registerEditorShortcuts } from '@/lib/editor/editor-shortcuts';
import { useFileTabsStore } from '@/store/file-tabs-store';
import { extname } from '@/lib/filesystem/utils';

export function MonacoEditor({ fileId }: { fileId: string }) {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  
  const { settings } = useEditorSettingsStore();
  const { models, updateModelContent, updateCursorPosition, updateScrollPosition } = useFileTabsStore();
  const model = models[fileId];

  useEffect(() => {
    if (monaco) {
      defineThemes(monaco);
      monaco.editor.setTheme(settings.theme);
    }
  }, [monaco, settings.theme]);

  const handleEditorDidMount = (editorInstance: any, monacoInstance: any) => {
    editorRef.current = editorInstance;
    registerEditorShortcuts(editorInstance, monacoInstance, useFileTabsStore.getState());
    
    // Restore cursor and scroll
    if (model) {
      editorInstance.setPosition(model.cursorPosition);
      editorInstance.setScrollPosition(model.scrollPosition);
    }

    // Bind event listeners for cursor and scroll
    editorInstance.onDidChangeCursorPosition((e: any) => {
      updateCursorPosition(fileId, { lineNumber: e.position.lineNumber, column: e.position.column });
    });

    editorInstance.onDidScrollChange((e: any) => {
      updateScrollPosition(fileId, { scrollTop: e.scrollTop, scrollLeft: e.scrollLeft });
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateModelContent(fileId, value);
    }
  };

  if (!model) return null;

  const ext = extname(model.id);
  const langMap: Record<string, string> = { 'ts': 'typescript', 'tsx': 'typescript', 'js': 'javascript', 'jsx': 'javascript', 'json': 'json', 'md': 'markdown', 'html': 'html', 'css': 'css' };
  const language = langMap[ext] || 'plaintext';

  return (
    <div className="flex-1 w-full h-full relative">
      <Editor
        height="100%"
        language={language}
        path={model.id}
        value={model.content}
        theme={settings.theme}
        options={getEditorOptions(settings)}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        loading={
          <div className="w-full h-full flex items-center justify-center bg-[#141414] text-gray-500 font-mono text-sm">
            Loading Editor Engine...
          </div>
        }
      />
    </div>
  );
}

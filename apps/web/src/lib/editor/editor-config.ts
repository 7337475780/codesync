import { EditorSettings } from '@/store/editor-settings-store';
import { editor } from 'monaco-editor';

export const getEditorOptions = (settings: EditorSettings): editor.IStandaloneEditorConstructionOptions => {
  return {
    fontSize: settings.fontSize,
    tabSize: settings.tabSize,
    insertSpaces: settings.insertSpaces,
    wordWrap: settings.wordWrap,
    minimap: { enabled: settings.minimap },
    lineNumbers: settings.lineNumbers,
    cursorStyle: settings.cursorStyle,
    cursorBlinking: settings.cursorBlinking,
    smoothScrolling: settings.smoothScrolling,
    bracketPairColorization: { enabled: settings.bracketPairColorization },
    renderWhitespace: settings.renderWhitespace,
    
    // Sensible Enterprise Defaults
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
    fontLigatures: true,
    padding: { top: 16, bottom: 16 },
    scrollBeyondLastLine: false,
    roundedSelection: true,
    automaticLayout: true,
    fixedOverflowWidgets: true,
    formatOnPaste: true,
    formatOnType: true,
    linkedEditing: true, // HTML tags auto rename
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    suggest: {
      showIcons: true,
      showStatusBar: true,
      preview: true,
    },
    stickyScroll: {
      enabled: true,
    },
  };
};

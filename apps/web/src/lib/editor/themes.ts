export const defineThemes = (monaco: any) => {
  monaco.editor.defineTheme('codesync-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { background: '141414' }
    ],
    colors: {
      'editor.background': '#141414',
      'editor.lineHighlightBackground': '#1e1e1e',
      'editorCursor.foreground': '#8b5cf6',
      'editor.selectionBackground': '#3a3d41',
      'editorIndentGuide.background': '#2d2d2d',
      'editorIndentGuide.activeBackground': '#4d4d4d',
    }
  });

  monaco.editor.defineTheme('oled-black', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { background: '000000' }
    ],
    colors: {
      'editor.background': '#000000',
      'editor.lineHighlightBackground': '#111111',
      'editorCursor.foreground': '#ffffff',
    }
  });
};

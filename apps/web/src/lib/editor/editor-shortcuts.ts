export const registerEditorShortcuts = (editorInstance: any, monaco: any, store: any) => {
  // Ctrl/Cmd + S : Save
  editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    // In a real app, this would trigger an API call to save the file
    // For now, we'll just clear the dirty state of the active file
    const activeFileId = store.activeFileId;
    if (activeFileId) {
      store.setFileDirty(activeFileId, false);
    }
  });

  // Ctrl/Cmd + P : Quick Open
  editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
    console.log("Trigger Command Palette: Quick Open");
    // Trigger your command palette store here
  });

  // Example: formatting shortcut intercept
  editorInstance.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
    editorInstance.getAction('editor.action.formatDocument').run();
  });
};

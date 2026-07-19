import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  minimap: boolean;
  lineNumbers: 'on' | 'off' | 'relative' | 'interval';
  cursorStyle: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
  cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
  smoothScrolling: boolean;
  bracketPairColorization: boolean;
  renderWhitespace: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  autoSave: 'off' | 'afterDelay' | 'onFocusChange' | 'onWindowChange';
  theme: string;
}

interface EditorSettingsState {
  settings: EditorSettings;
  updateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
  resetSettings: () => void;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  tabSize: 2,
  insertSpaces: true,
  wordWrap: 'on',
  minimap: true,
  lineNumbers: 'on',
  cursorStyle: 'line',
  cursorBlinking: 'smooth',
  smoothScrolling: true,
  bracketPairColorization: true,
  renderWhitespace: 'selection',
  autoSave: 'off',
  theme: 'codesync-dark',
};

export const useEditorSettingsStore = create<EditorSettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSetting: (key, value) => 
        set((state) => ({
          settings: { ...state.settings, [key]: value },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'codesync-editor-settings',
    }
  )
);

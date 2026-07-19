import { create } from 'zustand';

export interface EditorModel {
  id: string; // usually the file path
  content: string;
  isDirty: boolean;
  cursorPosition: { lineNumber: number; column: number };
  scrollPosition: { scrollTop: number; scrollLeft: number };
}

interface FileTabsState {
  models: Record<string, EditorModel>;
  openTabs: string[]; // array of file paths
  activeFileId: string | null;

  // Model Management
  openModel: (id: string, initialContent: string) => void;
  updateModelContent: (id: string, content: string) => void;
  setModelDirty: (id: string, isDirty: boolean) => void;
  updateCursorPosition: (id: string, position: { lineNumber: number; column: number }) => void;
  updateScrollPosition: (id: string, position: { scrollTop: number; scrollLeft: number }) => void;
  
  // Tab Management
  closeTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeAllTabs: () => void;
  setActiveTab: (id: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
}

export const useFileTabsStore = create<FileTabsState>((set) => ({
  models: {},
  openTabs: [],
  activeFileId: null,

  openModel: (id, initialContent) => set((state) => {
    const newState: Partial<FileTabsState> = {};
    if (!state.models[id]) {
      newState.models = {
        ...state.models,
        [id]: {
          id,
          content: initialContent,
          isDirty: false,
          cursorPosition: { lineNumber: 1, column: 1 },
          scrollPosition: { scrollTop: 0, scrollLeft: 0 },
        }
      };
    }
    
    if (!state.openTabs.includes(id)) {
      newState.openTabs = [...state.openTabs, id];
    }
    
    newState.activeFileId = id;
    return newState;
  }),

  updateModelContent: (id, content) => set((state) => {
    const model = state.models[id];
    if (!model) return state;
    return {
      models: {
        ...state.models,
        [id]: { ...model, content, isDirty: true }
      }
    };
  }),

  setModelDirty: (id, isDirty) => set((state) => {
    const model = state.models[id];
    if (!model) return state;
    return {
      models: {
        ...state.models,
        [id]: { ...model, isDirty }
      }
    };
  }),

  updateCursorPosition: (id, position) => set((state) => {
    const model = state.models[id];
    if (!model) return state;
    return {
      models: {
        ...state.models,
        [id]: { ...model, cursorPosition: position }
      }
    };
  }),

  updateScrollPosition: (id, position) => set((state) => {
    const model = state.models[id];
    if (!model) return state;
    return {
      models: {
        ...state.models,
        [id]: { ...model, scrollPosition: position }
      }
    };
  }),

  closeTab: (id) => set((state) => {
    const newTabs = state.openTabs.filter(tabId => tabId !== id);
    let newActiveId = state.activeFileId;
    if (newActiveId === id) {
      newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
    }
    return { openTabs: newTabs, activeFileId: newActiveId };
  }),

  closeOtherTabs: (id) => set((state) => {
    if (!state.openTabs.includes(id)) return state;
    return { openTabs: [id], activeFileId: id };
  }),

  closeAllTabs: () => set({ openTabs: [], activeFileId: null }),

  setActiveTab: (id) => set((state) => {
    if (state.openTabs.includes(id)) {
      return { activeFileId: id };
    }
    return state;
  }),

  reorderTabs: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.openTabs);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { openTabs: result };
  }),
}));

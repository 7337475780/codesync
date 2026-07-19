import { create } from 'zustand';

type SidebarPanel = 'EXPLORER' | 'SEARCH' | 'GIT' | 'EXTENSIONS' | 'AI' | 'SETTINGS' | 'COLLABORATION' | 'RUNTIME' | 'DEBUGGER';

interface EditorLayoutState {
  sidebarVisible: boolean;
  activeSidebarPanel: SidebarPanel;
  aiPanelVisible: boolean;
  bottomPanelVisible: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarVisible: (visible: boolean) => void;
  setActiveSidebarPanel: (panel: SidebarPanel) => void;
  
  toggleAiPanel: () => void;
  setAiPanelVisible: (visible: boolean) => void;
  
  toggleBottomPanel: () => void;
  setBottomPanelVisible: (visible: boolean) => void;
}

export const useEditorLayoutStore = create<EditorLayoutState>((set) => ({
  sidebarVisible: true,
  activeSidebarPanel: 'EXPLORER',
  aiPanelVisible: false,
  bottomPanelVisible: true,
  
  toggleSidebar: () => set((state) => ({ sidebarVisible: !state.sidebarVisible })),
  setSidebarVisible: (visible) => set({ sidebarVisible: visible }),
  setActiveSidebarPanel: (panel) => set({ activeSidebarPanel: panel, sidebarVisible: true }),
  
  toggleAiPanel: () => set((state) => ({ aiPanelVisible: !state.aiPanelVisible })),
  setAiPanelVisible: (visible) => set({ aiPanelVisible: visible }),
  
  toggleBottomPanel: () => set((state) => ({ bottomPanelVisible: !state.bottomPanelVisible })),
  setBottomPanelVisible: (visible) => set({ bottomPanelVisible: visible }),
}));

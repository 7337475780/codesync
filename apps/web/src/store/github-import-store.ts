import { create } from 'zustand';

export type ImportStep = 'connect' | 'select_org' | 'select_repo' | 'select_branch' | 'configure' | 'importing';

export interface GitHubImportState {
  currentStep: ImportStep;
  isOpen: boolean;
  selectedOrg: string | null;
  selectedRepo: string | null;
  selectedBranch: string | null;
  isAnalyzing: boolean;
  setStep: (step: ImportStep) => void;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedOrg: (org: string | null) => void;
  setSelectedRepo: (repo: string | null) => void;
  setSelectedBranch: (branch: string | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useGitHubImportStore = create<GitHubImportState>((set) => ({
  currentStep: 'connect',
  isOpen: false,
  selectedOrg: null,
  selectedRepo: null,
  selectedBranch: null,
  isAnalyzing: false,
  setStep: (step) => set({ currentStep: step }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedOrg: (org) => set({ selectedOrg: org }),
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () => set({
    currentStep: 'connect',
    isOpen: false,
    selectedOrg: null,
    selectedRepo: null,
    selectedBranch: null,
    isAnalyzing: false,
  }),
}));

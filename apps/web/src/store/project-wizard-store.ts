import { create } from 'zustand';

export type WizardStep = 'details' | 'stack' | 'git' | 'variables' | 'review';

export interface ProjectWizardState {
  currentStep: WizardStep;
  isOpen: boolean;
  setStep: (step: WizardStep) => void;
  setIsOpen: (isOpen: boolean) => void;
  reset: () => void;
}

export const useProjectWizardStore = create<ProjectWizardState>((set) => ({
  currentStep: 'details',
  isOpen: false,
  setStep: (step) => set({ currentStep: step }),
  setIsOpen: (isOpen) => set({ isOpen }),
  reset: () => set({ currentStep: 'details', isOpen: false }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  OnboardingProfileInput, 
  OnboardingWorkspaceInput, 
  OnboardingPreferencesInput, 
  OnboardingTeamInput 
} from '@codesync/validators';

export type OnboardingStep = 'WELCOME' | 'PROFILE' | 'WORKSPACE' | 'PREFERENCES' | 'INVITE' | 'COMPLETE';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'WELCOME',
  'PROFILE',
  'WORKSPACE',
  'PREFERENCES',
  'INVITE',
  'COMPLETE'
];

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  
  // Form Data
  profile: Partial<OnboardingProfileInput>;
  workspace: Partial<OnboardingWorkspaceInput>;
  preferences: Partial<OnboardingPreferencesInput>;
  team: Partial<OnboardingTeamInput>;
  
  // Actions
  setStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  updateProfile: (data: Partial<OnboardingProfileInput>) => void;
  updateWorkspace: (data: Partial<OnboardingWorkspaceInput>) => void;
  updatePreferences: (data: Partial<OnboardingPreferencesInput>) => void;
  updateTeam: (data: Partial<OnboardingTeamInput>) => void;
  
  markStepComplete: (step: OnboardingStep) => void;
  resetOnboarding: () => void;
}

const initialState = {
  currentStep: 'WELCOME' as OnboardingStep,
  completedSteps: [],
  profile: {},
  workspace: {},
  preferences: {
    theme: 'Dark' as const,
    editorFont: 'JetBrains Mono' as const,
    tabSize: 2,
    fontSize: 14,
    autoSave: true,
    wordWrap: true,
    miniMap: true,
    aiEnabled: true,
    gitIntegration: true,
    telemetry: true,
    notifications: true,
    reducedMotion: false,
    highContrast: false,
    languages: [],
    frameworks: [],
  },
  team: {
    invites: [],
  },
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const currentIdx = ONBOARDING_STEPS.indexOf(get().currentStep);
        if (currentIdx < ONBOARDING_STEPS.length - 1) {
          set({ currentStep: ONBOARDING_STEPS[currentIdx + 1] });
        }
      },
      
      prevStep: () => {
        const currentIdx = ONBOARDING_STEPS.indexOf(get().currentStep);
        if (currentIdx > 0) {
          set({ currentStep: ONBOARDING_STEPS[currentIdx - 1] });
        }
      },
      
      updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
      updateWorkspace: (data) => set((state) => ({ workspace: { ...state.workspace, ...data } })),
      updatePreferences: (data) => set((state) => ({ preferences: { ...state.preferences, ...data } })),
      updateTeam: (data) => set((state) => ({ team: { ...state.team, ...data } })),
      
      markStepComplete: (step) => set((state) => ({
        completedSteps: state.completedSteps.includes(step) 
          ? state.completedSteps 
          : [...state.completedSteps, step]
      })),
      
      resetOnboarding: () => set(initialState),
    }),
    {
      name: 'codesync-onboarding-storage',
    }
  )
);

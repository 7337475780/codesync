import { create } from 'zustand';

interface DetectionConfidence {
  name: string;
  confidence: number;
  sources: string[];
}

interface WorkspaceRuntimeState {
  framework: DetectionConfidence | null;
  packageManager: DetectionConfidence | null;
  runtime: DetectionConfidence | null;
  setFramework: (framework: DetectionConfidence) => void;
  setPackageManager: (pm: DetectionConfidence) => void;
  setRuntime: (runtime: DetectionConfidence) => void;
}

export const useWorkspaceRuntimeStore = create<WorkspaceRuntimeState>((set) => ({
  framework: null,
  packageManager: null,
  runtime: null,
  setFramework: (framework) => set({ framework }),
  setPackageManager: (packageManager) => set({ packageManager }),
  setRuntime: (runtime) => set({ runtime }),
}));

import { create } from 'zustand';
import { BuildPipeline, PipelineStep, PipelineNodeStatus } from '../types/pipeline';

interface PipelineState {
  currentPipeline: BuildPipeline | null;
  isLoading: boolean;
  
  setPipeline: (pipeline: BuildPipeline | null) => void;
  updateStepStatus: (stageId: string, stepId: string, status: PipelineNodeStatus) => void;
}

export const usePipelineStore = create<PipelineState>((set) => ({
  currentPipeline: null,
  isLoading: false,
  
  setPipeline: (pipeline) => set({ currentPipeline: pipeline }),
  updateStepStatus: (stageId, stepId, status) => set((state) => {
    if (!state.currentPipeline) return state;
    
    const updatedStages = state.currentPipeline.stages.map(stage => {
      if (stage.id !== stageId) return stage;
      
      const updatedSteps = stage.steps.map(step => {
        if (step.id !== stepId) return step;
        return { ...step, status };
      });
      
      return { ...stage, steps: updatedSteps };
    });
    
    return {
      currentPipeline: { ...state.currentPipeline, stages: updatedStages }
    };
  }),
}));

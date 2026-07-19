export type PipelineNodeStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped' | 'cancelled';

export interface PipelineStep {
  id: string;
  name: string;
  description?: string;
  status: PipelineNodeStatus;
  startedAt: string | null;
  completedAt: string | null;
  duration: number | null; // in seconds
  error?: string;
  logs?: string[];
}

export interface PipelineStage {
  id: string;
  name: string;
  status: PipelineNodeStatus;
  steps: PipelineStep[];
}

export interface BuildPipeline {
  id: string;
  deploymentId: string;
  status: PipelineNodeStatus;
  stages: PipelineStage[];
  startedAt: string | null;
  completedAt: string | null;
}

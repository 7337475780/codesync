export type PipelineStepStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped';

export interface PipelineStep {
  id: string;
  label: string;
  status: PipelineStepStatus;
  durationMs?: number;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'queue', label: 'Queued', status: 'pending' },
  { id: 'install', label: 'Installing', status: 'pending' },
  { id: 'test', label: 'Testing', status: 'pending' },
  { id: 'build', label: 'Building', status: 'pending' },
  { id: 'optimize', label: 'Optimizing', status: 'pending' },
  { id: 'upload', label: 'Uploading', status: 'pending' },
  { id: 'deploy', label: 'Deploying', status: 'pending' },
  { id: 'done', label: 'Live', status: 'pending' },
];

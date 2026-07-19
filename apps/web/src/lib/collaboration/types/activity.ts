export type ActivityType = 
  | 'user_joined' 
  | 'user_left' 
  | 'file_opened' 
  | 'file_edited' 
  | 'commit_created' 
  | 'deployment_started' 
  | 'ai_generated' 
  | 'comment_added' 
  | 'permission_changed';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  actorId: string; // The user who did the action
  targetId?: string; // e.g. fileId, commitId
  metadata?: Record<string, any>;
  timestamp: number;
}

import { Collaborator, PresenceStatus } from '../types/presence';
import { RemoteCursor } from '../types/cursor';
import { FileCommentThread, ThreadMessage } from '../types/comment';
import { ActivityEvent } from '../types/activity';
import { WorkspacePermission } from '../types/permissions';

export interface CollaborationProvider {
  connect(workspaceId: string, user: Partial<Collaborator>): Promise<void>;
  disconnect(): void;
  
  // Presence
  sendPresence(status: PresenceStatus, metadata?: Partial<Collaborator>): void;
  followUser(userId: string | null): void;
  presentWorkspace(isPresenting: boolean): void;
  
  // Cursor
  sendCursor(fileId: string, position: { lineNumber: number, column: number }): void;
  sendSelection(fileId: string, selection: { startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number } | null): void;
  
  // Comments
  addCommentThread(fileId: string, message: string, lineNumber?: number): Promise<FileCommentThread>;
  addReply(threadId: string, message: string): Promise<ThreadMessage>;
  resolveThread(threadId: string): Promise<void>;
  
  // Activity
  sendActivityEvent(event: Omit<ActivityEvent, 'id' | 'timestamp'>): void;
  
  // Listeners (usually managed via Zustand stores internally, but exposed for completeness)
  onPresenceChange?: (collaborators: Collaborator[]) => void;
  onCursorChange?: (cursors: RemoteCursor[]) => void;
  onActivityEvent?: (event: ActivityEvent) => void;
  onCommentsChange?: (threads: FileCommentThread[]) => void;
}

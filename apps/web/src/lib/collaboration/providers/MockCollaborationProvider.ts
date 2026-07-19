import { CollaborationProvider } from './CollaborationProvider';
import { Collaborator, PresenceStatus } from '../types/presence';
import { RemoteCursor } from '../types/cursor';
import { FileCommentThread, ThreadMessage } from '../types/comment';
import { ActivityEvent } from '../types/activity';
import { nanoid } from 'nanoid';

export class MockCollaborationProvider implements CollaborationProvider {
  private workspaceId: string | null = null;
  private currentUser: Partial<Collaborator> | null = null;
  private mockIntervals: NodeJS.Timeout[] = [];
  
  public onPresenceChange?: (collaborators: Collaborator[]) => void;
  public onCursorChange?: (cursors: RemoteCursor[]) => void;
  public onActivityEvent?: (event: ActivityEvent) => void;
  public onCommentsChange?: (threads: FileCommentThread[]) => void;

  private collaborators: Collaborator[] = [];
  private cursors: RemoteCursor[] = [];
  
  async connect(workspaceId: string, user: Partial<Collaborator>): Promise<void> {
    this.workspaceId = workspaceId;
    this.currentUser = user;
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    this.collaborators = [
      {
        id: user.id || 'me',
        name: user.name || 'Current User',
        email: user.email || 'me@example.com',
        color: user.color || '#3b82f6',
        status: 'online',
      },
      {
        id: 'mock-1',
        name: 'Alice Developer',
        email: 'alice@example.com',
        color: '#ef4444',
        status: 'online',
        currentFile: 'src/App.tsx'
      },
      {
        id: 'mock-2',
        name: 'Bob Reviewer',
        email: 'bob@example.com',
        color: '#10b981',
        status: 'idle',
      }
    ];

    if (this.onPresenceChange) {
      this.onPresenceChange([...this.collaborators]);
    }
    
    // Setup mock activity simulation
    this.startMockSimulation();
  }

  disconnect(): void {
    this.mockIntervals.forEach(clearInterval);
    this.mockIntervals = [];
    this.collaborators = [];
    this.workspaceId = null;
    this.currentUser = null;
  }
  
  private startMockSimulation() {
    // Simulate Alice moving her cursor occasionally
    const cursorInterval = setInterval(() => {
      const alice = this.collaborators.find(c => c.id === 'mock-1');
      if (alice && alice.currentFile) {
        const mockCursor: RemoteCursor = {
          id: alice.id,
          fileId: alice.currentFile,
          position: {
            lineNumber: Math.floor(Math.random() * 50) + 1,
            column: Math.floor(Math.random() * 30) + 1
          }
        };
        this.cursors = [mockCursor];
        if (this.onCursorChange) this.onCursorChange([...this.cursors]);
      }
    }, 3000);
    this.mockIntervals.push(cursorInterval);
  }

  sendPresence(status: PresenceStatus, metadata?: Partial<Collaborator>): void {
    if (!this.currentUser) return;
    
    const index = this.collaborators.findIndex(c => c.id === this.currentUser?.id);
    if (index !== -1) {
      this.collaborators[index] = {
        ...this.collaborators[index],
        status,
        ...metadata,
      };
      if (this.onPresenceChange) this.onPresenceChange([...this.collaborators]);
    }
  }

  followUser(userId: string | null): void {
    if (!this.currentUser) return;
    const index = this.collaborators.findIndex(c => c.id === this.currentUser?.id);
    if (index !== -1) {
      this.collaborators[index].isFollowing = userId;
      if (this.onPresenceChange) this.onPresenceChange([...this.collaborators]);
    }
  }

  presentWorkspace(isPresenting: boolean): void {
    if (!this.currentUser) return;
    const index = this.collaborators.findIndex(c => c.id === this.currentUser?.id);
    if (index !== -1) {
      this.collaborators[index].isPresenting = isPresenting;
      if (this.onPresenceChange) this.onPresenceChange([...this.collaborators]);
    }
  }

  sendCursor(fileId: string, position: { lineNumber: number; column: number; }): void {
    // In mock, we don't necessarily broadcast our own cursor, 
    // but a real provider would send it to others here.
  }

  sendSelection(fileId: string, selection: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number; } | null): void {
  }

  async addCommentThread(fileId: string, message: string, lineNumber?: number): Promise<FileCommentThread> {
    const newThread: FileCommentThread = {
      id: nanoid(),
      fileId,
      lineNumber,
      resolved: false,
      createdAt: Date.now(),
      messages: [
        {
          id: nanoid(),
          authorId: this.currentUser?.id || 'me',
          content: message,
          createdAt: Date.now(),
        }
      ]
    };
    return newThread;
  }

  async addReply(threadId: string, message: string): Promise<ThreadMessage> {
    return {
      id: nanoid(),
      authorId: this.currentUser?.id || 'me',
      content: message,
      createdAt: Date.now(),
    };
  }

  async resolveThread(threadId: string): Promise<void> {
    return Promise.resolve();
  }

  sendActivityEvent(event: Omit<ActivityEvent, 'id' | 'timestamp'>): void {
    if (this.onActivityEvent) {
      this.onActivityEvent({
        ...event,
        id: nanoid(),
        timestamp: Date.now()
      });
    }
  }
}

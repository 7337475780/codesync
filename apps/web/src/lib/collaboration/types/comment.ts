export interface ThreadMessage {
  id: string;
  authorId: string;
  content: string;
  createdAt: number;
  reactions?: Record<string, string[]>; // e.g. { '👍': ['user-1', 'user-2'] }
}

export interface FileCommentThread {
  id: string;
  fileId: string;
  lineNumber?: number;
  resolved: boolean;
  messages: ThreadMessage[];
  createdAt: number;
}

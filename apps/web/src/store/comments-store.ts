import { create } from 'zustand';
import { FileCommentThread } from '@/lib/collaboration/types/comment';

interface CommentsState {
  threads: FileCommentThread[];
  setThreads: (threads: FileCommentThread[]) => void;
  getThreadsForFile: (fileId: string) => FileCommentThread[];
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
  getThreadsForFile: (fileId) => get().threads.filter(t => t.fileId === fileId),
}));

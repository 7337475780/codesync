import { create } from 'zustand';
import { RemoteCursor } from '@/lib/collaboration/types/cursor';

interface CursorState {
  cursors: RemoteCursor[];
  setCursors: (cursors: RemoteCursor[]) => void;
  getCursorsForFile: (fileId: string) => RemoteCursor[];
}

export const useCursorStore = create<CursorState>((set, get) => ({
  cursors: [],
  setCursors: (cursors) => set({ cursors }),
  getCursorsForFile: (fileId) => get().cursors.filter(c => c.fileId === fileId),
}));

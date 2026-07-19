import { create } from 'zustand';
import { MemoryFileSystemProvider } from '@/lib/filesystem/providers/MemoryFileSystemProvider';
import { FileSystemProvider, FileStat, FileType } from '@/lib/filesystem/types';
import { joinPath, basename, extname } from '@/lib/filesystem/utils';

export interface VFSNode {
  path: string;
  name: string;
  type: FileType;
  children?: VFSNode[];
  stat?: FileStat;
}

interface FileSystemState {
  provider: FileSystemProvider;
  root: VFSNode;
  
  // Actions
  initialize: () => Promise<void>;
  refresh: (path?: string) => Promise<void>;
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, content: string) => Promise<void>;
  createFile: (path: string) => Promise<void>;
  createFolder: (path: string) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
  renameFile: (oldPath: string, newPath: string) => Promise<void>;
}

const memoryProvider = new MemoryFileSystemProvider();

const buildTree = async (provider: FileSystemProvider, path: string): Promise<VFSNode> => {
  const stat = await provider.stat(path);
  const name = basename(path) || 'root';
  const node: VFSNode = { path, name, type: stat.type, stat };

  if (stat.type === 'folder') {
    node.children = [];
    const entries = await provider.readDirectory(path);
    for (const [childName, childType] of entries) {
      const childPath = joinPath(path, childName);
      node.children.push(await buildTree(provider, childPath));
    }
    // Sort: folders first, then alphabetically
    node.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }
  return node;
};

export const useFileSystemStore = create<FileSystemState>((set, get) => ({
  provider: memoryProvider,
  root: { path: '/', name: 'root', type: 'folder', children: [] },

  initialize: async () => {
    const { provider } = get();
    // Seed initial data
    try {
      await provider.createDirectory('/src');
      await provider.createDirectory('/src/app');
      await provider.createDirectory('/src/components');
      await provider.writeFile('/src/app/page.tsx', new TextEncoder().encode('export default function Page() {\n  return <div>Hello</div>;\n}\n'), { create: true, overwrite: true });
      await provider.writeFile('/src/app/layout.tsx', new TextEncoder().encode('export default function Layout({ children }) { return children; }'), { create: true, overwrite: true });
      await provider.writeFile('/src/components/button.tsx', new TextEncoder().encode('export const Button = () => <button>Click</button>;'), { create: true, overwrite: true });
      await provider.writeFile('/package.json', new TextEncoder().encode('{\n  "name": "my-app"\n}\n'), { create: true, overwrite: true });
      await provider.writeFile('/README.md', new TextEncoder().encode('# Welcome to CodeSync\n'), { create: true, overwrite: true });
    } catch (e) {
      // Ignore if already seeded
    }

    const root = await buildTree(provider, '/');
    set({ root });
  },

  refresh: async (path: string = '/') => {
    const { provider } = get();
    // Currently rebuilding whole tree for simplicity, in a real app we'd update just the branch
    const root = await buildTree(provider, '/');
    set({ root });
  },

  readFile: async (path: string) => {
    const data = await get().provider.readFile(path);
    return new TextDecoder().decode(data);
  },

  writeFile: async (path: string, content: string) => {
    await get().provider.writeFile(path, new TextEncoder().encode(content), { create: true, overwrite: true });
    await get().refresh();
  },

  createFile: async (path: string) => {
    await get().provider.writeFile(path, new Uint8Array(), { create: true, overwrite: false });
    await get().refresh();
  },

  createFolder: async (path: string) => {
    await get().provider.createDirectory(path);
    await get().refresh();
  },

  deleteFile: async (path: string) => {
    await get().provider.delete(path, { recursive: true });
    await get().refresh();
  },

  renameFile: async (oldPath: string, newPath: string) => {
    await get().provider.rename(oldPath, newPath, { overwrite: false });
    await get().refresh();
  }
}));

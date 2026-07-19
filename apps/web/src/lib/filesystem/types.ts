export type FileType = 'file' | 'folder';

export interface FileStat {
  type: FileType;
  ctime: number;
  mtime: number;
  size: number;
}

export interface FileSystemNode {
  name: string;
  type: FileType;
  path: string;
}

export interface FileSystemProvider {
  stat(path: string): Promise<FileStat>;
  readDirectory(path: string): Promise<[string, FileType][]>;
  createDirectory(path: string): Promise<void>;
  readFile(path: string): Promise<Uint8Array>;
  writeFile(path: string, content: Uint8Array, options: { create: boolean; overwrite: boolean }): Promise<void>;
  delete(path: string, options: { recursive: boolean }): Promise<void>;
  rename(oldPath: string, newPath: string, options: { overwrite: boolean }): Promise<void>;
  copy?(source: string, destination: string, options: { overwrite: boolean }): Promise<void>;
}

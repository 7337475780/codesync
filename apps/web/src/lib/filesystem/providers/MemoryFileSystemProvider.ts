import { FileSystemProvider, FileStat, FileType } from '../types';
import { EventEmitter } from '../events';
import { basename, dirname } from '../utils';

class Entry implements FileStat {
  type: FileType;
  ctime: number;
  mtime: number;
  size: number;
  name: string;
  data?: Uint8Array;
  children?: Map<string, Entry>;

  constructor(type: FileType, name: string) {
    this.type = type;
    this.name = name;
    this.ctime = Date.now();
    this.mtime = Date.now();
    this.size = 0;
    if (type === 'folder') {
      this.children = new Map();
    }
  }
}

export class MemoryFileSystemProvider implements FileSystemProvider {
  private root = new Entry('folder', '');
  private emitter = new EventEmitter();
  
  public onDidChangeFile = this.emitter.event.bind(this.emitter);

  private _resolve(path: string): Entry | undefined {
    if (path === '' || path === '/') {
      return this.root;
    }
    const parts = path.split('/').filter(p => p.length > 0);
    let current = this.root;
    for (const part of parts) {
      if (current.type !== 'folder' || !current.children) {
        return undefined;
      }
      const next = current.children.get(part);
      if (!next) {
        return undefined;
      }
      current = next;
    }
    return current;
  }

  async stat(path: string): Promise<FileStat> {
    const entry = this._resolve(path);
    if (!entry) throw new Error('File not found');
    return entry;
  }

  async readDirectory(path: string): Promise<[string, FileType][]> {
    const entry = this._resolve(path);
    if (!entry) throw new Error('Directory not found');
    if (entry.type !== 'folder' || !entry.children) throw new Error('Not a directory');
    const result: [string, FileType][] = [];
    entry.children.forEach((child, name) => {
      result.push([name, child.type]);
    });
    return result;
  }

  async createDirectory(path: string): Promise<void> {
    const dir = dirname(path);
    const name = basename(path);
    const parent = this._resolve(dir);
    if (!parent || parent.type !== 'folder' || !parent.children) throw new Error('Parent directory not found');
    
    if (parent.children.has(name)) throw new Error('Directory already exists');
    
    parent.children.set(name, new Entry('folder', name));
    this.emitter.fire([{ type: 'created', path }]);
  }

  async readFile(path: string): Promise<Uint8Array> {
    const entry = this._resolve(path);
    if (!entry) throw new Error('File not found');
    if (entry.type !== 'file') throw new Error('Is a directory');
    return entry.data || new Uint8Array();
  }

  async writeFile(path: string, content: Uint8Array, options: { create: boolean; overwrite: boolean }): Promise<void> {
    const dir = dirname(path);
    const name = basename(path);
    const parent = this._resolve(dir);
    if (!parent || parent.type !== 'folder' || !parent.children) throw new Error('Parent directory not found');

    let entry = parent.children.get(name);
    if (!entry && !options.create) throw new Error('File not found');
    if (entry && !options.overwrite) throw new Error('File already exists');

    if (!entry) {
      entry = new Entry('file', name);
      parent.children.set(name, entry);
      this.emitter.fire([{ type: 'created', path }]);
    } else {
      this.emitter.fire([{ type: 'changed', path }]);
    }
    
    entry.data = content;
    entry.size = content.byteLength;
    entry.mtime = Date.now();
  }

  async delete(path: string, options: { recursive: boolean }): Promise<void> {
    const dir = dirname(path);
    const name = basename(path);
    const parent = this._resolve(dir);
    if (!parent || parent.type !== 'folder' || !parent.children) throw new Error('Parent directory not found');

    const entry = parent.children.get(name);
    if (!entry) throw new Error('File not found');

    if (entry.type === 'folder' && !options.recursive && entry.children && entry.children.size > 0) {
      throw new Error('Directory not empty');
    }

    parent.children.delete(name);
    this.emitter.fire([{ type: 'deleted', path }]);
  }

  async rename(oldPath: string, newPath: string, options: { overwrite: boolean }): Promise<void> {
    const oldDir = dirname(oldPath);
    const oldName = basename(oldPath);
    const oldParent = this._resolve(oldDir);

    const newDir = dirname(newPath);
    const newName = basename(newPath);
    const newParent = this._resolve(newDir);

    if (!oldParent || !oldParent.children) throw new Error('Old parent not found');
    if (!newParent || !newParent.children) throw new Error('New parent not found');

    const entry = oldParent.children.get(oldName);
    if (!entry) throw new Error('Source file not found');

    if (newParent.children.has(newName) && !options.overwrite) {
      throw new Error('Destination already exists');
    }

    oldParent.children.delete(oldName);
    entry.name = newName;
    newParent.children.set(newName, entry);

    this.emitter.fire([{ type: 'deleted', path: oldPath }, { type: 'created', path: newPath }]);
  }
}

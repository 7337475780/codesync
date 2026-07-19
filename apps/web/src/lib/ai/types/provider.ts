import { ChatMessage } from './chat';

export interface AIStreamChunk {
  content: string;
  isDone: boolean;
}

export interface WorkspaceContext {
  openFiles: { path: string; content: string }[];
  activeFile?: { path: string; content: string; cursorPosition?: { line: number; column: number } };
  selection?: { path: string; content: string };
  projectTree?: string;
}

export interface AIProvider {
  chat(messages: ChatMessage[], context?: WorkspaceContext): Promise<string>;
  streamChat(messages: ChatMessage[], context?: WorkspaceContext, onChunk?: (chunk: AIStreamChunk) => void): Promise<string>;
  edit(instruction: string, code: string): Promise<string>;
  explain(code: string): Promise<string>;
}

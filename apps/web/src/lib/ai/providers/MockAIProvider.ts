import { AIProvider, AIStreamChunk, WorkspaceContext } from '../types/provider';
import { ChatMessage } from '../types/chat';

export class MockAIProvider implements AIProvider {
  async chat(messages: ChatMessage[], context?: WorkspaceContext): Promise<string> {
    return "This is a mock response from the AI.";
  }

  async streamChat(messages: ChatMessage[], context?: WorkspaceContext, onChunk?: (chunk: AIStreamChunk) => void): Promise<string> {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    
    let mockResponse = "I am a Mock AI. I understand you need help with your code.\\n\\n";
    
    if (lastMessage.includes('react')) {
      mockResponse += "Here is a React component example:\\n\\n```tsx\\nimport React from 'react';\\n\\nexport function Example() {\\n  return <div>Hello World</div>;\\n}\\n```";
    } else if (lastMessage.includes('sort')) {
      mockResponse += "Here is a sorting function in TypeScript:\\n\\n```typescript\\nexport function sort(arr: number[]): number[] {\\n  return arr.sort((a, b) => a - b);\\n}\\n```";
    } else {
      mockResponse += "How can I assist you further with this workspace?";
    }

    const words = mockResponse.split(' ');
    let fullText = '';

    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      const chunk = words[i] + (i === words.length - 1 ? '' : ' ');
      fullText += chunk;
      
      if (onChunk) {
        onChunk({
          content: fullText,
          isDone: i === words.length - 1
        });
      }
    }

    return fullText;
  }

  async edit(instruction: string, code: string): Promise<string> {
    return "// Mock edited code\\n" + code;
  }

  async explain(code: string): Promise<string> {
    return "This code does something amazing. It is very complex and highly optimized.";
  }
}

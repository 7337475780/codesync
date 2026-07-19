import React, { useEffect } from 'react';
import { useAIStore } from '@/store/ai-store';
import { MockAIProvider } from '@/lib/ai/providers/MockAIProvider';

export function AIManager() {
  const { provider, setProvider } = useAIStore();

  useEffect(() => {
    if (!provider) {
      setProvider(new MockAIProvider());
    }
  }, [provider, setProvider]);

  return null;
}

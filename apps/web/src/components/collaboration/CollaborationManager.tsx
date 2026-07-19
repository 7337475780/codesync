import React, { useEffect } from 'react';
import { useCollaborationStore } from '@/store/collaboration-store';
import { usePresenceStore } from '@/store/presence-store';
import { useCursorStore } from '@/store/cursor-store';
import { useCommentsStore } from '@/store/comments-store';
import { useActivityStore } from '@/store/activity-store';
import { MockCollaborationProvider } from '@/lib/collaboration/providers/MockCollaborationProvider';

export function CollaborationManager() {
  const { provider, setProvider, setConnected, isConnected } = useCollaborationStore();
  const setCollaborators = usePresenceStore((state) => state.setCollaborators);
  const setCursors = useCursorStore((state) => state.setCursors);
  const addEvent = useActivityStore((state) => state.addEvent);

  useEffect(() => {
    // Initialize provider if not exists
    if (!provider) {
      const mockProvider = new MockCollaborationProvider();
      
      // Wire up listeners
      mockProvider.onPresenceChange = (collaborators) => {
        setCollaborators(collaborators);
      };
      
      mockProvider.onCursorChange = (cursors) => {
        setCursors(cursors);
      };
      
      mockProvider.onActivityEvent = (event) => {
        addEvent(event);
      };

      setProvider(mockProvider);
      
      // Connect to the workspace
      mockProvider.connect('workspace-1', {
        id: 'me',
        name: 'Demo User',
        color: '#8b5cf6'
      }).then(() => {
        setConnected(true, 'workspace-1');
        
        // Add a mock join event
        addEvent({
          id: '1',
          type: 'user_joined',
          actorId: 'me',
          timestamp: Date.now()
        });
      });
    }

    return () => {
      // Cleanup happens in the store or when provider changes
      if (provider) {
        provider.disconnect();
        setConnected(false);
      }
    };
  }, [provider, setProvider, setConnected, setCollaborators, setCursors, addEvent]);

  return null;
}

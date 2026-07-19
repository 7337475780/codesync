export type PresenceStatus = 'online' | 'idle' | 'offline';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  color: string;
  status: PresenceStatus;
  currentFile?: string;
  currentBranch?: string;
  isTyping?: boolean;
  voiceStatus?: 'muted' | 'unmuted' | 'speaking';
  cameraStatus?: 'on' | 'off';
  isFollowing?: string | null; // ID of the user they are following
  isPresenting?: boolean;
  lastSeenAt?: number;
}

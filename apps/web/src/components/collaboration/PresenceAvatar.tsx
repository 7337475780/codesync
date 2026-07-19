import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as HoverCard from '@radix-ui/react-hover-card';
import { Collaborator } from '@/lib/collaboration/types/presence';
import { cn } from '@codesync/ui/utils/cn';

interface PresenceAvatarProps {
  collaborator: Collaborator;
  isCurrentUser?: boolean;
}

export function PresenceAvatar({ collaborator, isCurrentUser }: PresenceAvatarProps) {
  const { name, color, status, avatarUrl } = collaborator;
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const statusColor = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    offline: 'bg-gray-500'
  }[status];

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <div className="relative group cursor-pointer">
          <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-8 h-8 rounded-full border border-[#2d2d2d] transition-transform hover:scale-105" style={{ backgroundColor: avatarUrl ? 'transparent' : color }}>
            {avatarUrl ? (
              <Avatar.Image className="w-full h-full object-cover rounded-inherit" src={avatarUrl} alt={name} />
            ) : (
              <Avatar.Fallback className="w-full h-full flex items-center justify-center text-white text-xs font-medium leading-none" delayMs={600}>
                {initials}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
          <div className={cn("absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-[#1e1e1e]", statusColor)} />
        </div>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content className="z-50 w-48 bg-[#252526] border border-[#2d2d2d] rounded-md shadow-lg p-3 flex flex-col gap-2" sideOffset={5}>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">{name} {isCurrentUser && '(You)'}</span>
            <span className="text-gray-400 text-xs capitalize">{status}</span>
          </div>
          {collaborator.currentFile && (
            <div className="text-xs text-gray-300 mt-1">
              <span className="text-gray-500">Editing: </span>
              <span className="font-mono text-[10px] break-all">{collaborator.currentFile}</span>
            </div>
          )}
          <HoverCard.Arrow className="fill-[#2d2d2d]" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

import React from 'react';
import { useActivityStore } from '@/store/activity-store';
import { ActivityType, ActivityEvent } from '@/lib/collaboration/types/activity';
import { usePresenceStore } from '@/store/presence-store';
import { Clock, UserPlus, UserMinus, FileEdit, FileCode, GitCommit, Play, MessageSquare, Shield } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case 'user_joined': return <UserPlus className="w-3.5 h-3.5 text-green-400" />;
    case 'user_left': return <UserMinus className="w-3.5 h-3.5 text-red-400" />;
    case 'file_opened': return <FileCode className="w-3.5 h-3.5 text-blue-400" />;
    case 'file_edited': return <FileEdit className="w-3.5 h-3.5 text-yellow-400" />;
    case 'commit_created': return <GitCommit className="w-3.5 h-3.5 text-purple-400" />;
    case 'deployment_started': return <Play className="w-3.5 h-3.5 text-emerald-400" />;
    case 'ai_generated': return <div className="w-3.5 h-3.5 rounded bg-gradient-to-r from-blue-500 to-purple-500" />;
    case 'comment_added': return <MessageSquare className="w-3.5 h-3.5 text-blue-300" />;
    case 'permission_changed': return <Shield className="w-3.5 h-3.5 text-orange-400" />;
    default: return <Clock className="w-3.5 h-3.5 text-gray-400" />;
  }
}

function formatTimeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function LiveActivityFeed() {
  const { events } = useActivityStore();
  const { getCollaborator } = usePresenceStore();

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8 text-gray-500">
        <Clock className="w-8 h-8 mb-3 opacity-20" />
        <p className="text-sm">No recent activity</p>
        <p className="text-xs mt-1 opacity-70">Waiting for events...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-1 p-2">
        {events.map((event) => {
          const actor = getCollaborator(event.actorId);
          const actorName = actor?.name || 'Unknown User';
          
          return (
            <div key={event.id} className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors group">
              <div className="mt-0.5 w-6 h-6 rounded bg-[#2d2d2d] flex items-center justify-center shrink-0">
                {getActivityIcon(event.type)}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-gray-200 truncate">{actorName}</span>
                  <span className="text-[10px] text-gray-500 shrink-0">{formatTimeAgo(event.timestamp)}</span>
                </div>
                <span className="text-xs text-gray-400 mt-0.5 leading-snug">
                  {event.type === 'user_joined' && 'joined the workspace'}
                  {event.type === 'user_left' && 'left the workspace'}
                  {event.type === 'file_opened' && <>opened <span className="text-gray-300 font-mono text-[10px]">{event.targetId}</span></>}
                  {event.type === 'file_edited' && <>edited <span className="text-gray-300 font-mono text-[10px]">{event.targetId}</span></>}
                  {event.type === 'commit_created' && 'created a commit'}
                  {event.type === 'comment_added' && 'added a comment'}
                  {event.type === 'permission_changed' && 'updated permissions'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

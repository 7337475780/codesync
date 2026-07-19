import React from 'react';
import { DeploymentStatus } from '../../types/deployment';

interface DeploymentStatusBadgeProps {
  status: DeploymentStatus;
  className?: string;
}

export function DeploymentStatusBadge({ status, className = '' }: DeploymentStatusBadgeProps) {
  let colorClass = 'bg-gray-100 text-gray-800 border-gray-200';
  
  switch (status) {
    case 'READY':
      colorClass = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'ERROR':
      colorClass = 'bg-red-100 text-red-800 border-red-200';
      break;
    case 'BUILDING':
    case 'DEPLOYING':
    case 'ROLLING_BACK':
      colorClass = 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse';
      break;
    case 'QUEUED':
      colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    case 'CANCELED':
      colorClass = 'bg-gray-200 text-gray-600 border-gray-300';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

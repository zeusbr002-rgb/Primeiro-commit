import React from 'react';
import { OSStatus, OSPriority } from '../../types';

interface BadgeProps {
  type: 'status' | 'priority';
  value: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  let colorClass = 'bg-slate-100 text-slate-800';

  if (type === 'status') {
    switch (value) {
      case OSStatus.OPEN:
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case OSStatus.IN_PROGRESS:
        colorClass = 'bg-amber-100 text-amber-800';
        break;
      case OSStatus.COMPLETED:
        colorClass = 'bg-emerald-100 text-emerald-800';
        break;
      case OSStatus.CANCELLED:
        colorClass = 'bg-slate-200 text-slate-500';
        break;
    }
  } else {
    switch (value) {
      case OSPriority.LOW:
        colorClass = 'bg-slate-100 text-slate-600';
        break;
      case OSPriority.MEDIUM:
        colorClass = 'bg-blue-50 text-blue-600';
        break;
      case OSPriority.HIGH:
        colorClass = 'bg-rose-100 text-rose-800';
        break;
      case OSPriority.CRITICAL:
        colorClass = 'bg-rose-600 text-white animate-pulse';
        break;
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${colorClass}`}>
      {value.replace('_', ' ')}
    </span>
  );
};

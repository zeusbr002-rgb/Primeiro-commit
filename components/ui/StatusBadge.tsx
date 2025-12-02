
import React from 'react';
import { OSStatus, OSPriority } from '../../types';

interface StatusBadgeProps {
  status?: OSStatus;
  priority?: OSPriority;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, priority, className = '' }) => {
  if (status) {
    let styles = 'bg-slate-100 text-slate-800';
    const label = status.replace('_', ' ');

    switch (status) {
      case OSStatus.OPEN:
        styles = 'bg-blue-100 text-blue-700 border border-blue-200';
        break;
      case OSStatus.IN_PROGRESS:
        styles = 'bg-amber-100 text-amber-700 border border-amber-200';
        break;
      case OSStatus.COMPLETED:
        styles = 'bg-emerald-100 text-emerald-700 border border-emerald-200';
        break;
      case OSStatus.CANCELLED:
        styles = 'bg-slate-100 text-slate-500 border border-slate-200';
        break;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${styles} ${className}`}>
        {label}
      </span>
    );
  }

  if (priority) {
    let styles = '';
    
    switch (priority) {
      case OSPriority.LOW:
        styles = 'text-slate-500 bg-slate-100 border-slate-200';
        break;
      case OSPriority.MEDIUM:
        styles = 'text-blue-600 bg-blue-50 border-blue-100';
        break;
      case OSPriority.HIGH:
        styles = 'text-orange-600 bg-orange-50 border-orange-100';
        break;
      case OSPriority.CRITICAL:
        styles = 'text-rose-600 bg-rose-50 border-rose-100 animate-pulse';
        break;
    }

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded border text-[10px] font-bold uppercase ${styles} ${className}`}>
        {priority}
      </span>
    );
  }

  return null;
};

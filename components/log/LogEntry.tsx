'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { LogEntry as LogEntryType } from '@/lib/types';
import { useState } from 'react';

interface LogEntryProps {
  entry: LogEntryType;
}

export function LogEntry({ entry }: LogEntryProps) {
  const [expanded, setExpanded] = useState(false);

  const getTypeColor = () => {
    switch (entry.type) {
      case 'success':
        return 'border-l-emerald-500 bg-emerald-500/5';
      case 'error':
        return 'border-l-red-500 bg-red-500/5';
      case 'warning':
        return 'border-l-amber-500 bg-amber-500/5';
      case 'task':
        return 'border-l-blue-500 bg-blue-500/5';
      case 'result':
        return 'border-l-purple-500 bg-purple-500/5';
      case 'thinking':
        return 'border-l-cyan-500 bg-cyan-500/5';
      case 'milestone':
        return 'border-l-yellow-500 bg-yellow-500/5';
      default:
        return 'border-l-slate-600 bg-slate-800/30';
    }
  };

  const shouldTruncate = entry.message.length > 150;
  const displayMessage = expanded || !shouldTruncate 
    ? entry.message 
    : entry.message.slice(0, 150) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`
        p-3 rounded-lg border-l-4 backdrop-blur-sm
        ${getTypeColor()}
        ${shouldTruncate ? 'cursor-pointer hover:bg-slate-800/50' : ''}
        transition-colors
      `}
      onClick={() => shouldTruncate && setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">{entry.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-200 break-words">
            {displayMessage}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

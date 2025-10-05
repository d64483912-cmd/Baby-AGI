'use client';

import { motion } from 'framer-motion';
import { useAgentStore } from '@/lib/stores/agentStore';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Loader2, XCircle, Zap } from 'lucide-react';
import type { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { selectedTask, setSelectedTask } = useAgentStore();
  const isSelected = selectedTask === task.id;

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Circle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'border-l-emerald-500 bg-emerald-500/5';
      case 'running':
        return 'border-l-blue-500 bg-blue-500/5';
      case 'failed':
        return 'border-l-red-500 bg-red-500/5';
      default:
        return 'border-l-slate-600 bg-slate-800/50';
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setSelectedTask(isSelected ? null : task.id)}
      className={`
        p-3 rounded-lg border-l-4 cursor-pointer transition-all
        ${getStatusColor()}
        ${isSelected ? 'ring-2 ring-blue-500/50' : ''}
        backdrop-blur-sm
      `}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getStatusIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-200 line-clamp-2">
            {task.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge 
              variant="outline" 
              className="text-xs border-slate-700 text-slate-400"
            >
              Priority: {task.priority}
            </Badge>
            {task.priority >= 8 && (
              <Zap className="w-3 h-3 text-amber-400" />
            )}
          </div>
          {isSelected && task.result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-slate-700"
            >
              <p className="text-xs text-slate-400 mb-1">Result:</p>
              <p className="text-xs text-slate-300">{task.result}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

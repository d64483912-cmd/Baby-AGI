'use client';

import { motion } from 'framer-motion';
import { useAgentStore } from '@/lib/stores/agentStore';
import { TaskCard } from './TaskCard';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function TaskQueue() {
  const { tasks } = useAgentStore();
  const [showCompleted, setShowCompleted] = useState(false);

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'running');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const failedTasks = tasks.filter(t => t.status === 'failed');

  return (
    <div className="p-4 space-y-4">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-300">Task Queue</h3>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {pendingTasks.length}
            </Badge>
          </div>
          <motion.div
            className="space-y-2"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {pendingTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Failed Tasks */}
      {failedTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-red-400">Failed</h3>
            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
              {failedTasks.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {failedTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Collapsible open={showCompleted} onOpenChange={setShowCompleted}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between mb-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-emerald-400">Completed</h3>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showCompleted ? 'rotate-180' : ''}`} />
              </div>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {completedTasks.length}
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2">
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No tasks yet. Start the agent to begin!
        </div>
      )}
    </div>
  );
}

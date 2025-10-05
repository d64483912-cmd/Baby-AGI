'use client';

import { motion } from 'framer-motion';
import { useAgentStore } from '@/lib/stores/agentStore';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function ProgressBar() {
  const { tasks, currentIteration, maxIterations, isRunning } = useAgentStore();

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Progress</h3>
        <div className="flex items-center gap-2">
          {isRunning && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Running
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Task Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Tasks Completed</span>
            <span className="text-sm font-semibold text-slate-200">
              {completedTasks} / {totalTasks}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500 mt-1">{progress}% complete</p>
        </div>

        {/* Iteration Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Iterations</span>
            <span className="text-sm font-semibold text-slate-200">
              {currentIteration} / {maxIterations}
            </span>
          </div>
          <Progress 
            value={(currentIteration / maxIterations) * 100} 
            className="h-2"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {tasks.filter(t => t.status === 'pending').length}
            </p>
            <p className="text-xs text-slate-500">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{completedTasks}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {tasks.filter(t => t.status === 'failed').length}
            </p>
            <p className="text-xs text-slate-500">Failed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

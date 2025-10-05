import { useEffect, useRef } from 'react';
import { useAgentStore } from '../stores/agentStore';
import { generateInitialTasks, generateFollowUpTasks, prioritizeTasks } from '../services/taskGenerator';
import { executeTaskWithAI, generateTasksWithAI, simulateTaskExecution } from '../services/apiService';
import type { Task } from '../types';

export function useAgent() {
  const store = useAgentStore();
  const agentLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (store.isRunning && !store.isPaused) {
      startAgentLoop();
    } else {
      stopAgentLoop();
    }

    return () => stopAgentLoop();
  }, [store.isRunning, store.isPaused]);

  const startAgentLoop = () => {
    if (agentLoopRef.current) return;

    agentLoopRef.current = setInterval(async () => {
      await executeAgentIteration();
    }, store.settings.iterationDelay);

    // Execute first iteration immediately
    executeAgentIteration();
  };

  const stopAgentLoop = () => {
    if (agentLoopRef.current) {
      clearInterval(agentLoopRef.current);
      agentLoopRef.current = null;
    }
  };

  const executeAgentIteration = async () => {
    const state = useAgentStore.getState();

    // Check if we should stop
    if (!state.isRunning || state.isPaused) {
      stopAgentLoop();
      return;
    }

    // Check max iterations
    if (state.currentIteration >= state.maxIterations) {
      state.addLog({
        type: 'milestone',
        message: `🎯 Reached maximum iterations (${state.maxIterations}). Agent stopped.`,
        icon: '🎯',
      });
      state.pauseAgent();
      stopAgentLoop();
      return;
    }

    // Initialize tasks if empty
    if (state.tasks.length === 0 && state.objective) {
      const initialTasks = generateInitialTasks(state.objective);
      initialTasks.forEach(task => state.addTask(task));
      state.addLog({
        type: 'info',
        message: `📝 Generated ${initialTasks.length} initial tasks`,
        icon: '📝',
      });
      return;
    }

    // Get next pending task
    const sortedTasks = prioritizeTasks(state.tasks);
    const nextTask = sortedTasks.find(t => t.status === 'pending' && !hasPendingDependencies(t, state.tasks));

    if (!nextTask) {
      // No more tasks - check if we should generate more or stop
      const completedTasks = state.tasks.filter(t => t.status === 'completed');
      const allCompleted = state.tasks.every(t => t.status === 'completed' || t.status === 'failed');

      if (allCompleted && completedTasks.length > 0) {
        state.addLog({
          type: 'milestone',
          message: `✅ All tasks completed! Objective achieved.`,
          icon: '✅',
        });
        state.pauseAgent();
        stopAgentLoop();
      }
      return;
    }

    // Execute the task
    state.incrementIteration();
    state.updateTask(nextTask.id, { status: 'running' });
    state.addLog({
      type: 'task',
      message: `▶️ Starting: ${nextTask.description}`,
      icon: '▶️',
    });

    try {
      let result: string;

      if (state.mode === 'ai' && state.settings.apiKey) {
        state.addLog({
          type: 'thinking',
          message: '💭 AI is thinking...',
          icon: '💭',
        });

        const response = await executeTaskWithAI(nextTask.description, state.objective, state.settings);
        
        if (response.error) {
          throw new Error(response.error);
        }
        
        result = response.content;
      } else {
        state.addLog({
          type: 'info',
          message: '🔍 Processing task...',
          icon: '🔍',
        });
        result = await simulateTaskExecution(nextTask.description);
      }

      state.completeTask(nextTask.id, result);
      state.addLog({
        type: 'success',
        message: `✅ Completed: ${nextTask.description}`,
        icon: '✅',
      });
      state.addLog({
        type: 'result',
        message: `📊 Result: ${result}`,
        icon: '📊',
      });

      // Generate follow-up tasks
      const followUpTasks = generateFollowUpTasks(nextTask, result, state.objective);
      if (followUpTasks.length > 0) {
        followUpTasks.forEach(task => state.addTask(task));
        state.addLog({
          type: 'info',
          message: `📝 Generated ${followUpTasks.length} follow-up task(s)`,
          icon: '📝',
        });
      }

      // Check milestones
      const completedCount = state.tasks.filter(t => t.status === 'completed').length;
      const totalCount = state.tasks.length;
      const progress = Math.floor((completedCount / totalCount) * 100);

      if ([25, 50, 75].includes(progress)) {
        state.addLog({
          type: 'milestone',
          message: `🎯 Milestone: ${progress}% complete!`,
          icon: '🎯',
        });
      }

    } catch (error) {
      state.updateTask(nextTask.id, { status: 'failed' });
      state.addLog({
        type: 'error',
        message: `❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        icon: '❌',
      });
    }
  };

  const hasPendingDependencies = (task: Task, allTasks: Task[]): boolean => {
    if (!task.dependencies || task.dependencies.length === 0) return false;
    return task.dependencies.some(depId => {
      const depTask = allTasks.find(t => t.id === depId);
      return depTask && depTask.status !== 'completed';
    });
  };

  return {
    startAgent: () => {
      if (!store.objective.trim()) {
        store.addLog({
          type: 'error',
          message: '❌ Please enter an objective first',
          icon: '❌',
        });
        return;
      }
      store.startAgent();
    },
    pauseAgent: store.pauseAgent,
    resetAgent: store.resetAgent,
  };
}

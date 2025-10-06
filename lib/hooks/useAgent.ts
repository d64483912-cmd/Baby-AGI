import { useEffect, useRef, useCallback } from 'react';
import { useAgentStore } from '../stores/agentStore';
import { generateInitialTasks, generateFollowUpTasks, prioritizeTasks } from '../services/taskGenerator';
import { executeTaskWithAI, simulateTaskExecution } from '../services/apiService';
import type { Task } from '../types';

export function useAgent() {
  const store = useAgentStore();
  const agentLoopRef = useRef<NodeJS.Timeout | null>(null);

  const stopAgentLoop = useCallback(() => {
    if (agentLoopRef.current) {
      clearInterval(agentLoopRef.current);
      agentLoopRef.current = null;
    }
  }, []);

  const executeAgentIteration = useCallback(async () => {
    const pendingTasks = store.tasks.filter(t => t.status === 'pending');
    
    if (pendingTasks.length === 0 || store.currentIteration >= store.maxIterations) {
      store.setIsRunning(false);
      stopAgentLoop();
      
      if (store.currentIteration >= store.maxIterations) {
        store.addLog({
          id: `log-${Date.now()}`,
          timestamp: Date.now(),
          type: 'warning',
          message: `Reached maximum iterations (${store.maxIterations})`,
          icon: '⚠️'
        });
      } else {
        store.addLog({
          id: `log-${Date.now()}`,
          timestamp: Date.now(),
          type: 'milestone',
          message: '🎉 All tasks completed! Objective achieved!',
          icon: '🎯'
        });
      }
      return;
    }

    const nextTask = pendingTasks[0];
    store.updateTask(nextTask.id, { status: 'running' });
    store.setCurrentIteration(store.currentIteration + 1);

    store.addLog({
      id: `log-${Date.now()}-start`,
      timestamp: Date.now(),
      type: 'task',
      message: `Starting: ${nextTask.description}`,
      icon: '▶️'
    });

    store.addLog({
      id: `log-${Date.now()}-processing`,
      timestamp: Date.now(),
      type: 'thinking',
      message: 'Processing task...',
      icon: '🔍'
    });

    try {
      let result: string;
      
      if (store.mode === 'ai') {
        result = await executeTaskWithAI(nextTask, store.objective, store.settings);
      } else {
        result = await simulateTaskExecution(nextTask);
      }

      store.updateTask(nextTask.id, { 
        status: 'completed', 
        result,
        completedAt: Date.now()
      });

      store.addLog({
        id: `log-${Date.now()}-complete`,
        timestamp: Date.now(),
        type: 'success',
        message: `Completed: ${nextTask.description}`,
        icon: '✅'
      });

      store.addLog({
        id: `log-${Date.now()}-result`,
        timestamp: Date.now(),
        type: 'result',
        message: `Result: ${result}`,
        icon: '📊'
      });

      // Generate follow-up tasks
      const followUpTasks = generateFollowUpTasks(nextTask, result, store.objective);
      
      if (followUpTasks.length > 0) {
        followUpTasks.forEach(task => store.addTask(task));
        store.addLog({
          id: `log-${Date.now()}-followup`,
          timestamp: Date.now(),
          type: 'info',
          message: `Generated ${followUpTasks.length} follow-up task(s)`,
          icon: '📝'
        });
      }

      // Add milestone logs
      const completedCount = store.tasks.filter(t => t.status === 'completed').length;
      const totalCount = store.tasks.length;
      const progress = (completedCount / totalCount) * 100;

      if (progress === 25 || progress === 50 || progress === 75 || progress === 100) {
        store.addLog({
          id: `log-${Date.now()}-milestone`,
          timestamp: Date.now(),
          type: 'milestone',
          message: `Milestone: ${Math.round(progress)}% complete!`,
          icon: '🎯'
        });
      }

    } catch (error) {
      store.updateTask(nextTask.id, { 
        status: 'failed',
        result: error instanceof Error ? error.message : 'Unknown error'
      });

      store.addLog({
        id: `log-${Date.now()}-error`,
        timestamp: Date.now(),
        type: 'error',
        message: `Failed: ${nextTask.description} - ${error instanceof Error ? error.message : 'Unknown error'}`,
        icon: '❌'
      });
    }
  }, [store, stopAgentLoop]);

  const startAgentLoop = useCallback(() => {
    if (agentLoopRef.current) return;

    agentLoopRef.current = setInterval(async () => {
      await executeAgentIteration();
    }, store.settings.iterationDelay);

    // Execute first iteration immediately
    executeAgentIteration();
  }, [store.settings.iterationDelay, executeAgentIteration]);

  useEffect(() => {
    if (store.isRunning && !store.isPaused) {
      startAgentLoop();
    } else {
      stopAgentLoop();
    }

    return () => stopAgentLoop();
  }, [store.isRunning, store.isPaused, startAgentLoop, stopAgentLoop]);

  const startAgent = () => {
    if (!store.objective.trim()) {
      store.addLog({
        id: `log-${Date.now()}`,
        timestamp: Date.now(),
        type: 'error',
        message: 'Please enter an objective first',
        icon: '❌'
      });
      return;
    }

    const initialTasks = generateInitialTasks(store.objective);
    const prioritizedTasks = prioritizeTasks(initialTasks);
    
    prioritizedTasks.forEach(task => store.addTask(task));
    
    store.addLog({
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      type: 'info',
      message: `Generated ${initialTasks.length} initial tasks`,
      icon: '📝'
    });

    store.setIsRunning(true);
    store.setIsPaused(false);
  };

  const pauseAgent = () => {
    store.setIsPaused(!store.isPaused);
    
    store.addLog({
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      type: 'info',
      message: store.isPaused ? 'Agent resumed' : 'Agent paused',
      icon: store.isPaused ? '▶️' : '⏸️'
    });
  };

  const resetAgent = () => {
    stopAgentLoop();
    store.setIsRunning(false);
    store.setIsPaused(false);
    store.setCurrentIteration(0);
    store.clearTasks();
    store.clearLogs();
    
    store.addLog({
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      type: 'info',
      message: 'Agent reset',
      icon: '🔄'
    });
  };

  return {
    startAgent,
    pauseAgent,
    resetAgent
  };
}

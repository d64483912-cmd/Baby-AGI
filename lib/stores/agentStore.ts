import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AgentState, Task, LogEntry, Settings } from '../types';

const defaultSettings: Settings = {
  apiKey: '',
  provider: 'openrouter',
  model: 'meta-llama/llama-3.1-8b-instruct:free',
  temperature: 0.7,
  iterationDelay: 1000,
  maxTokens: 1000,
  enableSounds: false,
  autoScroll: true,
  maxIterations: 20,
};

interface AgentStore extends AgentState {
  setObjective: (objective: string) => void;
  startAgent: () => void;
  pauseAgent: () => void;
  resetAgent: () => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  completeTask: (taskId: string, result: string) => void;
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSelectedTask: (taskId: string | null) => void;
  incrementIteration: () => void;
  setMode: (mode: 'simulated' | 'ai') => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set, get) => ({
      objective: '',
      tasks: [],
      executionLog: [],
      isRunning: false,
      isPaused: false,
      currentIteration: 0,
      maxIterations: 20,
      mode: 'simulated',
      settings: defaultSettings,
      theme: 'dark',
      sidebarCollapsed: false,
      selectedTask: null,
      sessionId: Date.now().toString(),

      setObjective: (objective) => set({ objective }),

      startAgent: () => set({ isRunning: true, isPaused: false }),

      pauseAgent: () => set({ isPaused: true }),

      resetAgent: () => {
        set({
          objective: '',
          tasks: [],
          executionLog: [],
          isRunning: false,
          isPaused: false,
          currentIteration: 0,
          selectedTask: null,
          sessionId: Date.now().toString(),
        });
      },

      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),

      completeTask: (taskId, result) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: 'completed' as const, result, completedAt: Date.now() }
              : task
          ),
        })),

      addLog: (entry) =>
        set((state) => ({
          executionLog: [
            ...state.executionLog,
            {
              ...entry,
              id: `log-${Date.now()}-${Math.random()}`,
              timestamp: Date.now(),
            },
          ],
        })),

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setSelectedTask: (taskId) => set({ selectedTask: taskId }),

      incrementIteration: () =>
        set((state) => ({
          currentIteration: state.currentIteration + 1,
        })),

      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'babyagi-storage',
      partialize: (state) => ({
        settings: state.settings,
        theme: state.theme,
      }),
    }
  )
);

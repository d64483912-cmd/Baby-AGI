'use client';

import { useAgentStore } from '@/lib/stores/agentStore';
import { ProgressBar } from '../controls/ProgressBar';
import { ExecutionLog } from '../log/ExecutionLog';

export function MainPanel() {
  const { sidebarCollapsed } = useAgentStore();

  return (
    <main 
      className={`
        fixed top-16 right-0 bottom-0 transition-all
        ${sidebarCollapsed ? 'left-0' : 'left-[320px]'}
      `}
    >
      <div className="h-full flex flex-col p-6 gap-6">
        {/* Progress Section */}
        <ProgressBar />

        {/* Execution Log */}
        <div className="flex-1 bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <ExecutionLog />
        </div>
      </div>
    </main>
  );
}

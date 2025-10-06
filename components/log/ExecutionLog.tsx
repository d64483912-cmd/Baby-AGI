'use client';

import { useEffect, useRef } from 'react';
import { useAgentStore } from '@/lib/stores/agentStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogEntry } from './LogEntry';

export function ExecutionLog() {
  const { executionLog, settings } = useAgentStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (settings.autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [executionLog, settings.autoScroll]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-slate-100">Execution Log</h3>
        <p className="text-sm text-slate-400 mt-1">
          {executionLog.length} entries
        </p>
      </div>

      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="p-4 space-y-2">
          <AnimatePresence initial={false}>
            {executionLog.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="text-sm">No logs yet. Start the agent to see execution details.</p>
              </div>
            ) : (
              executionLog.map((entry) => (
                <LogEntry key={entry.id} entry={entry} />
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}

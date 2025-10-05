'use client';

import { useAgentStore } from '@/lib/stores/agentStore';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { SettingsModal } from '../settings/SettingsModal';

export function TopBar() {
  const { theme, toggleTheme, sessionId, sidebarCollapsed } = useAgentStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header 
        className={`
          fixed top-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md 
          border-b border-slate-800 z-30 transition-all
          ${sidebarCollapsed ? 'left-0' : 'left-[320px]'}
        `}
      >
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-100">
              BabyAGI Agent
            </h2>
            <Badge variant="outline" className="border-slate-700 text-slate-400">
              Session #{sessionId.slice(-6)}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </>
  );
}

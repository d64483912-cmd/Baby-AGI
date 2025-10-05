'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MainPanel } from '@/components/layout/MainPanel';
import { PWAInstall } from '@/components/PWAInstall';
import { useAgentStore } from '@/lib/stores/agentStore';
import { useEffect } from 'react';

export default function Home() {
  const { theme } = useAgentStore();

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <TopBar />
      <MainPanel />
      <PWAInstall />
    </div>
  );
}

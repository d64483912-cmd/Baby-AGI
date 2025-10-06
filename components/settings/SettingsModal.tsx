'use client';

import { useState } from 'react';
import { useAgentStore } from '@/lib/stores/agentStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Zap } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { settings, updateSettings, mode, setMode } = useAgentStore();
  const [showApiKey, setShowApiKey] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    onOpenChange(false);
  };

  const updateLocalSetting = <K extends keyof typeof localSettings>(
    key: K,
    value: typeof localSettings[K]
  ) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Settings</DialogTitle>
          <DialogDescription className="text-slate-400">
            Configure your BabyAGI agent settings
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="api">API Config</TabsTrigger>
            <TabsTrigger value="agent">Agent Behavior</TabsTrigger>
            <TabsTrigger value="ui">UI Preferences</TabsTrigger>
          </TabsList>

          {/* API Configuration */}
          <TabsContent value="api" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Agent Mode</Label>
              <div className="flex gap-2">
                <Button
                  variant={mode === 'simulated' ? 'default' : 'outline'}
                  onClick={() => setMode('simulated')}
                  className="flex-1"
                >
                  Simulated
                </Button>
                <Button
                  variant={mode === 'ai' ? 'default' : 'outline'}
                  onClick={() => setMode('ai')}
                  className="flex-1"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  AI Powered
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                {mode === 'simulated' 
                  ? 'Uses rule-based task execution (no API key needed)'
                  : 'Uses real AI for task execution (requires API key)'}
              </p>
            </div>

            {mode === 'ai' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-slate-300">
                    OpenRouter API Key
                  </Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showApiKey ? 'text' : 'password'}
                      value={localSettings.apiKey}
                      onChange={(e) => updateLocalSetting('apiKey', e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="bg-slate-800 border-slate-700 text-slate-100 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Get your API key from{' '}
                    <a
                      href="https://openrouter.ai/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      openrouter.ai/keys
                    </a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="text-slate-300">
                    Model
                  </Label>
                  <Select
                    value={localSettings.model}
                    onValueChange={(value) => updateLocalSetting('model', value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {/* PREMIUM FREE MODELS */}
                      <SelectItem value="deepseek/deepseek-chat-v3.1:free">
                        🔥 DeepSeek V3.1 (Free) - Best for Research
                      </SelectItem>
                      <SelectItem value="openai/gpt-oss-20b:free">
                        🚀 OpenAI GPT-OSS-20B (Free) - 21B params
                      </SelectItem>
                      <SelectItem value="qwen/qwen3-coder:free">
                        💻 Qwen3 Coder 480B (Free) - Best for Code
                      </SelectItem>
                      <SelectItem value="z-ai/glm-4.5-air:free">
                        🤖 GLM 4.5 Air (Free) - Agent Optimized
                      </SelectItem>
                      <SelectItem value="nvidia/nemotron-nano-9b-v2:free">
                        🧠 NVIDIA Nemotron 9B (Free) - Reasoning
                      </SelectItem>
                      <SelectItem value="meituan/longcat-flash-chat:free">
                        ⚡ LongCat Flash Chat (Free) - 560B params
                      </SelectItem>
                      <SelectItem value="alibaba/tongyi-deepresearch-30b-a3b:free">
                        🔬 Tongyi DeepResearch (Free) - Research Focus
                      </SelectItem>
                      <SelectItem value="moonshotai/kimi-k2:free">
                        🌙 Kimi K2 (Free) - 1T params MoE
                      </SelectItem>
                      
                      {/* CLASSIC FREE MODELS */}
                      <SelectItem value="meta-llama/llama-3.1-8b-instruct:free">
                        🦙 Llama 3.1 8B (Free) - Classic
                      </SelectItem>
                      
                      {/* PAID MODELS */}
                      <SelectItem value="google/gemini-flash-1.5">
                        💎 Gemini Flash 1.5 (Paid)
                      </SelectItem>
                      <SelectItem value="anthropic/claude-3-haiku">
                        💎 Claude 3 Haiku (Paid)
                      </SelectItem>
                      <SelectItem value="openai/gpt-3.5-turbo">
                        💎 GPT-3.5 Turbo (Paid)
                      </SelectItem>
                      <SelectItem value="openai/gpt-4o-mini">
                        💎 GPT-4o Mini (Paid)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Temperature</Label>
                    <span className="text-sm text-slate-400">{localSettings.temperature}</span>
                  </div>
                  <Slider
                    value={[localSettings.temperature]}
                    onValueChange={([value]) => updateLocalSetting('temperature', value)}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Max Tokens</Label>
                    <span className="text-sm text-slate-400">{localSettings.maxTokens}</span>
                  </div>
                  <Slider
                    value={[localSettings.maxTokens]}
                    onValueChange={([value]) => updateLocalSetting('maxTokens', value)}
                    min={100}
                    max={4000}
                    step={100}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </TabsContent>

          {/* Agent Behavior */}
          <TabsContent value="agent" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Max Iterations</Label>
                <span className="text-sm text-slate-400">{localSettings.maxIterations}</span>
              </div>
              <Slider
                value={[localSettings.maxIterations]}
                onValueChange={([value]) => updateLocalSetting('maxIterations', value)}
                min={5}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-slate-500">
                Maximum number of task execution cycles
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Iteration Delay (ms)</Label>
                <span className="text-sm text-slate-400">{localSettings.iterationDelay}</span>
              </div>
              <Slider
                value={[localSettings.iterationDelay]}
                onValueChange={([value]) => updateLocalSetting('iterationDelay', value)}
                min={0}
                max={5000}
                step={100}
                className="w-full"
              />
              <p className="text-xs text-slate-500">
                Delay between task executions (0 = fastest)
              </p>
            </div>
          </TabsContent>

          {/* UI Preferences */}
          <TabsContent value="ui" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-300">Auto-scroll Logs</Label>
                <p className="text-xs text-slate-500">
                  Automatically scroll to newest log entries
                </p>
              </div>
              <Switch
                checked={localSettings.autoScroll}
                onCheckedChange={(checked) => updateLocalSetting('autoScroll', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-300">Sound Effects</Label>
                <p className="text-xs text-slate-500">
                  Play sounds for task completion
                </p>
              </div>
              <Switch
                checked={localSettings.enableSounds}
                onCheckedChange={(checked) => updateLocalSetting('enableSounds', checked)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-700 text-slate-300"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

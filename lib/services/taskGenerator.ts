import type { Task } from '../types';

const taskTemplates = {
  research: [
    'Research {topic} and gather relevant information',
    'Find credible sources about {topic}',
    'Analyze current trends in {topic}',
    'Identify key stakeholders in {topic}',
  ],
  analyze: [
    'Analyze the findings from {previous}',
    'Identify patterns and insights in {previous}',
    'Compare different approaches to {topic}',
    'Evaluate pros and cons of {topic}',
  ],
  create: [
    'Create a draft outline for {topic}',
    'Generate initial ideas for {topic}',
    'Design a framework for {topic}',
    'Develop a strategy for {topic}',
  ],
  refine: [
    'Review and refine {previous}',
    'Optimize the approach to {topic}',
    'Enhance the quality of {previous}',
    'Polish and finalize {topic}',
  ],
};

export function generateInitialTasks(objective: string): Task[] {
  const tasks: Task[] = [];
  const keywords = extractKeywords(objective);
  const mainKeyword = keywords[0] || 'the objective';

  // Generate 5-8 initial tasks
  const taskCount = Math.floor(Math.random() * 4) + 5;
  
  tasks.push(createTask(`Break down the objective: "${objective}"`, 10));
  tasks.push(createTask(`Research ${mainKeyword}`, 9));
  tasks.push(createTask(`Identify key requirements for ${mainKeyword}`, 8));
  tasks.push(createTask(`Analyze potential approaches to ${objective}`, 7));
  
  for (let i = tasks.length; i < taskCount; i++) {
    const category = ['research', 'analyze', 'create'][Math.floor(Math.random() * 3)] as keyof typeof taskTemplates;
    const template = taskTemplates[category][Math.floor(Math.random() * taskTemplates[category].length)];
    const description = template.replace('{topic}', mainKeyword).replace('{previous}', 'previous findings');
    tasks.push(createTask(description, 10 - i));
  }

  return tasks;
}

export function generateFollowUpTasks(completedTask: Task, result: string, objective: string): Task[] {
  const tasks: Task[] = [];
  const keywords = extractKeywords(completedTask.description);
  const mainKeyword = keywords[0] || 'the task';

  // 30% chance to generate 1-2 follow-up tasks
  if (Math.random() < 0.3) {
    const followUpCount = Math.random() < 0.5 ? 1 : 2;
    
    for (let i = 0; i < followUpCount; i++) {
      const category = detectTaskType(completedTask.description);
      const nextCategory = getNextCategory(category);
      const template = taskTemplates[nextCategory][Math.floor(Math.random() * taskTemplates[nextCategory].length)];
      const description = template
        .replace('{topic}', mainKeyword)
        .replace('{previous}', completedTask.description);
      
      tasks.push(createTask(description, completedTask.priority - 1, [completedTask.id]));
    }
  }

  return tasks;
}

function createTask(description: string, priority: number, dependencies?: string[]): Task {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    description,
    status: 'pending',
    priority: Math.max(1, Math.min(10, priority)),
    createdAt: Date.now(),
    dependencies,
  };
}

function extractKeywords(text: string): string[] {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const words = text.toLowerCase().split(/\s+/);
  return words.filter(word => word.length > 3 && !stopWords.includes(word)).slice(0, 3);
}

function detectTaskType(description: string): keyof typeof taskTemplates {
  const lower = description.toLowerCase();
  if (lower.includes('research') || lower.includes('find') || lower.includes('gather')) return 'research';
  if (lower.includes('analyze') || lower.includes('evaluate') || lower.includes('compare')) return 'analyze';
  if (lower.includes('create') || lower.includes('generate') || lower.includes('design')) return 'create';
  if (lower.includes('refine') || lower.includes('review') || lower.includes('polish')) return 'refine';
  return 'research';
}

function getNextCategory(current: keyof typeof taskTemplates): keyof typeof taskTemplates {
  const progression: Record<keyof typeof taskTemplates, keyof typeof taskTemplates> = {
    research: 'analyze',
    analyze: 'create',
    create: 'refine',
    refine: 'refine',
  };
  return progression[current];
}

export function prioritizeTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Failed tasks go to bottom
    if (a.status === 'failed' && b.status !== 'failed') return 1;
    if (a.status !== 'failed' && b.status === 'failed') return -1;
    
    // Running tasks go to top
    if (a.status === 'running' && b.status !== 'running') return -1;
    if (a.status !== 'running' && b.status === 'running') return 1;
    
    // Sort by priority
    return b.priority - a.priority;
  });
}

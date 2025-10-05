import type { Settings } from '../types';

export interface AIResponse {
  content: string;
  error?: string;
}

export async function executeTaskWithAI(
  taskDescription: string,
  objective: string,
  settings: Settings
): Promise<AIResponse> {
  if (!settings.apiKey) {
    return { content: '', error: 'API key not configured' };
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
        'X-Title': 'BabyAGI PWA',
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          {
            role: 'system',
            content: `You are an autonomous task execution agent working toward this objective: "${objective}". Execute tasks efficiently and provide concise, actionable results.`,
          },
          {
            role: 'user',
            content: `Execute this task and provide a brief result (2-3 sentences):\n\n${taskDescription}`,
          },
        ],
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        content: '', 
        error: errorData.error?.message || `API error: ${response.status}` 
      };
    }

    const data = await response.json();
    return { content: data.choices[0]?.message?.content || 'No response generated' };
  } catch (error) {
    return { 
      content: '', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function generateTasksWithAI(
  objective: string,
  completedTasks: Array<{ description: string; result?: string }>,
  settings: Settings
): Promise<AIResponse> {
  if (!settings.apiKey) {
    return { content: '[]', error: 'API key not configured' };
  }

  try {
    const completedTasksText = completedTasks
      .map(t => `- ${t.description}: ${t.result || 'No result'}`)
      .join('\n');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
        'X-Title': 'BabyAGI PWA',
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          {
            role: 'system',
            content: 'You are a task planning AI. Generate logical next steps as JSON array.',
          },
          {
            role: 'user',
            content: `Objective: ${objective}\n\nCompleted tasks:\n${completedTasksText}\n\nGenerate 1-3 next logical tasks to progress toward the objective. Return ONLY a JSON array in this format:\n[{"description": "task description", "priority": 1-10}]`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      return { content: '[]', error: `API error: ${response.status}` };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/) || content.match(/(\[[\s\S]*?\])/);
    return { content: jsonMatch ? jsonMatch[1] : '[]' };
  } catch (error) {
    return { content: '[]', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function simulateTaskExecution(taskDescription: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

  const templates = [
    `Completed research on {keyword}. Found 3 relevant sources with key insights about implementation strategies.`,
    `Analyzed {keyword} and identified 5 critical factors: feasibility, cost, timeline, resources, and risks.`,
    `Generated comprehensive outline with 4 main sections covering all aspects of {keyword}.`,
    `Evaluated different approaches to {keyword}. Recommended hybrid strategy combining best practices.`,
    `Synthesized findings into actionable recommendations. Next steps clearly defined.`,
    `Reviewed {keyword} thoroughly. Identified 3 optimization opportunities and 2 potential blockers.`,
    `Created detailed framework for {keyword} with step-by-step implementation guide.`,
    `Gathered data on {keyword}. Key metrics show positive trends and strong potential.`,
  ];

  const keywords = taskDescription.split(' ').filter(w => w.length > 4);
  const keyword = keywords[Math.floor(Math.random() * keywords.length)] || 'the task';
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return template.replace('{keyword}', keyword);
}

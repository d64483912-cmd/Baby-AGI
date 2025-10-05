# 🤖 BabyAGI PWA - Autonomous AI Agent

A production-ready Progressive Web App that simulates an autonomous AI agent inspired by BabyAGI. The app breaks down complex objectives into manageable subtasks, executes them iteratively, and learns from results to achieve goals intelligently.

## ✨ Features

### Core Functionality
- **Autonomous Task Execution**: Automatically breaks down objectives into subtasks and executes them
- **Dual Mode Operation**:
  - **Simulated Mode**: Rule-based task execution (no API key needed)
  - **AI Mode**: Real AI-powered execution via OpenRouter API
- **Smart Task Prioritization**: Intelligent task ordering based on priority and dependencies
- **Real-time Progress Tracking**: Live updates on task completion and iteration progress
- **Comprehensive Logging**: Detailed execution logs with timestamps and icons

### UI/UX Features
- **Dark Theme**: Beautiful dark mode interface optimized for long sessions
- **Collapsible Sidebar**: Responsive layout with collapsible task queue
- **Task Details**: Expandable task cards showing results and metadata
- **Progress Visualization**: Real-time progress bars and statistics
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **PWA Support**: Installable app with offline capabilities

### Advanced Features
- **Session Export**: Download complete session data as JSON
- **Settings Management**: Comprehensive settings for API, agent behavior, and UI
- **Multiple AI Models**: Support for various models via OpenRouter
- **Iteration Control**: Configurable max iterations and delays
- **Auto-scroll Logs**: Optional auto-scrolling for execution logs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- (Optional) OpenRouter API key for AI mode

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd babyagi-pwa
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Basic Usage (Simulated Mode)

1. Enter your objective in the sidebar textarea
2. Click "Start Agent"
3. Watch as the agent automatically:
   - Generates initial tasks
   - Executes tasks one by one
   - Creates follow-up tasks based on results
   - Tracks progress and logs execution

### AI Mode (OpenRouter)

1. Click the Settings icon (⚙️) in the top bar
2. Switch to "AI Powered" mode
3. Enter your OpenRouter API key
4. Select your preferred model
5. Adjust temperature and max tokens as needed
6. Click "Save Changes"
7. Start the agent with your objective

### Available Models
- Llama 3.1 8B (Free)
- Gemini Flash 1.5
- Claude 3 Haiku
- GPT-3.5 Turbo
- GPT-4o Mini

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **PWA**: Service Worker with offline support
- **Icons**: Lucide React

### Project Structure
```
babyagi-pwa/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MainPanel.tsx
│   ├── task/              # Task-related components
│   │   ├── TaskQueue.tsx
│   │   └── TaskCard.tsx
│   ├── log/               # Logging components
│   │   ├── ExecutionLog.tsx
│   │   └── LogEntry.tsx
│   ├── controls/          # Control components
│   │   └── ProgressBar.tsx
│   ├── settings/          # Settings components
│   │   └── SettingsModal.tsx
│   ├── ui/                # shadcn/ui components
│   └── PWAInstall.tsx     # PWA install prompt
├── lib/
│   ├── types/             # TypeScript type definitions
│   ├── stores/            # Zustand stores
│   ├── services/          # Business logic
│   │   ├── taskGenerator.ts
│   │   └── apiService.ts
│   └── hooks/             # Custom React hooks
│       └── useAgent.ts
└── public/
    ├── manifest.json      # PWA manifest
    ├── sw.js             # Service worker
    └── icons/            # App icons
```

## 🎨 Design System

### Color Palette (Dark Theme)
- Background: `#0f172a` (slate-900)
- Surface: `#1e293b` (slate-800)
- Accent: `#3b82f6` (blue-500)
- Success: `#10b981` (emerald-500)
- Warning: `#f59e0b` (amber-500)
- Error: `#ef4444` (red-500)

### Typography
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Code/Logs**: JetBrains Mono

## 🔧 Configuration

### Agent Settings
- **Max Iterations**: 5-100 (default: 20)
- **Iteration Delay**: 0-5000ms (default: 1000ms)
- **Temperature**: 0-2 (default: 0.7)
- **Max Tokens**: 100-4000 (default: 1000)

### UI Preferences
- **Auto-scroll Logs**: Automatically scroll to newest entries
- **Sound Effects**: Play sounds for task completion (coming soon)

## 📱 PWA Features

### Installation
- Custom install prompt with benefits explanation
- Works on desktop and mobile devices
- Standalone app experience

### Offline Support
- Service worker caches static assets
- Graceful degradation when offline
- Offline indicator in UI

## 🔐 API Integration

### OpenRouter Setup
1. Get your API key from [openrouter.ai/keys](https://openrouter.ai/keys)
2. Open Settings → API Config
3. Enter your API key
4. Select your preferred model
5. Save changes

### API Request Format
```typescript
{
  model: "meta-llama/llama-3.1-8b-instruct:free",
  messages: [
    {
      role: "system",
      content: "You are an autonomous task execution agent..."
    },
    {
      role: "user",
      content: "Execute this task: [task description]"
    }
  ],
  temperature: 0.7,
  max_tokens: 1000
}
```

## 📊 Session Export

Export your complete session data including:
- Session ID and timestamp
- Original objective
- All tasks with results
- Complete execution log

Format: JSON file (`babyagi-session-[id].json`)

## 🚧 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Next.js + TypeScript
- [x] Zustand store implementation
- [x] Basic UI layout
- [x] Task queue and execution log

### Phase 2: Core Features ✅
- [x] Simulated task execution
- [x] Agent control (Start/Pause/Reset)
- [x] Progress tracking
- [x] Settings modal

### Phase 3: AI Integration ✅
- [x] OpenRouter API integration
- [x] Multiple model support
- [x] Error handling
- [x] AI-powered task generation

### Phase 4: PWA ✅
- [x] Service worker
- [x] Offline support
- [x] Install prompt
- [x] App manifest

### Phase 5: Future Enhancements
- [ ] Multi-agent system
- [ ] Memory/context preservation
- [ ] External API integrations
- [ ] Analytics dashboard
- [ ] Collaboration features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- Inspired by [BabyAGI](https://github.com/yoheinakajima/babyagi)
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and AI**

# 📖 BabyAGI PWA - Usage Guide

## Quick Start

### 1. First Time Setup

1. **Open the app**: Navigate to the deployed URL
2. **Install (Optional)**: Click "Install" on the PWA prompt for offline access
3. **Choose Mode**: 
   - Start with **Simulated Mode** (no setup needed)
   - Or configure **AI Mode** for real AI execution

### 2. Running Your First Agent

#### Simulated Mode (Recommended for Testing)

1. **Enter Objective**: Type your goal in the sidebar textarea
   ```
   Example: "Create a comprehensive marketing strategy for a new AI-powered productivity app"
   ```

2. **Start Agent**: Click the blue "Start Agent" button

3. **Watch Execution**: The agent will:
   - Generate 5-8 initial tasks
   - Execute tasks one by one
   - Show real-time logs
   - Create follow-up tasks
   - Track progress

4. **Monitor Progress**: 
   - Task Queue shows pending/completed tasks
   - Progress bar shows completion percentage
   - Execution log shows detailed activity

#### AI Mode (For Real AI Execution)

1. **Get API Key**: 
   - Visit [openrouter.ai/keys](https://openrouter.ai/keys)
   - Create an account and generate an API key
   - Copy your key (starts with `sk-or-v1-...`)

2. **Configure Settings**:
   - Click ⚙️ Settings icon in top bar
   - Click "AI Powered" button
   - Paste your API key
   - Select a model (Llama 3.1 8B is free!)
   - Adjust temperature (0.7 recommended)
   - Click "Save Changes"

3. **Run Agent**: Same as simulated mode, but now using real AI!

## Features Guide

### Task Queue

**Pending Tasks**
- Shows tasks waiting to be executed
- Priority badges (1-10, higher = more urgent)
- ⚡ icon for high-priority tasks (8+)

**Completed Tasks**
- Collapsible section (click to expand)
- Click any task to see result details
- Green checkmark indicates success

**Failed Tasks**
- Shows tasks that encountered errors
- Red X icon indicates failure

### Execution Log

**Log Entry Types**:
- 📝 Task Created - New task added
- ▶️ Task Started - Execution begins
- 🔍 Searching - Research phase
- 💭 Thinking - AI reasoning
- ✅ Task Completed - Success
- ❌ Task Failed - Error
- 🎯 Milestone - Progress milestones (25%, 50%, 75%, 100%)
- 📊 Result - Task output

**Features**:
- Auto-scroll (toggle in settings)
- Click long entries to expand
- Timestamps show relative time
- Color-coded by type

### Controls

**Start Agent**
- Begins autonomous execution
- Generates initial tasks from objective
- Runs until max iterations or completion

**Pause**
- Temporarily stops execution
- Resume anytime
- Preserves current state

**Reset**
- Clears all tasks and logs
- Resets iteration counter
- Starts fresh session

**Export Session**
- Downloads JSON file with:
  - Session ID
  - Objective
  - All tasks and results
  - Complete execution log
  - Timestamp

### Settings

#### API Configuration
- **Agent Mode**: Simulated vs AI Powered
- **API Key**: Your OpenRouter key (masked for security)
- **Model**: Choose from available models
- **Temperature**: Creativity level (0 = focused, 2 = creative)
- **Max Tokens**: Response length limit

#### Agent Behavior
- **Max Iterations**: Stop after N cycles (5-100)
- **Iteration Delay**: Pause between tasks (0-5000ms)

#### UI Preferences
- **Auto-scroll Logs**: Follow newest entries
- **Sound Effects**: Audio feedback (coming soon)

## Tips & Best Practices

### Writing Good Objectives

✅ **Good Examples**:
- "Create a comprehensive marketing strategy for a new AI-powered productivity app"
- "Build a complete product launch plan for a SaaS application"
- "Research and analyze the top 5 competitors in the AI writing space"
- "Design a user onboarding flow for a mobile fitness app"

❌ **Avoid**:
- Too vague: "Make something cool"
- Too simple: "Write a blog post" (not enough context)
- Too complex: Multiple unrelated objectives in one

### Optimizing Performance

**Simulated Mode**:
- Faster execution (500-3000ms per task)
- No API costs
- Great for testing and demos
- Predictable results

**AI Mode**:
- Real AI reasoning
- More creative solutions
- Slower (depends on model)
- API costs apply

**Iteration Delay**:
- 0ms = Fastest (may be overwhelming)
- 1000ms = Balanced (recommended)
- 3000ms+ = Slower, easier to follow

### Model Selection

**Free Models**:
- Llama 3.1 8B - Fast, good quality, FREE!

**Paid Models** (better quality):
- Gemini Flash 1.5 - Fast, affordable
- Claude 3 Haiku - High quality, fast
- GPT-3.5 Turbo - Reliable, affordable
- GPT-4o Mini - Best quality, more expensive

## Troubleshooting

### Agent Not Starting
- ✅ Check that objective is not empty
- ✅ Verify you clicked "Start Agent"
- ✅ Check browser console for errors

### AI Mode Not Working
- ✅ Verify API key is correct
- ✅ Check you have credits on OpenRouter
- ✅ Try a different model
- ✅ Check internet connection

### Tasks Not Generating
- ✅ Wait for initial task generation (takes 1-2 seconds)
- ✅ Check execution log for errors
- ✅ Try resetting and starting again

### PWA Not Installing
- ✅ Use HTTPS (required for PWA)
- ✅ Try Chrome/Edge (best PWA support)
- ✅ Check if already installed
- ✅ Clear browser cache and try again

## Keyboard Shortcuts

Currently none, but coming soon:
- `Ctrl/Cmd + K` - Open command palette
- `Space` - Pause/Resume agent
- `R` - Reset agent
- `E` - Export session

## Advanced Usage

### Session Management
1. Export sessions regularly for backup
2. Import previous sessions to continue work
3. Compare different approaches by exporting multiple sessions

### Task Dependencies
- Some tasks depend on others completing first
- Agent automatically handles dependencies
- Check task details to see dependency chains

### Progress Milestones
- 25% - First quarter complete
- 50% - Halfway there!
- 75% - Almost done
- 100% - Objective achieved!

## FAQ

**Q: Is my API key secure?**
A: Yes, it's stored locally in your browser and never sent anywhere except OpenRouter.

**Q: Can I use this offline?**
A: Yes in simulated mode. AI mode requires internet for API calls.

**Q: How much does AI mode cost?**
A: Depends on the model. Llama 3.1 8B is FREE! Others vary.

**Q: Can I stop and resume later?**
A: Yes! Your session is saved in browser storage. Just don't clear your browser data.

**Q: What happens at max iterations?**
A: Agent stops automatically. You can increase the limit in settings.

**Q: Can I edit tasks manually?**
A: Not yet, but this feature is planned for a future update.

## Support

Need help? 
- Check the README.md for technical details
- Open an issue on GitHub
- Review the execution log for error messages

---

**Happy Automating! 🤖**

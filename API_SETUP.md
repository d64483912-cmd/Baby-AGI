# 🔑 API Setup Guide - OpenRouter Integration

## Getting Your OpenRouter API Key

### Step 1: Create an Account

1. Visit [openrouter.ai](https://openrouter.ai)
2. Click "Sign Up" or "Get Started"
3. Sign up with:
   - Email
   - Google
   - GitHub

### Step 2: Generate API Key

1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Click "Create Key"
3. Give it a name (e.g., "BabyAGI PWA")
4. Copy the key (starts with `sk-or-v1-...`)
5. **Important**: Save it securely - you won't see it again!

### Step 3: Add Credits (Optional)

**Free Tier**:
- Some models are completely FREE (e.g., Llama 3.1 8B)
- No credit card required
- Rate limits apply

**Paid Tier**:
1. Go to [openrouter.ai/credits](https://openrouter.ai/credits)
2. Add credits ($5 minimum)
3. Pay as you go - only charged for what you use

## Configuring BabyAGI PWA

### Method 1: Settings UI (Recommended)

1. Open BabyAGI PWA
2. Click ⚙️ Settings icon (top right)
3. Click "AI Powered" button
4. Paste your API key in the "OpenRouter API Key" field
5. Select your preferred model
6. Adjust settings:
   - **Temperature**: 0.7 (balanced)
   - **Max Tokens**: 1000 (good for most tasks)
7. Click "Save Changes"

### Method 2: Browser Storage (Advanced)

Open browser console and run:
```javascript
localStorage.setItem('babyagi-storage', JSON.stringify({
  state: {
    settings: {
      apiKey: 'sk-or-v1-YOUR-KEY-HERE',
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      temperature: 0.7,
      maxTokens: 1000
    }
  }
}));
```

## Available Models

### Free Models (No Credits Required)

#### Llama 3.1 8B Instruct
- **Model ID**: `meta-llama/llama-3.1-8b-instruct:free`
- **Cost**: FREE
- **Speed**: Fast
- **Quality**: Good
- **Best For**: Testing, demos, general tasks

### Paid Models (Credits Required)

#### Gemini Flash 1.5
- **Model ID**: `google/gemini-flash-1.5`
- **Cost**: ~$0.075 per 1M tokens
- **Speed**: Very Fast
- **Quality**: Excellent
- **Best For**: High-volume tasks

#### Claude 3 Haiku
- **Model ID**: `anthropic/claude-3-haiku`
- **Cost**: ~$0.25 per 1M tokens
- **Speed**: Fast
- **Quality**: Excellent
- **Best For**: Complex reasoning

#### GPT-3.5 Turbo
- **Model ID**: `openai/gpt-3.5-turbo`
- **Cost**: ~$0.50 per 1M tokens
- **Speed**: Fast
- **Quality**: Very Good
- **Best For**: Reliable, consistent results

#### GPT-4o Mini
- **Model ID**: `openai/gpt-4o-mini`
- **Cost**: ~$0.15 per 1M tokens
- **Speed**: Medium
- **Quality**: Excellent
- **Best For**: Best quality results

## Understanding Settings

### Temperature (0.0 - 2.0)

**Low (0.0 - 0.3)**:
- More focused and deterministic
- Consistent results
- Best for: Factual tasks, analysis

**Medium (0.4 - 0.9)**:
- Balanced creativity and focus
- Recommended: **0.7**
- Best for: Most tasks

**High (1.0 - 2.0)**:
- More creative and varied
- Less predictable
- Best for: Brainstorming, creative tasks

### Max Tokens

**What it means**: Maximum length of AI response

**Recommendations**:
- **500**: Short, concise responses
- **1000**: Balanced (recommended)
- **2000**: Detailed responses
- **4000**: Very detailed (costs more)

**Note**: More tokens = higher cost

### Iteration Delay

**What it means**: Pause between task executions

**Recommendations**:
- **0ms**: Fastest, but hard to follow
- **1000ms**: Balanced (recommended)
- **3000ms**: Slower, easier to watch
- **5000ms**: Very slow, for demos

## Cost Estimation

### Example: Marketing Strategy Objective

**Typical execution**:
- 8-12 tasks generated
- ~200 tokens per task execution
- ~100 tokens per task generation
- Total: ~3,000 tokens

**Cost by model**:
- Llama 3.1 8B: **FREE**
- Gemini Flash: **$0.0002** (~0.02¢)
- Claude Haiku: **$0.0008** (~0.08¢)
- GPT-3.5 Turbo: **$0.0015** (~0.15¢)
- GPT-4o Mini: **$0.0005** (~0.05¢)

**Conclusion**: Very affordable! Even paid models cost less than 1¢ per session.

## API Request Format

BabyAGI PWA sends requests in this format:

```json
{
  "model": "meta-llama/llama-3.1-8b-instruct:free",
  "messages": [
    {
      "role": "system",
      "content": "You are an autonomous task execution agent working toward this objective: [YOUR OBJECTIVE]"
    },
    {
      "role": "user",
      "content": "Execute this task and provide a concise result (2-3 sentences):\n\n[TASK DESCRIPTION]"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

## Security Best Practices

### ✅ DO:
- Store API key in browser local storage (encrypted by browser)
- Use the "Show/Hide" toggle to verify key
- Revoke and regenerate keys periodically
- Use separate keys for different apps

### ❌ DON'T:
- Share your API key publicly
- Commit API keys to Git repositories
- Use the same key across multiple untrusted apps
- Leave keys in browser console logs

## Troubleshooting

### Error: "API key not configured"
**Solution**: Enter your API key in Settings → API Config

### Error: "API error: 401"
**Solution**: Invalid API key. Check and re-enter your key

### Error: "API error: 402"
**Solution**: Insufficient credits. Add credits to your OpenRouter account

### Error: "API error: 429"
**Solution**: Rate limit exceeded. Wait a moment or upgrade your plan

### Error: "API error: 500"
**Solution**: OpenRouter server error. Try again in a few moments

### Tasks executing but no AI responses
**Solution**: 
1. Check you're in "AI Powered" mode (not Simulated)
2. Verify API key is saved
3. Check browser console for errors
4. Try a different model

## Rate Limits

### Free Tier
- **Requests**: ~20 per minute
- **Tokens**: Varies by model
- **Concurrent**: 1 request at a time

### Paid Tier
- **Requests**: Much higher limits
- **Tokens**: Based on credits
- **Concurrent**: Multiple requests

**Tip**: Use Iteration Delay (1000ms+) to stay within rate limits

## Monitoring Usage

### In OpenRouter Dashboard
1. Go to [openrouter.ai/activity](https://openrouter.ai/activity)
2. View:
   - Request count
   - Token usage
   - Cost breakdown
   - Model usage

### In BabyAGI PWA
- Check execution log for API calls
- Count completed tasks
- Export session for detailed analysis

## Advanced: Custom Models

Want to use a different model not in the dropdown?

1. Find model ID on [openrouter.ai/models](https://openrouter.ai/models)
2. Open browser console
3. Run:
```javascript
const store = JSON.parse(localStorage.getItem('babyagi-storage'));
store.state.settings.model = 'your-model-id-here';
localStorage.setItem('babyagi-storage', JSON.stringify(store));
location.reload();
```

## Support

### OpenRouter Support
- Docs: [openrouter.ai/docs](https://openrouter.ai/docs)
- Discord: [discord.gg/openrouter](https://discord.gg/openrouter)
- Email: support@openrouter.ai

### BabyAGI PWA Support
- Check README.md
- Review USAGE.md
- Open GitHub issue

---

**Ready to unleash AI-powered automation! 🚀**

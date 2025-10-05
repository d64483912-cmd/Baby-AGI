# 🚀 Deployment Instructions

## GitHub Repository Setup

Your BabyAGI PWA project is ready to be pushed to GitHub!

### Repository URL
https://github.com/d64483912-cmd/Baby-AGI.git

### To Push Your Code

Since this is a terminal environment without interactive Git authentication, you'll need to push from your local machine or use GitHub's web interface:

#### Option 1: Push from Local Machine

1. **Clone the repository to your local machine:**
   ```bash
   git clone https://github.com/d64483912-cmd/Baby-AGI.git
   cd Baby-AGI
   ```

2. **Download the project files** from this environment or copy them manually

3. **Add all files:**
   ```bash
   git add -A
   git commit -m "Initial commit: Complete BabyAGI PWA"
   git push origin main
   ```

#### Option 2: Use GitHub Web Interface

1. Go to https://github.com/d64483912-cmd/Baby-AGI
2. Click "uploading an existing file"
3. Drag and drop all project files
4. Commit directly to main branch

#### Option 3: Use GitHub CLI (if installed locally)

```bash
gh auth login
git push -u origin main
```

### What's Included in the Repository

✅ Complete Next.js application with TypeScript
✅ All components (Sidebar, TaskQueue, ExecutionLog, Settings, etc.)
✅ Zustand state management with persistence
✅ OpenRouter API integration
✅ PWA support (manifest, service worker, icons)
✅ Comprehensive documentation:
   - README.md - Project overview and setup
   - USAGE.md - User guide
   - API_SETUP.md - OpenRouter integration guide
   - DEPLOYMENT.md - This file

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Free tier available
- Perfect for Next.js apps

**Steps:**

1. **Install Vercel CLI** (on your local machine):
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd babyagi-pwa
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Select your GitHub repo
   - Deploy!

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `d64483912-cmd/Baby-AGI`
4. Click "Deploy"
5. Done! 🎉

**Environment Variables** (if needed):
- None required for basic functionality
- Users add their own OpenRouter API keys in the app

### 2. Netlify

**Steps:**

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select `d64483912-cmd/Baby-AGI`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### 3. GitHub Pages (Static Export)

**Modify next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Baby-AGI',
};

module.exports = nextConfig;
```

**Deploy:**
```bash
npm run build
npx gh-pages -d out
```

**Note**: Service worker may have limitations on GitHub Pages

### 4. Railway

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `d64483912-cmd/Baby-AGI`
5. Railway auto-detects Next.js
6. Click "Deploy"

### 5. Render

**Steps:**

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repo
4. Settings:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
5. Click "Create Web Service"

### 6. Self-Hosted (VPS/Cloud)

**Requirements:**
- Node.js 18+ installed
- PM2 or similar process manager

**Steps:**

1. **Clone repository:**
   ```bash
   git clone https://github.com/d64483912-cmd/Baby-AGI.git
   cd Baby-AGI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "babyagi-pwa" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx** (optional, for reverse proxy):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment Checklist

### Essential
- ✅ App loads without errors
- ✅ PWA install prompt appears
- ✅ Service worker registers successfully
- ✅ Simulated mode works
- ✅ Settings modal opens and saves

### Testing AI Mode
- ✅ Can enter OpenRouter API key
- ✅ Can select different models
- ✅ API calls work (test with free Llama model)
- ✅ Error handling works (test with invalid key)

### PWA Features
- ✅ Manifest loads correctly
- ✅ Icons display properly
- ✅ Can install as standalone app
- ✅ Works offline (simulated mode)
- ✅ Service worker caches assets

### Performance
- ✅ Page loads in < 3 seconds
- ✅ Animations are smooth
- ✅ No console errors
- ✅ Mobile responsive

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS:
   - Type: CNAME
   - Name: www
   - Value: [your-site].netlify.app

## Environment Variables

Currently, the app doesn't require server-side environment variables since:
- API keys are stored client-side (user's browser)
- No backend database
- No server-side API calls

**If you add backend features later**, you might need:
```env
# Example for future backend integration
DATABASE_URL=postgresql://...
OPENROUTER_API_KEY=sk-or-v1-...  # For server-side calls
NEXTAUTH_SECRET=...  # If adding authentication
```

## Monitoring & Analytics

### Add Analytics (Optional)

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Google Analytics:**
Add to `app/layout.tsx`:
```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## Troubleshooting Deployment

### Build Fails
- Check Node.js version (need 18+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors: `npm run build`

### Service Worker Not Working
- Ensure HTTPS is enabled (required for PWA)
- Check browser console for SW errors
- Verify `sw.js` is in `/public` folder

### API Calls Failing
- Check CORS settings (OpenRouter should allow all origins)
- Verify API key format
- Test with curl first

### Styles Not Loading
- Check Tailwind config
- Verify `globals.css` imports
- Clear browser cache

## Updating the Deployment

### Automatic (Recommended)
Most platforms auto-deploy on git push:

```bash
git add .
git commit -m "Update: [description]"
git push origin main
```

Platform automatically rebuilds and deploys!

### Manual
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Railway/Render
# Just push to GitHub, they auto-deploy
```

## Rollback

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys
2. Find previous deploy
3. Click "Publish deploy"

## Support

Need help deploying?
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Next.js Docs: https://nextjs.org/docs

---

**Your app is ready to deploy! 🚀**

Current live version: https://babyagi-pwa.lindy.site

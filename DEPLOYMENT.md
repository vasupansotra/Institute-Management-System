# Deployment Guide - AI-Powered Institute Management System

This guide will help you deploy the application to production.

## 📋 Prerequisites

- GitHub account (you have: vasupansotra)
- MongoDB Atlas account (for production database)
- Google Gemini API key
- xAI Grok API key
- Cloudinary account (already configured)
- Vercel/Netlify/Render account for hosting

---

## 🔄 Step 1: Push Code to GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd Institute-Management-System
git init
git add .
git commit -m "Initial commit with AI integration"
```

### 1.2 Add Remote Repository

```bash
git remote add origin https://github.com/vasupansotra/Institute-Management-System.git
git branch -M main
git push -u origin main
```

### 1.3 If Repository Already Exists

```bash
cd Institute-Management-System
git add .
git commit -m "Add AI integration: FastAPI + LangChain + Gemini + Grok"
git push origin main
```

### 1.4 Verify Push

Go to: https://github.com/vasupansotra/Institute-Management-System

You should see all the new files including:
- ai-service/ directory
- Updated backend files
- Updated frontend files
- Documentation files

---

## 🗄️ Step 2: Setup MongoDB Atlas (Production Database)

### 2.1 Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/atlas/database
2. Create a new cluster (free tier is fine)
3. Wait for cluster to be created

### 2.2 Configure Database Access

1. Go to "Database Access" in Atlas
2. Add a new database user:
   - Username: `admin`
   - Password: Generate a strong password
   - Database User Privileges: Read and write to any database

### 2.3 Configure Network Access

1. Go to "Network Access" in Atlas
2. Add IP Address:
   - For testing: `0.0.0.0/0` (allows all IPs)
   - For production: Add your specific IPs

### 2.4 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `institute_management`

Example:
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.wwfknql.mongodb.net/institute_management?retryWrites=true&w=majority
```

---

## 🚀 Step 3: Deploy Backend (Express)

### Option A: Deploy to Render (Recommended)

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: institute-management-backend
   - **Root Directory**: `backend`
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or paid for production)

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=4200
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLOUD_NAME=dp4aaeoft
   API_KEY=454454235428629
   API_SECRET=QT4b89msTA8Ngz-7uRJdCex_Gzs
   JWT_SECRET=your_secure_jwt_secret_here
   AI_SERVICE_URL=https://your-ai-service-url.onrender.com
   ```

7. Click "Create Web Service"
8. Wait for deployment (2-3 minutes)
9. Copy the URL: `https://institute-management-backend.onrender.com`

### Option B: Deploy to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
4. Add Environment Variables (same as above)
5. Deploy

---

## 🤖 Step 4: Deploy AI Service (FastAPI)

### Option A: Deploy to Render (Recommended)

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: institute-management-ai
   - **Root Directory**: `ai-service`
   - **Runtime**: Python 3
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan**: Free (or paid for production)

5. Add Environment Variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-1.5-flash
   GROK_API_KEY=your_grok_api_key
   GROK_MODEL=grok-2-1212
   BACKEND_API_URL=https://your-backend-url.onrender.com
   JWT_SECRET=your_secure_jwt_secret_here
   AI_SERVICE_PORT=8000
   AI_SERVICE_URL=https://institute-management-ai.onrender.com
   ```

6. Click "Create Web Service"
7. Wait for deployment (3-5 minutes)
8. Copy the URL: `https://institute-management-ai.onrender.com`

### Option B: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - **Root Directory**: `ai-service`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables (same as above)
7. Deploy

---

## ⚛️ Step 5: Deploy Frontend (React)

### Option A: Deploy to Vercel (Recommended)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment Variables:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
   ```
5. Deploy
6. Copy the URL: `https://institute-management.vercel.app`

### Option B: Deploy to Netlify

1. Go to https://netlify.com
2. Click "New site from Git"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add Environment Variables (same as above)
6. Deploy

---

## 🔗 Step 6: Update Environment Variables

After deploying all services, update the URLs:

### Backend (.env) on Render
```env
AI_SERVICE_URL=https://institute-management-ai.onrender.com
```

### AI Service (.env) on Render
```env
BACKEND_API_URL=https://institute-management-backend.onrender.com
AI_SERVICE_URL=https://institute-management-ai.onrender.com
```

### Frontend (.env) on Vercel
```env
REACT_APP_API_BASE_URL=https://institute-management-backend.onrender.com
```

---

## ✅ Step 7: Verify Deployment

### 7.1 Test Backend
```bash
curl https://your-backend-url.onrender.com/user/signup
```
Should return error about missing fields (means it's working)

### 7.2 Test AI Service
```bash
curl https://your-ai-service-url.onrender.com/health
```
Should return:
```json
{
  "status": "healthy",
  "gemini_available": true,
  "grok_available": true
}
```

### 7.3 Test Frontend
1. Go to `https://your-frontend-url.vercel.app`
2. Should see login page
3. Try signing up
4. Try logging in
5. Try AI chat

---

## 🔧 Step 8: Post-Deployment Configuration

### 8.1 Update CORS (if needed)

In `backend/app.js`, update CORS to include your production frontend URL:

```javascript
const corsOptions = {
  origin: [
    'https://institute-management.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:3000'  // Keep for local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### 8.2 Update Frontend API URL

In Vercel dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Update `REACT_APP_API_BASE_URL` to production backend URL

### 8.3 Test AI Chat

1. Go to your live frontend URL
2. Login
3. Click "AI Assistant"
4. Send a test message
5. Verify it works

---

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render/Vercel
- [ ] AI Service deployed to Render/Railway
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Environment variables configured
- [ ] CORS configured
- [ ] Backend health check passes
- [ ] AI service health check passes
- [ ] Frontend loads correctly
- [ ] User can signup
- [ ] User can login
- [ ] AI chat works
- [ ] AI responds to queries
- [ ] LLM provider shows correctly

---

## 🔄 Continuous Deployment

### Enable Auto-Deploy

**Render:**
1. Go to your service settings
2. Enable "Auto-Deploy"
3. Every push to main branch will trigger deployment

**Vercel:**
1. Go to your project settings
2. Enable "Auto-Deploy"
3. Every push to main branch will trigger deployment

### Deployment Workflow

```bash
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Wait 2-3 minutes for deployment
# Check your live URL
```

---

## 🐛 Troubleshooting Deployment

### Issue 1: Backend Not Starting

**Check:**
- Logs in Render dashboard
- Environment variables are set
- MongoDB connection string is correct
- Port is correct ($PORT or 4200)

**Solution:**
- Check Render logs for errors
- Verify MongoDB Atlas allows connections from Render IPs

### Issue 2: AI Service Not Responding

**Check:**
- AI service is running
- BACKEND_API_URL is correct
- Gemini/Grok API keys are valid
- CORS is configured

**Solution:**
- Check AI service logs
- Verify API keys
- Test health endpoint: `/health`

### Issue 3: Frontend Can't Connect to Backend

**Check:**
- REACT_APP_API_BASE_URL is correct
- Backend CORS includes frontend URL
- Backend is running

**Solution:**
- Update environment variable in Vercel
- Redeploy frontend
- Check browser console for CORS errors

### Issue 4: AI Chat Not Working

**Check:**
- AI service is running
- Backend AI_SERVICE_URL is correct
- JWT_SECRET matches in both services
- Token is being sent correctly

**Solution:**
- Check backend logs for AI service connection
- Verify JWT_SECRET is same in both
- Test AI service directly: `/health`

---

## 📈 Monitoring

### Backend Logs (Render)
1. Go to Render dashboard
2. Select your backend service
3. Click "Logs"
4. Monitor for errors

### AI Service Logs (Render)
1. Go to Render dashboard
2. Select your AI service
3. Click "Logs"
4. Monitor for errors

### Frontend Analytics (Vercel)
1. Go to Vercel dashboard
2. Select your project
3. Click "Analytics"
4. Monitor traffic and errors

---

## 🔐 Security Checklist

- [ ] MongoDB credentials are secure
- [ ] JWT_SECRET is strong and unique
- [ ] API keys are in environment variables (not in code)
- [ ] CORS is configured for specific origins
- [ ] HTTPS is enabled (automatic with Vercel/Render)
- [ ] No sensitive data in logs
- [ ] Rate limiting is enabled (if needed)

---

## 💰 Cost Estimation

### Free Tier (Development/Testing)
- **MongoDB Atlas**: Free (512 MB)
- **Render**: Free (web services spin down after inactivity)
- **Vercel**: Free (100 GB bandwidth)
- **Total**: $0/month

### Production Tier (Small Institute)
- **MongoDB Atlas**: $9/month (2 GB)
- **Render**: $7/month (always on)
- **Vercel**: $20/month (Pro)
- **Total**: ~$36/month

### Enterprise Tier (Large Institute)
- **MongoDB Atlas**: $57/month (10 GB)
- **Render**: $25/month (Pro)
- **Vercel**: $20/month (Pro)
- **Total**: ~$102/month

---

## 🎯 Go Live Checklist

Before going live:

- [ ] All services deployed
- [ ] Environment variables configured
- [ ] CORS configured
- [ ] MongoDB Atlas configured
- [ ] SSL certificates active (automatic)
- [ ] Domain name configured (optional)
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Documentation updated with live URLs

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Buy domain from GoDaddy/Namecheap
2. In Vercel:
   - Go to project settings
   - Click "Domains"
   - Add your domain: `institute.yourdomain.com`
3. Update DNS records:
   - Add CNAME record pointing to Vercel
4. Wait for DNS propagation (24-48 hours)

### Add Custom Domain to Render

1. In Render dashboard:
   - Go to your service
   - Click "Settings"
   - Click "Custom Domains"
2. Add your domain
3. Update DNS records
4. Wait for propagation

---

## 📞 Support

If you encounter issues during deployment:

1. Check logs in deployment platform
2. Review SETUP_GUIDE.md troubleshooting
3. Review TESTING.md common issues
4. Check browser console for errors
5. Verify all environment variables

---

## 🎉 Deployment Complete!

Once deployed, your AI-powered Institute Management System will be live at:
- **Frontend**: https://institute-management.vercel.app
- **Backend**: https://institute-management-backend.onrender.com
- **AI Service**: https://institute-management-ai.onrender.com

Share the frontend URL with your users and start using the AI-powered system!

---

**Next Steps:**
1. Monitor logs for first 24 hours
2. Test all features thoroughly
3. Gather user feedback
4. Plan future enhancements (RAG, attendance, marks, etc.)
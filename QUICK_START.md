
This guide will help you quickly test the AI integration in 3 simple steps.

## ⚡ Quick Test (5 Minutes)

### Prerequisites
Make sure you have:
- Node.js installed
- Python installed
- MongoDB running
- Google Gemini API key
- xAI Grok API key

---

## 🚀 Step 1: Start Backend (Already Running)

Your backend should already be running on port 4200. If not:

```bash
cd backend
node server.js
```

You should see: `app is running on port 4200`

---

## 🚀 Step 2: Start Frontend (Already Running)

Your frontend should already be running on port 3000. If not:

```bash
cd frontend
npm start
```

Browser should open at `http://localhost:3000`

---

## 🚀 Step 3: Start AI Service (NEW)

Open a new terminal:

```bash
cd ai-service

# Create virtual environment (first time only)
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies (first time only)
pip install -r requirements.txt

# Create .env file with your API keys
# Copy from .env.example and add your actual keys
```

Create `ai-service/.env`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
GROK_API_KEY=your_actual_grok_api_key
GROK_MODEL=grok-2-1212
BACKEND_API_URL=http://localhost:4200
JWT_SECRET=123
AI_SERVICE_PORT=8000
```

Start the AI service:
```bash
uvicorn app.main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

---

## ✅ Test the AI Chat

### 1. Login
- Go to `http://localhost:3000/login`
- Login with your existing account OR create a new one at `/signup`

### 2. Access AI Chat
- After login, click on **"AI Assistant"** in the left sidebar (with robot icon 🤖)

### 3. Send a Test Message
Type this and click Send:
```
Hello, can you help me?
```

### 4. Verify Response
You should see:
- ✅ AI responds with a greeting
- ✅ Provider label shows "✨ Gemini" or "🔄 Grok"
- ✅ Typing indicator shows while waiting

---

## 🎯 Test Different Queries

### Fee Query:
```
Meri fees pending hai?
```

### Student Query:
```
Mere students kitne hain?
```

### Course Query:
```
Mere courses batao
```

---

## 🔍 Verify It's Working

### Check Backend Logs
You should see:
```
AI Chat request from user: <user_id>, role: <role>
Message: Meri fees pending hai?
AI Response from gemini: <response_text>...
```

### Check AI Service Logs
You should see:
```
INFO: Received chat request from user: <user_id>, role: <role>
INFO: Detected intent: fee-related
INFO: Attempting to use Gemini...
INFO: Gemini response successful
INFO: Response generated using gemini
```

### Check Frontend
- Message appears on the right (purple background)
- AI response appears on the left (white background)
- Provider badge shows under AI response

---

## 🐛 If Something's Not Working

### Problem: "AI service is currently unavailable"
**Solution:** Make sure AI service is running on port 8000

### Problem: "Invalid token"
**Solution:** Logout and login again

### Problem: AI responds with generic message
**Solution:** Add some test data (students, courses, fees) first

### Problem: CORS error
**Solution:** Check that all three services are running and CORS is configured

---

## 📊 Quick Verification Checklist

- [ ] Backend running on port 4200
- [ ] Frontend running on port 3000
- [ ] AI Service running on port 8000
- [ ] Can login successfully
- [ ] Can access AI Assistant page
- [ ] Can send message
- [ ] AI responds
- [ ] Provider badge shows (Gemini/Grok)
- [ ] No errors in console

---

## 🎉 Success!

If you can send a message and get a response, the AI integration is working!

### What's Working:
✅ JWT Authentication
✅ Role-based access
✅ AI chat interface
✅ Gemini primary LLM
✅ Grok fallback LLM
✅ Fee/Student/Course tools
✅ Error handling
✅ Modern UI matching your theme

---

## 📚 Next Steps

1. **Add Test Data:**
   - Add some courses
   - Add some students
   - Add some fee records

2. **Try Different Queries:**
   - Ask about fees
   - Ask about students
   - Ask about courses
   - Try Hindi/English mix

3. **Test Error Scenarios:**
   - Stop AI service and try chatting
   - Send empty message
   - Modify token to test authorization

4. **Explore the Code:**
   - Check `ai-service/app/main.py` to see how it works
   - Check `ai-service/app/tools/` to see AI tools
   - Check `frontend/src/components/AIChat.js` to see the UI

---

## 📖 Full Documentation

For complete details, see:
- **README.md** - Complete project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **TESTING.md** - Comprehensive testing guide

---

## 🆘 Need Help?

Check the troubleshooting sections in:
- SETUP_GUIDE.md
- TESTING.md

Common issues are already covered with solutions.

---

**Happy Testing! 🚀**

Your AI-powered Institute Management System is ready to use!
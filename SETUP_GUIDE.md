# Setup Guide - AI-Powered Institute Management System

This guide will help you set up and run the complete AI-powered Institute Management System.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))
- xAI Grok API Key ([Get it here](https://console.x.ai/))

## 🚀 Step-by-Step Setup

### Step 1: Backend Setup (Express + MongoDB)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   The `.env` file already exists with your Cloudinary credentials. Make sure it has:
   ```env
   CLOUD_NAME=dp4aaeoft
   API_KEY=454454235428629
   API_SECRET=QT4b89msTA8Ngz-7uRJdCex_Gzs
   AI_SERVICE_URL=http://localhost:8000
   ```

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   
   You should see: `app is running on port 4200`
   
   ✅ Backend is now running at `http://localhost:4200`

---

### Step 2: Frontend Setup (React)

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in frontend directory:**
   
   Create a new file named `.env` in `frontend/` with:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:4200
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```
   
   Your browser should automatically open at `http://localhost:3000`
   
   ✅ Frontend is now running at `http://localhost:3000`

---

### Step 3: AI Service Setup (FastAPI + LangChain)

1. **Open a new terminal and navigate to ai-service directory:**
   ```bash
   cd ai-service
   ```

2. **Create a virtual environment:**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   
   # On Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file in ai-service directory:**
   
   Create a new file named `.env` in `ai-service/` with:
   ```env
   # LLM Configuration
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   
   GROK_API_KEY=your_actual_grok_api_key_here
   GROK_MODEL=grok-2-1212
   
   # Backend Configuration
   BACKEND_API_URL=http://localhost:4200
   BACKEND_API_KEY=
   
   # ChromaDB Configuration
   CHROMA_PATH=./chroma_db
   
   # JWT Configuration
   JWT_SECRET=123
   
   # Server Configuration
   AI_SERVICE_PORT=8000
   AI_SERVICE_URL=http://localhost:8000
   ```

   ⚠️ **IMPORTANT:** Replace `your_actual_gemini_api_key_here` and `your_actual_grok_api_key_here` with your actual API keys!

5. **Start the AI service:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   
   You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000
   INFO:     Application startup complete.
   ```
   
   ✅ AI Service is now running at `http://localhost:8000`

---

## 🎯 Testing the Application

### 1. Create a Test Account

1. Go to `http://localhost:3000/signup`
2. Fill in the signup form with:
   - Full Name: Test User
   - Phone: 1234567890
   - Email: test@example.com
   - Password: password123
   - Role: Select "student" or "teacher" or "admin"
   - Upload any image
3. Click "Create Your Account"

### 2. Login

1. Go to `http://localhost:3000/login`
2. Enter your email and password
3. Click "submit"

### 3. Test the AI Chat

1. After login, you'll be redirected to the dashboard
2. Click on "AI Assistant" in the left sidebar
3. You'll see the AI chat interface
4. Try these queries:

**For Students:**
- "Meri fees pending hai?" (Are my fees pending?)
- "Mere courses batao" (Tell me my courses)
- "Mere students kitne hain?" (How many students do I have?)

**For Teachers:**
- "Meri class ki attendance batao" (Tell me my class attendance)
- "Mere students ka performance kaisa hai?" (How is my students' performance?)

**For Admins:**
- "Kitne students ki fees pending hai?" (How many students have pending fees?)
- "Mere courses batao" (Tell me my courses)

### 4. Verify LLM Fallback

To test the Grok fallback:
1. Stop the AI service (Ctrl+C in the AI service terminal)
2. Try sending a message in the AI chat
3. You should see an error message: "AI service is currently unavailable. Please try again later."
4. Restart the AI service
5. Try sending a message again - it should work now

---

## 🔍 Verification Checklist

Use this checklist to verify everything is working:

- [ ] Backend is running on port 4200
- [ ] Frontend is running on port 3000
- [ ] AI Service is running on port 8000
- [ ] Can create a new user account
- [ ] Can login with created account
- [ ] Dashboard loads with statistics
- [ ] Can navigate to different pages (Courses, Students, etc.)
- [ ] AI Assistant page loads
- [ ] Can send a message to AI
- [ ] AI responds with a meaningful answer
- [ ] AI response shows provider (Gemini or Grok)
- [ ] Error messages display properly when AI service is down

---

## 🐛 Common Issues and Solutions

### Issue 1: "AI service is currently unavailable"

**Solution:**
- Make sure the AI service is running on port 8000
- Check if `AI_SERVICE_URL=http://localhost:8000` is set in `backend/.env`
- Verify there are no firewall issues blocking port 8000

### Issue 2: "Invalid token" error

**Solution:**
- Make sure you're logged in
- Check if the token is being sent in the Authorization header
- Verify JWT_SECRET is the same in both backend and ai-service

### Issue 3: "Module not found" error in AI service

**Solution:**
- Make sure you activated the virtual environment
- Run `pip install -r requirements.txt` again
- Check if you're in the correct directory (ai-service/)

### Issue 4: CORS errors

**Solution:**
- Check CORS configuration in `backend/app.js`
- Check CORS configuration in `ai-service/app/main.py`
- Make sure the frontend origin (http://localhost:3000) is in the allowed origins

### Issue 5: "Gemini API error" or "Grok API error"

**Solution:**
- Verify your API keys are correct in `ai-service/.env`
- Check your internet connection
- Verify you haven't exceeded API quota limits
- Check if the API keys have the necessary permissions

### Issue 6: MongoDB connection error

**Solution:**
- Check if MongoDB is running
- Verify the MongoDB connection string in `backend/app.js`
- Make sure your IP is whitelisted in MongoDB Atlas (if using cloud)

---

## 📊 Testing Different User Roles

### Test as Student:
1. Create a student account
2. Login
3. Try: "Meri fees pending hai?"
4. Expected: Should show fee information for that student

### Test as Teacher:
1. Create a teacher account
2. Add some students and courses
3. Try: "Mere students kitne hain?"
4. Expected: Should show list of students for that teacher

### Test as Admin:
1. Create an admin account
2. Add multiple students and courses
3. Try: "Mere courses batao"
4. Expected: Should show all courses for that admin

---

## 🔐 Security Testing

### Test 1: Unauthorized Access
1. Logout from the application
2. Try to access the AI chat directly via API call
3. Expected: Should return 401 Unauthorized

### Test 2: Invalid Token
1. Modify the token in localStorage
2. Try to send a message
3. Expected: Should return "invalid token" error

### Test 3: Empty Message
1. Try to send an empty message
2. Expected: Should show validation error

---

## 📈 Monitoring and Logs

### Backend Logs
- Check the terminal where `node server.js` is running
- Look for AI chat requests and responses
- Monitor for errors

### AI Service Logs
- Check the terminal where `uvicorn` is running
- Look for:
  - "Received chat request from user: ..."
  - "Detected intent: ..."
  - "Attempting to use Gemini..."
  - "Response generated using gemini/grok"

### Frontend Console
- Open browser DevTools (F12)
- Check Console tab for any errors
- Check Network tab for API calls

---

## 🚀 Production Deployment

### Backend Deployment
1. Deploy to Vercel, Heroku, or similar
2. Set environment variables:
   - `CLOUD_NAME`
   - `API_KEY`
   - `API_SECRET`
   - `AI_SERVICE_URL` (point to your AI service URL)
3. Ensure MongoDB is accessible

### Frontend Deployment
1. Build the React app:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to Vercel, Netlify, or similar
3. Set `REACT_APP_API_BASE_URL` to your production backend URL

### AI Service Deployment
1. Deploy to Railway, Render, or similar
2. Set all environment variables:
   - `GEMINI_API_KEY`
   - `GROK_API_KEY`
   - `BACKEND_API_URL`
   - `JWT_SECRET`
3. Use a production ASGI server like Gunicorn with Uvicorn workers

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [Google Gemini API](https://ai.google.dev/)
- [xAI Grok API](https://docs.x.ai/)
- [React Documentation](https://react.dev/)

---

## ✨ Features to Try

1. **Natural Language Queries:** Ask questions in Hindi/English mix
2. **Context-Aware Responses:** AI knows your role and provides relevant info
3. **LLM Fallback:** If Gemini fails, Grok automatically takes over
4. **Real-time Chat:** Instant responses with typing indicators
5. **Chat History:** See your conversation history in the session
6. **Clear Chat:** Start a fresh conversation anytime

---

## 🎓 Learning Resources

### Understanding the Code

1. **Backend (Express):**
   - `backend/routes/ai.js` - AI endpoint that forwards requests to FastAPI
   - `backend/middleware/checkAuth.js` - JWT authentication

2. **AI Service (FastAPI):**
   - `ai-service/app/main.py` - Main FastAPI application
   - `ai-service/app/llm/router.py` - LLM router with Gemini/Grok fallback
   - `ai-service/app/tools/` - AI tools for fees, students, courses

3. **Frontend (React):**
   - `frontend/src/components/AIChat.js` - AI chat interface
   - `frontend/src/App.js` - Routing configuration

### Key Concepts

- **LangChain:** Framework for building LLM-powered applications
- **LangGraph:** Library for building stateful, multi-actor applications with LLMs
- **RAG:** Retrieval-Augmented Generation (future implementation)
- **JWT:** JSON Web Tokens for authentication
- **FastAPI:** Modern Python web framework for building APIs

---

## 🆘 Getting Help

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs in all three terminals
3. Verify all environment variables are set correctly
4. Ensure all services are running
5. Check the browser console for frontend errors

---

## ✅ Success!

If you've completed all the steps and can:
- Login to the application
- Access the AI chat
- Send messages and receive responses
- See different providers (Gemini/Grok) in the response

Congratulations! Your AI-powered Institute Management System is now fully operational! 🎉

---

**Next Steps:**
- Explore the codebase to understand how it works
- Try adding more AI tools
- Implement RAG for document-based Q&A
- Add more features like attendance, marks, exams, etc.
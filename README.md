# AI-Powered Institute Management System

An AI-enhanced Institute Management System built with MERN stack (MongoDB, Express, React, Node.js) and Python FastAPI, featuring an intelligent AI assistant powered by Google Gemini and xAI Grok.

## 🏗️ Architecture

```
┌─────────────────┐
│   React Frontend │
│   (Port 3000)    │
└────────┬────────┘
         │
         ├──────────────────────┐
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌──────────────┐
│  Express Backend │    │  AI Chat UI  │
│  (Port 4200)     │    └──────────────┘
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
   ┌─────────┐      ┌──────────────┐
   │ MongoDB  │      │  FastAPI AI  │
   │          │      │  (Port 8000) │
   └─────────┘      └──────┬───────┘
                            │
                            ▼
                      ┌───────────┐
                      │ LangGraph │
                      └─────┬─────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
           Tools         RAG           LLM
              │             │             │
              ▼             ▼             ▼
         Express APIs  ChromaDB    Gemini / Grok
```

## 🚀 Features

### Existing Features (Preserved)
- ✅ User Authentication (Signup/Login)
- ✅ Course Management
- ✅ Student Management
- ✅ Fee Management
- ✅ Dashboard with Statistics
- ✅ Role-based Access (Admin/Teacher/Student)

### New AI Features
- 🤖 **AI Chat Assistant** - Natural language interface for institute queries
- 🔄 **Dual LLM Support** - Gemini (primary) with Grok (fallback)
- 🛠️ **Smart Tools** - AI tools for fees, students, and courses
- 🔒 **Secure** - JWT-based authentication, role-based access control
- 💬 **Context-Aware** - AI understands user role and provides relevant information

## 🛠️ Technology Stack

### Frontend
- React 19
- React Router DOM v7
- Axios
- React Toastify
- Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (File Upload)

### AI Service
- FastAPI
- LangChain
- LangGraph
- Google Gemini (Primary LLM)
- xAI Grok (Fallback LLM)
- ChromaDB (For future RAG implementation)

## 📁 Project Structure

```
institute-management-system/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── middleware/
│   │   └── checkAuth.js
│   ├── model/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Course.js
│   │   └── Fee.js
│   ├── routes/
│   │   ├── user.js
│   │   ├── student.js
│   │   ├── course.js
│   │   ├── fee.js
│   │   └── ai.js (NEW)
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.js (NEW)
│   │   │   ├── Dashboard.js
│   │   │   ├── SideNav.js
│   │   │   ├── Login.js
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── ai-service/ (NEW)
    ├── app/
    │   ├── main.py
    │   ├── config.py
    │   ├── llm/
    │   │   ├── gemini.py
    │   │   ├── grok.py
    │   │   └── router.py
    │   ├── tools/
    │   │   ├── fees.py
    │   │   ├── students.py
    │   │   └── courses.py
    │   └── utils/
    ├── documents/
    ├── requirements.txt
    └── .env.example
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MongoDB
- Google Gemini API Key
- xAI Grok API Key

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Institute-Management-System
```

### 2. Backend Setup (Express)

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
AI_SERVICE_URL=http://localhost:8000
```

Start the backend server:
```bash
npm start
# or
node server.js
```

The backend will run on `http://localhost:4200`

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_API_BASE_URL=http://localhost:4200
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 4. AI Service Setup (FastAPI)

```bash
cd ai-service
python -m venv venv

# On Windows
venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env` file in ai-service directory:
```env
# LLM Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

GROK_API_KEY=your_grok_api_key_here
GROK_MODEL=grok-2-1212

# Backend Configuration
BACKEND_API_URL=http://localhost:4200
BACKEND_API_KEY=your_backend_api_key

# ChromaDB Configuration
CHROMA_PATH=./chroma_db

# JWT Configuration
JWT_SECRET=123

# Server Configuration
AI_SERVICE_PORT=8000
AI_SERVICE_URL=http://localhost:8000
```

Start the AI service:
```bash
uvicorn app.main:app --reload --port 8000
```

The AI service will run on `http://localhost:8000`

## 📚 API Documentation

### Backend APIs (Express)

#### Authentication
- `POST /user/signup` - Create new user
- `POST /user/login` - Login user

#### Students
- `POST /student/add-student` - Add student (Auth required)
- `GET /student/all-students` - Get all students (Auth required)
- `GET /student/all-students/:courseId` - Get students by course (Auth required)
- `DELETE /student/:id` - Delete student (Auth required)
- `PUT /student/:id` - Update student (Auth required)
- `GET /student/latest-students` - Get latest 5 students (Auth required)

#### Courses
- `POST /course/add-course` - Add course (Auth required)
- `GET /course/all-courses` - Get all courses (Auth required)
- `GET /course/course-detail/:id` - Get course details (Auth required)
- `DELETE /course/:id` - Delete course (Auth required)
- `PUT /course/:id` - Update course (Auth required)
- `GET /course/latest-courses` - Get latest 5 courses (Auth required)

#### Fees
- `POST /fee/add-fee` - Add fee record (Auth required)
- `GET /fee/payment-history` - Get payment history (Auth required)
- `GET /fee/all-payment` - Get fees by course (Auth required)

#### AI
- `POST /api/ai/chat` - AI chat endpoint (Auth required)
- `GET /api/ai/health` - AI service health check

### AI Service APIs (FastAPI)

- `POST /chat` - Main chat endpoint
- `GET /health` - Health check endpoint
- `GET /` - Service information
- `GET /docs` - Interactive API documentation (Swagger UI)

## 🤖 AI Features

### Available AI Tools

1. **get_fee_status** - Retrieve fee payment history and totals
2. **get_student_info** - Get list of enrolled students
3. **get_course_info** - Get course information

### Example Queries

#### Student Queries
- "Meri fees kitni pending hai?"
- "Mere marks batao"
- "Mera next exam kab hai?"
- "Mera timetable batao"

#### Teacher Queries
- "Meri class ki attendance batao"
- "Kaunse students ki attendance 75% se kam hai?"
- "Mere students ka performance kaisa hai?"

#### Admin Queries
- "Kitne students ki fees pending hai?"
- "Kaunse students ki attendance low hai?"
- "Class performance summary do"

### How It Works

1. User sends a message via the AI chat interface
2. Express backend validates JWT and forwards request to FastAPI
3. FastAPI analyzes the message intent
4. If needed, appropriate tool is called (fees, students, courses)
5. Tool fetches data from existing Express APIs
6. LLM (Gemini primary, Grok fallback) generates response
7. Response is sent back to frontend

## 🔐 Security

- JWT-based authentication
- Role-based access control (Admin/Teacher/Student)
- All AI requests are authenticated
- No direct database access for AI
- API keys stored in environment variables
- Input validation on all endpoints
- CORS configured for specific origins

## 🧪 Testing

### Test the AI Chat

1. Login to the application
2. Navigate to "AI Assistant" in the sidebar
3. Try these queries:

**Fee-related:**
- "Meri fees pending hai?"
- "Total kitna pay kiya hai?"

**Student-related:**
- "Mere students kitne hain?"
- "Latest students batao"

**Course-related:**
- "Mere courses batao"
- "Course detail do"

### Test LLM Fallback

1. Stop the AI service
2. Try sending a message
3. You should see an error message

## 📝 Environment Variables

### Backend (.env)
```env
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
AI_SERVICE_URL=http://localhost:8000
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:4200
```

### AI Service (.env)
```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
GROK_API_KEY=your_grok_api_key
GROK_MODEL=grok-2-1212
BACKEND_API_URL=http://localhost:4200
JWT_SECRET=123
AI_SERVICE_PORT=8000
```

## 🐛 Troubleshooting

### AI Service Not Responding
- Check if FastAPI server is running on port 8000
- Verify `AI_SERVICE_URL` in backend `.env`
- Check AI service logs for errors

### LLM Errors
- Verify API keys are correct in `ai-service/.env`
- Check internet connectivity
- Review API quota limits

### CORS Errors
- Ensure CORS is configured in both Express and FastAPI
- Check that frontend origin is in allowed origins

## 📖 Documentation

### LangChain Usage
LangChain is used for:
- LLM orchestration (Gemini and Grok)
- Prompt management
- Response generation

### LangGraph Usage
LangGraph is used for:
- Workflow management
- Intent routing
- Tool execution flow

### RAG (Future Implementation)
RAG will be implemented for:
- Institute documents (syllabus, rules, policies)
- FAQ retrieval
- Document-based Q&A

## 🚀 Deployment

### Backend (Express)
- Deploy to Vercel, Heroku, or any Node.js hosting
- Set environment variables
- Ensure MongoDB is accessible

### Frontend (React)
- Build: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting
- Set `REACT_APP_API_BASE_URL` to production backend URL

### AI Service (FastAPI)
- Deploy to Railway, Render, or any Python hosting
- Set all environment variables
- Ensure port 8000 is accessible

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Developer

Built with ❤️ for Institute Management

## 📞 Support

For issues or questions, please contact the developer.

---

## 🎯 Next Steps (Future Enhancements)

1. **RAG Implementation** - Add document upload and retrieval
2. **Attendance Model** - Add attendance tracking
3. **Marks/Results Model** - Add marks management
4. **Exam Model** - Add exam scheduling
5. **Timetable Model** - Add timetable management
6. **Voice Assistant** - Add voice input/output
7. **Multi-language Support** - Support multiple languages
8. **Analytics** - AI-powered insights and predictions
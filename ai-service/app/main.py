from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import logging
from app.config import settings
from app.llm.router import LLMRouter
from app.tools.fees import FeeTools
from app.tools.students import StudentTools
from app.tools.courses import CourseTools

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Institute AI Service",
    description="AI-powered assistant for Institute Management System",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://institute-management-system1419.vercel.app", "https://institute-management-system-hzbj.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
llm_router = LLMRouter()
fee_tools = FeeTools()
student_tools = StudentTools()
course_tools = CourseTools()

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    token: str
    user_id: str
    role: str

class ChatResponse(BaseModel):
    response: str
    provider: str
    fallback_used: bool
    tool_used: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    gemini_available: bool
    grok_available: bool

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    status = llm_router.get_status()
    return {
        "status": "healthy",
        "gemini_available": status["gemini"],
        "grok_available": status["grok"]
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint
    Receives user message and returns AI response
    """
    try:
        logger.info(f"Received chat request from user: {request.user_id}, role: {request.role}")
        logger.info(f"Message: {request.message}")
        
        # Analyze the message to determine intent
        message_lower = request.message.lower()
        tool_result = None
        tool_used = None
        
        # Intent detection and tool selection
        # Fee-related queries
        if any(keyword in message_lower for keyword in ['fee', 'fees', 'payment', 'paid', 'pending', 'amount']):
            logger.info("Detected intent: fee-related")
            tool_used = "get_fee_status"
            tool_result = await fee_tools.get_fee_status(
                token=request.token,
                user_id=request.user_id,
                user_role=request.role
            )
        
        # Student-related queries
        elif any(keyword in message_lower for keyword in ['student', 'students', 'enrolled']):
            logger.info("Detected intent: student-related")
            tool_used = "get_student_info"
            tool_result = await student_tools.get_student_info(
                token=request.token,
                user_id=request.user_id,
                user_role=request.role
            )
        
        # Course-related queries
        elif any(keyword in message_lower for keyword in ['course', 'courses', 'class']):
            logger.info("Detected intent: course-related")
            tool_used = "get_course_info"
            tool_result = await course_tools.get_course_info(
                token=request.token,
                user_id=request.user_id,
                user_role=request.role
            )
        
        # Prepare prompt for LLM
        if tool_result and tool_result.get("success"):
            # Use tool result as context
            context = f"Tool Result: {tool_result.get('message', '')}\nData: {tool_result.get('data', {})}"
            prompt = f"Based on the following information, answer the user's question: {request.message}"
        else:
            # General query without tool
            context = None
            prompt = request.message
        
        # Generate response using LLM (Gemini primary, Grok fallback)
        llm_result = await llm_router.generate_response(prompt, context)
        
        logger.info(f"Response generated using {llm_result['provider']}")
        
        return ChatResponse(
            response=llm_result["response"],
            provider=llm_result["provider"],
            fallback_used=llm_result["fallback_used"],
            tool_used=tool_used
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Institute AI Service is running",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.AI_SERVICE_PORT)
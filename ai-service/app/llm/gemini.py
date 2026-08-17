import google.generativeai as genai
from typing import Optional
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class GeminiLLM:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model_name = settings.GEMINI_MODEL
        self.model = genai.GenerativeModel(self.model_name)
    
    async def generate_response(self, prompt: str, context: Optional[str] = None) -> str:
        try:
            if context:
                full_prompt = f"Context:\n{context}\n\nQuestion: {prompt}\n\nAnswer based on the context above. If the context doesn't contain the answer, say 'I couldn't find this information in the available institute documents.'"
            else:
                full_prompt = prompt
            
            response = self.model.generate_content(full_prompt)
            return response.text
            
        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            raise Exception(f"Gemini API error: {str(e)}")
    
    def is_available(self) -> bool:
        try:
            # Simple test to check if API is working
            response = self.model.generate_content("Hi")
            return True
        except:
            return False
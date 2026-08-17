from typing import Optional
from app.llm.gemini import GeminiLLM
from app.llm.grok import GrokLLM
import logging

logger = logging.getLogger(__name__)

class LLMRouter:
    def __init__(self):
        self.gemini = GeminiLLM()
        self.grok = GrokLLM()
        self.gemini_available = True
        self.grok_available = True
    
    async def generate_response(self, prompt: str, context: Optional[str] = None) -> dict:
        """
        Try Gemini first, fallback to Grok if Gemini fails
        Returns: {
            "response": str,
            "provider": str ("gemini" or "grok"),
            "fallback_used": bool
        }
        """
        # Try Gemini first
        if self.gemini_available:
            try:
                logger.info("Attempting to use Gemini...")
                response = await self.gemini.generate_response(prompt, context)
                logger.info("Gemini response successful")
                return {
                    "response": response,
                    "provider": "gemini",
                    "fallback_used": False
                }
            except Exception as e:
                logger.warning(f"Gemini failed: {str(e)}")
                self.gemini_available = False
        
        # Fallback to Grok
        if self.grok_available:
            try:
                logger.info("Falling back to Grok...")
                response = await self.grok.generate_response(prompt, context)
                logger.info("Grok response successful")
                return {
                    "response": response,
                    "provider": "grok",
                    "fallback_used": True
                }
            except Exception as e:
                logger.error(f"Grok also failed: {str(e)}")
                self.grok_available = False
        
        # Both failed
        raise Exception("Both Gemini and Grok are unavailable. Please try again later.")
    
    def get_status(self) -> dict:
        """Get availability status of both LLMs"""
        return {
            "gemini": self.gemini_available,
            "grok": self.grok_available
        }
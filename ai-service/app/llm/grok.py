import requests
from typing import Optional
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class GrokLLM:
    def __init__(self):
        self.api_key = settings.GROK_API_KEY
        self.model_name = settings.GROK_MODEL
        self.api_url = "https://api.x.ai/v1/chat/completions"
    
    async def generate_response(self, prompt: str, context: Optional[str] = None) -> str:
        try:
            if context:
                full_prompt = f"Context:\n{context}\n\nQuestion: {prompt}\n\nAnswer based on the context above. If the context doesn't contain the answer, say 'I couldn't find this information in the available institute documents.'"
            else:
                full_prompt = prompt
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model_name,
                "messages": [
                    {
                        "role": "user",
                        "content": full_prompt
                    }
                ],
                "temperature": 0.7,
                "max_tokens": 1000
            }
            
            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["message"]["content"]
            else:
                raise Exception(f"Grok API returned status {response.status_code}: {response.text}")
            
        except Exception as e:
            logger.error(f"Grok API error: {str(e)}")
            raise Exception(f"Grok API error: {str(e)}")
    
    def is_available(self) -> bool:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model_name,
                "messages": [{"role": "user", "content": "Hi"}],
                "max_tokens": 10
            }
            
            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=10
            )
            return response.status_code == 200
        except:
            return False
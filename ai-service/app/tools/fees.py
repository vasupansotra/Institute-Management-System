from typing import Dict, Any, Optional
import requests
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class FeeTools:
    def __init__(self):
        self.backend_url = settings.BACKEND_API_URL
    
    def _get_auth_headers(self, token: str) -> Dict[str, str]:
        """Generate authorization headers for backend API calls"""
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    async def get_fee_status(self, token: str, user_id: str, user_role: str) -> Dict[str, Any]:
        """
        Get fee status for the authenticated user
        Returns fee payment history and summary
        """
        try:
            logger.info(f"Fetching fee status for user: {user_id}, role: {user_role}")
            
            response = requests.get(
                f"{self.backend_url}/fee/payment-history",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                payment_history = data.get("paymentHistory", [])
                
                # Calculate total paid and pending
                total_paid = sum(fee.get("amount", 0) for fee in payment_history)
                
                return {
                    "success": True,
                    "data": {
                        "payment_history": payment_history,
                        "total_paid": total_paid,
                        "transaction_count": len(payment_history)
                    },
                    "message": f"Your total fee payments: Rs{total_paid}"
                }
            else:
                logger.error(f"Backend API error: {response.status_code} - {response.text}")
                return {
                    "success": False,
                    "error": "Failed to fetch fee information"
                }
                
        except Exception as e:
            logger.error(f"Error in get_fee_status: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_course_fees(self, token: str, course_id: str, phone: Optional[str] = None) -> Dict[str, Any]:
        """
        Get fee details for a specific course
        """
        try:
            logger.info(f"Fetching course fees for course: {course_id}")
            
            params = {"courseId": course_id}
            if phone:
                params["phone"] = phone
            
            response = requests.get(
                f"{self.backend_url}/fee/all-payment",
                headers=self._get_auth_headers(token),
                params=params,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                fees = data.get("fees", [])
                total = sum(fee.get("amount", 0) for fee in fees)
                
                return {
                    "success": True,
                    "data": {
                        "fees": fees,
                        "total": total,
                        "count": len(fees)
                    },
                    "message": f"Total fees for this course: Rs{total}"
                }
            else:
                return {
                    "success": False,
                    "error": "Failed to fetch course fee information"
                }
                
        except Exception as e:
            logger.error(f"Error in get_course_fees: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
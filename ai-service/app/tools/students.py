from typing import Dict, Any, Optional
import requests
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class StudentTools:
    def __init__(self):
        self.backend_url = settings.BACKEND_API_URL
    
    def _get_auth_headers(self, token: str) -> Dict[str, str]:
        """Generate authorization headers for backend API calls"""
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    async def get_student_info(self, token: str, user_id: str, user_role: str) -> Dict[str, Any]:
        """
        Get student information for the authenticated user
        Returns list of students associated with the user
        """
        try:
            logger.info(f"Fetching student info for user: {user_id}, role: {user_role}")
            
            response = requests.get(
                f"{self.backend_url}/student/all-students",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                students = data.get("students", [])
                
                return {
                    "success": True,
                    "data": {
                        "students": students,
                        "count": len(students)
                    },
                    "message": f"You have {len(students)} students enrolled."
                }
            else:
                logger.error(f"Backend API error: {response.status_code} - {response.text}")
                return {
                    "success": False,
                    "error": "Failed to fetch student information"
                }
                
        except Exception as e:
            logger.error(f"Error in get_student_info: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_course_students(self, token: str, course_id: str) -> Dict[str, Any]:
        """
        Get students enrolled in a specific course
        """
        try:
            logger.info(f"Fetching students for course: {course_id}")
            
            response = requests.get(
                f"{self.backend_url}/student/all-students/{course_id}",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                students = data.get("students", [])
                
                return {
                    "success": True,
                    "data": {
                        "students": students,
                        "count": len(students),
                        "course_id": course_id
                    },
                    "message": f"Found {len(students)} students in this course."
                }
            else:
                return {
                    "success": False,
                    "error": "Failed to fetch course students"
                }
                
        except Exception as e:
            logger.error(f"Error in get_course_students: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_latest_students(self, token: str, limit: int = 5) -> Dict[str, Any]:
        """
        Get latest enrolled students
        """
        try:
            logger.info(f"Fetching latest {limit} students")
            
            response = requests.get(
                f"{self.backend_url}/student/latest-students",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                students = data.get("students", [])[:limit]
                
                return {
                    "success": True,
                    "data": {
                        "students": students,
                        "count": len(students)
                    },
                    "message": f"Here are the latest {len(students)} students."
                }
            else:
                return {
                    "success": False,
                    "error": "Failed to fetch latest students"
                }
                
        except Exception as e:
            logger.error(f"Error in get_latest_students: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
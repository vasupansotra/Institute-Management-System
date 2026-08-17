from typing import Dict, Any, Optional
import requests
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class CourseTools:
    def __init__(self):
        self.backend_url = settings.BACKEND_API_URL
    
    def _get_auth_headers(self, token: str) -> Dict[str, str]:
        """Generate authorization headers for backend API calls"""
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    async def get_course_info(self, token: str, user_id: str, user_role: str) -> Dict[str, Any]:
        """
        Get all courses for the authenticated user
        """
        try:
            logger.info(f"Fetching courses for user: {user_id}, role: {user_role}")
            
            response = requests.get(
                f"{self.backend_url}/course/all-courses",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                courses = data.get("courses", [])
                
                return {
                    "success": True,
                    "data": {
                        "courses": courses,
                        "count": len(courses)
                    },
                    "message": f"You have {len(courses)} courses."
                }
            else:
                logger.error(f"Backend API error: {response.status_code} - {response.text}")
                return {
                    "success": False,
                    "error": "Failed to fetch course information"
                }
                
        except Exception as e:
            logger.error(f"Error in get_course_info: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_course_detail(self, token: str, course_id: str) -> Dict[str, Any]:
        """
        Get detailed information about a specific course including students
        """
        try:
            logger.info(f"Fetching course detail for course: {course_id}")
            
            response = requests.get(
                f"{self.backend_url}/course/course-detail/{course_id}",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                course = data.get("course", {})
                students = data.get("studentList", [])
                
                return {
                    "success": True,
                    "data": {
                        "course": course,
                        "students": students,
                        "student_count": len(students)
                    },
                    "message": f"Course: {course.get('courseName', 'Unknown')} with {len(students)} students."
                }
            else:
                return {
                    "success": False,
                    "error": "Failed to fetch course details"
                }
                
        except Exception as e:
            logger.error(f"Error in get_course_detail: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_latest_courses(self, token: str, limit: int = 5) -> Dict[str, Any]:
        """
        Get latest courses
        """
        try:
            logger.info(f"Fetching latest {limit} courses")
            
            response = requests.get(
                f"{self.backend_url}/course/latest-courses",
                headers=self._get_auth_headers(token),
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                courses = data.get("courses", [])[:limit]
                
                return {
                    "success": True,
                    "data": {
                        "courses": courses,
                        "count": len(courses)
                    },
                    "message": f"Here are the latest {len(courses)} courses."
                }
            else:
                return {
                    "success": False,
                    "error": "Failed to fetch latest courses"
                }
                
        except Exception as e:
            logger.error(f"Error in get_latest_courses: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Courses = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);


  useEffect(() => {
    getCourses();
    const handler = () => getCourses();
    window.addEventListener('courses_updated', handler);
    return () => window.removeEventListener('courses_updated', handler);
  }, []);

  const getCourses = () => {
axiom.get(`${process.env.REACT_APP_API_BASE_URL}/course/all-courses`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    .then(res => {
      console.log(res.data.courses);
      setCourseList(res.data.courses);
    })
    .catch(err => {
      console.log(err);
      toast.error('something is wrong...');
    });
  };

  return (
    <div className='course-wrapper'>
      {courseList.map((course) => (
        <div
          className='course-box'
          key={course._id}
          onClick={() => navigate(`/dashboard/course-detail/${course._id}`)}
          role='button'
          tabIndex={0}
        >
          <img className='course-thumbnail' src={course.imageUrl} alt={course.courseName} />

          <div className='course-content'>
            <h2 className='course-title'>{course.courseName}</h2>
            <p className='course-price'>Rs. {course.price} only</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;

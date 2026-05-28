import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Students = () => {
  const [studentList, setStudentList] = useState([]);
  const [courseIdFilter, setCourseIdFilter] = useState('');
  const [courseList, setCourseList] = useState([]);

  const getStudents = () => {
    const url = courseIdFilter
? `${process.env.REACT_APP_API_BASE_URL}/student/all-students/${courseIdFilter}`
      : `${process.env.REACT_APP_API_BASE_URL}/student/all-students`;



    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setStudentList(res.data.students || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error('something is wrong...');
      });
  };

  const getCourses = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/course/all-courses`, {

        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setCourseList(res.data.courses || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCourses();
    getStudents();

    const handler = () => getStudents();
    window.addEventListener('students_updated', handler);
    return () => window.removeEventListener('students_updated', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseIdFilter]);

  return (
    <div className='course-wrapper'>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <select
          value={courseIdFilter}
          onChange={(e) => setCourseIdFilter(e.target.value)}
          style={{ padding: 10, border: '1px solid #a5a5a5', borderRadius: 10, width: '60%', height: 45 }}
        >
          <option value=''>All Courses</option>
          {courseList.map((c) => (
            <option key={c._id} value={c._id}>
              {c.courseName}
            </option>
          ))}
        </select>
      </div>

      {studentList.map((s) => (
        <div
          className='course-box'
          key={s._id}
          onClick={() => (window.location.href = `/dashboard/student-detail/${s._id}`)}
          role='button'
          tabIndex={0}
        >
          {s.imageUrl && <img className='course-thumbnail' src={s.imageUrl} alt={s.fullName} />}
          <div className='course-content'>
            <h2 className='course-title'>{s.fullName}</h2>
            <p className='course-price'>{s.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Students;


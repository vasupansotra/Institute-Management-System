import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getCourseDetail = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/course/course-detail/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        setCourse(res.data.course);
        setStudentList(res.data.studentList || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error('something is wrong...');
      });
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 10 }}>
      <h1 style={{ margin: 0 }}>{course.courseName}</h1>
      <p style={{ margin: '8px 0', fontWeight: 700, color: '#f65164' }}>
        Rs. {course.price} only
      </p>

      <div style={{ marginTop: 10, display: 'flex', gap: 15, flexWrap: 'wrap' }}>
        {course.imageUrl && (
          <img
            src={course.imageUrl}
            alt={course.courseName}
            style={{ width: 320, height: 220, objectFit: 'cover', borderRadius: 10 }}
          />
        )}

        <div style={{ flex: 1, minWidth: 280 }}>
          {course.description && (
            <p style={{ margin: 0, color: '#555' }}>{course.description}</p>
          )}
          {(course.startingDate || course.endDate) && (
            <p style={{ marginTop: 10, color: '#777', fontSize: 13 }}>
              {course.startingDate ? `Start: ${course.startingDate}` : ''}
              {course.startingDate && course.endDate ? ' | ' : ''}
              {course.endDate ? `End: ${course.endDate}` : ''}
            </p>
          )}
        </div>
      </div>

      <h2 style={{ marginTop: 30 }}>Students</h2>
      <div className='course-wrapper' style={{ marginTop: 10 }}>
        {studentList.map((s) => (
          <div className='course-box' key={s._id}>
            {s.imageUrl && (
              <img
                className='course-thumbnail'
                src={s.imageUrl}
                alt={s.fullName}
              />
            )}
            <div className='course-content'>
              <h2 className='course-title'>{s.fullName}</h2>
              <p className='course-price'>{s.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;


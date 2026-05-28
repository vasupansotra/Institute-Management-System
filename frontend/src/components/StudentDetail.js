import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudentDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getStudentDetail = () => {
    // Backend currently exposes all-students and course-specific lists.
    // We will fetch all and find by id.
    axios
.get(`${process.env.REACT_APP_API_BASE_URL}/student/all-students`, {

        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        const list = res.data.students || [];
        const found = list.find((s) => s._id === id);
        setStudent(found || null);
      })
      .catch((err) => {
        console.log(err);
        toast.error('something is wrong...');
      });
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 10 }}>
      <h1 style={{ margin: 0 }}>{student.fullName}</h1>
      <p style={{ margin: '8px 0', fontWeight: 700, color: '#f65164' }}>{student.phone}</p>
      <p style={{ margin: '8px 0', color: '#555' }}>{student.email}</p>
      <p style={{ margin: '8px 0', color: '#777' }}>{student.address}</p>

      {student.imageUrl && (
        <div style={{ marginTop: 15 }}>
          <img
            src={student.imageUrl}
            alt={student.fullName}
            style={{ width: 360, height: 240, objectFit: 'cover', borderRadius: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default StudentDetail;

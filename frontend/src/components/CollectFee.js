import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CollectFee = () => {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const [studentList, setStudentList] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');

  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [isFetchingStudents, setFetchingStudents] = useState(false);

  const getCourses = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/course/all-courses`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const courses = res.data.courses || [];
        setCourseList(courses);
        if (courses.length && !selectedCourseId) setSelectedCourseId(courses[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error('something is wrong...');
      });
  };

  const getStudentsForCourse = () => {
    if (!selectedCourseId) return;
    setFetchingStudents(true);

    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/course/course-detail/${selectedCourseId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        setStudentList(res.data.studentList || []);
        if (res.data.studentList?.length) {
          const first = res.data.studentList[0];
          setSelectedPhone(first.phone);
        }
        setFetchingStudents(false);
      })
      .catch((err) => {
        console.log(err);
        setFetchingStudents(false);
        toast.error('something is wrong...');
      });
  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getStudentsForCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourseId]);

  useEffect(() => {
    const found = studentList.find((s) => s.phone === selectedPhone);
    if (found) {
      setFullName(found.fullName);
      setPhone(found.phone);
    }
  }, [selectedPhone, studentList]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !selectedPhone) {
      toast.error('Select course and student');
      return;
    }

    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/fee/add-fee`,
        {
          fullName,
          phone,
          courseId: selectedCourseId,
          amount: Number(amount),
          remark,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then(() => {
        setLoading(false);
        toast.success('Fee collected successfully!');
        setAmount('');
        setRemark('');
        window.dispatchEvent(new Event('payment_updated'));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.message || 'Something went wrong');
        } else {
          toast.error('Network error');
        }
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h1>Collect Fee</h1>

        <select
          required
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{ padding: 10, border: '1px solid #a5a5a5', borderRadius: 10, width: '80%', height: 45 }}
        >
          {courseList.map((c) => (
            <option key={c._id} value={c._id}>
              {c.courseName}
            </option>
          ))}
        </select>

        <select
          required
          disabled={isFetchingStudents || !studentList.length}
          value={selectedPhone}
          onChange={(e) => setSelectedPhone(e.target.value)}
          style={{ padding: 10, border: '1px solid #a5a5a5', borderRadius: 10, width: '80%', height: 45 }}
        >
          {studentList.map((s) => (
            <option key={s._id} value={s.phone}>
              {s.fullName} - {s.phone}
            </option>
          ))}
          {!studentList.length && <option value=''>No students</option>}
        </select>

        <input value={fullName} readOnly placeholder='Student Name' type='text' />
        <input value={phone} readOnly placeholder='Phone' type='text' />

        <input
          required
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder='Amount'
          type='number'
        />

        <input
          onChange={(e) => setRemark(e.target.value)}
          value={remark}
          placeholder='Remark (optional)'
          type='text'
        />

        <button type='submit' className='submit-btn' disabled={isLoading}>
          {isLoading && <i className='fa-solid fa-spinner fa-spin-pulse'></i>} Submit
        </button>
      </form>
    </div>
  );
};

export default CollectFee;

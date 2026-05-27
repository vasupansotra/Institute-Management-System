import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [courseId, setCourseId] = useState('');

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {

    const getCourses = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4200/course/all-courses',
          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.getItem('token')
            }
          }
        );

        const courses = res.data.courses || [];

        setCourseList(courses);

        if (courses.length > 0) {
          setCourseId(courses[0]._id);
        }

      } catch (err) {
        console.log(err);
        toast.error('Something is wrong...');
      }
    };

    getCourses();

  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('courseId', courseId);
    formData.append('image', image);

    try {

      await axios.post(
        'http://localhost:4200/student/add-student',
        formData,
        {
          headers: {
            Authorization:
              'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      setLoading(false);

      toast.success('Student added successfully!');

      setFullName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setImage(null);
      setImageUrl(null);

      window.dispatchEvent(
        new Event('students_updated')
      );

      if (courseList.length > 0) {
        setCourseId(courseList[0]._id);
      }

    } catch (err) {

      setLoading(false);

      if (err.response) {
        console.error(err.response.data);

        toast.error(
          err.response.data.message ||
          'Something went wrong'
        );

      } else {

        console.error(err);
        toast.error('Network error');
      }
    }
  };

  const fileHandler = (e) => {

    if (e.target.files && e.target.files[0]) {

      setImage(e.target.files[0]);

      setImageUrl(
        URL.createObjectURL(e.target.files[0])
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className='form'
      >

        <h1>Add New Student</h1>

        <input
          required
          type='text'
          placeholder='Full Name'
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <input
          required
          type='text'
          placeholder='Phone'
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <input
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          required
          type='text'
          placeholder='Address'
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <select
          required
          value={courseId}
          onChange={(e) =>
            setCourseId(e.target.value)
          }
          style={{
            padding: 10,
            border: '1px solid #a5a5a5',
            borderRadius: 10,
            width: '80%',
            height: 45
          }}
        >

          <option value='' disabled>
            Select Course
          </option>

          {courseList.map((c) => (
            <option
              key={c._id}
              value={c._id}
            >
              {c.courseName}
            </option>
          ))}

        </select>

        <input
          required
          type='file'
          onChange={fileHandler}
        />

        {imageUrl && (
          <img
            className='your-logo'
            alt='student logo'
            src={imageUrl}
          />
        )}

        <button
          type='submit'
          className='submit-btn'
          disabled={isLoading}
        >

          {isLoading && (
            <i className='fa-solid fa-spinner fa-spin-pulse'></i>
          )}

          Submit

        </button>

      </form>
    </div>
  );
};

export default AddStudent;

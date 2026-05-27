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
  getCourses();
}, [getCourses]);
  
  const getCourses = () => {
    axios
      .get('http://localhost:4200/course/all-courses', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        const courses = res.data.courses || [];
        setCourseList(courses);
        if (courses.length && !courseId) setCourseId(courses[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error('something is wrong...');
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('courseId', courseId);
    formData.append('image', image);

    axios
      .post('http://localhost:4200/student/add-student', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setLoading(false);
        toast.success('Student added successfully!');

        // Clear form
        setFullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCourseId('');
        setImage(null);
        setImageUrl(null);

        // Force refresh of Students component
        window.dispatchEvent(new Event('students_updated'));

        // Re-select first course (if available)
        if (courseList.length) setCourseId(courseList[0]._id);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.error(err.response.data);
          toast.error(err.response.data.message || 'Something went wrong');
        } else {
          console.error(err);
          toast.error('Network error');
        }
      });
  };

  const fileHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h1>Add New Student</h1>

        <input
          required
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          placeholder='Full Name'
          type='text'
        />
        <input
          required
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder='Phone'
          type='text'
        />
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Email'
          type='email'
        />
        <input
          required
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder='Address'
          type='text'
        />

        <select
          required
          onChange={(e) => setCourseId(e.target.value)}
          value={courseId}
          style={{ padding: 10, border: '1px solid #a5a5a5', borderRadius: 10, width: '80%', height: 45 }}
        >
          <option value='' disabled>
            Select Course
          </option>
          {courseList.map((c) => (
            <option key={c._id} value={c._id}>
              {c.courseName}
            </option>
          ))}
        </select>

        <input required onChange={fileHandler} type='file' />
        {imageUrl && <img className='your-logo' alt='student logo' src={imageUrl} />}

        <button type='submit' className='submit-btn' disabled={isLoading}>
          {isLoading && <i className='fa-solid fa-spinner fa-spin-pulse'></i>} Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;


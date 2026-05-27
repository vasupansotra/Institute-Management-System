import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [startingDate, setStartingDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('description', description);
    formData.append('price', Number(price));
    formData.append('startingDate', startingDate);
    formData.append('endDate', endDate);
    formData.append('image', image);

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/course/add-course`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then(() => {
        setLoading(false);
        toast.success('Course added successfully!');
        setCourseName('');
        setDescription('');
        setPrice(0);
        setStartingDate('');
        setEndDate('');
        setImage(null);
        setImageUrl(null);
        window.dispatchEvent(new Event('courses_updated'));
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
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h1>Add New Course</h1>
        <input
          onChange={(e) => setCourseName(e.target.value)}
          value={courseName}
          placeholder='Course-Name'
          type='text'
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder='Description'
          type='text'
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder='Price'
          type='number'
        />
        <input
          onChange={(e) => setStartingDate(e.target.value)}
          value={startingDate}
          placeholder='Starting Date (DD-MM-YY)'
          type='text'
        />
        <input
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          placeholder='End Date (DD-MM-YY)'
          type='text'
        />
        <input onChange={fileHandler} type='file' />
        {imageUrl && <img className='your-logo' alt='your logo' src={imageUrl} />}
        <button type='submit' className='submit-btn' disabled={isLoading}>
          {isLoading && <i className='fa-solid fa-spinner fa-spin-pulse'></i>} Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourses;

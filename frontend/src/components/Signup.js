import React from 'react'
import '../components/style.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [image,setImage] = useState(null);
  const [imageUrl,setImageUrl] = useState('');
  const [isLoading,setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (event)=>{
    event.preventDefault();
    setLoading(true);
    // console.log(fullName,email,phone,password,image)
    const formData = new FormData();//key:value
    formData.append('fullName',fullName); 
    formData.append('email',email);
    formData.append('phone',phone);
    formData.append('password',password);
    formData.append('image',image);

axiom
      .post(`${process.env.REACT_APP_API_BASE_URL}/user/signup`, formData)
.then(res=>{
      setLoading(false);

      toast.success('Your Account is Created...');
      navigate('/login')
      console.log(res)
    })
    .catch(err=>{
      setLoading(false);
      const apiMsg = err?.response?.data?.error || err?.response?.data?.msg || err?.message;
      toast.error(apiMsg || 'something is wrong...');
      console.log(err)
    })
  }

  const fileHandler =(e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='signup-wrapper'>
      <div className='signup-box'>

      <div className='signup-left'>
        {/* <img alt='book logo' src={require('../assets/bookss.png')}/> */}
        <img alt='book logo' src={require('../assets/bookss.png')} style={{ width :'200px', marginBottom: '5px' }} />
        
        <h1 className='signup-left-heading'>Institute Management App</h1>
        

      </div>
      <div className='signup-right'>

        <form onSubmit={submitHandler} className='form'>
        <h1>Create Your Account</h1>
        <input required onChange={e=>{setFullName(e.target.value)}} type='text'placeholder='Institute Full Name'/>
        <input required onChange={e=>{setEmail(e.target.value)}} type='email' placeholder='Email'/>
        <input required onChange={e=>{setPhone(e.target.value)}} type='text' placeholder='Phone'/>
        <input required onChange={e=>{setPassword(e.target.value)}} type='password' placeholder='Password'/>
        <input required onChange={fileHandler} type='file'/>
        {imageUrl &&<img className='your-logo' alt='your logo' src = {imageUrl} />}
        <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>
        <Link className='link' to = '/login'>Login Your Account</Link>
        </form>
      </div>

    </div>
    </div>
  )
}

export default Signup
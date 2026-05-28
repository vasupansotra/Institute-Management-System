import React from 'react'
import '../components/style.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (event)=>{
    event.preventDefault();
    setLoading(true);
    // console.log(fullName,email,phone,password,image)
axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/login`,{
      email:email,
      password:password
    })
    .then(res=>{
      setLoading(false);
      // toast.success('Welcome...');

      localStorage.setItem('token',res.data.token)
      // backend field name might be fullName or fulName (typo)
      localStorage.setItem('fullName', res.data.fullName ?? res.data.fulName)

      localStorage.setItem('imageUrl',res.data.imageUrl)
      localStorage.setItem('imageId',res.data.imageId)

      navigate('/dashboard')
      console.log(res)
    })
    .catch(err=>{
      setLoading(false);
      const apiMsg = err?.response?.data?.error || err?.response?.data?.msg || err?.message;
      toast.error(apiMsg || 'something is wrong...');
      console.log(err)
    })
  }

  // const fileHandler =(e)=>{
  //   setImage(e.target.files[0])
  //   setImageUrl(URL.createObjectURL(e.target.files[0]))
  // }

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
        <h1>Login With Your Account</h1>
        <input required onChange={e=>{setEmail(e.target.value)}} type='email' placeholder='Email'/>
        <input required onChange={e=>{setPassword(e.target.value)}} type='password' placeholder='Password'/>
        <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>
        <Link className='link' to = '/signup'>Create Your Account</Link>
        </form>
      </div>

    </div>
    </div>
  )
}

export default Login
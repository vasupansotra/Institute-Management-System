// import React, { Component } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStudent from './components/AddStudent'
import Students from './components/Students'
import AddCourses from './components/AddCourses'
import Courses from './components/Courses'
import Home from './components/Home'
import CollectFee from './components/CollectFee'
import PaymentHistory from './components/PaymentHistory'
import CourseDetail from './components/CourseDetail'
import StudentDetail from './components/StudentDetail'
import AIChat from './components/AIChat'


const App = () => {
  const myRouter = createBrowserRouter([
    {path:'',Component:Login},
    {path:'login',Component:Login},
    {path:'signup',Component:Signup},
    {path:'dashboard',Component:Dashboard,children:[
      {path:'',Component:Home},
      {path:'home',Component:Home},
      {path:'courses',Component:Courses},
      {path:'course-detail/:id',Component:CourseDetail},
      {path:'add-course',Component:AddCourses},
      {path:'students',Component:Students},
      {path:'student-detail/:id',Component:StudentDetail},
      {path:'add-student',Component:AddStudent},
      {path:'collect-fee',Component:CollectFee},
      {path:'payment-history',Component:PaymentHistory},
      {path:'ai-chat',Component:AIChat}
    ]}
  ])
  return (
    <>
      <RouterProvider router = {myRouter}></RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App

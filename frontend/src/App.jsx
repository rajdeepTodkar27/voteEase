import { useState } from 'react'
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import Landingpage from './components/Landingpage'
import './App.css'
import Vote from './components/Vote'
import Eparticipate from './components/Eparticipate'
import Result from './components/Result'
import Profile from './components/Profile'
import { RouterProvider,createBrowserRouter,Navigate } from 'react-router-dom'
import ProtectedRoute from './protectedroutes'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Landingpage /></>,
    },
    {
      path: "/signin",
      element: <><Navbar /><Signin /></>,
    },
    {
      path: "/signup",
      element: <><Navbar /><Signup /></>,
    },
    {
      path: "/user",
      element: <ProtectedRoute />,
      children: [
        { index: true, element: <Navigate to="/user/home" replace /> }, 
        { path: "home", element: <><Navbar /><Home /></> },
        { path: "electionregister", element: <><Navbar /><Eparticipate /></> },
        { path: "checkresult", element: <><Navbar /><Result /></> },
        { path: "vote", element: <><Navbar /><Vote /></> },
        { path: "profile", element: <><Navbar /><Profile /></> },
      ],
    },
  ]);

  return (
    <>
    <div className='max-h-[100vh] overflow-y-auto eleme '>
    <RouterProvider router={router}/>
    </div>
   
    </>
  )
}

export default App

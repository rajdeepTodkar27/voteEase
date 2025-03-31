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
import Adminhome from './components/Adminhome'
import CloseRegistration from './components/CloseRegistration'
import AdminRoutes from './Adminroutes'
import Setupelection from './components/Setupelection'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar role="user" /><Landingpage /></>,
    },
    {
      path: "/signin",
      element: <><Navbar role="user" /><Signin /></>,
    },
    {
      path: "/signup",
      element: <><Navbar role="user" /><Signup /></>,
    },
    {
      path: "/user",
      element: <ProtectedRoute />,
      children: [
        { index: true, element: <Navigate to="/user/home" replace /> }, 
        { path: "home", element: <><Navbar role="user" /><Home /></> },
        { path: "electionregister", element: <><Navbar role="user" /><Eparticipate /></> },
        { path: "checkresult", element: <><Navbar role="user" /><Result /></> },
        { path: "vote", element: <><Navbar role="user" /><Vote /></> },
        { path: "profile", element: <><Navbar role="user" /><Profile /></> },
      ],
    },{
      path: "/admin",
      element: <AdminRoutes />,
      children: [
        { index: true, element: <Navigate to="/admin/home" replace /> }, 
        { path: "home", element: <><Navbar role="admin" /><Adminhome /></> },
        { path: "setup-election", element: <><Navbar role="admin" /><Setupelection/></> },
        { path: "close-registration", element: <><Navbar role="admin" /> <CloseRegistration name="Close Registration" message="close the Registration" repo="close-registration"/></> },
        { path: "open-voting", element: <><Navbar role="admin" /><CloseRegistration name="Open Voting" message="open the voting" repo="open-voting"/> </> },
        { path: "close-voting", element: <><Navbar role="admin" /><CloseRegistration name="Close Voting" message="close the voting" repo="close-voting"/> </> },
        { path: "announce-results", element: <><Navbar role="admin" /><CloseRegistration name="Anounce Results" message="decalre result" repo="announce-results"/></> },
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

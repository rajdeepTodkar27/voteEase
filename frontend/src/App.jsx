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
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import ProtectedRoute from './protectedroutes'
import Adminhome from './components/Adminhome'
import CloseRegistration from './components/CloseRegistration'
import AdminRoutes from './Adminroutes'
import Setupelection from './components/Setupelection'
import CandidateVerification from './components/CandidateVerification'
import ElectionCandidate from './components/ElectionCandidate'
function App() {
 

  return (
    <>
    <div className='max-h-[100vh] overflow-y-auto eleme '>
    <Router>
    <Routes>
      <Route path="/" element={<><Navbar role="user" /><Landingpage /></>} />
      <Route path="/signin" element={<><Navbar role="user" /><Signin /></>} />
      <Route path="/signup" element={<><Navbar role="user" /><Signup /></>} />

      <Route path="/user" element={<ProtectedRoute />}>
      <Route index element={<Navigate to="/user/home" replace />} />
        <Route path="home" element={<><Navbar role="user" /><Home /></>} />
        <Route path="electionregister" element={<><Navbar role="user" /><Eparticipate /></>} />
        <Route path="checkresult" element={<><Navbar role="user" /><Result /></>} />
        <Route path="vote" element={<><Navbar role="user" /><Vote /></>} />
        <Route path="profile" element={<><Navbar role="user" /><Profile /></>} />
      </Route>

      <Route path="/admin" element={<AdminRoutes />}>
      <Route index element={<Navigate to="/admin/home" replace />} />
        <Route path="home" element={<><Navbar role="admin" /><Adminhome /></>} />
        <Route path="setup-election" element={<><Navbar role="admin" /><Setupelection /></>} />

        <Route path="/admin/candidate-verification" >
        <Route index element={<><Navbar role="admin" /><CandidateVerification /></>} />
        <Route path=":electionName" element={<><Navbar role="admin" /><ElectionCandidate /></>} />
        </Route>

        <Route path="close-registration" element={<><Navbar role="admin" /><CloseRegistration name="Close Registration" message="Close the Registration" repo="close-registration" /></>} />
        <Route path="open-voting" element={<><Navbar role="admin" /><CloseRegistration name="Open Voting" message="Open the Voting" repo="open-voting" /></>} />
        <Route path="close-voting" element={<><Navbar role="admin" /><CloseRegistration name="Close Voting" message="Close the Voting" repo="close-voting" /></>} />
        <Route path="announce-results" element={<><Navbar role="admin" /><CloseRegistration name="Announce Results" message="Declare Result" repo="announce-results" /></>} />
      </Route>
    </Routes>
    </Router>
    
    </div>
   
    </>
  )
}

export default App

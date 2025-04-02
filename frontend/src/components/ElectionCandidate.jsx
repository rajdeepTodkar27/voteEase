import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CandidatePopup from './CandidatePopup'
const ElectionCandidate = () => {
  const { electionName } = useParams();
  const [elelist, setelelist] = useState([])
  const [candidateProfile, setcandidateProfile] = useState(null)
  useEffect(() => {
    axios.get(`http://localhost:4000/admin/candidate-verification/${electionName}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,

      }
    }).then(res => {
      if(JSON.stringify(res.data.data.candidates) !== JSON.stringify(elelist)){
        
        
        setelelist(res.data.data.candidates)
      }

    }).catch(err => {
      console.log(err)
    })
  }, [elelist])


  const rejectApplication = (id) => {
    axios.put(`http://localhost:4000/admin/candidate-verification/${electionName}`, {
      candidateid: id
    },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {

        alert(res.data.message)

      }).catch(err => {
        if (err.response) {
          alert(err.response.data.message);
      }else if (err.request) {
        console.error("Axios Request Error:", err.request);
    } else {
        alert("Something went wrong: " + err.message);
    }
      })
  }



  const getProfile = (username) => {
    axios.post(`http://localhost:4000/admin/candidate-verification/${electionName}`,{
      candidatename: username
    } ,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`

      }
    }).then(res => {
      
        setcandidateProfile(res.data.data)
      

    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">{decodeURIComponent(electionName)} Election Candidates</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul>
            {elelist.map((position, index) => (
              <li key={index} className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 p-3 border-b">
                <span
                  className="hover:underline hover:text-sky-400 cursor-pointer text-lg text-center p-2 sm:text-left"
                  onClick={() => getProfile(position.userName)}
                >
                  {position.userName}
                </span>

                <button
                  onClick={() => rejectApplication(position._id)}
                  className="bg-red-500 text-white px-4 cursor-pointer py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Reject Application
                </button>
              </li>

            ))}


          </ul>
          {candidateProfile && (
        <CandidatePopup
          candidate={candidateProfile}
          onClose={() => setcandidateProfile(null)}
        />
      )}
        </div>
      </div>
    </div>
  )
}

export default ElectionCandidate

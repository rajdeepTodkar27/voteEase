import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"

const Vote = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const formRef = useRef(null);
  const selectedElection = watch('election', '');
  const selectedCandidate = watch('candidate', '');
  const [errorMessage, seterrorMessage] = useState("")
  const [elelist, setelelist] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/user/vote", { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } })
      .then(res => {
        console.log(res.data.data);

        setelelist(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = async (data) => {
    seterrorMessage("")
    axios.post("http://localhost:4000/user/vote", {
      eName: data.election,
      ECandidate: data.candidate
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then(res => {
      alert(res.data.message)
    }).catch(err => {
      if (err.response) {
        seterrorMessage(err.response.data.message);

      } else if (err.request) {
        console.error("Axios Request Error:", err.request);
      } else {
        alert("Something went wrong: " + err.message);
      }
    })
    formRef.current.reset();
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-center mb-4'>Digital Ballot</h2>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div>
            <label className='block text-sm font-medium'>Select an Election</label>
            <select
              className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              {...register('election', { required: 'Please select an election' })}
            >
              <option value=''>Select an election</option>
              {elelist.map((position, index) => (
                <option key={index} value={position.electionName}>{position.electionName}</option>
              ))}
            </select>
            {errors.election && <p className='text-red-500 text-sm'>{errors.election.message}</p>}
          </div>

          {selectedElection && (
            <div>
              <label className='block text-sm font-medium'>Select a Candidate</label>
              <select
                className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                {...register('candidate', { required: 'Please select a candidate' })}
              >
                <option value=''>Select a candidate</option>
                {elelist.map((position, index) =>
                  (position.electionName === selectedElection) &&
                  position.candidates.map((c, i) => (
                    <option key={i} value={c._id}>{c.userName}</option>
                  ))
                )}
              </select>
              {errors.candidate && <p className='text-red-500 text-sm'>{errors.candidate.message}</p>}
            </div>
          )}

          <div className='flex items-center space-x-2 mt-4'>
            <input
              type='checkbox'
              id='confirmVote'
              className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
              disabled={!selectedCandidate}
              {...register('confirm', { required: "Please mark the checkbox" })}
            />
            <label htmlFor='confirmVote' className='text-gray-700 text-sm'>
              Are you sure you want to vote for this candidate?
            </label>
          </div>
          {errors.confirm && <p className='text-red-500 text-sm'>{errors.confirm.message}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button
            type='submit'
            className={`w-full px-4 py-2 rounded-lg ${selectedCandidate ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} text-white`}
            disabled={!selectedCandidate || isSubmitting}
          >
            Confirm Vote
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vote;

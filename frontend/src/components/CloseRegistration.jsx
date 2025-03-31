import React, { useState, useRef,useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const CloseRegistration = (props) => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const formRef = useRef();
  const [errorMessage, seterrorMessage] = useState("");
  const [elelist, setelelist] = useState([])
  
  const selectedElection = watch("election", '');

  useEffect(() => {
   axios.get(`http://localhost:4000/admin/${props.repo}`,{
    headers:{
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
   }).then(res=>{
    console.log(res.data.data);
    setelelist(res.data.data)
   }).catch(err=>{
      console.log(err)
   })
  
  }, [])


  const onSubmit = (data) => {
    seterrorMessage("")
    axios.put(`http://localhost:4000/admin/${props.repo}`, {
        electionname: data.election
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
    }).then(res=>{
        alert(res.data.message)
    }).catch(err=>{
        if (err.response) {
          seterrorMessage(err.response.data.message);
            
        }else if (err.request) {
          console.error("Axios Request Error:", err.request);
      } else {
          alert("Something went wrong: " + err.message);
      }
    })
    // console.log(data);
    
    formRef.current.reset();
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-center mb-4'>{props.name}</h2>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div>
            <label className='block text-sm font-medium'>Select an Election</label>
            <select
              className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              {...register('election', { required: 'Please select an election' })}
            >
              <option value=''>Select an election</option>
              {elelist.map((position, index) => (
                <option key={index} value={position}>{position}</option>
              ))}
            </select>
            {errors.election && <p className='text-red-500 text-sm'>{errors.election.message}</p>}
          </div>

          <div className='flex items-center space-x-2 mt-4'>
            <input
              type='checkbox'
              id='confirmClose'
              className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
              disabled={!selectedElection}
              {...register('confirm', { required: "Please confirm to close registration" })}
            />
            <label htmlFor='confirmClose' className='text-gray-700 text-sm'>
              {`Are you sure  to ${props.message}?`}
            </label>
          </div>
          {errors.confirm && <p className='text-red-500 text-sm'>{errors.confirm.message}</p>}

          <button
            type='submit'
            className={`w-full px-4 py-2 rounded-lg ${selectedElection ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} text-white`}
            disabled={!selectedElection || isSubmitting}
          >
            {`Confirm ${props.name}`}
          </button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CloseRegistration;

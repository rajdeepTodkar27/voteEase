import React,{useRef,useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";

const Setupelection = () => {
    const formRef = useRef()
  
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
      const [errorMessage, seterrorMessage] = useState("");
      const selectedElection = watch("election", '');

      const onSubmit =(data)=>{
        seterrorMessage("")
        axios.post("http://localhost:4000/admin/setup-election", {
            electionname: data.election
        }, {
            headers:{
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
        formRef.current.reset()
        
      }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-center mb-4'> Set up Election</h2>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div>
            <label className='block text-sm font-medium'>Enter Election Name</label>
            <input
              type='text'
              className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              {...register('election', { required: 'Please enter an election name' })}
            />
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
              {`Are you sure to create this election ?`}
            </label>
          </div>
          {errors.confirm && <p className='text-red-500 text-sm'>{errors.confirm.message}</p>}

          <button
            type='submit'
            className={`w-full px-4 py-2 rounded-lg ${selectedElection ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} text-white`}
            disabled={!selectedElection || isSubmitting}
          >
            Confirm
          </button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}

export default Setupelection

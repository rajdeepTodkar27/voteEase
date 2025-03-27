import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();
  const navigate=useNavigate()

  const handleLogOut=()=>{
    sessionStorage.removeItem("token");
    alert("successfully logged out");
    navigate("/")
  }
 
  useEffect(() => {
    axios.get("http://localhost:4000/user/profile", {headers:{Authorization: `Bearer ${sessionStorage.getItem("token")}`}})
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
  }, [ ])
  
  const onSubmit = (data) => {
    console.log('Updated Data:', data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl text-center mb-4">User Profile</h2>
      <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="text" 
            {...register('fullName', { required: 'Full Name is required' })} 
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="number" 
            {...register('phoneNo', { required: 'Phone number is required', validate: (value) => value.length === 10 || "Should contain 10 characters"
            })} 
          />
          {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="date" 
            {...register('dateOfBirth', { required: 'Date of Birth is required' })} 
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="text" 
            {...register('userName')} 
            readOnly 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Voter ID</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="text" 
            {...register('id')} 
            readOnly 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="email" 
            {...register('email',{ required: 'email is required'})}  
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <button type='submit'  className="bg-[#1E88E5] text-white w-full px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-[#1565C0]">
          Update
        </button>
        <button onClick={handleLogOut} className="bg-[#1E88E5] text-white w-full px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-[#1565C0]">
          Log out
        </button>
       
      </form>
    </div>
  </div>
  );
};

export default Profile;

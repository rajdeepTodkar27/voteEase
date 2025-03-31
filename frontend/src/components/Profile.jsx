import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();
  const navigate=useNavigate()
  const [userData, setuserData] = useState({})
  const [errmessage, seterrmessage] = useState("")
  const handleLogOut=()=>{
    sessionStorage.removeItem("token");
    alert("successfully logged out");
    navigate("/")
  }
 
  useEffect(() => {
    axios.get("http://localhost:4000/user/profile", {headers:{Authorization: `Bearer ${sessionStorage.getItem("token")}`}})
    .then(res=>{
      console.log(res.data)
      setuserData(res.data.data)
    })
    .catch(err=>console.log(err))
  }, [ ])
  
  useEffect(() => {
    console.log("hello");
    console.log(userData);
 
  for (let key in userData) {
        setValue(key,userData[key]);
    }
    
  }, [userData])
  
  const onSubmit = (data) => {
    seterrmessage("")
    axios.post("http://localhost:4000/user/profile",{
      fullname: data.fullname,
       phoneno: data.phoneno,
       dob: data.dob 
    },{
      headers:{
        'Content-Type': 'application/json',
         Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then(res=>{
      alert(res.data.message)
    }).catch(err=>{
      if (err.response) {
        seterrmessage(err.response.data.message);
          
      }else if (err.request) {
        console.error("Axios Request Error:", err.request);
    } else {
        alert("Something went wrong: " + err.message);
    }
    })
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
            {...register('fullname', { required: 'Full Name is required' })} 
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="number" 
            {...register('phoneno', { required: 'Phone number is required', validate: (value) => value.length === 10 || "Should contain 10 characters"
            })} 
          />
          {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type="Date" 
            {...register('dob', { required: 'Date of Birth is required' })} 
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
        {errmessage && <p className="text-red-500 text-sm">{errmessage}</p>}
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

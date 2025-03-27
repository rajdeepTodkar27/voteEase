import React,{useRef,useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const formRef = useRef(null);
  const navigate=useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const password = watch("password");
  useEffect(() => {
    if (token) {
      navigate("/user/home"); 
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    setErrorMessage("")
    axios.post('http://localhost:4000/signup', {
      userName: data.username,
      email: data.email,
      password: data.password
    }, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      alert(res.data.message)
      formRef.current.reset()
      navigate("/signin")
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.message)
        setErrorMessage(err.response.data.message.split(":")[1]);
    }else if (err.request) {
      console.error("Axios Request Error:", err.request);
  } else {
      alert("Something went wrong: " + err.message);
  }
    });
};
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-center mb-4">Sign Up</h2>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input {...register("username", { required: "Username is required" })} className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" } })} type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Re-enter Password</label>
            <input {...register("confirmPassword", { required: "Please re-enter your password",validate: (value) => value === password || "Passwords do not match", })} type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
        <div className="text-center mt-2">
        <Link to="/signin">  <span className="hover:underline text-sm cursor-pointer">Already have an account?</span></Link>
        </div>
      </div>
    </div>
  )
}


export default Signup

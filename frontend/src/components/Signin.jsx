import React,{useRef,useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formRef = useRef(null)
  const navigate=useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const checkAccess = async () => {
      try {
        await axios.get("http://localhost:4000/admin/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("admin");
        navigate("/admin/home");
      } catch (adminError) {
        try {
          await axios.get("http://localhost:4000/user/home", {
            headers: { Authorization: `Bearer ${token}` },
          });
          navigate("/user/home");
        } catch (userError) {
          console.error("Access Denied:", userError.response?.data?.message || userError.message);
          alert("Access denied. Please sign in again.");
        }
      }
    };

    checkAccess();
  }, [token, navigate]);

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    setErrorMessage("")
    axios.post('http://localhost:4000/signin', {
      userName: data.username,
      password: data.password
    }, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data.token)
      sessionStorage.setItem("token", res.data.token)
      res.data.role==="admin" ?navigate("/admin") : navigate("/user")
      
    })
    .catch(err => {
      if (err.response) {
        setErrorMessage(err.response.data.message);
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
      <h2 className="text-2xl text-center mb-4">Sign in Page</h2>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username/Email</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type='text' 
            {...register('username', { required: 'username is required' })} 
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" 
            type='password' 
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        
        <button type='submit' className="bg-[#1E88E5] text-white w-full px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-[#1565C0]">
          Sign in
        </button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>
      <div className='flex justify-center mt-3'><Link to="/signup"><span className='hover:text-sky-400 hover:underline text-sm cursor-pointer'>New user?</span></Link></div>
    </div>
  </div>
  )
}

export default Signin

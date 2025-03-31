import React, { useEffect } from "react";
import '../App.css';
import { CheckCircle, Vote, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate= useNavigate() 
  
  const handleNavigation=(path)=>{
      navigate(`/user/${path}`)
  }
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 p-6 text-white">
     
      <div className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition" onClick={()=>handleNavigation("electionregister")}>
        <ClipboardList size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Election Registration</h2>
        <p className="mt-2">Want to run in the election? Enroll now!</p>
      </div>

  
      <div className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition" onClick={()=>handleNavigation("vote")}>
        <Vote size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Vote Now</h2>
        <p className="mt-2">Cast your vote securely and make your voice heard.</p>
      </div>

 
      <div className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition" onClick={()=>handleNavigation("checkresult")}>
        <CheckCircle size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Check Results</h2>
        <p className="mt-2">View the latest election results in real-time.</p>
      </div>
    </div>

  );
}
import React from "react";
import { ClipboardList, Lock, Unlock, CheckCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 p-6 text-white">
  
      <div
        className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition"
        onClick={() => handleNavigation("setup-election")}
      >
        <Settings size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Setup Election</h2>
        <p className="mt-2">Create and configure new elections.</p>
      </div>

      <div
        className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition"
        onClick={() => handleNavigation("close-registration")}
      >
        <Lock size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Close Registration</h2>
        <p className="mt-2">End the candidate registration process.</p>
      </div>

      <div
        className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition"
        onClick={() => handleNavigation("open-voting")}
      >
        <Unlock size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Open Voting</h2>
        <p className="mt-2">Start the voting process for the election.</p>
      </div>

      <div
        className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition"
        onClick={() => handleNavigation("close-voting")}
      >
        <Lock size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Close Voting</h2>
        <p className="mt-2">End the voting period.</p>
      </div>

      <div
        className="w-full md:w-1/4 p-6 bg-blue-600 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-blue-700 transition"
        onClick={() => handleNavigation("announce-results")}
      >
        <CheckCircle size={40} className="mb-3" />
        <h2 className="text-xl font-bold">Announce Results</h2>
        <p className="mt-2">Publish the final election results.</p>
      </div>
    </div>
  );
}

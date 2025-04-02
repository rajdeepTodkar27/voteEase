import React from "react";
import { X } from "lucide-react";

const CandidatePopup = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl relative">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">{candidate.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        <div className="space-y-2 text-base">
          <p><strong>Full Name:</strong> {candidate.fullname}</p>
          <p><strong>Phone Number:</strong> {candidate.phoneno} </p>
          <p><strong>Data of Birth:</strong> {candidate.dob}</p>
          <p><strong>Username:</strong> {candidate.userName}</p>
          <p><strong>Voter Id:</strong> {candidate.id}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidatePopup;
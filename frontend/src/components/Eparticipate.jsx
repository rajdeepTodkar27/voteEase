import React from 'react'

const Eparticipate = () => {
  return (
    <div>
      <div className='w-[80%] lg:w-[30%] md:w-[40%] sm:w-[50%] flex flex-col justify-center items-center  gap-4 bg-white p-6 rounded-lg shadow-lg m-auto  p-4 mt-5 min-h-[55vh] sm:min-h-[60vh]'>
       <div className='text-xl '>Election Participation Card</div>
  <div>
   
   <div className="relative">
       <input 
           type="text" 
           id="dropdownInput" 
           placeholder="Select a election" 
           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" 
            
       
       />
       <button 
           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" 
           
       >
           ▼
       </button>
      
       <ul 
           id="dropdownList" 
           className="absolute w-full bg-white border rounded-lg shadow-md mt-1 hidden z-10"
       >
           <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">Election A</li>
           <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">Election B</li>
           <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">Election C</li>
       </ul>
   </div>

   <div className="flex items-center space-x-2 mt-4">
       <input type="checkbox" id="confirmVote" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" disabled/>
       <label htmlFor="confirmVote" className="text-gray-700 text-sm">Are you sure to register for this election?</label>
   </div>

   <button 
       id="voteBtn" 
       className="mt-3 w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
       
   >
       Confirm 
   </button>

    </div>
    </div>
    </div>
  )
}

export default Eparticipate

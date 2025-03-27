import React, { useEffect } from "react";
import '../App.css'
export default function Home() {

  return (
    <div className=" flex flex-col gap-y-4 p-4" >
      <div>
        <div>Register for election...</div>
        <div className="flex gap-2 p-2 max-w-[100vw] overflow-x-auto eleme">
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
        </div>
      </div>
      <div>
        <div>vote in the election...</div>
        <div className="flex gap-2 p-2 max-w-[100vw] overflow-x-auto eleme">
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
        </div>
      </div>
      <div>
        <div>Election result...</div>
        <div className="flex gap-2 p-2 max-w-[100vw] overflow-x-auto eleme">
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
          <div className="min-w-[30vw] sm:min-w-[20vw] h-[25vh] bg-white shadow-lg rounded-lg "></div>
        </div>
      </div>

    </div>
  );
}
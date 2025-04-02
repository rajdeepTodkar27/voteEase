import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CandidateVerification = () => {
    const [elelist, setelelist] = useState([])
    const navigate=useNavigate()
    useEffect(() => {
        axios.get("http://localhost:4000/admin/candidate-verification", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res => {

            setelelist(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleClick=(position)=>{
        navigate(`/admin/candidate-verification/${encodeURIComponent(position)}`,)
    }
    return (
        <div className="pt-8">

            <div  className="flex flex-col items-center gap-4 sm:gap-6">
                {elelist.map((position, index) => (
                    <div key={index} onClick={()=>handleClick(position)} className="bg-blue-600 p-4  sm:p-6 rounded-lg cursor-pointer w-full max-w-2xl ">
                        <h2 className="text-white text-lg sm:text-xl font-semibold text-center">{position}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CandidateVerification

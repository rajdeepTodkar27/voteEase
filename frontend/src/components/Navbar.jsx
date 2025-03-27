import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div  className='flex justify-evenly  py-2 bg-blue-600 text-white '>
      <Link to="/user/home"><div className='hover:cursor-pointer p-2'>VoteEase </div></Link>
      <div>
        <ul className='flex gap-6'>
        <Link to="/user/home"><li className='hover:cursor-pointer p-2'>Home</li></Link>
        <Link to="/user/electionregister"><li className='hover:cursor-pointer p-2'>Election</li></Link>
        <Link to="/user/profile"><li className='hover:cursor-pointer p-2'>Profile</li></Link>
      </ul>
      
      </div>
    </div>
  )
}

export default Navbar

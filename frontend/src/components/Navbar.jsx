import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="bg-blue-600 text-white p-3 flex justify-between items-center relative z-50">
 
        <Link to="/user/home" className="text-2xl font-bold">
          VoteEase
        </Link>

        <ul className="hidden md:flex gap-6">
          <Link to={`/${props.role}/home`}>
            <li className="hover:cursor-pointer p-2 hover:text-gray-300">Home</li>
          </Link>
          <Link to="/user/electionregister">
            <li className="hover:cursor-pointer p-2 hover:text-gray-300">Election</li>
          </Link>
          <Link to="/user/profile">
            <li className="hover:cursor-pointer p-2 hover:text-gray-300">Profile</li>
          </Link>
        </ul>

        <button
  className="md:hidden block focus:outline-none"
  onClick={() => setIsOpen(!isOpen)} 
>
  {isOpen ? <X size={30} /> : <Menu size={30} />} 
</button>

      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-[400px] bg-blue-700 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >

        <ul className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
          <Link to={`/${props.role}/home`} onClick={closeMenu}>
            <li className="hover:cursor-pointer p-2 hover:bg-blue-500 w-full text-center">Home</li>
          </Link>
          <Link to="/user/electionregister" onClick={closeMenu}>
            <li className="hover:cursor-pointer p-2 hover:bg-blue-500 w-full text-center">Election</li>
          </Link>
          <Link to="/user/profile" onClick={closeMenu}>
            <li className="hover:cursor-pointer p-2 hover:bg-blue-500 w-full text-center">Profile</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

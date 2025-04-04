import React, { useState } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa"; 

interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <nav className="bg-[#3251D0] p-4 flex items-center justify-between h-14 w-full">
      <h1 className="text-white text-xl font-bold">User Management</h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white sm:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className={`flex-col sm:flex-row sm:flex gap-4 items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-[#3251D0] sm:bg-transparent p-4 sm:p-0 ${isOpen ? "flex" : "hidden"}`}>
        <button className="bg-white text-[#3251D0] px-4 py-2 rounded cursor-pointer w-full sm:w-auto">
          Create User
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto">
          Logout
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white p-2 flex items-center justify-center cursor-pointer w-full sm:w-auto"
        >
          {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth";
import { useThemeStore } from "../../../stores/theme";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore(); 

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    useThemeStore.getState().clearTheme(); 
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <nav className="bg-[var(--color-primary)] p-4 flex items-center justify-between h-14 w-full sticky top-0 z-50 shadow-md">
       <Link to="/dashboard">
        <h1 className="text-white text-xl font-bold cursor-pointer">User Management</h1>
      </Link>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white sm:hidden bg-transparent p-0 hover:bg-transparent"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </Button>

      <div
        className={`flex-col sm:flex-row sm:flex gap-4 items-center absolute sm:static top-16 left-0 w-full sm:w-auto 
          bg-[var(--color-primary)] sm:bg-transparent p-4 sm:p-0 ${isOpen ? "flex" : "hidden"}`}
      >
        <Link to="/dashboard/new">
          <Button className="bg-white text-[var(--color-primary)] px-4 py-2 rounded w-full sm:w-auto">
            Create User
          </Button>
        </Link>

        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
        >
          Logout
        </Button>

        <Button
          onClick={toggleTheme}
          className="bg-transparent text-white p-2 flex items-center justify-center w-full sm:w-auto hover:bg-white/10 transition"
        >
          {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </Button>
      </div>
    </nav>
  );
};

export { Navbar };

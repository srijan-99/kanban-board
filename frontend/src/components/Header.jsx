import React from "react";
import { ArrowLeft, Search } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { PiShare } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="text-4xl font-bold">Kanban Board</div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

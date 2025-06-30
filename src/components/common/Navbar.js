import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import LoginSvg from '../../assets/images/Purple Logo.svg';

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between px-8 py-2 bg-white shadow-sm">
      {/* Logo and Title */}
      <div className="flex items-center gap-14">
        <div className="px-20">
          {/* Placeholder for logo, replace with your SVG if needed */}
          <img src={LoginSvg} alt="Logo" className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-[#8B3DFF]">Provider Management</h1>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6">
        <LanguageToggle />
        <ThemeToggle />
        <div className="w-[1px] h-8 bg-gray-200 mx-2" />
        <button className="relative bg-[#F5F8FC] rounded-full p-3 hover:bg-[#E6E6FA]">
          <FaRegBell className="text-xl text-[#3B4A6B]" />
          <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-md bg-[#8B3DFF] flex items-center justify-center overflow-hidden">
          {/* Placeholder for user avatar, replace with actual image if needed */}
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Navbar; 
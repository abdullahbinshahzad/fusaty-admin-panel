import React from 'react';
import { FaTachometerAlt, FaUser, FaUsersCog, FaClipboardList, FaThList, FaStar, FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';

const navItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt /> },
  { label: 'User Management', icon: <FaUser /> },
  { label: 'Provider Management', icon: <FaUsersCog /> },
  { label: 'Order Management', icon: <FaClipboardList /> },
  { label: 'Category Management', icon: <FaThList /> },
  { label: 'Ratings Management', icon: <FaStar /> },
  { label: 'Payment Management', icon: <FaCreditCard /> },
  { label: 'Provider Payout', icon: <FaMoneyCheckAlt /> },
];

const Sidebar = ({ activeIndex = 2 }) => {
  return (
    <aside className="w-[270px] min-h-screen bg-white flex flex-col py-8 shadow-md">
      <nav className="flex flex-col gap-2">
        {navItems.map((item, idx) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 px-6 py-3 cursor-pointer rounded-l-full transition-colors duration-200 text-[#3B4A6B] hover:bg-[#F5F1FF] hover:text-[#8B3DFF] ${
              idx === activeIndex ? 'bg-[#F5F1FF] text-[#8B3DFF] font-semibold' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 
import React from 'react';

const ThemeToggle = ({ isLight, toggleTheme }) => {

  return (
    <div
      onClick={toggleTheme}
      className={`relative w-[48px] h-[24px] flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isLight ? 'bg-blue-500' : 'bg-gray-700'}`}
    >
      <div
        className={`w-7 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isLight ? 'translate-x-0' : 'translate-x-5'}`}
      ></div>
    </div>
  );
};

export default ThemeToggle; 
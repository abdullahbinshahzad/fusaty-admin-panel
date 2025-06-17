import React from 'react';

const ThemeToggle = ({ isLight, toggleTheme }) => {

  return (
    <div
      onClick={toggleTheme}
      className={`relative w-20 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isLight ? 'bg-blue-500' : 'bg-gray-700'}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isLight ? 'translate-x-0' : 'translate-x-12'}`}
      ></div>
    </div>
  );
};

export default ThemeToggle; 
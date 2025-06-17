import React from 'react';

const LanguageToggle = ({ isEnglish, toggleLanguage }) => {

  return (
    <div
      onClick={toggleLanguage}
      className={`relative w-20 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isEnglish ? 'bg-purple-700' : 'bg-gray-400'}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'translate-x-0' : 'translate-x-12'}`}
      ></div>
      <span className={`absolute text-white font-bold ${isEnglish ? 'left-3' : 'right-3'}`}>
        {isEnglish ? 'E' : 'ع'}
      </span>
    </div>
  );
};

export default LanguageToggle; 
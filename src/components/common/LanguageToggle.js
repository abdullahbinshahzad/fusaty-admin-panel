import React from 'react';

const LanguageToggle = ({ isEnglish, toggleLanguage }) => {

  return (
    <div
      onClick={toggleLanguage}
      className={`relative w-[48px] h-[24px] flex items-center rounded-full p-[2px] cursor-pointer transition-all duration-300 bg-[#EEF3F9] border border-[#AD84F0]`}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute w-[27px] h-[24px] rounded-full  shadow-md transition-transform duration-300 bg-[#4D1D76] ${
          isEnglish
            ? 'translate-x-[-3px] border border-[#AD84F0]'
            : 'translate-x-[18px] border border-[#AD84F0]'
        }`}
      ></div>

      {/* Label E */}
      <span
        className={`absolute font-bold text-[12px] transition-all duration-300 top-1/2 -translate-y-1/2 left-[9px] ${isEnglish ? 'text-white' : 'text-[#4D1D76]'}`}
      >
        E
      </span>

      {/* Label ع */}
      <span
        className={`absolute font-bold text-[12px] transition-all duration-300 top-1/2 -translate-y-1/2 left-[29.5px] -mt-[3.25px] ${isEnglish ? 'text-[#4D1D76]' : 'text-white'}`}
      >
        ع
      </span>
    </div>
  );
};

export default LanguageToggle; 
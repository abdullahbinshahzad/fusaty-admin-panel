import React from 'react';

const Input = ({ label, type = 'text', value, onChange, className, textAlign, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-sm font-medium text-gray-700 ${textAlign || ''}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 pt-2 border border-[#FFFFFF33] rounded-md shadow-sm h-[56px] ${textAlign || ''} ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;
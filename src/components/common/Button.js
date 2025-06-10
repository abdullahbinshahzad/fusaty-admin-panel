import React from 'react';

const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
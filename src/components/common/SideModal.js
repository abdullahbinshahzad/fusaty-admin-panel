import React from 'react';

const SideModal = ({ open, onClose, title, children, actions }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${open ? '' : 'pointer-events-none'}`}
      style={{ background: open ? 'rgba(0,0,0,0.15)' : 'transparent' }}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay click closes modal */}
      <div
        className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`relative bg-white w-full max-w-md h-full shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {actions && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-white flex flex-col gap-3">{actions}</div>
        )}
      </aside>
    </div>
  );
};

export default SideModal; 
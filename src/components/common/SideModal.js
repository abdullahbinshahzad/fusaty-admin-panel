import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../../utils/theme';

const SideModal = ({ open, onClose, title, children, actions }) => {
    const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

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
        className={`relative bg-background-sidemodal w-full max-w-md h-full shadow-xl transform transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h2 className="text-lg text-text-primary font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
        
        {/* Footer - Fixed */}
        {actions && (
          <div className="p-6 bg-background-sidemodal flex flex-col gap-3 flex-shrink-0 border-t">
            {actions}
          </div>
        )}
      </aside>
    </div>
  );
};

export default SideModal; 
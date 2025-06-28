// Pure utility functions for language-specific styling
// These functions don't use React hooks and can be called anywhere

// Get text alignment class based on language
export const getTextAlignment = (language) => {
  return language === 'ar' ? 'text-right' : 'text-left';
};

// Get opposite text alignment class based on language (for forgot password)
export const getOppositeTextAlignment = (language) => {
  return language === 'ar' ? 'text-left' : 'text-right';
};

// Get text direction class based on language
export const getTextDirection = (language) => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

// Get flex direction for RTL/LTR layouts
export const getFlexDirection = (language, defaultDirection = 'row') => {
  if (language === 'ar' && defaultDirection === 'row') {
    return 'flex-row-reverse';
  }
  return `flex-${defaultDirection}`;
};

// Get margin/padding classes for RTL/LTR
export const getSpacingClasses = (language, type = 'margin') => {
  if (language === 'ar') {
    return type === 'margin' ? 'mr-auto' : 'pr-auto';
  }
  return type === 'margin' ? 'ml-auto' : 'pl-auto';
};

// Get justify content for RTL/LTR
export const getJustifyContent = (language, defaultJustify = 'start') => {
  if (language === 'ar') {
    return defaultJustify === 'start' ? 'justify-end' : 'justify-start';
  }
  return `justify-${defaultJustify}`;
}; 
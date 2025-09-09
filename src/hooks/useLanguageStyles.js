import { useSelector } from 'react-redux';
import { 
  getTextAlignment, 
  getTextDirection, 
  getFlexDirection, 
  getSpacingClasses, 
  getJustifyContent,
  getOppositeTextAlignment
} from '../utils/languageUtils';

export const useLanguageStyles = () => {
  const currentLanguage = useSelector((state) => state.language.language);

  return {
    // Text alignment classes
    textAlign: getTextAlignment(currentLanguage),
    oppositeTextAlign: getOppositeTextAlignment(currentLanguage),
    textDirection: getTextDirection(currentLanguage),
    
    // Layout classes
    flexDirection: (direction = 'row') => getFlexDirection(currentLanguage, direction),
    spacing: (type = 'margin') => getSpacingClasses(currentLanguage, type),
    justify: (defaultJustify = 'start') => getJustifyContent(currentLanguage, defaultJustify),
    
    // Common combinations
    textContainer: `${getTextAlignment(currentLanguage)} ${getTextDirection(currentLanguage)}`,
    
    // Language-aware positioning
    isRTL: currentLanguage === 'ar',
    isLTR: currentLanguage === 'en',
    
    // Current language
    language: currentLanguage
  };
}; 
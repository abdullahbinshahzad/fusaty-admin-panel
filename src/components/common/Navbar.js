import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applyTheme } from '../../utils/theme';
import { FaRegBell, FaBars, FaTimes } from 'react-icons/fa';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import PurpleLogoSvg from '../../assets/images/Purple Logo.svg';
import LoginSvg from '../../assets/images/White Logo.svg';
// import { useLanguageStyles } from '../../hooks/useLanguageStyles';

const Navbar = ({ onMenuToggle, isMenuOpen }) => {
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const location = useLocation();
  // const { textAlign } = useLanguageStyles();

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Choose logo based on theme mode
  const logoSrc = mode === 'light' ? PurpleLogoSvg : LoginSvg;

  // Function to get dynamic heading based on current route
  const getDynamicHeading = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/dashboard':
        return t('sidebar.dashboard');
      case '/user-management':
        return t('sidebar.userManagement');
      case '/provider-management':
        return t('sidebar.providerManagement');
      case '/order-management':
        return t('sidebar.orderManagement');
      case '/category-management':
        return t('sidebar.categoryManagement');
      case '/sub-category-management':
        return t('sidebar.subCategoryManagement');
      case '/sub-to-sub-category-management':
        return t('sidebar.subToSubCategoryManagement');
      case '/ratings-management':
        return t('sidebar.ratingsManagement');
      case '/payment-management':
        return t('sidebar.paymentManagement');
      case '/provider-payout':
        return t('sidebar.providerPayout');
      default:
        return t('sidebar.dashboard'); // Default fallback
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-2 lg:px-8 py-2 bg-background-card shadow-sm">
      {/* Mobile Menu Button and Logo */}
      <div className="flex items-center gap-1">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
        
        <div className="flex items-center gap-1 lg:gap-14">
          <div className="px-4 lg:px-20">
            {/* Logo changes based on theme mode */}
            <img src={logoSrc} alt="Logo" className="w-8 h-8 lg:w-12 lg:h-12" />
          </div>
          <h1 className="text-lg lg:text-2xl font-bold text-text-activetab truncate">{getDynamicHeading()}</h1>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-1 lg:gap-5">
        <LanguageToggle />
        <ThemeToggle />
        <div className="w-[1px] h-8 bg-navbar-divider mx-2" />
        <button className="relative bg-background-main rounded-full p-2 hover:bg-[#E6E6FA]">
          <FaRegBell className="text-xl text-navbar-divider" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-md bg-[#8B3DFF] flex items-center justify-center overflow-hidden">
          {/* Placeholder for user avatar, replace with actual image if needed */}
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Navbar; 
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { applyTheme } from '../../utils/theme';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../../assets/images/Dashboard.svg'
import UserIcon from '../../assets/images/User.svg'
import ProviderIcon from '../../assets/images/Provider.svg'
import OrderIcon from '../../assets/images/Order.svg'
import RatingIcon from '../../assets/images/Rating.svg'
import PaymentIcon from '../../assets/images/Payment.svg'
import ProviderPayoutIcon from '../../assets/images/Payout.svg'
import CategoryIcon from '../../assets/images/Category.svg'
import { FaUser, FaUsersCog, FaClipboardList, FaThList, FaStar, FaCreditCard, FaMoneyCheckAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';

// Sidebar navigation with active purple bar using NavLink from react-router-dom

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign } = useLanguageStyles();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const navItems = [
    { label: t('sidebar.dashboard'), icon: <DashboardIcon /> , to: '/dashboard' },
    { label: t('sidebar.userManagement'), icon: <img src={UserIcon} alt="" />, to: '/user-management' },
    { label: t('sidebar.providerManagement'), icon: <img src={ProviderIcon} alt="" />, to: '/provider-management' },
    { label: t('sidebar.orderManagement'), icon: <img src={OrderIcon} alt="" />, to: '/order-management' },
    { label: t('sidebar.ratingsManagement'), icon: <img src={RatingIcon} alt="" />, to: '/ratings-management' },
    { label: t('sidebar.paymentManagement'), icon: <img src={PaymentIcon} alt="" />, to: '/payment-management' },
    { label: t('sidebar.providerPayout'), icon: <img src={ProviderPayoutIcon} alt="" />, to: '/provider-payout' },
  ];

  const categoryItems = [
    { label: t('sidebar.categoryManagement'), icon: <img src={CategoryIcon} alt="" />, to: '/category-management' },
    { label: t('sidebar.subCategoryManagement'), icon: <img src={CategoryIcon} alt="" />, to: '/sub-category-management' },
    { label: t('sidebar.subToSubCategoryManagement'), icon: <img src={CategoryIcon} alt="" />, to: '/sub-to-sub-category-management' },
  ];

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50 lg:z-auto
        w-[270px] lg:w-[270px] md:w-[250px] sm:w-[200px] 
        min-h-screen bg-background-card flex flex-col py-8 shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:flex
      `}>
        <nav className="flex flex-col gap-2">
        {navItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `relative flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-[#F5F1FF] hover:text-[#8B3DFF] ${
                isActive ? 'bg-background-sidebaractivetab text-text-activetab font-semibold' : ''
              }`
            }
            end
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-2 bg-text-activetab rounded-r-full" />
                )}
                <span className= {`w-6 h-6 text-sm z-10 ${isActive ? 'text-text-activetab fill-text-activetab' : 'text-[#496683]'}`}>{item.icon}</span>
                <span className={`text-base z-10 ${textAlign}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <button
            onClick={toggleCategory}
            className={`relative flex items-center justify-between gap-4 px-6 py-3 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-[#F5F1FF] hover:text-[#8B3DFF] w-full`}
          >
            <div className="flex items-center gap-4">
              <span className="w-6 h-6 text-xl z-10"><img src={CategoryIcon} alt="" /></span>
              <span className={`text-base z-10 ${textAlign}`}>{t('sidebar.category')}</span>
            </div>
            <span className="text-sm z-10">
              {isCategoryOpen ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </button>
          
          {isCategoryOpen && (
            <div className="ml-4">
              {categoryItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative flex items-center gap-4 px-6 py-2 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-[#F5F1FF] hover:text-[#8B3DFF] ${
                      isActive ? 'bg-background-sidebaractivetab text-text-activetab font-semibold' : ''
                    }`
                  }
                  end
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-2 bg-text-activetab rounded-r-full" />
                      )}
                      <span className="w-6 h-6 text-lg z-10">{item.icon}</span>
                      <span className={`text-sm z-10 ${textAlign}`}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {navItems.slice(4).map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `relative flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-[#F5F1FF] hover:text-[#8B3DFF] ${
                isActive ? 'bg-background-sidebaractivetab text-text-activetab font-semibold' : ''
              }`
            }
            end
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-2 bg-text-activetab rounded-r-full" />
                )}
                <span className="w-6 h-6 text-xl z-10">{item.icon}</span>
                <span className={`text-base z-10 ${textAlign}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar; 
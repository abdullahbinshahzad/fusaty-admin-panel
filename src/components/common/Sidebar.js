import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { applyTheme } from '../../utils/theme';
import { NavLink, useLocation } from 'react-router-dom';
import DashboardIcon from '../../assets/images/Dashboard.svg'
import DashboardIconLight from '../../assets/images/DashboardLight.svg'
import DashboardIconDark from '../../assets/images/DashboardDark.svg'
import UserIcon from '../../assets/images/User.svg'
import UserIconLight from '../../assets/images/User Purple.svg'
import UserIconDark from '../../assets/images/User White.svg'
import ProviderIcon from '../../assets/images/Provider.svg'
import ProviderIconLight from '../../assets/images/ProviderLight.svg'
import ProviderIconDark from '../../assets/images/ProviderDark.svg'
import OrderIcon from '../../assets/images/Order.svg'
import OrderIconLight from '../../assets/images/OrderLight.svg'
import OrderIconDark from '../../assets/images/OrderDark.svg'
import RatingIcon from '../../assets/images/Rating.svg'
import RatingIconLight from '../../assets/images/RatingLight.svg'
import RatingIconDark from '../../assets/images/RatingDark.svg'
import PaymentIcon from '../../assets/images/Payment.svg'
import PaymentIconLight from '../../assets/images/PaymentLight.svg'
import PaymentIconDark from '../../assets/images/PaymentDark.svg'
import ProviderPayoutIcon from '../../assets/images/Payout.svg'
import ProviderPayoutIconLight from '../../assets/images/PayoutLight.svg'
import ProviderPayoutIconDark from '../../assets/images/PayoutDark.svg'
import CategoryIcon from '../../assets/images/Category.svg'
import CategoryIconLight from '../../assets/images/CategoryLight.svg'
import CategoryIconDark from '../../assets/images/CategoryDark.svg'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';

// Sidebar navigation with active purple bar using NavLink from react-router-dom

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign } = useLanguageStyles();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();

  const navItems = useMemo(() => ([
    { label: t('sidebar.dashboard'), icons: { default: DashboardIcon, light: DashboardIconLight, dark: DashboardIconDark }, to: '/dashboard' },
    { label: t('sidebar.userManagement'), icons: { default: UserIcon, light: UserIconLight, dark: UserIconDark }, to: '/user-management' },
    { label: t('sidebar.providerManagement'), icons: { default: ProviderIcon, light: ProviderIconLight, dark: ProviderIconDark }, to: '/provider-management' },
    { label: t('sidebar.orderManagement'), icons: { default: OrderIcon, light: OrderIconLight, dark: OrderIconDark }, to: '/order-management' },
    { label: t('sidebar.ratingsManagement'), icons: { default: RatingIcon, light: RatingIconLight, dark: RatingIconDark }, to: '/ratings-management' },
    { label: t('sidebar.paymentManagement'), icons: { default: PaymentIcon, light: PaymentIconLight, dark: PaymentIconDark }, to: '/payment-management' },
    { label: t('sidebar.providerPayout'), icons: { default: ProviderPayoutIcon, light: ProviderPayoutIconLight, dark: ProviderPayoutIconDark }, to: '/provider-payout' },
  ]), [t]);

  const categoryItems = useMemo(() => ([
    { label: t('sidebar.category'), icons: { default: CategoryIcon, light: CategoryIconLight, dark: CategoryIconDark }, to: '/category-management' },
    { label: t('sidebar.subCategoryManagement'), icons: { default: CategoryIcon, light: CategoryIconLight, dark: CategoryIconDark }, to: '/sub-category-management' },
    { label: t('sidebar.subToSubCategoryManagement'), icons: { default: CategoryIcon, light: CategoryIconLight, dark: CategoryIconDark }, to: '/sub-to-sub-category-management' },
  ]), [t]);

  const getIconSrc = (icons, isActive) => {
    if (!icons) return undefined;
    if (isActive) {
      if (mode === 'light' && icons.light) return icons.light;
      if (mode === 'dark' && icons.dark) return icons.dark;
    }
    return icons.default || icons.light || icons.dark;
  };

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  useEffect(() => {
    if (categoryItems.some((item) => item.to === location.pathname)) {
      setIsCategoryOpen(true);
    }
  }, [location.pathname, categoryItems]);

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
              `relative flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-background-sidebarhover hover:text-text-sidebarhover ${
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
                <span className="w-6 h-6 text-xl z-10">
                  <img src={getIconSrc(item.icons, isActive)} alt="" />
                </span>
                <span className={`text-base z-10 ${textAlign}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <button
            onClick={toggleCategory}
            className={`relative flex items-center justify-between gap-1 px-6 py-3 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-background-sidebarhover hover:text-text-sidebarhover w-full`}
          >
            <div className="flex items-center gap-4">
              <span className="w-6 h-6 text-xl z-10"><img src={getIconSrc({ default: CategoryIcon }, false)} alt="" /></span>
              <span className={`text-base z-10 ${textAlign}`}>{t('sidebar.categoryManagement')}</span>
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
                    `relative flex items-center gap-4 px-6 py-2 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-background-sidebarhover hover:text-text-sidebarhover ${
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
                      {/* <span className="w-6 h-6 text-lg z-10"><img src={getIconSrc(item.icons, isActive)} alt="" /></span> */}
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
              `relative flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-2000 text-[#496683] hover:bg-background-sidebarhover hover:text-text-sidebarhover ${
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
                <span className="w-6 h-6 text-xl z-10"><img src={getIconSrc(item.icons, isActive)} alt="" /></span>
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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { applyTheme } from '../../utils/theme';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaUsersCog, FaClipboardList, FaThList, FaStar, FaCreditCard, FaMoneyCheckAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';

// Sidebar navigation with active purple bar using NavLink from react-router-dom

const Sidebar = () => {
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign } = useLanguageStyles();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const navItems = [
    { label: t('sidebar.dashboard'), icon: <FaTachometerAlt />, to: '/dashboard' },
    { label: t('sidebar.userManagement'), icon: <FaUser />, to: '/user-management' },
    { label: t('sidebar.providerManagement'), icon: <FaUsersCog />, to: '/provider-management' },
    { label: t('sidebar.orderManagement'), icon: <FaClipboardList />, to: '/order-management' },
    { label: t('sidebar.ratingsManagement'), icon: <FaStar />, to: '/ratings-management' },
    { label: t('sidebar.paymentManagement'), icon: <FaCreditCard />, to: '/payment-management' },
    { label: t('sidebar.providerPayout'), icon: <FaMoneyCheckAlt />, to: '/provider-payout' },
  ];

  const categoryItems = [
    { label: t('sidebar.categoryManagement'), icon: <FaThList />, to: '/category-management' },
    { label: t('sidebar.subCategoryManagement'), icon: <FaThList />, to: '/sub-category-management' },
    { label: t('sidebar.subToSubCategoryManagement'), icon: <FaThList />, to: '/sub-to-sub-category-management' },
  ];

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <aside className="w-[270px] min-h-screen bg-background-card flex flex-col py-8 shadow-md">
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
                <span className="text-xl z-10">{item.icon}</span>
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
              <span className="text-xl z-10"><FaThList /></span>
              <span className={`text-base z-10 ${textAlign}`}>{t('sidebar.category')}</span>
            </div>
            <span className="text-sm z-10">
              {isCategoryOpen ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </button>
          
          {isCategoryOpen && (
            <div className="ml-6 border-l-2 border-gray-200">
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
                      <span className="text-lg z-10">{item.icon}</span>
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
                <span className="text-xl z-10">{item.icon}</span>
                <span className={`text-base z-10 ${textAlign}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 
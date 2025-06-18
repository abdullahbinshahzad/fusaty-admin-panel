import React , { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/ForgotPassword.svg";
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import { applyTheme } from '../../utils/theme';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    applyTheme(isLight ? 'light' : 'dark');
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const handleSendOTP = () => {
    navigate("/verify-otp");
  };

  return (
    <div className="h-screen bg-background-main flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col lg:flex-row w-full max-w-[1279px] h-[90vh] lg:h-[80vh] p-6 sm:p-8 lg:p-[40px] bg-background-card rounded-[30px] overflow-hidden shadow-xl relative">
        <div className="absolute top-10 right-10 flex space-x-4">
          <LanguageToggle />
          <ThemeToggle isLight={isLight} toggleTheme={toggleTheme} />
        </div>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-accent text-text-main flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-[15px] mb-6 lg:mb-0 lg:mr-4 relative">
          <div className="h-24 sm:h-32 md:h-36 lg:h-40 flex items-center justify-center">
            <img
              src={logo}
              alt="Fusaty Logo"
              className="h-full object-contain"
            />
          </div>
          <div className="absolute hidden lg:block bottom-68 left-14 w-[1px] h-[151px] bg-text-main rounded-full" />
          <div className="absolute hidden lg:block bottom-2 left-14 w-[70px] h-[1px] bg-text-main rounded-full" />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-[8.5rem] text-text-main flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-text-primary">
            {t("forgotPassword.title")}
          </h2>
          <p className="text-sm text-text-secondary mb-6 sm:mb-8">
            {t("forgotPassword.description")}
          </p>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="text-sm font-medium block mb-2 text-text-primary"
            >
              {t("forgotPassword.email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t("forgotPassword.email")}
              className="w-full -mt-1 p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-600 border border-border"
            />
          </div>

          <Button
            onClick={handleSendOTP}
            className="w-full bg-accent hover:bg-accent text-text-main font-bold py-3 rounded-xl text-lg transition duration-300"
          >
            {t("forgotPassword.sendOTP")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

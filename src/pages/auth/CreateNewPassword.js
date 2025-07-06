import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/CreateNewPassword.svg";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import { applyTheme } from "../../utils/theme";
import { useSelector } from 'react-redux';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';

const CreateNewPassword = () => {
  const { t } = useTranslation();
  const [eye, seteye] = useState(true);
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign, textDirection, isRTL } = useLanguageStyles();

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const onEyeClick = () => {
    seteye(!eye);
  };

  return (
    <div className="h-screen bg-background-main flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col lg:flex-row w-full max-w-[1279px] h-[90vh] lg:h-[80vh] p-6 sm:p-8 lg:p-[40px] bg-background-card rounded-[30px] overflow-hidden shadow-xl relative">
        <div className="absolute top-10 right-10 flex space-x-4">
          <LanguageToggle />
          <ThemeToggle />
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
        <div className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-[8.5rem] text-text-main flex flex-col justify-center ${textDirection}`}>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 text-text-primary ${textAlign}`}>
            {t("createNewPassword.title")}
          </h2>
          <p className={`text-sm text-text-secondary mb-6 sm:mb-8 ${textAlign}`}>
            {t("createNewPassword.description")}
          </p>

          <div className="mb-2 relative">
            <label
              htmlFor="newPassword"
              className={`text-sm font-medium block mb-2 text-text-primary ${textAlign}`}
            >
              {t("createNewPassword.newPassword")}
            </label>
            <Input
              id="newPassword"
              type={eye ? "password" : "text"}
              placeholder={t("createNewPassword.enterNewPassword")}
              className={`w-full -mt-1 p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-600 border border-border-field ${textAlign}`}
            />
            <span
              onClick={onEyeClick}
              className={`absolute top-1/2 -translate-y-1/2 text-text-secondary cursor-pointer ${isRTL ? 'left-3' : 'right-3'}`}
            >
              {eye ? (
                <EyeInvisibleOutlined className="text-text-secondary text-xl" />
              ) : (
                <EyeOutlined className="text-text-secondary text-xl" />
              )}
            </span>
          </div>

          <div className="mb-2 relative">
            <label
              htmlFor="confirmNewPassword"
              className={`text-sm font-medium block mb-2 text-text-primary ${textAlign}`}
            >
              {t("createNewPassword.confirmPassword")}
            </label>
            <Input
              id="confirmNewPassword"
              type={eye ? "password" : "text"}
              placeholder={t("createNewPassword.confirmNewPassword")}
              className={`w-full -mt-1 p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-600 border border-border-field ${textAlign}`}
            />
            <span
              onClick={onEyeClick}
              className={`absolute top-1/2 -translate-y-1/2 text-text-secondary cursor-pointer ${isRTL ? 'left-3' : 'right-3'}`}
            >
              {eye ? (
                <EyeInvisibleOutlined className="text-text-secondary text-xl" />
              ) : (
                <EyeOutlined className="text-text-secondary text-xl" />
              )}
            </span>
          </div>

          <Button className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300">
            {t("createNewPassword.reset")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;

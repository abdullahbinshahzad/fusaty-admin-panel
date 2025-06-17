import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import logo from '../../assets/images/CreateNewPassword.svg'
import { EyeInvisibleOutlined } from '@ant-design/icons';

const CreateNewPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="h-screen bg-[#1E233A] flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col lg:flex-row w-full max-w-[1279px] h-[90vh] lg:h-[80vh] p-6 sm:p-8 lg:p-[40px] bg-[#262D4A] rounded-[30px] overflow-hidden shadow-xl relative">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-[#8345E9] text-white flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-[15px] mb-6 lg:mb-0 lg:mr-4 relative">
          <div className="h-24 sm:h-32 md:h-36 lg:h-40 flex items-center justify-center">
            <img
              src={logo}
              alt="Fusaty Logo"
              className="h-full object-contain"
            />
          </div>
          <div className="absolute hidden lg:block bottom-68 left-14 w-[1px] h-[151px] bg-white rounded-full" />
          <div className="absolute hidden lg:block bottom-2 left-14 w-[70px] h-[1px] bg-white rounded-full" />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-[8.5rem] text-white flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Create New Password
          </h2>
          <p className="text-sm text-gray-400 mb-6 sm:mb-8">
            Set a new password for your account
          </p>

          <div className="mb-2 relative">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              {t("New Password")}
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter New Password"
              className="w-full -mt-1 p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <EyeInvisibleOutlined className="text-gray-400 text-xl" />
            </span>
          </div>

          <div className="mb-2 relative">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              {t("Confirm New Password")}
            </label>
            <Input
              id="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              className="w-full -mt-1 p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <EyeInvisibleOutlined className="text-gray-400 text-xl" />
            </span>
          </div>

          <Button className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300">
            {t("Reset Password")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
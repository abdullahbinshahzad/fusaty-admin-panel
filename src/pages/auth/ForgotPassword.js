import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/ForgotPassword.svg";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSendOTP = () => {
    navigate('/verify-otp');
  };

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
            Forgot Password
          </h2>
          <p className="text-sm text-gray-400 mb-6 sm:mb-8">
            Enter your registered email address and phone number. We'll send you
            a code to reset your password.
          </p>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              {t("login.email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full -mt-1 p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <Button 
            onClick={handleSendOTP}
            className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300"
          >
            {t("Send OTP")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

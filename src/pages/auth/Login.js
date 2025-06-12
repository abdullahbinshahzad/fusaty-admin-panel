import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/Frame 1171276256.svg";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#1E233A] flex items-center justify-center px-[80px] py-[100px]">
      <div className="flex w-[1279px] h-[824px] p-[40px] bg-[#262D4A] rounded-[30px] overflow-hidden shadow-xl relative">
        {/* Left Side */}
        <div className="w-1/2 bg-[#8345E9] text-white flex flex-col items-center justify-center p-10 rounded-[15px] relative">
          <h1 className="text-3xl font-bold mb-6">Welcome to</h1>
          <div className="h-40 flex items-center justify-center">
            <img
              src={logo}
              alt="Fusaty Logo"
              className="h-full object-contain"
            />
          </div>
          <div className="absolute bottom-68 left-14 w-[1px] h-[151px] bg-white rounded-full" />
          <div className="absolute bottom-2 left-14 w-[70px] h-[1px] bg-white rounded-full" />
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-sm text-gray-400 mb-8">How do I get started lorem ipsum dolor at?</p>

          <div className="mb-5">
            <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
              {t("login.email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-2 relative">
            <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
              {t("login.password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
          </div>

          <a href="/forgot-password" className="text-sm text-purple-400 text-right mb-6 block">
            {t("login.forgot")}
          </a>

          <Button className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300">
            {t("login.signIn")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/Frame 1171276256.svg";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2D324A] p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg">
        <div className="w-1/2 bg-[#6E30EE] p-8 flex flex-col items-center justify-center relative">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
            <div className="flex items-center justify-center h-40">
              <img
                src={logo}
                alt="Fusaty Logo"
                className="h-full object-contain"
              />
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white"></div>
          </div>
        </div>
        <div className="w-1/2 p-12 bg-[#262A3B] text-white flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">{t("login.title")}</h2>
          <p className="text-base mb-8 text-gray-400">
            {t("login.description")}
          </p>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              {t("login.email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded-lg bg-[#2E334D] border border-[#3E435E] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              {t("login.password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-[#2E334D] border border-[#3E435E] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
            />
            <span className="absolute right-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </span>
          </div>
          <a
            href="/forgot-password"
            className="text-purple-400 text-sm mb-8 block text-right"
          >
            {t("login.forgot")}
          </a>
          <Button className="w-full bg-[#6E30EE] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 ease-in-out">
            {t("login.signIn")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

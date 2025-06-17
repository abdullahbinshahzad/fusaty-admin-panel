import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/Login.svg";
import { Form, message, Spin  } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, LoadingOutlined } from '@ant-design/icons';
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [eye, seteye] = useState(true);
  const [loader, setLoader] = useState(false)
  const [isEnglish, setIsEnglish] = useState(true);
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [isLight]);

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setIsEnglish(!isEnglish);
  };

  const toggleTheme = () => {
    setIsLight(!isLight);
    // Implement theme change logic here (e.g., add/remove classes to body or root element)
  };

  const onEyeClick = () => {
    seteye(!eye)
  }

  const onFinish = () => {
    setLoader(true)
    console("onFinish function called")
    const timer = setTimeout(() => {
      setLoader(false);
    }, 5000); // 5000ms = 5 seconds

    // Clean up in case the component unmounts before timeout
    return () => clearTimeout(timer);
  }

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
        color: '#fff'
      }}
      spin
    />
  );

  return (
    <div className="h-screen bg-[#1E233A] flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col lg:flex-row w-full max-w-[1279px] h-[90vh] lg:h-[80vh] p-6 sm:p-8 lg:p-[40px] bg-[#262D4A] rounded-[30px] overflow-hidden shadow-xl relative">
        <div className="absolute top-6 right-6 flex space-x-4">
          <LanguageToggle isEnglish={isEnglish} toggleLanguage={toggleLanguage} />
          <ThemeToggle isLight={isLight} toggleTheme={toggleTheme} />
        </div>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-[#8345E9] text-white flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-[15px] mb-6 lg:mb-0 lg:mr-4 relative">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Welcome to
          </h1>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Login</h2>
          <p className="text-sm text-gray-400 mb-6 sm:mb-8">
            How do I get started lorem ipsum dolor at?
          </p>

          <Form
            name="login-form"
            onFinish={onFinish}
            onFinishFailed={() => message.error("Please Fill Required Fields!")}
          >
            <div className="form-group -mt-4">
              <label
                htmlFor="email"
                className="text-sm font-medium block mb-2 text-gray-300"
              >
                {t("login.email")}
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
                className="custom-border -mt-1"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </Form.Item>
            </div>

            <div className="form-group -mt-6 relative">
              <label
                htmlFor="password"
                className="text-sm font-medium block mb-2 text-gray-300"
              >
                {t("login.password")}
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter your password",
                  },
                ]}
                className="custom-border -mt-1"
              >
                <div className="relative">
                  <Input
                    id="password"
                    type={eye ? "password" : "text"}
                    placeholder="Enter Password"
                    className="w-full p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
                  />
                  <span
                    onClick={onEyeClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    // className="absolute right-3 top-[45px] text-gray-400 cursor-pointer"
                  >
                    {eye ? (
                      <EyeInvisibleOutlined className="text-gray-400 text-xl"/>
                    ) : (
                      <EyeOutlined className="text-gray-400 text-xl"/>
                    )}
                  </span>
                </div>
              </Form.Item>
            </div>

            <a
              href="/forgot-password"
              className="text-sm text-purple-400 text-right -mt-9 mb-6 block"
            >
              {t("login.forgot")}
            </a>

            <div className="form-group text-center">
              <Button
                htmlType="submit"
                className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300"
                disabled={loader}
              >
                {loader ? (
                  <Spin size="small" indicator={antIcon} />
                ) : (
                  t("login.signIn")
                )}
              </Button>
            </div>
          </Form>
        </div>

        {/* <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-[8.5rem] text-white flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Login</h2>
          <p className="text-sm text-gray-400 mb-6 sm:mb-8">
            How do I get started lorem ipsum dolor at?
          </p>

          <div>
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
              className="w-full p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              {t("login.password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-[#1E233A] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
            />
            <span className="absolute right-3 top-[45px] text-gray-400 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>

          <a
            href="/forgot-password"
            className="text-sm text-purple-400 text-right -mt-4 mb-6 block"
          >
            {t("login.forgot")}
          </a>

          <Button className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300">
            {t("login.signIn")}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;

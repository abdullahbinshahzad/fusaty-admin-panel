import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/White Logo.svg";
import { Form, message, Spin } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import { applyTheme } from '../../utils/theme';
import { useSelector } from 'react-redux';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [eye, seteye] = useState(true);
  const { loading, login } = useApi();
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign, oppositeTextAlign, textDirection, isRTL } = useLanguageStyles();

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const onEyeClick = () => {
    seteye(!eye);
  };

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);
      message.success(t("login.success"));
      navigate("/provider-management");
    } catch (error) {
      message.error(error.message || t("login.error"));
    }
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
        color: "#fff",
      }}
      spin
    />
  );



  return (
    <div className="h-screen bg-background-main flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col lg:flex-row w-full max-w-[1279px] h-[90vh] lg:h-[80vh] p-6 sm:p-8 lg:p-[40px] bg-background-card rounded-[30px] overflow-hidden shadow-xl relative">
        <div className="absolute top-10 right-10 flex space-x-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-accent text-text-main flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-[15px] mb-6 lg:mb-0 lg:mr-4 relative">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-text-main ${textAlign}`}>
            {t("login.welcome")}
          </h1>
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
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 text-text-primary ${textAlign}`}>{t("login.title")}</h2>
          <p className={`text-sm text-text-secondary mb-6 sm:mb-8 ${textAlign}`}>
            {t("login.description")}
          </p>

          <Form
            name="login-form"
            onFinish={onFinish}
            onFinishFailed={() => message.error(t("login.pleaseFillFields"))}
          >
            <div className="form-group -mt-4">
              <label
                htmlFor="email"
                className={`text-sm font-medium block mb-2 text-text-primary ${textAlign}`}
              >
                {t("login.email")}
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: t("login.enterEmail"),
                  },
                  {
                    type: "email",
                    message: t("login.enterValidEmail"),
                  },
                ]}
                className="custom-border -mt-1"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.email")}
                  className={`w-full p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-accent border border-border-field ${textAlign}`}
                />
              </Form.Item>
            </div>

            <div className="form-group -mt-6 relative">
              <label
                htmlFor="password"
                className={`text-sm font-medium block mb-2 text-text-primary ${textAlign}`}
              >
                {t("login.password")}
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: t("login.enterPassword"),
                  },
                ]}
                className="custom-border -mt-1"
              >
                <div className="relative">
                  <Input
                    id="password"
                    type={eye ? "password" : "text"}
                    placeholder={t("login.password")}
                    className={`w-full p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-accent border border-border-field ${textAlign}`}
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
              </Form.Item>
            </div>

            <a
              href="/forgot-password"
              className={`text-sm text-accent -mt-9 mb-6 block ${oppositeTextAlign}`}
            >
              {t("login.forgot")}
            </a>

            <div className="form-group text-center">
              <Button
                htmlType="submit"
                className="w-full bg-accent hover:bg-accent text-text-main font-bold py-3 rounded-xl text-lg transition duration-300"
                disabled={loading}
              >
                {loading ? (
                  <Spin size="small" indicator={antIcon} />
                ) : (
                  t("login.signIn")
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

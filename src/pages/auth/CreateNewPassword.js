import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/CreateNewPassword.svg";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import { applyTheme } from "../../utils/theme";
import { useSelector } from 'react-redux';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';
import { apiService } from '../../services/api';

const CreateNewPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [eye, seteye] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign, textDirection, isRTL } = useLanguageStyles();

  // Get email and OTP from navigation state
  // const email = location.state?.email;
  const otp = location.state?.otp;

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // useEffect(() => {
  //   // Redirect if no email or OTP is provided
  //   if (!email || !otp) {
  //     navigate("/forgot-password");
  //     return;
  //   }
  // }, [email, otp, navigate]);

  const onEyeClick = () => {
    seteye(!eye);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters with at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e, type) => {
    const value = e.target.value;
    
    if (type === 'new') {
      setNewPassword(value);
      setPasswordError("");
    } else {
      setConfirmPassword(value);
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate new password
    if (!newPassword.trim()) {
      setPasswordError(t("createNewPassword.passwordRequired") || "New password is required");
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(t("createNewPassword.passwordInvalid") || "Password must be at least 8 characters with uppercase, lowercase, and number");
      return;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(t("createNewPassword.confirmPasswordRequired") || "Please confirm your password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(t("createNewPassword.passwordsMismatch") || "Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiService.resetPassword(newPassword, otp);
      console.log('Password reset successfully:', data);
      
      // Navigate to login page after successful password reset
      navigate("/login", { 
        state: { 
          message: t("createNewPassword.resetSuccess") || "Password reset successfully! Please login with your new password." 
        } 
      });
      
    } catch (error) {
      console.error('Error resetting password:', error);
      setPasswordError(error.message || t("createNewPassword.resetError") || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background-main flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-[80px]">
      <div className="flex flex-col lg:flex-row w-full max-w-[1279px] h-[90vh] lg:h-[80vh] p-6 sm:p-8 lg:p-[40px] bg-background-card rounded-[30px] overflow-hidden shadow-xl relative overflow-y-auto lg:overflow-visible">
        <div className="absolute top-10 right-10 hidden lg:flex space-x-4">
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
        <div className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-[6.5rem] text-text-main flex flex-col justify-center ${textDirection}`}>
          {/* Toggle buttons for small screens */}
          <div className="flex justify-end space-x-4 lg:hidden">
            <LanguageToggle />
            <ThemeToggle />
          </div>
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
              value={newPassword}
              onChange={(e) => handlePasswordChange(e, 'new')}
              className={`w-full -mt-1 p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-600 border border-border-field ${textAlign} ${passwordError ? 'border-red-500' : ''}`}
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
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
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
              value={confirmPassword}
              onChange={(e) => handlePasswordChange(e, 'confirm')}
              className={`w-full -mt-1 p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-600 border border-border-field ${textAlign} ${confirmPasswordError ? 'border-red-500' : ''}`}
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
            {confirmPasswordError && (
              <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>
            )}
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full font-bold py-3 rounded-xl text-lg transition duration-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#8345E9] hover:bg-[#6E30EE] text-white'
            }`}
          >
            {isLoading ? (t("createNewPassword.resetting") || "Resetting...") : (t("createNewPassword.reset") || "Reset Password")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;

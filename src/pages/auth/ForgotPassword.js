import React , { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import logo from "../../assets/images/ForgotPassword.svg";
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import { applyTheme } from '../../utils/theme';
import { useSelector } from 'react-redux';
import { useLanguageStyles } from '../../hooks/useLanguageStyles';
import { apiService } from '../../services/api';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign, textDirection } = useLanguageStyles();
  
  // State for email input and validation
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendOTP();
    }
  };

  // Handle send OTP with validation and API call
  const handleSendOTP = async () => {
    // Validate email format
    if (!email.trim()) {
      setEmailError(t("forgotPassword.emailRequired") || "Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t("forgotPassword.invalidEmail") || "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setEmailError('');

    try {
      const data = await apiService.forgotPassword(email.trim());
      console.log('OTP sent successfully:', data);
      
      // Navigate to OTP verification page
      navigate("/verify-otp", { state: { email: email.trim() } });
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      setEmailError(error.message || t("forgotPassword.sendOTPError") || "Failed to send OTP. Please try again.");
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
            {t("forgotPassword.title")}
          </h2>
          <p className={`text-sm text-text-secondary mb-6 sm:mb-8 ${textAlign}`}>
            {t("forgotPassword.description")}
          </p>

          <div className="mb-5">
            <label
              htmlFor="email"
              className={`text-sm font-medium block mb-2 text-text-primary ${textAlign}`}
            >
              {t("forgotPassword.email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t("forgotPassword.email")}
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              className={`w-full -mt-1 p-3 rounded-lg bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-purple-600 border border-border-field ${textAlign} ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
          </div>

          <Button
            onClick={handleSendOTP}
            className={`w-full font-bold py-3 rounded-xl text-lg transition duration-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-accent hover:bg-accent text-text-main'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (t("forgotPassword.sendingOTP") || "Sending OTP...") : (t("forgotPassword.sendOTP") || "Send OTP")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

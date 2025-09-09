import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import logo from "../../assets/images/verifyOTP.svg";
import LanguageToggle from "../../components/common/LanguageToggle";
import ThemeToggle from "../../components/common/ThemeToggle";
import { applyTheme } from "../../utils/theme";
import { useSelector } from "react-redux";
import { useLanguageStyles } from "../../hooks/useLanguageStyles";
import { apiService } from "../../services/api";

const VerifyOTP = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(600); // 60 seconds
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);
  const mode = useSelector((state) => state.theme.mode);
  const { textAlign, oppositeTextAlign, textDirection } = useLanguageStyles();

  // Get email from navigation state or use fallback
  const email = location.state?.email || "user@example.com";

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  useEffect(() => {
    // Redirect if no email is provided
    if (!location.state?.email) {
      navigate("/forgot-password");
      return;
    }
  }, [location.state?.email, navigate]);

  useEffect(() => {
    // Start timer when component mounts
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user types
    if (otpError) {
      setOtpError("");
    }

    // Auto focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Check if all OTP fields are filled with numbers
  const isOtpComplete = () => {
    return otp.every((digit) => /^\d$/.test(digit));
  };

  const handleVerify = async () => {
    // Validate OTP completion
    if (!isOtpComplete()) {
      setOtpError(
        t("verifyOTP.incompleteOTP") ||
          "Please fill all OTP fields with numbers"
      );
      return;
    }

    setIsLoading(true);
    setOtpError("");

    try {
      const otpString = otp.join("");
      const data = await apiService.verifyOTP(email, otpString);
      console.log("OTP verified successfully:", data);

      // Navigate to create new password with email and OTP
      navigate("/create-new-password", {
        state: {
          email: email,
          otp: otpString,
        },
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError(
        error.message ||
          t("verifyOTP.verificationError") ||
          "Failed to verify OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await apiService.resendOTP(email);
      // Reset timer and OTP fields
      setTimeLeft(600);
      setOtp(["", "", "", "", ""]);
      setOtpError("");
      // Focus first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setOtpError(error.message || "Failed to resend OTP. Please try again.");
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
        <div
          className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-[6.5rem] text-text-main flex flex-col justify-center ${textDirection}`}
        >
          {/* Toggle buttons for small screens */}
          <div className="flex justify-end space-x-4 lg:hidden">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-2 text-text-primary ${textAlign}`}
          >
            {t("verifyOTP.title")}
          </h2>
          <p
            className={`text-sm text-text-secondary mb-6 sm:mb-8 ${textAlign}`}
          >
            {t("verifyOTP.description")}
          </p>

          <div className="mb-5">
            <input
              type="email"
              value={email}
              readOnly
              className={`w-full p-3 rounded-lg bg-input-readonlybg text-text-main focus:outline-none ${textAlign}`}
            />
          </div>

          <label
            className={`text-sm font-medium block mb-2 text-text-primary ${textAlign}`}
          >
            {t("verifyOTP.otp")}
          </label>
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-3">
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    maxLength="1"
                    value={otp[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    placeholder="-"
                    className="w-14 h-14 pb-2 text-center rounded-lg bg-background-main text-text-primary border-2 border-border-field focus:outline-none focus:ring-2 focus:ring-accent text-xl font-semibold placeholder:text-center placeholder:text-border"
                  />
                </React.Fragment>
              ))}
            </div>
            <div
              className={`text-sm w-full px-2 py-1 text-text-primary ${oppositeTextAlign}`}
            >
              {formatTime(timeLeft)}
            </div>
            {otpError && (
              <p className="text-sm text-red-500 mt-2 text-center w-full">
                {otpError}
              </p>
            )}
          </div>

          <Button
            onClick={handleVerify}
            disabled={isLoading || !isOtpComplete()}
            className={`w-full font-bold py-3 rounded-xl text-lg transition duration-300 ${
              isLoading || !isOtpComplete()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-accent hover:bg-accent text-text-main"
            }`}
          >
            {isLoading
              ? t("verifyOTP.verifying") || "Verifying..."
              : t("verifyOTP.verify") || "Verify"}
          </Button>

          <p className={`text-sm text-text-primary mt-4 ${textAlign}`}>
            {t("verifyOTP.didntReceive")}{" "}
            <span
              onClick={handleResendOTP}
              className={`text-[#8345E94D] font-semibold cursor-pointer hover:text-[#8345E9] transition-colors ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {t("verifyOTP.resend")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

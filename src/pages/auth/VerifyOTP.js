import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import logo from "../../assets/images/verifyOTP.svg";

const VerifyOTP = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const inputRefs = useRef([]);

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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    navigate('/create-new-password');
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Verify OTP</h2>
          <p className="text-sm text-gray-400 mb-6 sm:mb-8">
            We've sent you a One-Time Password (OTP) to your email
          </p>

          <div className="mb-5">
            <input
              type="email"
              value="123@gmail.com"
              readOnly
              className="w-full p-3 rounded-lg bg-purple-500/50 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>

          <label className="text-sm font-medium block mb-2 text-gray-300">
            {t("Enter OTP")}
          </label>
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <input
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    maxLength="1"
                    value={otp[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    placeholder="-"
                    className="w-14 h-14 pb-2 text-center rounded-lg bg-[#1E233A] text-white border-2 border-[#FFFFFF33] focus:outline-none focus:ring-2 focus:ring-purple-600 text-xl font-semibold placeholder:text-center placeholder:text-[#FFFFFF33]"
                  />
                </React.Fragment>
              ))}
            </div>
            <div className="text-sm w-full px-2 py-1 text-end text-gray-400">{formatTime(timeLeft)}</div>
          </div>

          <Button 
            onClick={handleVerify}
            className="w-full bg-[#8345E9] hover:bg-[#6E30EE] text-white font-bold py-3 rounded-xl text-lg transition duration-300"
          >
            Verify
          </Button>

          <p className="text-sm text-white mt-4">
            Didn't Receive the OTP?{" "}
            <span className="text-[#8345E94D] font-semibold cursor-pointer">
              RESEND IT
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

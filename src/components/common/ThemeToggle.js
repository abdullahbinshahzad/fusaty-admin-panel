import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "../../store/slices/themeSlice";
import DarkModeIcon from "../../assets/images/Dark Mode.svg";
import LightModeIcon from "../../assets/images/Light Mode.svg";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isLight = mode === "light";

  const handleToggle = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative w-[48px] h-[24px] flex items-center rounded-full p-[2px] cursor-pointer transition-all duration-300 border-x-[2.25px] border ${
        isLight
          ? "bg-[#A7E9FF] border-[#00A8FF] shadow-[-2.13px_1.42px_2.84px_1.07px_#00000059_inset]"
          : "bg-[#038496] border-[#004975] shadow-[2.13px_1.42px_2.84px_1.07px_#00000059_inset]"
      }`}
    >
      <img
        src={isLight ? LightModeIcon : DarkModeIcon}
        alt={isLight ? "Light Mode" : "Dark Mode"}
        className={`absolute w-[20px] h-[20px] transition-opacity duration-300 ${
          isLight ? "right-[2px] opacity-100" : "left-[2px] opacity-100"
        }`}
      />
      <div
        className={`absolute w-[19.5px] h-[19.5px] bg-white rounded-full shadow-ml transform transition-transform duration-300 ${
          isLight ? "translate-x-[-1px]" : "translate-x-[20.5px]"
        }`}
      ></div>
    </div>
  );
};

export default ThemeToggle;

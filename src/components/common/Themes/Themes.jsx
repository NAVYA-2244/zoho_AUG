import React, { useState } from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { LuSunMoon, LuMoonStar } from "react-icons/lu";

const Themes = () => {
  const { setApplicationColor } = useThemeContext();
  const [isDay, setIsDay] = useState(false);

  const colorsList = {
    day: {
      iconColor: "#b3b4b3",
      tabColor: "#6c63fc",
      tabBg: "#201e23",
      readColor1: "#ffffff",
      readColor2: "#b3b4b3",
      borderColor: "#eff0f6",
      cardBg1: "#100b16",
      cardBg2: "#242424",
      mainInputBg: "#100b16",
      mainBg: "#32363f",
      cardItem: "#100b16",
      inputBg: "#222222",
      tableHeadBg: "#242424",
      buttonColor: "#6c63fc",
    },
    night: {
      iconColor: "#6c63fc",
      tabColor: "#ffffff",
      tabBg: "#6c63fc",
      readColor1: "#32363f",
      readColor2: "#4f4f4f",
      borderColor: "#eff0f6",
      cardBg1: "#ffffff",
      cardBg2: "#e0e2e4",
      mainInputBg: "#ffffff",
      mainBg: "#f6f7fa",
      cardItem: "#ffffff",
      inputBg: "#e8e8e8",
      tableHeadBg: "#e8e8e8",
      buttonColor: "#6c63fc",
    },
  };

  const toggleDayNight = () => {
    setIsDay(!isDay);
    setApplicationColor(isDay ? colorsList.night : colorsList.day);
  };

  return (
    <div className="theme-changer-icon" onClick={toggleDayNight}>
      {isDay ? <LuSunMoon /> : <LuMoonStar />}
    </div>
  );
};

export default Themes;

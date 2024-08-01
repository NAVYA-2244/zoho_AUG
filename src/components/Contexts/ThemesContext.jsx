import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();
export const ThemeContextProvider = ({ children }) => {
  const [applicationColor, setApplicationColor] = useState({
    iconColor: "#6c63fc",
    tabColor: "#ffffff",
    tabBg: "#6c63fc",
    readColor1: "#32363f",
    readColor2: "#4f4f4f",
    cardBg1: "#fff",
    cardBg2: "#e0e2e4",
    cardBg3: "#373a3c",
    mainInputBg: "#ffffff",
    mainBg: "#f6f7fa",
    cardItem: "#ffffff",
    inputBg: "#e8e8e8",
    borderLine: "#b4b3b359",
    tableHeadBg: "#e8e8e8",
    buttonColor: "#6c63fc",
  });

  return (
    <ThemeContext.Provider
      value={{
        applicationColor,
        setApplicationColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

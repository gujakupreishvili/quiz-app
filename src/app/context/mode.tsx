"use client";

import { createContext, useContext, useState, ReactNode } from "react";
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkmode: () => void;
}

const DarkModeContextProvider = createContext<DarkModeContextType | null>(null);

// Custom hook to use the DarkMode context
export const useDarkmode = () => {
  const context = useContext(DarkModeContextProvider);
  if (!context) {
    throw new Error("useDarkmode must be used within a DarkModeContextProvider");
  }
  return context;
};

// Provider component to wrap around children components
export const DarkModeContext = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkmode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContextProvider.Provider value={{ darkMode, toggleDarkmode }}>
      {children}
    </DarkModeContextProvider.Provider>
  );
};

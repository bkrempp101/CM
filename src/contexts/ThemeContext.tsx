import React, { createContext, useContext, useState } from 'react';

interface Theme {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  dangerColor: string;
  cardBg: string;
  borderColor: string;
  navBg: string;
}

const lightTheme: Theme = {
  backgroundColor: '#f0f2f5',
  textColor: '#333',
  primaryColor: '#1877f2',
  secondaryColor: '#42b72a',
  dangerColor: '#ff0000',
  cardBg: '#ffffff',
  borderColor: '#dddfe2',
  navBg: '#ffffff',
};

const darkTheme: Theme = {
  backgroundColor: '#18191a',
  textColor: '#e4e6eb',
  primaryColor: '#2d88ff',
  secondaryColor: '#42b72a',
  dangerColor: '#ff0000',
  cardBg: '#242526',
  borderColor: '#3e4042',
  navBg: '#242526',
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

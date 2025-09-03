import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

type ThemeMode = 'light' | 'dark';
type ColorTheme = 'blue' | 'teal';

interface ThemeContextType {
  themeMode: ThemeMode;
  colorTheme: ColorTheme;
  toggleThemeMode: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue');
  const { user } = useAuth();
  
  const applyTheme = useCallback(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light', 'theme-blue', 'theme-teal');
    root.classList.add(themeMode);
    root.classList.add(`theme-${colorTheme}`);
  }, [themeMode, colorTheme]);

  useEffect(() => {
      if (user?.preferences?.theme) {
          setThemeMode(user.preferences.theme.mode);
          setColorTheme(user.preferences.theme.color);
      }
  }, [user]);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  const toggleThemeMode = () => {
    setThemeMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, colorTheme, toggleThemeMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
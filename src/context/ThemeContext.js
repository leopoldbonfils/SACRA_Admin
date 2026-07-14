import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const THEME_KEY = 'sacra_admin_theme';

/**
 * ThemeProvider – persists light/dark mode in localStorage.
 * Applies `data-theme` attribute to <html> so CSS variables switch.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  const setLight    = () => setTheme('light');
  const setDark     = () => setTheme('dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setLight, setDark, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

// src/context/ThemeContext.jsx
/*
    Fast refresh in some ESLint setups reports errors when a module
    exports non-component helpers along with components (react-refresh/only-export-components).
    This file intentionally exports a Context, a Provider component and a hook.
    Disable that rule for this file to keep a single location for theme logic.
*/
/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // FIX: Default to 'dark' or read from system preference if nothing in storage
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'dark' 
    );

    useEffect(() => {
        // This is the crucial line: it applies the attribute that the CSS targets
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
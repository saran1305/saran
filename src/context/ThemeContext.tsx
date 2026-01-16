'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // User requested to always start in dark mode on refresh
        // Removed localStorage check to enforce default 'dark' state
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        // Clear saved theme to avoid confusion or keep it? 
        // Logic: just don't read it.
    }, []);

    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Always provide context, but render loading state visually if not mounted
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {!mounted ? (
                <div style={{ visibility: 'hidden' }}>
                    {children}
                </div>
            ) : (
                children
            )}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

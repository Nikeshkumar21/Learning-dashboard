import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    if (location.pathname === '/') return null;


    return (
        <nav className={`navbar ${theme}`}>
          
            <button onClick={toggleTheme}>
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
        </nav>
    );
};

export default Navbar;



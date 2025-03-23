import { Link } from "react-router-dom";
import { memo, useEffect, useState } from "react";

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if the user prefers dark mode or if the site is in dark mode
    const isDark = document.documentElement.classList.contains('dark') || 
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return <Link to="/" className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
      <div className="w-10 h-10 relative">
        <img 
          alt="Maziya Logo" 
          className="w-full h-full object-contain" 
          src={isDarkMode ? "/assets/images/white-logo.png" : "/assets/images/logo.png"}
          width="40"
          height="40"
          loading="eager"
        />
      </div>
      <span className="font-rajdhani font-bold text-2xl tracking-wide">Maziya</span>
    </Link>;
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Logo);

import { useState, useEffect } from 'react';
import { getCurrentBreakpoint, type Breakpoint } from '../utils/responsive';

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      setBreakpoint(getCurrentBreakpoint());
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const isLaptop = breakpoint === 'laptop';
  const isDesktop = breakpoint === 'desktop';
  const isXlDesktop = breakpoint === 'xlDesktop';
  
  const isMobileDown = windowSize.width < 768;
  const isTabletUp = windowSize.width >= 768;
  const isLaptopUp = windowSize.width >= 1024;
  const isDesktopUp = windowSize.width >= 1440;

  return {
    breakpoint,
    windowSize,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isXlDesktop,
    isMobileDown,
    isTabletUp,
    isLaptopUp,
    isDesktopUp,
  };
};

// Responsive breakpoints and utilities for MIUI Library

export const breakpoints = {
  mobile: 320,      // Mobile phones
  tablet: 768,      // Tablets
  laptop: 1024,     // Laptops
  desktop: 1440,    // Desktop
  xlDesktop: 1920   // Extra large desktop
} as const;

export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.laptop - 1}px)`,
  laptop: `(min-width: ${breakpoints.laptop}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.xlDesktop - 1}px)`,
  xlDesktop: `(min-width: ${breakpoints.xlDesktop}px)`,
  
  // Helper queries
  mobileUp: `(min-width: ${breakpoints.mobile}px)`,
  tabletUp: `(min-width: ${breakpoints.tablet}px)`,
  laptopUp: `(min-width: ${breakpoints.laptop}px)`,
  desktopUp: `(min-width: ${breakpoints.desktop}px)`,
  
  mobileDown: `(max-width: ${breakpoints.tablet - 1}px)`,
  tabletDown: `(max-width: ${breakpoints.laptop - 1}px)`,
  laptopDown: `(max-width: ${breakpoints.desktop - 1}px)`,
  desktopDown: `(max-width: ${breakpoints.xlDesktop - 1}px)`
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof mediaQueries;

// Responsive container widths
export const containerWidths = {
  mobile: '100%',
  tablet: '720px', 
  laptop: '960px',
  desktop: '1200px',
  xlDesktop: '1400px'
} as const;

// Grid system
export const gridColumns = 12;
export const gridGutter = {
  mobile: '16px',
  tablet: '20px', 
  laptop: '24px',
  desktop: '28px',
  xlDesktop: '32px'
} as const;

// Responsive spacing scale
export const spacing = {
  xs: { mobile: '4px', tablet: '6px', laptop: '8px', desktop: '10px', xlDesktop: '12px' },
  sm: { mobile: '8px', tablet: '12px', laptop: '16px', desktop: '20px', xlDesktop: '24px' },
  md: { mobile: '16px', tablet: '20px', laptop: '24px', desktop: '28px', xlDesktop: '32px' },
  lg: { mobile: '24px', tablet: '32px', laptop: '40px', desktop: '48px', xlDesktop: '56px' },
  xl: { mobile: '32px', tablet: '48px', laptop: '64px', desktop: '80px', xlDesktop: '96px' },
  xxl: { mobile: '48px', tablet: '64px', laptop: '80px', desktop: '96px', xlDesktop: '112px' }
} as const;

// Font sizes for responsive typography
export const fontSizes = {
  xs: { mobile: '12px', tablet: '12px', laptop: '13px', desktop: '14px', xlDesktop: '14px' },
  sm: { mobile: '14px', tablet: '14px', laptop: '15px', desktop: '16px', xlDesktop: '16px' },
  md: { mobile: '16px', tablet: '16px', laptop: '17px', desktop: '18px', xlDesktop: '18px' },
  lg: { mobile: '18px', tablet: '20px', laptop: '22px', desktop: '24px', xlDesktop: '24px' },
  xl: { mobile: '20px', tablet: '24px', laptop: '28px', desktop: '32px', xlDesktop: '32px' },
  xxl: { mobile: '24px', tablet: '32px', laptop: '36px', desktop: '40px', xlDesktop: '44px' },
  xxxl: { mobile: '32px', tablet: '40px', laptop: '48px', desktop: '56px', xlDesktop: '64px' }
} as const;

// Utility function to get current breakpoint
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < breakpoints.tablet) return 'mobile';
  if (width < breakpoints.laptop) return 'tablet';
  if (width < breakpoints.desktop) return 'laptop';
  if (width < breakpoints.xlDesktop) return 'desktop';
  return 'xlDesktop';
};

// Hook for responsive values
export const useResponsiveValue = <T>(values: Partial<Record<Breakpoint, T>>, fallback: T): T => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  return values[currentBreakpoint] || 
         values.desktop || 
         values.laptop || 
         values.tablet || 
         values.mobile || 
         fallback;
};

// CSS-in-JS helper for media queries
export const mq = (breakpoint: MediaQuery) => `@media ${mediaQueries[breakpoint]}`;

// Responsive CSS generator
export const responsiveCSS = <T extends string | number>(
  property: string,
  values: Partial<Record<Breakpoint, T>>
) => {
  return Object.entries(values)
    .map(([breakpoint, value]) => {
      const bp = breakpoint as Breakpoint;
      if (bp === 'mobile') {
        return `${property}: ${value};`;
      }
      return `@media (min-width: ${breakpoints[bp]}px) { ${property}: ${value}; }`;
    })
    .join(' ');
};

import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';
import { containerWidths, spacing, fontSizes } from '../utils/responsive';

const navItems = [
  { path: '/', label: 'Button', icon: '🔘' },
  { path: '/icon-button', label: 'IconButton', icon: '⭐' },
  { path: '/link-button', label: 'LinkButton', icon: '🔗' },
  { path: '/button-group', label: 'ButtonGroup', icon: '📑' },
  { path: '/multi-select', label: 'MultiSelect', icon: '📋' },
];

export const ResponsiveLayout: React.FC = () => {
  const location = useLocation();
  const { breakpoint, isMobileDown, isTabletUp } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getContainerWidth = () => {
    return containerWidths[breakpoint];
  };

  const getSidebarWidth = () => {
    switch (breakpoint) {
      case 'mobile': return mobileMenuOpen ? '280px' : '0px';
      case 'tablet': return '220px';
      case 'laptop': return '250px';
      case 'desktop': return '280px';
      case 'xlDesktop': return '320px';
      default: return '250px';
    }
  };

  const getMainPadding = () => {
    switch (breakpoint) {
      case 'mobile': return spacing.md.mobile;
      case 'tablet': return spacing.md.tablet;
      case 'laptop': return spacing.md.laptop;
      case 'desktop': return spacing.md.desktop;
      case 'xlDesktop': return spacing.md.xlDesktop;
      default: return spacing.md.desktop;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      maxWidth: '100vw', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Mobile Menu Button */}
      {isMobileDown && (
        <button
          onClick={toggleMobileMenu}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1001,
            backgroundColor: '#313C97',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileDown && mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        />
      )}

      {/* Side Navigation */}
      <nav style={{
        width: getSidebarWidth(),
        backgroundColor: '#f8f9fa',
        borderRight: isTabletUp || mobileMenuOpen ? '1px solid #e9ecef' : 'none',
        padding: isMobileDown ? '80px 0 20px 0' : '20px 0',
        boxShadow: isTabletUp || mobileMenuOpen ? '2px 0 5px rgba(0,0,0,0.1)' : 'none',
        position: isMobileDown ? 'fixed' : 'static',
        height: isMobileDown ? '100vh' : 'auto',
        zIndex: 1000,
        transform: isMobileDown && !mobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'all 0.3s ease-in-out',
        overflowY: 'auto',
      }}>
        <div style={{ 
          padding: `0 ${isMobileDown ? '20px' : '20px'}`, 
          marginBottom: '30px' 
        }}>
          <h2 style={{ 
            color: '#313C97', 
            fontSize: fontSizes.xl[breakpoint],
            fontWeight: 'bold',
            margin: 0,
            textAlign: isMobileDown ? 'center' : 'left'
          }}>
            MIUI Library
          </h2>
          <p style={{ 
            color: '#6c757d', 
            fontSize: fontSizes.sm[breakpoint],
            margin: '8px 0 0 0',
            textAlign: isMobileDown ? 'center' : 'left'
          }}>
            Component Library
          </p>
        </div>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0 
        }}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={isMobileDown ? () => setMobileMenuOpen(false) : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: `${spacing.sm[breakpoint]} ${isMobileDown ? '20px' : '20px'}`,
                  textDecoration: 'none',
                  color: location.pathname === item.path ? '#313C97' : '#495057',
                  backgroundColor: location.pathname === item.path ? '#e7f3ff' : 'transparent',
                  borderRight: location.pathname === item.path && isTabletUp ? '3px solid #313C97' : 'none',
                  borderLeft: location.pathname === item.path && isMobileDown ? '4px solid #313C97' : 'none',
                  transition: 'all 0.2s ease',
                  fontSize: fontSizes.md[breakpoint],
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = '#f1f3f4';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ 
                  marginRight: '12px', 
                  fontSize: fontSizes.lg[breakpoint]
                }}>
                  {item.icon}
                </span>
                <span style={{ 
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal' 
                }}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{
        flex: 1,
        width: isMobileDown ? '100%' : `calc(100% - ${getSidebarWidth()})`,
        maxWidth: getContainerWidth(),
        padding: getMainPadding(),
        backgroundColor: '#ffffff',
        overflow: 'auto',
        margin: isMobileDown ? '0' : '0 auto',
        marginLeft: isMobileDown ? '0' : 'auto',
        marginRight: isMobileDown ? '0' : 'auto',
        paddingTop: isMobileDown ? '80px' : getMainPadding(),
      }}>
        <Outlet />
      </main>
    </div>
  );
};

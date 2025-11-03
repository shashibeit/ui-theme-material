import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Button', icon: '🔘' },
  { path: '/icon-button', label: 'IconButton', icon: '⭐' },
  { path: '/link-button', label: 'LinkButton', icon: '🔗' },
  { path: '/button-group', label: 'ButtonGroup', icon: '📑' },
  { path: '/multi-select', label: 'MultiSelect', icon: '📋' },
];

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: '100vw', overflow: 'hidden' }}>
      {/* Side Navigation */}
      <nav style={{
        width: '250px',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e9ecef',
        padding: '20px 0',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <h2 style={{ 
            color: '#313C97', 
            fontSize: '24px', 
            fontWeight: 'bold',
            margin: 0 
          }}>
            MIUI Library
          </h2>
          <p style={{ 
            color: '#6c757d', 
            fontSize: '14px', 
            margin: '5px 0 0 0' 
          }}>
            Component Showcase
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 20px',
                  textDecoration: 'none',
                  color: location.pathname === item.path ? '#313C97' : '#495057',
                  backgroundColor: location.pathname === item.path ? '#e7f3ff' : 'transparent',
                  borderRight: location.pathname === item.path ? '3px solid #313C97' : 'none',
                  transition: 'all 0.2s ease'
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
                <span style={{ marginRight: '10px', fontSize: '18px' }}>
                  {item.icon}
                </span>
                <span style={{ fontWeight: location.pathname === item.path ? 'bold' : 'normal' }}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{
        width: '1200px',
        maxWidth: '1200px',
        padding: '40px',
        backgroundColor: '#ffffff',
        overflow: 'auto',
        margin: '0 auto'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

import React from 'react';
import { IconButton } from '../components/IconButton';
import { CodeBlock } from '../components/CodeBlock';
import { FaCheck, FaExclamationTriangle, FaTimes, FaInfoCircle, FaPlus, FaTrash, FaEdit, FaHome, FaUser, FaCog, FaHeart } from 'react-icons/fa';

export const IconButtonPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#313C97', marginBottom: '10px' }}>IconButton Component</h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          Circular icon-only buttons perfect for toolbars, floating action buttons, and compact interfaces.
        </p>
      </div>

      {/* Basic Usage Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Basic Usage
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          IconButtons provide a clean way to display actions without text labels.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <IconButton icon={<FaInfoCircle />} aria-label="info" variant="primary" />
          <IconButton icon={<FaCheck />} aria-label="check" variant="secondary" />
          <IconButton icon={<FaHeart />} aria-label="like" variant="success" />
          <IconButton icon={<FaTrash />} aria-label="delete" variant="danger" />
        </div>

        <CodeBlock
          title="Basic Usage Example"
          code={`import { IconButton } from './components/IconButton';
import { FaInfoCircle, FaCheck, FaHeart, FaTrash } from 'react-icons/fa';

function MyComponent() {
  return (
    <>
      <IconButton icon={<FaInfoCircle />} aria-label="info" variant="primary" />
      <IconButton icon={<FaCheck />} aria-label="check" variant="secondary" />
      <IconButton icon={<FaHeart />} aria-label="like" variant="success" />
      <IconButton icon={<FaTrash />} aria-label="delete" variant="danger" />
    </>
  );
}`}
        />
      </section>

      {/* Variants Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Variants
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          IconButtons support all the same color variants as regular buttons.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <IconButton icon={<FaInfoCircle />} aria-label="info" variant="primary" />
          <IconButton icon={<FaCheck />} aria-label="check" variant="secondary" />
          <IconButton icon={<FaCheck />} aria-label="success" variant="success" />
          <IconButton icon={<FaTimes />} aria-label="delete" variant="danger" />
          <IconButton icon={<FaExclamationTriangle />} aria-label="warning" variant="alert" />
        </div>

        <CodeBlock
          title="All Variants"
          code={`<IconButton icon={<FaInfoCircle />} aria-label="info" variant="primary" />
<IconButton icon={<FaCheck />} aria-label="check" variant="secondary" />
<IconButton icon={<FaCheck />} aria-label="success" variant="success" />
<IconButton icon={<FaTimes />} aria-label="delete" variant="danger" />
<IconButton icon={<FaExclamationTriangle />} aria-label="warning" variant="alert" />`}
        />
      </section>

      {/* Common Use Cases Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Common Use Cases
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          IconButtons are perfect for actions where space is limited or when the icon is self-explanatory.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <IconButton icon={<FaEdit />} aria-label="edit" variant="primary" />
          <IconButton icon={<FaTrash />} aria-label="delete" variant="danger" />
          <IconButton icon={<FaPlus />} aria-label="add" variant="success" />
          <IconButton icon={<FaHome />} aria-label="home" variant="secondary" />
          <IconButton icon={<FaUser />} aria-label="user" variant="primary" />
          <IconButton icon={<FaCog />} aria-label="settings" variant="secondary" />
        </div>

        <CodeBlock
          title="Common Actions"
          code={`// Toolbar actions
<IconButton icon={<FaEdit />} aria-label="edit" variant="primary" />
<IconButton icon={<FaTrash />} aria-label="delete" variant="danger" />
<IconButton icon={<FaPlus />} aria-label="add" variant="success" />

// Navigation
<IconButton icon={<FaHome />} aria-label="home" variant="secondary" />
<IconButton icon={<FaUser />} aria-label="user" variant="primary" />
<IconButton icon={<FaCog />} aria-label="settings" variant="secondary" />`}
        />
      </section>

      {/* States Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          States
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          IconButtons support disabled states and maintain proper accessibility.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <IconButton icon={<FaInfoCircle />} aria-label="normal" variant="primary" />
          <IconButton icon={<FaInfoCircle />} aria-label="disabled" variant="primary" disabled />
        </div>

        <CodeBlock
          title="Disabled State"
          code={`<IconButton icon={<FaInfoCircle />} aria-label="normal" variant="primary" />
<IconButton icon={<FaInfoCircle />} aria-label="disabled" variant="primary" disabled />`}
        />
      </section>

      {/* Props API Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Props API
        </h2>
        <div style={{ 
          overflowX: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>icon</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>React.ReactNode</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>The icon to display</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>variant</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>primary | secondary | success | danger | alert</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>primary</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>The visual style variant</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>disabled</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Whether the button is disabled</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>onClick</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>{'() => void'}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Click event handler</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>aria-label</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Accessibility label (required)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

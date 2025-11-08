import React from 'react';

interface CodeExampleProps {
  title: string;
  code: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ title, code }) => {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      marginTop: '20px',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#e9ecef',
        padding: '12px 16px',
        borderBottom: '1px solid #dee2e6',
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#495057'
      }}>
        {title}
      </div>
      <pre style={{
        padding: '16px',
        margin: 0,
        backgroundColor: '#ffffff',
        fontSize: '13px',
        lineHeight: '1.4',
        overflow: 'auto',
        color: '#333'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

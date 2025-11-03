import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div style={{
      border: '1px solid #404040',
      borderRadius: '8px',
      marginBottom: '16px',
      backgroundColor: '#282c34'
    }}>
      {title && (
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #404040',
          backgroundColor: '#21252b',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: 'bold', color: '#61dafb' }}>{title}</span>
          <button
            onClick={handleCopy}
            style={{
              padding: '4px 8px',
              border: '1px solid #313C97',
              borderRadius: '4px',
              backgroundColor: copied ? '#1D5921' : '#313C97',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {!title && (
          <button
            onClick={handleCopy}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              border: '1px solid #313C97',
              borderRadius: '4px',
              backgroundColor: copied ? '#1D5921' : '#313C97',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer',
              zIndex: 1,
              transition: 'background-color 0.2s'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
        <SyntaxHighlighter
          language="tsx"
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: title ? '0 0 8px 8px' : '8px',
            fontSize: '14px',
            lineHeight: '1.4'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

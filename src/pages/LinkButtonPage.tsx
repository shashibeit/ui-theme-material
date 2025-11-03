import React from 'react';
import { LinkButton } from '../components/LinkButton';
import { CodeBlock } from '../components/CodeBlock';
import { FaExternalLinkAlt, FaDownload, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const LinkButtonPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#313C97', marginBottom: '10px' }}>LinkButton Component</h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          Styled link buttons that maintain button appearance while providing link functionality.
        </p>
      </div>

      {/* Basic Usage Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Basic Usage
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          LinkButtons look like buttons but behave like links, perfect for navigation actions.
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
          <LinkButton href="https://example.com" variant="primary" target="_blank">
            Visit External Site
          </LinkButton>
          <LinkButton href="/dashboard" variant="secondary">
            Go to Dashboard
          </LinkButton>
        </div>

        <CodeBlock
          title="Basic LinkButton Usage"
          code={`import { LinkButton } from './components/LinkButton';

function MyComponent() {
  return (
    <>
      <LinkButton href="https://example.com" variant="primary" target="_blank">
        Visit External Site
      </LinkButton>
      <LinkButton href="/dashboard" variant="secondary">
        Go to Dashboard
      </LinkButton>
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
          LinkButtons support all the same color variants as regular buttons.
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
          <LinkButton href="https://example.com" variant="primary" target="_blank">Primary Link</LinkButton>
          <LinkButton href="https://example.com" variant="secondary" target="_blank">Secondary Link</LinkButton>
          <LinkButton href="https://example.com" variant="success" target="_blank">Success Link</LinkButton>
          <LinkButton href="https://example.com" variant="danger" target="_blank">Danger Link</LinkButton>
          <LinkButton href="https://example.com" variant="alert" target="_blank">Alert Link</LinkButton>
        </div>

        <CodeBlock
          title="All LinkButton Variants"
          code={`<LinkButton href="https://example.com" variant="primary" target="_blank">Primary Link</LinkButton>
<LinkButton href="https://example.com" variant="secondary" target="_blank">Secondary Link</LinkButton>
<LinkButton href="https://example.com" variant="success" target="_blank">Success Link</LinkButton>
<LinkButton href="https://example.com" variant="danger" target="_blank">Danger Link</LinkButton>
<LinkButton href="https://example.com" variant="alert" target="_blank">Alert Link</LinkButton>`}
        />
      </section>

      {/* Sizes Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Sizes
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Choose from small, medium, or large sizes to fit your design needs.
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
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <LinkButton href="https://example.com" variant="primary" size="small" target="_blank">Small</LinkButton>
          <LinkButton href="https://example.com" variant="primary" size="medium" target="_blank">Medium</LinkButton>
          <LinkButton href="https://example.com" variant="primary" size="large" target="_blank">Large</LinkButton>
        </div>

        <CodeBlock
          title="LinkButton Sizes"
          code={`<LinkButton href="https://example.com" variant="primary" size="small" target="_blank">Small</LinkButton>
<LinkButton href="https://example.com" variant="primary" size="medium" target="_blank">Medium</LinkButton>
<LinkButton href="https://example.com" variant="primary" size="large" target="_blank">Large</LinkButton>`}
        />
      </section>

      {/* With Icons Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          With Icons
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Add icons to make LinkButtons more descriptive and visually appealing.
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
          <LinkButton href="https://example.com" variant="primary" target="_blank">
            <FaExternalLinkAlt style={{ marginRight: 8 }} />
            Visit Site
          </LinkButton>
          <LinkButton href="/download" variant="success">
            <FaDownload style={{ marginRight: 8 }} />
            Download
          </LinkButton>
          <LinkButton href="https://github.com" variant="secondary" target="_blank">
            <FaGithub style={{ marginRight: 8 }} />
            GitHub
          </LinkButton>
        </div>

        <CodeBlock
          title="LinkButtons with Icons"
          code={`import { FaExternalLinkAlt, FaDownload, FaGithub } from 'react-icons/fa';

<LinkButton href="https://example.com" variant="primary" target="_blank">
  <FaExternalLinkAlt style={{ marginRight: 8 }} />
  Visit Site
</LinkButton>

<LinkButton href="/download" variant="success">
  <FaDownload style={{ marginRight: 8 }} />
  Download
</LinkButton>

<LinkButton href="https://github.com" variant="secondary" target="_blank">
  <FaGithub style={{ marginRight: 8 }} />
  GitHub
</LinkButton>`}
        />
      </section>

      {/* Social Links Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Social Links
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Perfect for linking to social media profiles and external platforms.
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
          <LinkButton href="https://twitter.com" variant="primary" target="_blank">
            <FaTwitter style={{ marginRight: 8 }} />
            Twitter
          </LinkButton>
          <LinkButton href="https://linkedin.com" variant="primary" target="_blank">
            <FaLinkedin style={{ marginRight: 8 }} />
            LinkedIn
          </LinkButton>
          <LinkButton href="https://github.com" variant="secondary" target="_blank">
            <FaGithub style={{ marginRight: 8 }} />
            GitHub
          </LinkButton>
        </div>

        <CodeBlock
          title="Social Media Links"
          code={`import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

<LinkButton href="https://twitter.com" variant="primary" target="_blank">
  <FaTwitter style={{ marginRight: 8 }} />
  Twitter
</LinkButton>

<LinkButton href="https://linkedin.com" variant="primary" target="_blank">
  <FaLinkedin style={{ marginRight: 8 }} />
  LinkedIn
</LinkButton>

<LinkButton href="https://github.com" variant="secondary" target="_blank">
  <FaGithub style={{ marginRight: 8 }} />
  GitHub
</LinkButton>`}
        />
      </section>

      {/* Navigation Examples Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Navigation Examples
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Use LinkButtons for internal navigation and call-to-action sections.
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
          <LinkButton href="/" variant="secondary">Home</LinkButton>
          <LinkButton href="/about" variant="secondary">About</LinkButton>
          <LinkButton href="/contact" variant="primary">Contact Us</LinkButton>
          <LinkButton href="/docs" variant="success">Documentation</LinkButton>
        </div>

        <CodeBlock
          title="Navigation LinkButtons"
          code={`// Internal navigation
<LinkButton href="/" variant="secondary">Home</LinkButton>
<LinkButton href="/about" variant="secondary">About</LinkButton>
<LinkButton href="/contact" variant="primary">Contact Us</LinkButton>
<LinkButton href="/docs" variant="success">Documentation</LinkButton>`}
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
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>href</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>The URL to navigate to</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>variant</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>primary | secondary | success | danger | alert</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>primary</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>The visual style variant</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>size</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>small | medium | large</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>medium</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>The size of the button</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>target</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>_blank | _self | _parent | _top</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>_self</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Where to open the link</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>children</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>React.ReactNode</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>The content to display inside the button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

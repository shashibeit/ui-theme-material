import React, { useState } from 'react';
import { MultiSelect } from '../components/MultiSelect';
import type { MultiSelectOption } from '../components/MultiSelect';
import { CodeBlock } from '../components/CodeBlock';

export const MultiSelectPage: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string[]>([]);
  const [variantValues, setVariantValues] = useState<{ [key: string]: string[] }>({
    primary: ['react', 'vue'],
    secondary: ['html'],
    success: ['css'],
    danger: ['php'],
    alert: ['python']
  });
  const [sizeValues, setSizeValues] = useState<string[]>(['option1', 'option3']);

  const basicOptions: MultiSelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' }
  ];

  const frameworkOptions: MultiSelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'gatsby', label: 'Gatsby' },
    { value: 'remix', label: 'Remix' }
  ];

  const languageOptions: MultiSelectOption[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' }
  ];

  const skillOptions: MultiSelectOption[] = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'node', label: 'Node.js' },
    { value: 'express', label: 'Express.js' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'aws', label: 'AWS' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' }
  ];

  const longOptions: MultiSelectOption[] = Array.from({ length: 50 }, (_, i) => ({
    value: `option${i + 1}`,
    label: `Very Long Option Name That Might Overflow ${i + 1}`
  }));

  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#313C97', marginBottom: '10px' }}>MultiSelect Component</h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          A powerful multi-select dropdown with chips, search functionality, and customizable styling.
        </p>
      </div>

      {/* Basic Usage Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Basic Usage
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          A simple multi-select dropdown with search functionality and chip-based selection display.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px'
        }}>
          <MultiSelect
            options={basicOptions}
            value={basicValue}
            onChange={setBasicValue}
            placeholder="Select frameworks..."
          />
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#6c757d' }}>
            Selected: {basicValue.length > 0 ? basicValue.join(', ') : 'None'}
          </div>
        </div>

        <CodeBlock
          title="Basic MultiSelect"
          code={`import { MultiSelect } from './components/MultiSelect';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' }
];

function MyComponent() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select frameworks..."
    />
  );
}`}
        />
      </section>

      {/* Chip Variants Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Chip Variants
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Customize the appearance of selected chips with different color variants.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ marginBottom: '8px', color: '#313C97' }}>Primary (Default)</h4>
            <MultiSelect
              options={languageOptions}
              value={variantValues.primary}
              onChange={(value) => setVariantValues(prev => ({ ...prev, primary: value }))}
              chipVariant="primary"
              placeholder="Select languages..."
            />
          </div>
          
          <div>
            <h4 style={{ marginBottom: '8px', color: '#6c757d' }}>Secondary</h4>
            <MultiSelect
              options={skillOptions}
              value={variantValues.secondary}
              onChange={(value) => setVariantValues(prev => ({ ...prev, secondary: value }))}
              chipVariant="secondary"
              placeholder="Select skills..."
            />
          </div>
          
          <div>
            <h4 style={{ marginBottom: '8px', color: '#1D5921' }}>Success</h4>
            <MultiSelect
              options={frameworkOptions}
              value={variantValues.success}
              onChange={(value) => setVariantValues(prev => ({ ...prev, success: value }))}
              chipVariant="success"
              placeholder="Select frameworks..."
            />
          </div>
          
          <div>
            <h4 style={{ marginBottom: '8px', color: '#B51C1C' }}>Danger</h4>
            <MultiSelect
              options={languageOptions.slice(0, 5)}
              value={variantValues.danger}
              onChange={(value) => setVariantValues(prev => ({ ...prev, danger: value }))}
              chipVariant="danger"
              placeholder="Select languages..."
            />
          </div>
          
          <div>
            <h4 style={{ marginBottom: '8px', color: '#FCB116' }}>Alert</h4>
            <MultiSelect
              options={basicOptions}
              value={variantValues.alert}
              onChange={(value) => setVariantValues(prev => ({ ...prev, alert: value }))}
              chipVariant="alert"
              placeholder="Select options..."
            />
          </div>
        </div>

        <CodeBlock
          title="Chip Variants"
          code={`// Primary chips (default)
<MultiSelect
  chipVariant="primary"
  options={options}
  value={value}
  onChange={setValue}
/>

// Secondary chips
<MultiSelect
  chipVariant="secondary"
  options={options}
  value={value}
  onChange={setValue}
/>

// Success, danger, and alert variants also available`}
        />
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Features & Interactions
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Explore advanced features like search filtering, keyboard navigation, and custom dropdown height.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <h4 style={{ marginBottom: '8px', color: '#313C97' }}>Search & Filter (Many Options)</h4>
            <MultiSelect
              options={longOptions}
              value={sizeValues}
              onChange={setSizeValues}
              placeholder="Type to search options..."
              maxHeight={150}
            />
            <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}>
              Try typing "Option 1" or "Very Long" to filter results
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '8px', color: '#6c757d' }}>Disabled State</h4>
            <MultiSelect
              options={basicOptions}
              value={['react', 'vue']}
              onChange={() => {}}
              disabled={true}
              placeholder="Disabled multi-select"
            />
          </div>
        </div>

        <CodeBlock
          title="Advanced Features"
          code={`// Custom dropdown height
<MultiSelect
  options={manyOptions}
  value={value}
  onChange={setValue}
  maxHeight={150}
  placeholder="Type to search..."
/>

// Disabled state
<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  disabled={true}
/>

// Keyboard shortcuts:
// - Backspace: Remove last chip when input is empty
// - Escape: Close dropdown
// - Type to search options`}
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
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>options</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>MultiSelectOption[]</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Array of selectable options</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>value</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>string[]</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Array of selected option values</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>onChange</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>{'(value: string[]) => void'}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Callback when selection changes</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>chipVariant</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>primary | secondary | success | danger | alert</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>primary</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Visual style of selected chips</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>placeholder</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Select options...</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Placeholder text when empty</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>disabled</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Whether the component is disabled</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>maxHeight</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>number</td>
                <td style={{ padding: '12px' }}>200</td>
                <td style={{ padding: '12px' }}>Maximum height of dropdown in pixels</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

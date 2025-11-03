import React from 'react';
import { Button } from '../components/Button';
import { CodeBlock } from '../components/CodeBlock';
import { FaCheck, FaExclamationTriangle, FaPlus, FaTrash } from 'react-icons/fa';

export const ButtonPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#313C97', marginBottom: '10px' }}>Button Component</h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          A versatile button component with multiple variants, sizes, and icon support.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Basic Usage</h3>
        <div style={{ marginBottom: '24px' }}>
          <Button variant="primary">Click me</Button>
        </div>
        <CodeBlock
          title="Import and Basic Usage"
          code={`import { Button } from './components/Button';

function MyComponent() {
  return (
    <Button variant="primary">Click me</Button>
  );
}`}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="alert">Alert</Button>
        </div>
        <CodeBlock
          title="All Variants"
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="alert">Alert</Button>`}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
        </div>
        <CodeBlock
          title="Different Sizes"
          code={`<Button variant="primary" size="small">Small</Button>
<Button variant="primary" size="medium">Medium</Button>
<Button variant="primary" size="large">Large</Button>`}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Button variant="primary" icon={<FaPlus />}>Add Item</Button>
          <Button variant="danger" icon={<FaTrash />}>Delete</Button>
          <Button variant="success" icon={<FaCheck />}>Save</Button>
          <Button variant="alert" icon={<FaExclamationTriangle />}>Warning</Button>
        </div>
        <CodeBlock
          title="Buttons with Icons"
          code={`import { FaPlus, FaTrash, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

<Button variant="primary" icon={<FaPlus />}>Add Item</Button>
<Button variant="danger" icon={<FaTrash />}>Delete</Button>
<Button variant="success" icon={<FaCheck />}>Save</Button>
<Button variant="alert" icon={<FaExclamationTriangle />}>Warning</Button>`}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>States</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" fullWidth style={{ maxWidth: '200px' }}>Full Width</Button>
        </div>
        <CodeBlock
          title="Button States"
          code={`<Button variant="primary">Normal</Button>
<Button variant="primary" disabled>Disabled</Button>
<Button variant="primary" fullWidth>Full Width</Button>`}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Event Handling</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Button 
            variant="primary" 
            onClick={() => alert('Button clicked!')}
          >
            Click Event
          </Button>
          <Button 
            variant="success" 
            onClick={() => console.log('Save action')}
            icon={<FaCheck />}
          >
            Save
          </Button>
        </div>
        <CodeBlock
          title="Handling Click Events"
          code={`<Button 
  variant="primary" 
  onClick={() => alert('Button clicked!')}
>
  Click Event
</Button>

<Button 
  variant="success" 
  onClick={() => console.log('Save action')}
  icon={<FaCheck />}
>
  Save
</Button>`}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>All Combinations</h3>
        
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#313C97' }}>Primary (Blue)</div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button variant="primary" size="small" icon={<FaPlus />}>Small</Button>
            <Button variant="primary" size="medium" icon={<FaPlus />}>Medium</Button>
            <Button variant="primary" size="large" icon={<FaPlus />}>Large</Button>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#B51C1C' }}>Danger (Red)</div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button variant="danger" size="small" icon={<FaTrash />}>Small</Button>
            <Button variant="danger" size="medium" icon={<FaTrash />}>Medium</Button>
            <Button variant="danger" size="large" icon={<FaTrash />}>Large</Button>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#6c757d' }}>Secondary (Grey)</div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button variant="secondary" size="small" icon={<FaPlus />}>Small</Button>
            <Button variant="secondary" size="medium" icon={<FaPlus />}>Medium</Button>
            <Button variant="secondary" size="large" icon={<FaPlus />}>Large</Button>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#FCB116' }}>Alert (Orange/Yellow)</div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button variant="alert" size="small" icon={<FaExclamationTriangle />}>Small</Button>
            <Button variant="alert" size="medium" icon={<FaExclamationTriangle />}>Medium</Button>
            <Button variant="alert" size="large" icon={<FaExclamationTriangle />}>Large</Button>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1D5921' }}>Success (Green)</div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button variant="success" size="small" icon={<FaCheck />}>Small</Button>
            <Button variant="success" size="medium" icon={<FaCheck />}>Medium</Button>
            <Button variant="success" size="large" icon={<FaCheck />}>Large</Button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Props API</h3>
        <div style={{
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          overflow: 'hidden',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e9ecef' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>variant</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>'primary' | 'secondary' | 'success' | 'danger' | 'alert'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>'primary'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>The visual style variant of the button</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>size</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>'small' | 'medium' | 'large'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>'medium'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>The size of the button</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>fullWidth</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>If true, the button will take up the full width of its container</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>icon</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>React.ReactNode</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>Icon to display before the button text</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>disabled</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>If true, the button will be disabled</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>onClick</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{'() => void'}</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>-</td>
                <td style={{ padding: '12px' }}>Function to call when the button is clicked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { CodeBlock } from '../components/CodeBlock';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

export const ButtonGroupPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#313C97', marginBottom: '10px' }}>ButtonGroup Component</h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          Group related buttons together with seamless borders and proper spacing.
        </p>
      </div>

      {/* Basic Usage Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Basic Usage
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          ButtonGroups automatically handle border radius and spacing between buttons.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ButtonGroup>
            <Button variant="primary">First</Button>
            <Button variant="primary">Second</Button>
            <Button variant="primary">Third</Button>
          </ButtonGroup>
        </div>

        <CodeBlock
          title="Basic ButtonGroup"
          code={`import { ButtonGroup, Button } from './components';

function MyComponent() {
  return (
    <ButtonGroup>
      <Button variant="primary">First</Button>
      <Button variant="primary">Second</Button>
      <Button variant="primary">Third</Button>
    </ButtonGroup>
  );
}`}
        />
      </section>

      {/* Horizontal Groups Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Horizontal Groups
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Default orientation groups buttons horizontally with seamless borders.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ButtonGroup>
            <Button variant="secondary">Option A</Button>
            <Button variant="secondary">Option B</Button>
            <Button variant="secondary">Option C</Button>
            <Button variant="secondary">Option D</Button>
          </ButtonGroup>
        </div>

        <CodeBlock
          title="Horizontal ButtonGroup"
          code={`<ButtonGroup>
  <Button variant="secondary">Option A</Button>
  <Button variant="secondary">Option B</Button>
  <Button variant="secondary">Option C</Button>
  <Button variant="secondary">Option D</Button>
</ButtonGroup>`}
        />
      </section>

      {/* Vertical Groups Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Vertical Groups
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Use the orientation="vertical" prop to stack buttons vertically.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '32px'
        }}>
          <ButtonGroup orientation="vertical">
            <Button variant="primary">Top</Button>
            <Button variant="primary">Middle</Button>
            <Button variant="primary">Bottom</Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button variant="secondary">First</Button>
            <Button variant="secondary">Second</Button>
            <Button variant="secondary">Third</Button>
            <Button variant="secondary">Fourth</Button>
          </ButtonGroup>
        </div>

        <CodeBlock
          title="Vertical ButtonGroup"
          code={`<ButtonGroup orientation="vertical">
  <Button variant="primary">Top</Button>
  <Button variant="primary">Middle</Button>
  <Button variant="primary">Bottom</Button>
</ButtonGroup>`}
        />
      </section>

      {/* Mixed Variants Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Mixed Variants
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          Combine different button variants within a single group for contextual actions.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ButtonGroup>
            <Button variant="success" icon={<FaSave />}>Save</Button>
            <Button variant="secondary" icon={<FaEdit />}>Edit</Button>
            <Button variant="danger" icon={<FaTrash />}>Delete</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary">Approve</Button>
            <Button variant="alert">Review</Button>
            <Button variant="danger">Reject</Button>
          </ButtonGroup>
        </div>

        <CodeBlock
          title="Mixed Variant Groups"
          code={`// Form actions with icons
<ButtonGroup>
  <Button variant="success" icon={<FaSave />}>Save</Button>
  <Button variant="secondary" icon={<FaEdit />}>Edit</Button>
  <Button variant="danger" icon={<FaTrash />}>Delete</Button>
</ButtonGroup>

// Approval workflow
<ButtonGroup>
  <Button variant="primary">Approve</Button>
  <Button variant="alert">Review</Button>
  <Button variant="danger">Reject</Button>
</ButtonGroup>`}
        />
      </section>

      {/* Different Sizes Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px', textAlign: 'left' }}>
          Different Sizes
        </h2>
        <p style={{ marginBottom: '20px', color: '#6c757d', textAlign: 'left' }}>
          All buttons in a group should use the same size for visual consistency.
        </p>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#6c757d' }}>Small Size</h4>
            <ButtonGroup>
              <Button variant="primary" size="small">Small 1</Button>
              <Button variant="primary" size="small">Small 2</Button>
              <Button variant="primary" size="small">Small 3</Button>
            </ButtonGroup>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#6c757d' }}>Medium Size</h4>
            <ButtonGroup>
              <Button variant="primary" size="medium">Medium 1</Button>
              <Button variant="primary" size="medium">Medium 2</Button>
              <Button variant="primary" size="medium">Medium 3</Button>
            </ButtonGroup>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#6c757d' }}>Large Size</h4>
            <ButtonGroup>
              <Button variant="primary" size="large">Large 1</Button>
              <Button variant="primary" size="large">Large 2</Button>
              <Button variant="primary" size="large">Large 3</Button>
            </ButtonGroup>
          </div>
        </div>

        <CodeBlock
          title="Consistent Sizes"
          code={`// Small buttons
<ButtonGroup>
  <Button variant="primary" size="small">Small 1</Button>
  <Button variant="primary" size="small">Small 2</Button>
  <Button variant="primary" size="small">Small 3</Button>
</ButtonGroup>

// Large buttons
<ButtonGroup>
  <Button variant="primary" size="large">Large 1</Button>
  <Button variant="primary" size="large">Large 2</Button>
  <Button variant="primary" size="large">Large 3</Button>
</ButtonGroup>`}
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
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>children</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontFamily: 'monospace' }}>React.ReactNode</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>Button components to group</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>orientation</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>horizontal | vertical</td>
                <td style={{ padding: '12px' }}>horizontal</td>
                <td style={{ padding: '12px' }}>Layout direction of the button group</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

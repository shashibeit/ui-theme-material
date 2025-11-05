import React from 'react';
import { useFormValidation, validationRules, commonSchemas } from '../validation';
import { CodeBlock } from '../components/CodeBlock';

export const ValidationDemoPage: React.FC = () => {
  // Example 1: Basic form validation
  const basicForm = useFormValidation({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: {
      email: [
        validationRules.required(),
        validationRules.email(),
      ],
      password: [
        validationRules.required(),
        validationRules.minLength(8),
      ],
    },
  });

  // Example 2: Registration form with complex validation
  const registrationForm = useFormValidation({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      terms: false,
    },
    validationSchema: {
      firstName: [
        validationRules.required('First name is required'),
        validationRules.minLength(2, 'First name must be at least 2 characters'),
        validationRules.pattern(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
      ],
      lastName: [
        validationRules.required('Last name is required'),
        validationRules.minLength(2, 'Last name must be at least 2 characters'),
        validationRules.pattern(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
      ],
      email: [
        validationRules.required('Email is required'),
        validationRules.email('Please enter a valid email address'),
      ],
      password: [
        validationRules.required('Password is required'),
        validationRules.strongPassword(),
      ],
      confirmPassword: [
        validationRules.required('Please confirm your password'),
        validationRules.custom(
          (value) => value === registrationForm.values.password,
          'Passwords do not match'
        ),
      ],
      age: [
        validationRules.required('Age is required'),
        validationRules.number('Age must be a number'),
        validationRules.custom(
          (value) => parseInt(value) >= 18,
          'You must be at least 18 years old'
        ),
      ],
      terms: [
        validationRules.custom(
          (value) => value === true,
          'You must accept the terms and conditions'
        ),
      ],
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Example 3: Contact form using pre-defined schema
  const contactForm = useFormValidation({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: commonSchemas.contactForm,
  });

  const handleBasicSubmit = (values: any) => {
    console.log('Basic form submitted:', values);
    alert('Basic form submitted successfully!');
  };

  const handleRegistrationSubmit = (values: any) => {
    console.log('Registration form submitted:', values);
    alert('Registration successful!');
  };

  const handleContactSubmit = (values: any) => {
    console.log('Contact form submitted:', values);
    alert('Message sent successfully!');
  };

  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#313C97', marginBottom: '10px', fontSize: '32px', fontWeight: 'bold' }}>
          Form Validation Utilities
        </h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          Comprehensive form validation system with rules, schemas, and React hooks for easy form management.
        </p>
      </div>

      {/* Basic Login Form Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px' }}>
          Basic Form Validation
        </h2>
        
        <div style={{ 
          padding: '30px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px'
        }}>
          <form onSubmit={basicForm.handleSubmit(handleBasicSubmit)} style={{ maxWidth: '400px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Email
              </label>
              <input
                type="email"
                {...basicForm.getFieldProps('email')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${basicForm.errors.email ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {basicForm.errors.email && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {basicForm.errors.email[0]}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Password
              </label>
              <input
                type="password"
                {...basicForm.getFieldProps('password')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${basicForm.errors.password ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {basicForm.errors.password && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {basicForm.errors.password[0]}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!basicForm.isValid || basicForm.isSubmitting}
              style={{
                backgroundColor: basicForm.isValid ? '#313C97' : '#ccc',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: basicForm.isValid ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              {basicForm.isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <CodeBlock
          title="Basic Form Validation"
          code={`import { useFormValidation, validationRules } from '../validation';

const loginForm = useFormValidation({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: {
    email: [
      validationRules.required(),
      validationRules.email(),
    ],
    password: [
      validationRules.required(),
      validationRules.minLength(8),
    ],
  },
});

const handleSubmit = (values) => {
  console.log('Form submitted:', values);
};

// In component
<form onSubmit={loginForm.handleSubmit(handleSubmit)}>
  <input {...loginForm.getFieldProps('email')} />
  {loginForm.errors.email && <span>{loginForm.errors.email[0]}</span>}
  
  <input {...loginForm.getFieldProps('password')} type="password" />
  {loginForm.errors.password && <span>{loginForm.errors.password[0]}</span>}
  
  <button type="submit" disabled={!loginForm.isValid}>
    Submit
  </button>
</form>`}
        />
      </section>

      {/* Advanced Registration Form */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px' }}>
          Advanced Form with Complex Validation
        </h2>
        
        <div style={{ 
          padding: '30px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          backgroundColor: '#f8f9fa',
          marginBottom: '20px'
        }}>
          <form onSubmit={registrationForm.handleSubmit(handleRegistrationSubmit)} style={{ maxWidth: '400px' }}>
            {/* First Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                First Name
              </label>
              <input
                type="text"
                {...registrationForm.getFieldProps('firstName')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${registrationForm.errors.firstName ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {registrationForm.errors.firstName && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.firstName[0]}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Last Name
              </label>
              <input
                type="text"
                {...registrationForm.getFieldProps('lastName')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${registrationForm.errors.lastName ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {registrationForm.errors.lastName && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.lastName[0]}
                </div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Email
              </label>
              <input
                type="email"
                {...registrationForm.getFieldProps('email')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${registrationForm.errors.email ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {registrationForm.errors.email && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.email[0]}
                </div>
              )}
            </div>

            {/* Age */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Age
              </label>
              <input
                type="number"
                {...registrationForm.getFieldProps('age')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${registrationForm.errors.age ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {registrationForm.errors.age && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.age[0]}
                </div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Password
              </label>
              <input
                type="password"
                {...registrationForm.getFieldProps('password')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${registrationForm.errors.password ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {registrationForm.errors.password && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.password[0]}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Confirm Password
              </label>
              <input
                type="password"
                {...registrationForm.getFieldProps('confirmPassword')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${registrationForm.errors.confirmPassword ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              {registrationForm.errors.confirmPassword && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.confirmPassword[0]}
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={registrationForm.values.terms || false}
                  onChange={registrationForm.handleChange('terms')}
                  onBlur={registrationForm.handleBlur('terms')}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px', color: '#333' }}>
                  I accept the terms and conditions
                </span>
              </label>
              {registrationForm.errors.terms && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {registrationForm.errors.terms[0]}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!registrationForm.isValid || registrationForm.isSubmitting}
              style={{
                backgroundColor: registrationForm.isValid ? '#313C97' : '#ccc',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: registrationForm.isValid ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              {registrationForm.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <strong>Form State:</strong>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                Valid: {registrationForm.isValid ? '✓' : '✗'}<br />
                Touched fields: {Object.keys(registrationForm.touched).filter(k => registrationForm.touched[k]).join(', ') || 'None'}<br />
                Dirty fields: {Object.keys(registrationForm.dirty).filter(k => registrationForm.dirty[k]).join(', ') || 'None'}
              </div>
            </div>
          </form>
        </div>

        <CodeBlock
          title="Advanced Form Validation"
          code={`import { useFormValidation, validationRules } from '../validation';

const registrationForm = useFormValidation({
  initialValues: {
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    terms: false,
  },
  validationSchema: {
    firstName: [
      validationRules.required('First name is required'),
      validationRules.minLength(2),
      validationRules.pattern(/^[a-zA-Z\\s]+$/, 'Only letters and spaces allowed'),
    ],
    email: [
      validationRules.required(),
      validationRules.email(),
    ],
    password: [
      validationRules.required(),
      validationRules.strongPassword(),
    ],
    confirmPassword: [
      validationRules.required(),
      validationRules.custom(
        (value) => value === registrationForm.values.password,
        'Passwords do not match'
      ),
    ],
    age: [
      validationRules.required(),
      validationRules.number(),
      validationRules.custom(
        (value) => parseInt(value) >= 18,
        'Must be 18 or older'
      ),
    ],
    terms: [
      validationRules.custom(
        (value) => value === true,
        'Must accept terms'
      ),
    ],
  },
  validateOnChange: true,
  validateOnBlur: true,
});`}
        />
      </section>

      {/* Validation Rules Reference */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#313C97', marginBottom: '20px', borderBottom: '2px solid #313C97', paddingBottom: '10px' }}>
          Available Validation Rules
        </h2>
        
        <div style={{
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          overflow: 'hidden',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #e9ecef' }}>Rule</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #e9ecef' }}>Usage</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #e9ecef' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>required</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.required()</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Field must have a value</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>email</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.email()</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Must be valid email format</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>minLength</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.minLength(8)</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Minimum character length</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>maxLength</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.maxLength(100)</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Maximum character length</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>pattern</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.pattern(/regex/)</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Must match regular expression</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>number</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.number()</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Must be a valid number</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>url</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.url()</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Must be valid URL format</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>phone</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.phone()</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Must be valid phone number</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>strongPassword</td>
                <td style={{ padding: '12px', fontFamily: 'monospace', borderBottom: '1px solid #f0f0f0' }}>validationRules.strongPassword()</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>Strong password requirements</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>custom</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>validationRules.custom(fn, msg)</td>
                <td style={{ padding: '12px' }}>Custom validation function</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

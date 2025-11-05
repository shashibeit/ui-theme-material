// Main validation utility exports

// Types
export type {
  ValidationRule,
  FieldValidation,
  ValidationResult,
  FormValidationResult,
  FormState,
  ValidationSchema,
} from './utils/validation/types';

// Validation rules and patterns
export {
  patterns,
  validationRules,
} from './utils/validation/rules';

// Core validation functions
export {
  validateField,
  validateForm,
  validateTouchedFields,
  validateOnChange,
  validateOnBlur,
  hasErrors,
  getFieldError,
  getFieldErrors,
  clearFieldErrors,
  validateFieldAsync,
  createAsyncValidationRule,
} from './utils/validation/validator';

// React hook
export { useFormValidation } from './hooks/useFormValidation';

// Common validation schemas for reuse
export const commonSchemas = {
  // User registration
  userRegistration: {
    firstName: [
      { type: 'required' as const, message: 'First name is required' },
      { type: 'minLength' as const, value: 2, message: 'First name must be at least 2 characters' },
      { type: 'maxLength' as const, value: 50, message: 'First name must be less than 50 characters' },
    ],
    lastName: [
      { type: 'required' as const, message: 'Last name is required' },
      { type: 'minLength' as const, value: 2, message: 'Last name must be at least 2 characters' },
      { type: 'maxLength' as const, value: 50, message: 'Last name must be less than 50 characters' },
    ],
    email: [
      { type: 'required' as const, message: 'Email is required' },
      { type: 'email' as const, message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required' as const, message: 'Password is required' },
      { type: 'minLength' as const, value: 8, message: 'Password must be at least 8 characters' },
      {
        type: 'pattern' as const,
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Password must contain uppercase, lowercase, number and special character',
      },
    ],
  },

  // Contact form
  contactForm: {
    name: [
      { type: 'required' as const, message: 'Name is required' },
      { type: 'minLength' as const, value: 2, message: 'Name must be at least 2 characters' },
    ],
    email: [
      { type: 'required' as const, message: 'Email is required' },
      { type: 'email' as const, message: 'Please enter a valid email address' },
    ],
    subject: [
      { type: 'required' as const, message: 'Subject is required' },
      { type: 'minLength' as const, value: 5, message: 'Subject must be at least 5 characters' },
    ],
    message: [
      { type: 'required' as const, message: 'Message is required' },
      { type: 'minLength' as const, value: 10, message: 'Message must be at least 10 characters' },
      { type: 'maxLength' as const, value: 1000, message: 'Message must be less than 1000 characters' },
    ],
  },

  // Login form
  loginForm: {
    email: [
      { type: 'required' as const, message: 'Email is required' },
      { type: 'email' as const, message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required' as const, message: 'Password is required' },
    ],
  },

  // Profile form
  profileForm: {
    displayName: [
      { type: 'required' as const, message: 'Display name is required' },
      { type: 'minLength' as const, value: 3, message: 'Display name must be at least 3 characters' },
      { type: 'maxLength' as const, value: 30, message: 'Display name must be less than 30 characters' },
    ],
    bio: [
      { type: 'maxLength' as const, value: 500, message: 'Bio must be less than 500 characters' },
    ],
    website: [
      { type: 'url' as const, message: 'Please enter a valid URL' },
    ],
    phone: [
      { type: 'phone' as const, message: 'Please enter a valid phone number' },
    ],
  },
};

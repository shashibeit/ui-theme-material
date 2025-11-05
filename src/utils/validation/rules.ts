// Pre-defined validation rules

import type { ValidationRule } from './types';

// Common patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+\..+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z]+$/,
  numeric: /^[0-9]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  creditCard: /^[0-9]{13,19}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
};

// Validation rule creators
export const validationRules = {
  // Required validation
  required: (message = 'This field is required'): ValidationRule => ({
    type: 'required',
    message,
  }),

  // Email validation
  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    type: 'email',
    message,
  }),

  // Minimum length validation
  minLength: (length: number, message?: string): ValidationRule => ({
    type: 'minLength',
    value: length,
    message: message || `Must be at least ${length} characters long`,
  }),

  // Maximum length validation
  maxLength: (length: number, message?: string): ValidationRule => ({
    type: 'maxLength',
    value: length,
    message: message || `Must be no more than ${length} characters long`,
  }),

  // Pattern validation
  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
    type: 'pattern',
    value: regex,
    message,
  }),

  // Number validation
  number: (message = 'Must be a valid number'): ValidationRule => ({
    type: 'number',
    message,
  }),

  // URL validation
  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    type: 'url',
    message,
  }),

  // Phone validation
  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    type: 'phone',
    message,
  }),

  // Custom validation
  custom: (validator: (value: any) => boolean, message: string): ValidationRule => ({
    type: 'custom',
    validator,
    message,
  }),

  // Common preset validations
  strongPassword: (message = 'Password must contain at least 8 characters with uppercase, lowercase, number and special character'): ValidationRule => ({
    type: 'pattern',
    value: patterns.strongPassword,
    message,
  }),

  confirmPassword: (passwordField: string, message = 'Passwords do not match') => (formValues: Record<string, any>): ValidationRule => ({
    type: 'custom',
    validator: (value: string) => value === formValues[passwordField],
    message,
  }),

  minValue: (min: number, message?: string): ValidationRule => ({
    type: 'custom',
    validator: (value: number) => !isNaN(value) && value >= min,
    message: message || `Value must be at least ${min}`,
  }),

  maxValue: (max: number, message?: string): ValidationRule => ({
    type: 'custom',
    validator: (value: number) => !isNaN(value) && value <= max,
    message: message || `Value must be no more than ${max}`,
  }),

  range: (min: number, max: number, message?: string): ValidationRule => ({
    type: 'custom',
    validator: (value: number) => !isNaN(value) && value >= min && value <= max,
    message: message || `Value must be between ${min} and ${max}`,
  }),

  age: (minAge = 18, message?: string): ValidationRule => ({
    type: 'custom',
    validator: (birthDate: string) => {
      const today = new Date();
      const birth = new Date(birthDate);
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= minAge;
      }
      return age >= minAge;
    },
    message: message || `Must be at least ${minAge} years old`,
  }),

  fileSize: (maxSizeInMB: number, message?: string): ValidationRule => ({
    type: 'custom',
    validator: (file: File) => {
      if (!file) return true;
      return file.size <= maxSizeInMB * 1024 * 1024;
    },
    message: message || `File size must be less than ${maxSizeInMB}MB`,
  }),

  fileType: (allowedTypes: string[], message?: string): ValidationRule => ({
    type: 'custom',
    validator: (file: File) => {
      if (!file) return true;
      return allowedTypes.includes(file.type);
    },
    message: message || `File type must be one of: ${allowedTypes.join(', ')}`,
  }),
};

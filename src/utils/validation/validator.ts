// Core validation engine

import type { ValidationRule, ValidationResult, FieldValidation, FormValidationResult } from './types';

// Validate a single field value against rules
export const validateField = (value: any, rules: ValidationRule[]): ValidationResult => {
  const errors: string[] = [];

  for (const rule of rules) {
    let isValid = true;

    switch (rule.type) {
      case 'required':
        isValid = value !== null && 
                  value !== undefined && 
                  value !== '' && 
                  (Array.isArray(value) ? value.length > 0 : true);
        break;

      case 'email':
        if (value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailPattern.test(String(value));
        }
        break;

      case 'minLength':
        if (value) {
          isValid = String(value).length >= rule.value;
        }
        break;

      case 'maxLength':
        if (value) {
          isValid = String(value).length <= rule.value;
        }
        break;

      case 'pattern':
        if (value) {
          isValid = rule.value.test(String(value));
        }
        break;

      case 'number':
        if (value !== '' && value !== null && value !== undefined) {
          isValid = !isNaN(Number(value)) && isFinite(Number(value));
        }
        break;

      case 'url':
        if (value) {
          try {
            new URL(String(value));
            isValid = true;
          } catch {
            isValid = false;
          }
        }
        break;

      case 'phone':
        if (value) {
          const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
          isValid = phonePattern.test(String(value).replace(/[\s\-\(\)]/g, ''));
        }
        break;

      case 'custom':
        if (rule.validator) {
          isValid = rule.validator(value);
        }
        break;

      default:
        break;
    }

    if (!isValid) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    firstError: errors[0],
  };
};

// Validate entire form
export const validateForm = (
  fields: Record<string, FieldValidation>
): FormValidationResult => {
  const errors: Record<string, string[]> = {};
  const firstErrors: Record<string, string> = {};
  const touchedFields: string[] = [];
  const dirtyFields: string[] = [];

  let isFormValid = true;

  for (const [fieldName, field] of Object.entries(fields)) {
    const result = validateField(field.value, field.rules);
    
    if (!result.isValid) {
      errors[fieldName] = result.errors;
      firstErrors[fieldName] = result.firstError || '';
      isFormValid = false;
    }

    if (field.touched) {
      touchedFields.push(fieldName);
    }

    if (field.dirty) {
      dirtyFields.push(fieldName);
    }
  }

  return {
    isValid: isFormValid,
    errors,
    firstErrors,
    touchedFields,
    dirtyFields,
  };
};

// Validate only touched fields
export const validateTouchedFields = (
  fields: Record<string, FieldValidation>
): FormValidationResult => {
  const touchedFields = Object.fromEntries(
    Object.entries(fields).filter(([_, field]) => field.touched)
  );
  return validateForm(touchedFields);
};

// Utility functions
export const hasErrors = (errors: Record<string, string[]>): boolean => {
  return Object.values(errors).some(fieldErrors => fieldErrors.length > 0);
};

export const getFieldError = (
  errors: Record<string, string[]>,
  fieldName: string
): string | undefined => {
  return errors[fieldName]?.[0];
};

export const getFieldErrors = (
  errors: Record<string, string[]>,
  fieldName: string
): string[] => {
  return errors[fieldName] || [];
};

export const clearFieldErrors = (
  errors: Record<string, string[]>,
  fieldName: string
): Record<string, string[]> => {
  const newErrors = { ...errors };
  delete newErrors[fieldName];
  return newErrors;
};

// Advanced validation utilities
export const validateOnChange = (
  fieldName: string,
  value: any,
  rules: ValidationRule[],
  currentErrors: Record<string, string[]>
): Record<string, string[]> => {
  const result = validateField(value, rules);
  const newErrors = { ...currentErrors };

  if (result.isValid) {
    delete newErrors[fieldName];
  } else {
    newErrors[fieldName] = result.errors;
  }

  return newErrors;
};

export const validateOnBlur = (
  fieldName: string,
  value: any,
  rules: ValidationRule[],
  currentErrors: Record<string, string[]>
): Record<string, string[]> => {
  return validateOnChange(fieldName, value, rules, currentErrors);
};

// Async validation support
export type AsyncValidator = (value: any) => Promise<boolean>;

export const createAsyncValidationRule = (
  validator: AsyncValidator,
  message: string
): ValidationRule => ({
  type: 'custom',
  validator: (value: any) => {
    // This is a synchronous interface, so we'll need to handle async differently
    // The async validation should be handled at the form level
    return true; // Placeholder
  },
  message,
});

export const validateFieldAsync = async (
  value: any,
  rules: ValidationRule[],
  asyncValidators: AsyncValidator[] = []
): Promise<ValidationResult> => {
  // First run synchronous validation
  const syncResult = validateField(value, rules);
  
  if (!syncResult.isValid) {
    return syncResult;
  }

  // Then run async validation
  const asyncResults = await Promise.all(
    asyncValidators.map(validator => validator(value))
  );

  const hasAsyncErrors = asyncResults.some(result => !result);
  
  return {
    isValid: !hasAsyncErrors,
    errors: hasAsyncErrors ? ['Async validation failed'] : [],
    firstError: hasAsyncErrors ? 'Async validation failed' : undefined,
  };
};

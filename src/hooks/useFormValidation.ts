// React hook for form validation

import { useState, useCallback, useEffect } from 'react';
import { validateForm, validateField, validateOnChange } from '../utils/validation/validator';
import type { ValidationRule, FormState, ValidationSchema } from '../utils/validation/types';

interface UseFormValidationOptions {
  initialValues?: Record<string, any>;
  validationSchema?: ValidationSchema;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
}

interface UseFormValidationReturn {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  
  // Field operations
  setValue: (field: string, value: any) => void;
  setValues: (values: Record<string, any>) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
  setFieldError: (field: string, error: string | string[]) => void;
  clearFieldError: (field: string) => void;
  
  // Form operations
  handleSubmit: (onSubmit: (values: Record<string, any>) => void | Promise<void>) => (e?: React.FormEvent) => Promise<void>;
  resetForm: (newValues?: Record<string, any>) => void;
  validateForm: () => boolean;
  validateField: (field: string) => boolean;
  
  // Handlers
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: string) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  
  // Utilities
  getFieldProps: (field: string) => {
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error: string | undefined;
    touched: boolean;
    dirty: boolean;
  };
}

export const useFormValidation = (options: UseFormValidationOptions = {}): UseFormValidationReturn => {
  const {
    initialValues = {},
    validationSchema = {},
    validateOnChange: validateOnChangeOption = true,
    validateOnBlur: validateOnBlurOption = true,
    validateOnMount = false,
  } = options;

  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    dirty: {},
    isSubmitting: false,
    isValid: true,
  });

  // Validate entire form
  const validateFormFn = useCallback((): boolean => {
    const fields = Object.keys(validationSchema).reduce((acc, fieldName) => {
      acc[fieldName] = {
        value: state.values[fieldName],
        rules: validationSchema[fieldName] || [],
        touched: state.touched[fieldName],
        dirty: state.dirty[fieldName],
      };
      return acc;
    }, {} as Record<string, { value: any; rules: ValidationRule[]; touched?: boolean; dirty?: boolean }>);

    const result = validateForm(fields);
    
    setState(prev => ({
      ...prev,
      errors: result.errors,
      isValid: result.isValid,
    }));

    return result.isValid;
  }, [state.values, state.touched, state.dirty, validationSchema]);

  // Validate single field
  const validateFieldFn = useCallback((field: string): boolean => {
    const rules = validationSchema[field] || [];
    const result = validateField(state.values[field], rules);
    
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: result.errors,
      },
    }));

    return result.isValid;
  }, [state.values, validationSchema]);

  // Set field value
  const setValue = useCallback((field: string, value: any) => {
    setState(prev => {
      const newValues = { ...prev.values, [field]: value };
      const newDirty = { ...prev.dirty, [field]: true };
      let newErrors = prev.errors;

      // Validate on change if enabled
      if (validateOnChangeOption && validationSchema[field]) {
        newErrors = validateOnChange(field, value, validationSchema[field], prev.errors);
      }

      return {
        ...prev,
        values: newValues,
        dirty: newDirty,
        errors: newErrors,
      };
    });
  }, [validateOnChangeOption, validationSchema]);

  // Set multiple values
  const setValues = useCallback((values: Record<string, any>) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, ...values },
      dirty: Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), prev.dirty),
    }));
  }, []);

  // Set field touched
  const setFieldTouched = useCallback((field: string, touched = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: touched },
    }));
  }, []);

  // Set field error
  const setFieldError = useCallback((field: string, error: string | string[]) => {
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: Array.isArray(error) ? error : [error],
      },
    }));
  }, []);

  // Clear field error
  const clearFieldError = useCallback((field: string) => {
    setState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field];
      return {
        ...prev,
        errors: newErrors,
      };
    });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: Record<string, any>) => void | Promise<void>) =>
      async (e?: React.FormEvent) => {
        if (e) {
          e.preventDefault();
        }

        setState(prev => ({ ...prev, isSubmitting: true }));

        // Validate all fields
        const isValid = validateFormFn();

        if (isValid) {
          try {
            await onSubmit(state.values);
          } catch (error) {
            console.error('Form submission error:', error);
          }
        }

        setState(prev => ({ ...prev, isSubmitting: false }));
      },
    [state.values, validateFormFn]
  );

  // Reset form
  const resetForm = useCallback((newValues?: Record<string, any>) => {
    setState({
      values: newValues || initialValues,
      errors: {},
      touched: {},
      dirty: {},
      isSubmitting: false,
      isValid: true,
    });
  }, [initialValues]);

  // Handle input change
  const handleChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setValue(field, value);
    },
    [setValue]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (field: string) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFieldTouched(field, true);
      
      if (validateOnBlurOption && validationSchema[field]) {
        validateFieldFn(field);
      }
    },
    [setFieldTouched, validateOnBlurOption, validationSchema, validateFieldFn]
  );

  // Get field props helper
  const getFieldProps = useCallback(
    (field: string) => ({
      value: state.values[field] || '',
      onChange: handleChange(field),
      onBlur: handleBlur(field),
      error: state.errors[field]?.[0],
      touched: !!state.touched[field],
      dirty: !!state.dirty[field],
    }),
    [state.values, state.errors, state.touched, state.dirty, handleChange, handleBlur]
  );

  // Validate on mount if required
  useEffect(() => {
    if (validateOnMount) {
      validateFormFn();
    }
  }, [validateOnMount, validateFormFn]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    dirty: state.dirty,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    
    setValue,
    setValues,
    setFieldTouched,
    setFieldError,
    clearFieldError,
    
    handleSubmit,
    resetForm,
    validateForm: validateFormFn,
    validateField: validateFieldFn,
    
    handleChange,
    handleBlur,
    getFieldProps,
  };
};

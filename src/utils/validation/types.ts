// Form validation types and interfaces

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'number' | 'url' | 'phone';
  message: string;
  value?: any;
  validator?: (value: any) => boolean;
}

export interface FieldValidation {
  value: any;
  rules: ValidationRule[];
  touched?: boolean;
  dirty?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  firstError?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  firstErrors: Record<string, string>;
  touchedFields: string[];
  dirtyFields: string[];
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export type ValidationSchema = Record<string, ValidationRule[]>;

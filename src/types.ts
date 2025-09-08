export interface BaseInputProps {
  id?: string;
  name?: string;
  class?: string;
  style?: Record<string, any>;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface TextInputProps extends BaseInputProps {
  modelValue?: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'tel';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface NumberInputProps extends BaseInputProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectInputProps extends BaseInputProps {
  modelValue?: string | string[];
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  multiple?: boolean;
  searchable?: boolean;
}

export interface DateInputProps extends BaseInputProps {
  modelValue?: string;
  type?: 'date' | 'datetime-local' | 'time';
  min?: string;
  max?: string;
}

export interface CheckboxProps extends BaseInputProps {
  modelValue?: boolean;
  label?: string;
  indeterminate?: boolean;
}

export interface RadioGroupProps extends BaseInputProps {
  modelValue?: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  direction?: 'horizontal' | 'vertical';
}

export interface TextareaProps extends BaseInputProps {
  modelValue?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

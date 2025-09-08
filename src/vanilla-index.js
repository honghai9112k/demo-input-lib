// Pure JavaScript Input Library for Lowcoder
// CSS will be injected by build process
import './styles.css';

// Base Input Class
class BaseInput {
  constructor(options = {}) {
    this.options = options;
    this.value = options.value || '';
    this.listeners = {};
    this.element = null;
  }

  createElement() {
    throw new Error('createElement must be implemented by subclass');
  }

  mount(containerSelector) {
    const container = typeof containerSelector === 'string' 
      ? document.querySelector(containerSelector) 
      : containerSelector;
    
    if (container) {
      if (!this.element) {
        this.element = this.createElement();
      }
      container.appendChild(this.element);
    }
    return this;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return this;
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  getValue() {
    if (!this.element) return this.value;
    
    if (this.element.tagName === 'DIV') {
      // For checkbox/radio containers
      const input = this.element.querySelector('input');
      if (input.type === 'checkbox') {
        return input.checked;
      } else if (input.type === 'radio') {
        const checked = this.element.querySelector('input:checked');
        return checked ? checked.value : '';
      }
    }
    return this.element.value;
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      if (this.element.tagName === 'DIV') {
        // For checkbox/radio containers
        const input = this.element.querySelector('input');
        if (input.type === 'checkbox') {
          input.checked = Boolean(value);
        } else if (input.type === 'radio') {
          const radio = this.element.querySelector(`input[value="${value}"]`);
          if (radio) radio.checked = true;
        }
      } else {
        this.element.value = value;
      }
    }
    this.emit('change', value);
    return this;
  }
}

// Text Input Class
class TextInput extends BaseInput {
  createElement() {
    const input = document.createElement('input');
    input.type = this.options.type || 'text';
    input.className = `lowcoder-text-input ${this.options.class || ''}`;
    input.id = this.options.id || '';
    input.name = this.options.name || '';
    input.placeholder = this.options.placeholder || '';
    input.disabled = this.options.disabled || false;
    input.required = this.options.required || false;
    input.value = this.value;

    if (this.options.maxLength) input.maxLength = this.options.maxLength;
    if (this.options.minLength) input.minLength = this.options.minLength;
    if (this.options.pattern) input.pattern = this.options.pattern;

    input.addEventListener('input', (e) => {
      this.value = e.target.value;
      this.emit('input', this.value);
    });
    
    input.addEventListener('change', (e) => {
      this.value = e.target.value;
      this.emit('change', this.value);
    });
    
    input.addEventListener('blur', (e) => this.emit('blur', e));
    input.addEventListener('focus', (e) => this.emit('focus', e));

    return input;
  }
}

// Number Input Class
class NumberInput extends BaseInput {
  createElement() {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = `lowcoder-number-input ${this.options.class || ''}`;
    input.id = this.options.id || '';
    input.name = this.options.name || '';
    input.placeholder = this.options.placeholder || '';
    input.disabled = this.options.disabled || false;
    input.required = this.options.required || false;
    input.value = this.value;

    if (this.options.min !== undefined) input.min = this.options.min;
    if (this.options.max !== undefined) input.max = this.options.max;
    if (this.options.step !== undefined) input.step = this.options.step;

    input.addEventListener('input', (e) => {
      const numValue = parseFloat(e.target.value) || 0;
      this.value = numValue;
      this.emit('input', this.value);
    });
    
    input.addEventListener('change', (e) => {
      const numValue = parseFloat(e.target.value) || 0;
      this.value = numValue;
      this.emit('change', this.value);
    });
    
    input.addEventListener('blur', (e) => this.emit('blur', e));
    input.addEventListener('focus', (e) => this.emit('focus', e));

    return input;
  }
}

// Select Input Class
class SelectInput extends BaseInput {
  createElement() {
    const select = document.createElement('select');
    select.className = `lowcoder-select-input ${this.options.class || ''}`;
    select.id = this.options.id || '';
    select.name = this.options.name || '';
    select.disabled = this.options.disabled || false;
    select.required = this.options.required || false;
    select.multiple = this.options.multiple || false;

    if (this.options.placeholder && !this.options.multiple) {
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = this.options.placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);
    }

    if (this.options.options) {
      this.options.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        option.disabled = opt.disabled || false;
        if (opt.value === this.value) option.selected = true;
        select.appendChild(option);
      });
    }

    select.addEventListener('change', (e) => {
      if (this.options.multiple) {
        this.value = Array.from(e.target.selectedOptions).map(opt => opt.value);
      } else {
        this.value = e.target.value;
      }
      this.emit('change', this.value);
    });
    
    select.addEventListener('blur', (e) => this.emit('blur', e));
    select.addEventListener('focus', (e) => this.emit('focus', e));

    return select;
  }
}

// Textarea Input Class
class TextareaInput extends BaseInput {
  createElement() {
    const textarea = document.createElement('textarea');
    textarea.className = `lowcoder-textarea-input ${this.options.class || ''}`;
    textarea.id = this.options.id || '';
    textarea.name = this.options.name || '';
    textarea.placeholder = this.options.placeholder || '';
    textarea.disabled = this.options.disabled || false;
    textarea.required = this.options.required || false;
    textarea.rows = this.options.rows || 3;
    textarea.value = this.value;

    if (this.options.maxLength) textarea.maxLength = this.options.maxLength;
    if (this.options.minLength) textarea.minLength = this.options.minLength;
    if (this.options.cols) textarea.cols = this.options.cols;

    textarea.addEventListener('input', (e) => {
      this.value = e.target.value;
      this.emit('input', this.value);
    });
    
    textarea.addEventListener('change', (e) => {
      this.value = e.target.value;
      this.emit('change', this.value);
    });
    
    textarea.addEventListener('blur', (e) => this.emit('blur', e));
    textarea.addEventListener('focus', (e) => this.emit('focus', e));

    return textarea;
  }
}

// Checkbox Input Class
class CheckboxInput extends BaseInput {
  createElement() {
    const container = document.createElement('div');
    container.className = `lowcoder-checkbox ${this.options.class || ''}`;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = this.options.id || '';
    input.name = this.options.name || '';
    input.disabled = this.options.disabled || false;
    input.required = this.options.required || false;
    input.checked = Boolean(this.value);

    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = this.options.label || '';

    container.appendChild(input);
    if (this.options.label) container.appendChild(label);

    input.addEventListener('change', (e) => {
      this.value = e.target.checked;
      this.emit('change', this.value);
    });
    
    input.addEventListener('blur', (e) => this.emit('blur', e));
    input.addEventListener('focus', (e) => this.emit('focus', e));

    return container;
  }
}

// Radio Group Input Class
class RadioGroupInput extends BaseInput {
  createElement() {
    const container = document.createElement('div');
    container.className = `lowcoder-radio-group ${this.options.direction || 'vertical'} ${this.options.class || ''}`;

    if (this.options.options) {
      const groupName = `radio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      this.options.options.forEach(opt => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'lowcoder-radio-item';

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `${this.options.id || 'radio'}-${opt.value}`;
        input.name = this.options.name || groupName;
        input.value = opt.value;
        input.disabled = this.options.disabled || opt.disabled || false;
        input.checked = opt.value === this.value;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = opt.label;

        itemContainer.appendChild(input);
        itemContainer.appendChild(label);
        container.appendChild(itemContainer);

        input.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.value = e.target.value;
            this.emit('change', this.value);
          }
        });
        
        input.addEventListener('blur', (e) => this.emit('blur', e));
        input.addEventListener('focus', (e) => this.emit('focus', e));
      });
    }

    return container;
  }
}

// Date Input Class
class DateInput extends BaseInput {
  createElement() {
    const input = document.createElement('input');
    input.type = this.options.type || 'date';
    input.className = `lowcoder-date-input ${this.options.class || ''}`;
    input.id = this.options.id || '';
    input.name = this.options.name || '';
    input.disabled = this.options.disabled || false;
    input.required = this.options.required || false;
    input.value = this.value;

    if (this.options.min) input.min = this.options.min;
    if (this.options.max) input.max = this.options.max;

    input.addEventListener('change', (e) => {
      this.value = e.target.value;
      this.emit('change', this.value);
    });
    
    input.addEventListener('blur', (e) => this.emit('blur', e));
    input.addEventListener('focus', (e) => this.emit('focus', e));

    return input;
  }
}

// Main Library Object with Constructor Classes
const LowcodeInputLib = {
  // Export actual constructor classes
  TextInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  CheckboxInput,
  RadioGroupInput,
  DateInput,
  
  // Helper factory methods (optional)
  createTextInput: (options) => new TextInput(options),
  createNumberInput: (options) => new NumberInput(options),
  createSelectInput: (options) => new SelectInput(options),
  createTextareaInput: (options) => new TextareaInput(options),
  createCheckboxInput: (options) => new CheckboxInput(options),
  createRadioGroupInput: (options) => new RadioGroupInput(options),
  createDateInput: (options) => new DateInput(options),
  
  version: '2.0.0'
};

// Auto-register global if in browser
if (typeof window !== 'undefined') {
  window.LowcodeInputLib = LowcodeInputLib;
  
  // Also expose individual classes globally for easier access
  window.LowcoderTextInput = TextInput;
  window.LowcoderNumberInput = NumberInput;
  window.LowcoderSelectInput = SelectInput;
  window.LowcoderTextareaInput = TextareaInput;
  window.LowcoderCheckboxInput = CheckboxInput;
  window.LowcoderRadioGroupInput = RadioGroupInput;
  window.LowcoderDateInput = DateInput;
  
  console.log('✅ LowcodeInputLib loaded successfully!');
}

export default LowcodeInputLib;

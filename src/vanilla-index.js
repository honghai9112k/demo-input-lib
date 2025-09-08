// Pure JavaScript Input Library for Lowcoder
// CSS will be injected by build process
import './styles.css';

// Pure JS implementation without Vue dependencies
class InputComponent {
  constructor(type, options = {}) {
    this.type = type;
    this.options = options;
    this.element = null;
    this.value = options.value || '';
    this.listeners = {};
  }

  createElement() {
    if (this.element) return this.element;

    switch (this.type) {
      case 'text':
      case 'number':
      case 'date':
        this.element = this.createInputElement();
        break;
      case 'textarea':
        this.element = this.createTextareaElement();
        break;
      case 'select':
        this.element = this.createSelectElement();
        break;
      case 'checkbox':
        this.element = this.createCheckboxElement();
        break;
      case 'radio':
        this.element = this.createRadioGroupElement();
        break;
    }

    return this.element;
  }

  createInputElement() {
    const input = document.createElement('input');
    input.type = this.type;
    input.className = `lowcode-${this.type}-input ${this.options.class || ''}`;
    input.id = this.options.id || '';
    input.name = this.options.name || '';
    input.placeholder = this.options.placeholder || '';
    input.disabled = this.options.disabled || false;
    input.required = this.options.required || false;
    input.value = this.value;

    if (this.type === 'number') {
      if (this.options.min !== undefined) input.min = this.options.min;
      if (this.options.max !== undefined) input.max = this.options.max;
      if (this.options.step !== undefined) input.step = this.options.step;
    }

    input.addEventListener('input', (e) => this.handleInput(e));
    input.addEventListener('change', (e) => this.handleChange(e));
    input.addEventListener('blur', (e) => this.handleBlur(e));
    input.addEventListener('focus', (e) => this.handleFocus(e));

    return input;
  }

  createTextareaElement() {
    const textarea = document.createElement('textarea');
    textarea.className = `lowcode-textarea-input ${this.options.class || ''}`;
    textarea.id = this.options.id || '';
    textarea.name = this.options.name || '';
    textarea.placeholder = this.options.placeholder || '';
    textarea.disabled = this.options.disabled || false;
    textarea.required = this.options.required || false;
    textarea.rows = this.options.rows || 3;
    textarea.value = this.value;

    textarea.addEventListener('input', (e) => this.handleInput(e));
    textarea.addEventListener('change', (e) => this.handleChange(e));
    textarea.addEventListener('blur', (e) => this.handleBlur(e));
    textarea.addEventListener('focus', (e) => this.handleFocus(e));

    return textarea;
  }

  createSelectElement() {
    const select = document.createElement('select');
    select.className = `lowcode-select-input ${this.options.class || ''}`;
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

    select.addEventListener('change', (e) => this.handleChange(e));
    select.addEventListener('blur', (e) => this.handleBlur(e));
    select.addEventListener('focus', (e) => this.handleFocus(e));

    return select;
  }

  createCheckboxElement() {
    const container = document.createElement('div');
    container.className = `lowcode-checkbox ${this.options.class || ''}`;

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

    input.addEventListener('change', (e) => this.handleChange(e));
    input.addEventListener('blur', (e) => this.handleBlur(e));
    input.addEventListener('focus', (e) => this.handleFocus(e));

    return container;
  }

  createRadioGroupElement() {
    const container = document.createElement('div');
    container.className = `lowcode-radio-group ${this.options.direction || 'vertical'} ${this.options.class || ''}`;

    if (this.options.options) {
      this.options.options.forEach(opt => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'lowcode-radio-item';

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `${this.options.id || 'radio'}-${opt.value}`;
        input.name = this.options.name || '';
        input.value = opt.value;
        input.disabled = this.options.disabled || opt.disabled || false;
        input.checked = opt.value === this.value;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = opt.label;

        itemContainer.appendChild(input);
        itemContainer.appendChild(label);
        container.appendChild(itemContainer);

        input.addEventListener('change', (e) => this.handleChange(e));
        input.addEventListener('blur', (e) => this.handleBlur(e));
        input.addEventListener('focus', (e) => this.handleFocus(e));
      });
    }

    return container;
  }

  handleInput(e) {
    this.value = e.target.value;
    this.emit('input', this.value);
  }

  handleChange(e) {
    if (this.type === 'checkbox') {
      this.value = e.target.checked;
    } else if (this.type === 'number') {
      this.value = parseFloat(e.target.value) || 0;
    } else if (this.type === 'select' && this.options.multiple) {
      this.value = Array.from(e.target.selectedOptions).map(opt => opt.value);
    } else {
      this.value = e.target.value;
    }
    this.emit('change', this.value);
  }

  handleBlur(e) {
    this.emit('blur', e);
  }

  handleFocus(e) {
    this.emit('focus', e);
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      if (this.type === 'checkbox') {
        this.element.querySelector('input').checked = Boolean(value);
      } else if (this.type === 'radio') {
        const radio = this.element.querySelector(`input[value="${value}"]`);
        if (radio) radio.checked = true;
      } else {
        const input = this.element.tagName === 'DIV' ? this.element.querySelector('input, select, textarea') : this.element;
        if (input) input.value = value;
      }
    }
  }

  getValue() {
    return this.value;
  }

  mount(containerSelector) {
    const container = typeof containerSelector === 'string' 
      ? document.querySelector(containerSelector) 
      : containerSelector;
    
    if (container) {
      container.appendChild(this.createElement());
    }
    return this;
  }
}

// Factory functions for easier use
const LowcodeInputLib = {
  createTextInput: (options) => new InputComponent('text', options),
  createNumberInput: (options) => new InputComponent('number', options),
  createTextareaInput: (options) => new InputComponent('textarea', options),
  createSelectInput: (options) => new InputComponent('select', options),
  createCheckboxInput: (options) => new InputComponent('checkbox', options),
  createRadioGroupInput: (options) => new InputComponent('radio', options),
  createDateInput: (options) => new InputComponent('date', options),
  
  // Direct component class
  InputComponent,
  
  version: '1.0.0'
};

// Auto-register global if in browser
if (typeof window !== 'undefined') {
  window.LowcodeInputLib = LowcodeInputLib;
  window.createLowcodeApp = function(config) {
    return {
      mount: function(selector) {
        console.log('Pure JS version mounted to:', selector);
      }
    };
  };
}

export default LowcodeInputLib;

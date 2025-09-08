// Import CSS styles - sẽ được inline vào JS bundle
import './styles.css';

import TextInput from './components/TextInput.vue';
import NumberInput from './components/NumberInput.vue';
import SelectInput from './components/SelectInput.vue';
import TextareaInput from './components/TextareaInput.vue';
import CheckboxInput from './components/CheckboxInput.vue';
import RadioGroupInput from './components/RadioGroupInput.vue';
import DateInput from './components/DateInput.vue';

// Export components individually
export {
  TextInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  CheckboxInput,
  RadioGroupInput,
  DateInput
};

// Export types
export * from './types';

// Auto-register components globally when Vue is available
const autoRegister = () => {
  if (typeof window !== 'undefined' && (window as any).Vue) {
    const Vue = (window as any).Vue;
    if (Vue.createApp) {
      // Vue 3 - Register components globally
      const app = Vue.createApp({});
      app.component('lowcoder-text-input', TextInput);
      app.component('lowcoder-number-input', NumberInput);
      app.component('lowcoder-select-input', SelectInput);
      app.component('lowcoder-textarea-input', TextareaInput);
      app.component('lowcoder-checkbox-input', CheckboxInput);
      app.component('lowcoder-radio-group-input', RadioGroupInput);
      app.component('lowcoder-date-input', DateInput);
      
      // Make components available globally
      (window as any).LowcoderInputComponents = {
        TextInput,
        NumberInput,
        SelectInput,
        TextareaInput,
        CheckboxInput,
        RadioGroupInput,
        DateInput
      };
    }
  }
};

// Try to auto-register immediately
autoRegister();

// If Vue is not available yet, wait for it
if (typeof window !== 'undefined' && !(window as any).Vue) {
  const checkVue = setInterval(() => {
    if ((window as any).Vue) {
      clearInterval(checkVue);
      autoRegister();
    }
  }, 100);
  
  // Stop checking after 10 seconds
  setTimeout(() => clearInterval(checkVue), 10000);
}

// Default export for UMD build - Lowcoder sẽ sử dụng
const LowcoderInputLib = {
  TextInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  CheckboxInput,
  RadioGroupInput,
  DateInput,
  // Install function for manual registration
  install: (app: any) => {
    app.component('lowcoder-text-input', TextInput);
    app.component('lowcoder-number-input', NumberInput);
    app.component('lowcoder-select-input', SelectInput);
    app.component('lowcoder-textarea-input', TextareaInput);
    app.component('lowcoder-checkbox-input', CheckboxInput);
    app.component('lowcoder-radio-group-input', RadioGroupInput);
    app.component('lowcoder-date-input', DateInput);
  },
  // Version info
  version: '1.0.0'
};

export default LowcoderInputLib;

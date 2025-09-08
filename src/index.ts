// Import CSS styles - sẽ được inline vào JS bundle
import './styles.css';
import { createApp } from 'vue';

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

// Auto-register components globally using bundled Vue
const autoRegister = () => {
  if (typeof window !== 'undefined') {
    // Create temporary app to register components globally
    const tempApp = createApp({});
    tempApp.component('lowcoder-text-input', TextInput);
    tempApp.component('lowcoder-number-input', NumberInput);
    tempApp.component('lowcoder-select-input', SelectInput);
    tempApp.component('lowcoder-textarea-input', TextareaInput);
    tempApp.component('lowcoder-checkbox-input', CheckboxInput);
    tempApp.component('lowcoder-radio-group-input', RadioGroupInput);
    tempApp.component('lowcoder-date-input', DateInput);
    
    // Make Vue and components available globally
    (window as any).Vue = { createApp };
    (window as any).LowcoderInputComponents = {
      TextInput,
      NumberInput,
      SelectInput,
      TextareaInput,
      CheckboxInput,
      RadioGroupInput,
      DateInput
    };

    // Auto-mount helper
    (window as any).createLowcoderApp = (config: any) => {
      const app = createApp(config);
      app.component('lowcoder-text-input', TextInput);
      app.component('lowcoder-number-input', NumberInput);
      app.component('lowcoder-select-input', SelectInput);
      app.component('lowcoder-textarea-input', TextareaInput);
      app.component('lowcoder-checkbox-input', CheckboxInput);
      app.component('lowcoder-radio-group-input', RadioGroupInput);
      app.component('lowcoder-date-input', DateInput);
      return app;
    };
  }
};

// Auto-register immediately
autoRegister();

// Default export for UMD build - Lowcoder sẽ sử dụng
const LowcoderInputLib = {
  TextInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  CheckboxInput,
  RadioGroupInput,
  DateInput,
  createApp, // Export Vue's createApp
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

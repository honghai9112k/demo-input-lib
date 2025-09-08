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

// Default export for UMD build - Lowcoder sẽ sử dụng
const LowcoderInputLib = {
  TextInput,
  NumberInput,
  SelectInput,
  TextareaInput,
  CheckboxInput,
  RadioGroupInput,
  DateInput,
  // Version info
  version: '1.0.0'
};

export default LowcoderInputLib;

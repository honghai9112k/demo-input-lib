<template>
  <div :class="radioGroupClass">
    <div
      v-for="option in options"
      :key="option.value"
      class="lowcoder-radio-item"
    >
      <input
        :id="`${id}-${option.value}`"
        :name="name"
        type="radio"
        :value="option.value"
        :checked="modelValue === option.value"
        :disabled="disabled || option.disabled"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <label :for="`${id}-${option.value}`">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RadioGroupProps } from '../types';

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: '',
  class: '',
  disabled: false,
  required: false,
  direction: 'vertical',
  options: () => []
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'change': [value: string];
  'blur': [];
  'focus': [];
}>();

const radioGroupClass = computed(() => {
  return `lowcoder-radio-group ${props.direction} ${props.class}`;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit('update:modelValue', value);
  emit('change', value);
  if (props.onChange) {
    props.onChange(value);
  }
};

const handleBlur = () => {
  emit('blur');
  if (props.onBlur) {
    props.onBlur();
  }
};

const handleFocus = () => {
  emit('focus');
  if (props.onFocus) {
    props.onFocus();
  }
};
</script>

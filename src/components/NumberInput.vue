<template>
  <input
    :id="id"
    :name="name"
    type="number"
    :value="modelValue"
    :class="inputClass"
    :disabled="disabled"
    :required="required"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NumberInputProps } from '../types';

const props = withDefaults(defineProps<NumberInputProps>(), {
  modelValue: 0,
  class: '',
  disabled: false,
  required: false,
  step: 1
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
  'change': [value: number];
  'blur': [];
  'focus': [];
}>();

const inputClass = computed(() => {
  return `lowcoder-number-input ${props.class}`;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value) || 0;
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

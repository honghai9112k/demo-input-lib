<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :value="modelValue"
    :class="inputClass"
    :disabled="disabled"
    :required="required"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DateInputProps } from '../types';

const props = withDefaults(defineProps<DateInputProps>(), {
  modelValue: '',
  type: 'date',
  class: '',
  disabled: false,
  required: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'change': [value: string];
  'blur': [];
  'focus': [];
}>();

const inputClass = computed(() => {
  return `lowcoder-date-input ${props.class}`;
});

const handleInput = (event: Event) => {
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

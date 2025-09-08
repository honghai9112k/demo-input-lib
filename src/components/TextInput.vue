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
    :maxlength="maxLength"
    :minlength="minLength"
    :pattern="pattern"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextInputProps } from '../types';

const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  type: 'text',
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
  return `lowcoder-text-input ${props.class}`;
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

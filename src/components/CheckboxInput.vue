<template>
  <div :class="checkboxClass">
    <input
      :id="id"
      :name="name"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <label v-if="label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CheckboxProps } from '../types';

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  class: '',
  disabled: false,
  required: false,
  indeterminate: false
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'change': [value: boolean];
  'blur': [];
  'focus': [];
}>();

const checkboxClass = computed(() => {
  return `lowcoder-checkbox ${props.class}`;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;
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

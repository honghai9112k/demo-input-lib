<template>
  <textarea
    :id="id"
    :name="name"
    :value="modelValue"
    :class="inputClass"
    :disabled="disabled"
    :required="required"
    :placeholder="placeholder"
    :rows="rows"
    :cols="cols"
    :maxlength="maxLength"
    :minlength="minLength"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextareaProps } from '../types';

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  class: '',
  disabled: false,
  required: false,
  rows: 3,
  resize: 'vertical'
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'change': [value: string];
  'blur': [];
  'focus': [];
}>();

const inputClass = computed(() => {
  return `lowcoder-textarea-input ${props.class}`;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
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

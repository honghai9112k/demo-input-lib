<template>
  <select
    :id="id"
    :name="name"
    :value="modelValue"
    :class="inputClass"
    :disabled="disabled"
    :required="required"
    :multiple="multiple"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <option v-if="!multiple && placeholder" value="" disabled>
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SelectInputProps } from '../types';

const props = withDefaults(defineProps<SelectInputProps>(), {
  modelValue: '',
  class: '',
  disabled: false,
  required: false,
  multiple: false,
  searchable: false,
  options: () => []
});

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
  'change': [value: string | string[]];
  'blur': [];
  'focus': [];
}>();

const inputClass = computed(() => {
  return `lowcoder-select-input ${props.class}`;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  let value: string | string[];
  
  if (props.multiple) {
    value = Array.from(target.selectedOptions).map(option => option.value);
  } else {
    value = target.value;
  }
  
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

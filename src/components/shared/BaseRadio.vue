<template>
  <input
    type="radio"
    :checked="modelValue === value"
    :value="value"
    v-bind="$attrs"
    @change="$emit('update:modelValue', value)"
  />
  <label
    v-if="label"
    class="ml-2 text-sm relative -top-[2px]"
    >{{ label }}</label
  >
</template>

<script setup>
defineProps({
  label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
})
</script>

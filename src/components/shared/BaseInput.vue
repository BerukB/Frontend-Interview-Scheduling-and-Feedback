<template>
  <div>
    <label v-if="label" class="block text-sm mb-2">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="w-full min-w-[300px] border border-gray-100 bg-gray-50 rounded-md py-2 px-3 focus:outline-none"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
})
</script>

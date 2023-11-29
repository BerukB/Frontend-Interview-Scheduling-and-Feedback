<template>
    <div>
        <label v-if="label" class="block text-sm mb-2">{{ label }}</label>
      <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="w-full min-w-[300px] border border-gray-100 bg-gray-50 rounded-md py-2 px-3 focus:outline-none"
      />
  
      <ul >
        <li v-for="item in filteredList" :key="item.id"
       
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import {defineProps } from 'vue';

  import {ref, computed } from 'vue';
  
  const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => [],
  }
})

const searchInput = ref('');



const filteredList = computed(() => {
  const query = searchInput.value.toLowerCase().trim();
  return props.list.value.filter(name => name.toLowerCase().startsWith(query));
});

  </script>
    
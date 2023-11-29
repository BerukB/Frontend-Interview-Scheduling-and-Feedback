<template>
    <div class="search-select">
      <input
        v-model="searchTerm"
        @input="filterOptions"
        placeholder="Search..."
        class="w-full min-w-[300px] border border-gray-100 bg-gray-50 rounded-md py-2 px-3 focus:outline-none"
      />
      <ul v-show="filteredOptions.length >= 0">
        <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps(['options']);
  
  const searchTerm = ref('');
  const filteredOptions = ref(props.options);
  
  const filterOptions = () => {
    filteredOptions.value = props.options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  };
  
  const selectOption = option => {
    searchTerm.value = option.label;
    filteredOptions.value = props.options;
    // You can perform additional actions when an option is selected
  };
  
  onMounted(() => {
    filterOptions(); // Initial filter
  });
  </script>
  
  <style scoped>
  .search-select {
    position: relative;
    width: 200px;
  }
  
  input {
    width: 100%;
    padding: 8px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 150px;
    overflow-y: auto;
  
  }
  
  li {
    padding: 8px;
    cursor: pointer;
    color: #000;
    font-size: large;
  }
  
  li:hover {
    background-color: #f4f4f4;
  }
  </style>
  
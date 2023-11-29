<template>
  <ul class="flex flex-col py-4">
    <MenuListItem
      v-for="menuItem in menuItems"
      :key="menuItem"
      :menuItem="menuItem"
    />
  </ul>
</template>

<script setup>
import MenuListItem from '@/components/layout/MenuListItem.vue';
import { ref } from 'vue'

const menuItems = ref([
  {name: 'Home', url: '/', icon: 'fa-solid fa-house'},
  {name: 'Candidates', url: '/candidates', icon: 'fa-solid fa-users'},
  {name: 'All Schedule', url: '/schedules', icon: 'fa-regular fa-calendar'},
  {name: 'My Schedules', url: '/schedules/me', icon: 'fa-solid fa-calendar-check'},
  // {name: 'Feedback', url: '/feedback', icon: 'fa-solid fa-comment-dots'},
  ])
</script>

<template>
  <li>
    <RouterLink
      :to="menuItem.url"
      active-class="active-menu"
      class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
    >
      <span
        class="inline-flex items-center justify-center h-12 w-12 text-gray-400"
      >
        <font-awesome-icon :icon="menuItem.icon" />
      </span>
      <span class="text-sm font-medium">{{ menuItem.name }} </span>
    </RouterLink>
  </li>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  menuItem: {
    type: Object,
  },
})
</script>

<style>
.active-menu {
  @apply text-secondary bg-[#fdeae7] border-l-4 border-secondary
}
.active-menu span {
  @apply text-secondary
}
</style>

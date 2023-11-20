<template>
  <div>
    <AppBar />
    <div class="min-h-screen flex flex-row bg-[#f7f9fb]">
      <div
        class="flex flex-col w-56 bg-white overflow-hidden shadow-sm fixed mt-16 h-full"
      >
        <MenuList />
      </div>
      <div class="ml-56 mt-16 p-6 w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import MenuList from '@/components/layout/MenuList.vue';
import AppBar from '@/components/layout/AppBar.vue';
</script>

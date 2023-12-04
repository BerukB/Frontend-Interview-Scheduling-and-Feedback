<template>
  <div>
    <AppBar v-if="!login" />
    <div class="min-h-screen flex flex-row bg-gray-100">
      <div
        v-if="!login"
        class="flex flex-col w-56 bg-white overflow-hidden shadow-sm fixed mt-16 h-full"
      >
        <MenuList />
      </div>
      <div :class="{'ml-56 mt-16 p-6': !login}" class="w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import MenuList from '@/components/layout/MenuList.vue';
import AppBar from '@/components/layout/AppBar.vue';
import { computed } from 'vue';

const route = useRoute()

const login = computed(() => {
  return route.name === 'Login'
})
</script>

<template>
  <nav
    class="flex items-center bg-white py-2 px-4 h-16 shadow-sm fixed w-full z-10 gap-4"
  >
    <div class="flex items-center justify-start w-56">
      <img src="/MMCYTech.png" alt="Logo" class="w-32" />
    </div>
    <div class="flex items-center justify-between w-full">
      <h1 class="text-xl mx-2">Interview Scheduling and Feedback</h1>
      <TheProfile />
    </div>
  </nav>
</template>

<script setup>
import TheProfile from '@/components/auth/TheProfile.vue';
</script>

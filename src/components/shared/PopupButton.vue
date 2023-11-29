<script setup>

</script>

<template>
<button class="button">New Schedule</button>
</template>

<style scoped>
button {
  @apply font-bold text-sm rounded-md py-3 px-4 m-2 min-w-[150px] disabled:opacity-25 border-secondary border-2 hover:opacity-70 transition-all;
}

.primary {
  @apply bg-secondary text-white;
}

.secondary {
  @apply bg-transparent text-secondary;
}
</style>
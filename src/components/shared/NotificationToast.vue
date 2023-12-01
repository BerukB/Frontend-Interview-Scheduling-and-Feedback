<template>
  <div
    :class="ToastClass"
    class=" w-96 max-w-xs text-sm rounded-lg fixed bottom-4 right-4"
    role="alert"
  >
    <div class="flex p-4">
      {{ message }}
      <div class="ms-auto">
        <button
          type="button"
          class="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-teal-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
        >
          <span class="sr-only">Close</span>
          <font-awesome-icon icon="fa-regular fa-circle-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
  },
  type: {
    type: String,
    default: 'success'
  }
})

const ToastClass = computed(() => {
  return { [props.type]: true }
})
</script>

<style>
.success {
    @apply bg-teal-100 border border-teal-200 text-teal-800
}
.error {
    @apply bg-red-100 border border-red-200 text-red-800
}
.warning {
    @apply bg-yellow-100 border border-yellow-200 text-yellow-800
}
</style>

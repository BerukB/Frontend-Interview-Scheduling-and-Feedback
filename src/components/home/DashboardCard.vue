<template>
  <div>
    <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
      <div
        class="flex items-center justify-between px-6 py-10 bg-white rounded-md dark:bg-darker"
      >
        <div>
          <h6
            class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
          >
            Candidates
          </h6>
          <span class="text-xl font-semibold">{{ candidateStore.count }}</span>
          <span
            class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"
          >
            +4.4%
          </span>
        </div>
        <div>
          <font-awesome-icon
            icon="fa-solid fa-users"
            class="text-3xl text-gray-400"
          />
        </div>
      </div>

      <div
        class="flex items-center justify-between px-6 py-10 bg-white rounded-md dark:bg-darker"
      >
        <div>
          <h6
            class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
          >
            Scheduled Interviews
          </h6>
          <span class="text-xl font-semibold">{{ scheduleStore.count }}</span>
          <span
            class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"
          >
            +2.6%
          </span>
        </div>
        <div>
          <font-awesome-icon
            icon="fa-solid fa-calendar-check"
            class="text-3xl text-gray-400"
          />
        </div>
      </div>

      <div
        class="flex items-center justify-between px-6 py-10 bg-white rounded-md dark:bg-darker"
      >
        <div>
          <h6
            class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
          >
            Hired candidates
          </h6>
          <span class="text-xl font-semibold">{{ candidateStore.hiredCount }}</span>
          <span
            class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"
          >
            +3.1%
          </span>
        </div>
        <div>
          <div>
            <font-awesome-icon
              icon="fa-solid fa-circle-check"
              class="text-3xl text-gray-400"
            />
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-between px-6 py-10 bg-white rounded-md dark:bg-darker"
      >
        <div>
          <h6
            class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
          >
            Feedbacks Added
          </h6>
          <span class="text-xl font-semibold">{{ scheduleStore.feedbackCount }}</span>
          <span
            class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"
          >
            +3.1%
          </span>
        </div>
        <div>
          <font-awesome-icon
            icon="fa-solid fa-comments"
            class="text-3xl text-gray-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCandidateStore } from '@/stores/candidate'
import { useScheduleStore } from '@/stores/schedule'
import { onMounted } from 'vue';

const candidateStore = useCandidateStore()
const scheduleStore = useScheduleStore()

onMounted(() => {
    candidateStore.fetchCandidates()
    candidateStore.hiredCandidates()
    scheduleStore.fetchSchedules()
})
</script>

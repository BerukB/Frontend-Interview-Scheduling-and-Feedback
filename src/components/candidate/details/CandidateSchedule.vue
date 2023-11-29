<template>
  <h3 class="font-bold mb-4">Schedules</h3>
  <hr />

  <ol class="border-l-2 border-secondary border-opacity-25 mt-10">
    <li v-for="schedule in schedules" :key="schedule._id">
      <div class="flex-start md:flex">
        <div
          class="-ml-[13px] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#fcd9d3] text-secondary"
        >
          <font-awesome-icon icon="fa-regular fa-calendar" class="text-xs" />
        </div>
        <div
          class="mb-10 ml-6 block rounded-lg bg-neutral-50 p-6 shadow-md shadow-black/5 w-full group/list"
        >
          <div class="mb-4 flex justify-between">
            <span class="text-secondary"
              >Interview for
              <span class="font-bold">{{ schedule.position }}</span>
              position</span
            >
            <span
              class="text-sm text-secondary"
              >{{ MDYhmFormat(schedule.date) }}</span
            >
          </div>
          <BaseChip
            v-if="schedule.interviewType == 'In-person'"
            :text="schedule.interviewType"
            type="warning"
          />
          <BaseChip
            v-else-if="schedule.interviewType == 'Client'"
            :text="schedule.interviewType"
            type="success"
          />
          <BaseChip
            v-if="schedule.attendance == 'Came'"
            :text="schedule.attendance"
            type="success"
            class="mx-2"
          />

          <BaseChip
            v-if="schedule.attendance == 'Absent'"
            :text="schedule.attendance"
            type="danger"
            class="mx-2"
          />

          <div class="flex justify-between">
            <ul class="max-w-md mt-4 text-sm leading-relaxed">
              <li class="flex items-center">
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="text-xs"
                />

                <span class="mx-2">Duration:</span>
                <span>{{ schedule.duration }}</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="text-xs"
                />

                <span class="mx-2">Interviewer:</span>
                <span
                  >{{ schedule.interviewer?.firstName }}
                  {{ schedule.interviewer?.lastName }}</span
                >
              </li>
              <li class="flex items-center">
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="text-xs"
                />

                <span class="mx-2">Attendance:</span>
                <span>{{ schedule.attendance }}</span>
              </li>

              <li class="flex items-center">
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="text-xs"
                />

                <span class="mx-2">Scheduled by:</span>
                <span
                  >{{ schedule.createdBy?.firstName }}
                  {{ schedule.createdBy?.lastName }}</span
                >
              </li>
            </ul>
            <div
              class="mt-4 invisible group-hover/list:visible transition-all duration\"
            >
              <RouterLink to="/feedback">
                <BaseButton text="Add Feedback" buttonType="primary" />
              </RouterLink>
              <BaseButton text=" Cancel" buttonType="secondary" />
            </div>
          </div>
        </div>
      </div>
    </li>
  </ol>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getSchedules } from '@/services/ScheduleService.js';
import BaseButton from '@/components/shared/BaseButton.vue'
import BaseChip from '@/components/shared/BaseChip.vue'
import { MDYhmFormat } from '@/utils/DateFormat.js'

const schedules = ref([])

onMounted(async () => {
  const { data } = await getSchedules('candidate=6565cf21c50ce7db8dc54cd7');
  console.log("CANDIDATE:", data.data);
  schedules.value = data.data
})
</script>

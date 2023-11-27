import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getSchedules } from '@/services/ScheduleService';

export const useScheduleStore = defineStore('schedule', () => {
  const schedules = ref([]);

  async function fetchSchedules() {
    const { data } = await getSchedules();
    schedules.value = data.data;
    console.log('SCHEDULES', schedules.value);
  }

  //   const filterInterviewer = computed(() =>
  //   schedules.value.filter((user) => user.role == 'Interviewer')
  //   );

  return { schedules, fetchSchedules };
});

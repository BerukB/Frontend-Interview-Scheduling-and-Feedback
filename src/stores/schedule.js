import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getSchedules,
  updateSchedule,
  createSchedule,
} from '@/services/ScheduleService';
import { NotificationToast } from '@/utils/NotificationToast';

export const useScheduleStore = defineStore('scheduleStore', () => {
  const schedules = ref([]);
  const isLoading = ref(false);
  const error = ref('');

  async function fetchSchedules(params = '') {
    isLoading.value = true;
    try {
      const { data } = await getSchedules(params);
      schedules.value = data.data;
    } catch (err) {
      error.value = err.response.data.message || 'Error';
      NotificationToast(error, 'error');
    } finally {
      isLoading.value = false;
    }
  }

  async function addSchedule(_data) {
    isLoading.value = true;
    try {
      const { data } = await createSchedule(_data);
      data ? NotificationToast('Phone Feedback Added!', 'success') : '';
    } catch (err) {
      error.value = err.response?.data?.message || 'Error';
      NotificationToast(error, 'error');
    } finally {
      isLoading.value = false;
    }
  }

  async function editSchedule(id, data) {
    isLoading.value = true;
    try {
      await updateSchedule(id, data);
      NotificationToast('Feedback Saved!', 'success');
    } catch (err) {
      error.value = err.response.data.message || 'Error';
      NotificationToast(error, 'error');
    } finally {
      isLoading.value = false;
    }
  }

  return { schedules, fetchSchedules, editSchedule, addSchedule, isLoading };
});

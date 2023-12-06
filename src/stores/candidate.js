import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCandidates } from '@/services/CandidateService';
import { NotificationToast } from '@/utils/NotificationToast';

export const useCandidateStore = defineStore('candidate', () => {
  const candidates = ref([]);
  const isLoading = ref(false);
  const error = ref('');

  async function fetchCandidates(params = '') {
    isLoading.value = true;

    try {
      const { data } = await getCandidates(params);
      candidates.value = data.data;
    } catch (err) {
      error.value = err.response.data.message || 'Error';

      NotificationToast(error, 'error');
    } finally {
      isLoading.value = false;
    }
  }

  return { candidates, fetchCandidates, isLoading };
});

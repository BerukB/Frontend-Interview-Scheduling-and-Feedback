import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCandidates } from '@/services/CandidateService';

export const useCandidateStore = defineStore('candidate', () => {
  const candidates = ref([]);

  async function fetchCandidates() {
    const { data } = await getCandidates();
    candidates.value = data.data;
  }

  return { candidates, fetchCandidates };
});

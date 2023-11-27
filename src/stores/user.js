import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getUsers } from '@/services/UserServices';

export const useUserStore = defineStore('user', () => {
  const users = ref([]);

  async function fetchUsers() {
    const { data } = await getUsers();
    users.value = data.data;
  }

  const filterInterviewers = computed(() =>
    users.value.filter((user) => user.role == 'Interviewer')
  );
  
  const filterCandidates = computed(() =>
    users.value.filter((user) => user.role == 'Candidate')
  );

  return { users, fetchUsers, filterInterviewers, filterCandidates };
});

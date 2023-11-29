import { defineStore } from 'pinia';
import { getClients } from '../services/clientService';
import { getInterviewer, getCandidate } from '../services/UserServices';
import { ref } from 'vue';
import { getSchedules } from '../services/ScheduleService';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    events: ref([]),
    clientList: ref([]),
    interviewerList: ref([]),
    candidateList: ref([]),
    showPopup: ref(false),
    schedules: ref([]),
  }),
  getters: {
    getEvents() {
      return this.events.value;
    },
    getClientList() {
      return this.clientList.value;
    },
    getInterviewerList() {
      return this.interviewerList.value;
    },
    getCandidateList() {
      return this.candidateList.value;
    },
    getPopupValue() {
      return this.showPopup;
    },
    getSchedules() {
      return this.schedules.value;
    },
  },
  actions: {
    setEvents(event) {
      // this.events.push(event);
      this.events.value = event;
    },
    async setSchedules() {
      const result = await getSchedules();
      this.schedules.value = result.data.data;
    },
    setPopupValue(value) {
      this.showPopup = value;
    },
    async setClientList() {
      try {
        const result = await getClients();

        this.clientList.value = result.data.data;
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    },
    async setInterviewerList() {
      try {
        const result = await getInterviewer();

        this.interviewerList.value = result.data.data;
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    },
    async setCandidateList() {
      try {
        const result = await getCandidate();

        this.candidateList.value = result.data.data;
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    },
  },
});

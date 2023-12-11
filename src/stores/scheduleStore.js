import { defineStore } from 'pinia';
import { getClients } from '../services/clientService';
import { getInterviewer } from '../services/UserServices';
import {getCandidates, getCandidateById} from '../services/CandidateService'
import { ref } from 'vue';
import { getSchedules } from '../services/ScheduleService';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    events: ref([]),
    myEvents: ref([]),
    clientList: ref([]),
    interviewerList: ref([]),
    candidateList: ref([]),
    showPopup: ref(false),
    schedules: ref([]),
    candidate: ref([]),
    currentCandidateId: ref(null),
  }),
  getters: {
    getEvents() {
      return this.events.value;
    },
    getMyEvents() {
      return this.myEvents.value;
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
    getCandidate() {
      return this.candidate;
    },
    getPopupValue() {
      return this.showPopup;
    },
    getSchedules() {
      return this.schedules.value;
    },
    getCurrentCandidateID() {
      return this.currentCandidateId;
    },
  },
  actions: {
    setEvents(event) {
      this.events.value = event;
    },
    setMyEvents(event) {
      this.myEvents.value = event;
    },
    setCurrentCandidateID(id) {
      this.currentCandidateId = id;
    },
    async setSchedules() {
      const result = await getSchedules();
      this.schedules.value = result.data.data;
    },
    setPopupValue(value) {
      this.showPopup = value;
    },
    setCandiateToEmpty() {
      this.candidate = [];
      console.log("bang", this.candidate.value);
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
    // async setCandidateList() {
    //   try {
    //     const result = await getCandidate();

    //     this.candidateList.value = result.data.data;
    //   } catch (error) {
    //     console.error('Error in POST request:', error);
    //   }
    // },
    
    async setCandidateList() {
      try {
        const result = await getCandidates();

        this.candidateList.value = result.data.data;
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    },
    async setCandidateById(id) {
      try {
        const result = await getCandidateById(id);
        this.candidate.push(result.data);
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    },
  },
});

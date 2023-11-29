import { defineStore } from "pinia";
import { getClients } from "../services/clientService";
import { getInterviewer, getCandidate } from "../services/userService";
import { ref } from "vue";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    events: ref([]),
    clientList: ref([]),
    interviewerList: ref([]),
    candidateList: ref([]),
    showPopup: ref(false),
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
  },
  actions: {
    setEvents(event) {
      // this.events.push(event);
      this.events.value = event;
    },
    setPopupValue(value) {
      this.showPopup = value;
    },
    async setClientList() {
      try {
        const result = await getClients();

        this.clientList.value = result.data.data;
      } catch (error) {
        console.error("Error in POST request:", error);
      }
    },
    async setInterviewerList() {
      try {
        const result = await getInterviewer();

        this.interviewerList.value = result.data.data;
      } catch (error) {
        console.error("Error in POST request:", error);
      }
    },
    async setCandidateList() {
      try {
        const result = await getCandidate();

        this.candidateList.value = result.data.data;
      } catch (error) {
        console.error("Error in POST request:", error);
      }
    },
  },
});

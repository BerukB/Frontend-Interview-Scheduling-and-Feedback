import { defineStore } from "pinia";
import { getClients } from "../services/clientService";
import { getInterviewer } from "../services/userService";
import { ref } from "vue";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    events: [],
    clientList: ref([]),
    interviewerList: ref([]),
  }),
  getters: {
    getEvents() {
      return this.events;
    },
    getClientList() {
      return this.clientList.value;
    },
    getInterviewerList() {
        return this.interviewerList.value;
      },
  },
  actions: {
    setEvents(event) {
      this.events.push(event);
    },
    async setClientList() {
      try {
        const result = await getClients();

         this.clientList.value = result.data.data

      } catch (error) {
        console.error("Error in POST request:", error);
      }
    },
    async setInterviewerList() {
        try {
          const result = await getInterviewer();
  
           this.interviewerList.value = result.data.data
  
        } catch (error) {
          console.error("Error in POST request:", error);
        }
      },
  },
});

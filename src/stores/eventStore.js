import { defineStore } from 'pinia';

import { ref,reactive } from 'vue';
import { getScheduleById } from '../services/ScheduleService';

export const useEventStore = defineStore('eventStore', {
    state: () => ({
       currentSchedule: reactive({}),
       isLoading: ref(false),
       popupCall: ref(false)
    }),
    getters: {
        getScheduleById() {
            return this.currentSchedule.value;
          },
          getPopupCall(){
            return this.popupCall
          }
    },
    actions: {
        async setScheduleById(id) {
            this.isLoading = true;
            const result = await getScheduleById(id)
            this.currentSchedule.value = result.data;
            this.isLoading = false;
          },
          openPopupCall(){
            this.popupCall = true;
          },
          closePopupCall(){
            this.popupCall = false;
          },
    },
  });
  
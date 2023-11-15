import { defineStore } from "pinia";


export const useScheduleStore = defineStore("schedule", {

    state:() => ({
        events: [],
    }),
    getters: {
        getEvents(){
            return this.events;
        }
    },
    actions: {
        setEvents(event){
            this.events.push(event);
        }
    }
})
<script setup>
import Fullcalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'


// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// // import { Calendar } from '@fullcalendar/core';
// import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { ref, onMounted, computed } from 'vue'
import { useScheduleStore } from '../stores/scheduleStore';
import { useAuthStore } from '@/stores/auth'
import PopUp from './PopUp.vue'

const scheduleStore = useScheduleStore();
const eventsList = ref([]);
const showPopup = computed(() => scheduleStore.getPopupValue);
const isEventsListSet = ref(false);
const schedulesList = ref([]);

const { user } = useAuthStore();
const interviewerId = user._id;

console.log("form events", user._id);
// const openPopup = () =>{
//  scheduleStore.setPopupValue(true);
// }


// const handleSelect = (arg) => {
//   console.log(arg);
//   scheduleStore.setEvents({
//     title: "something",
//     start: arg.start,
//     end: arg.end,
//     allDay: arg.allDay
//   })
// }
const handleClick = (arg) => {
    console.log(arg);
};

let calendarOptions =ref({
  plugins:[DayGridPlugin,TimeGridPlugin,InteractionPlugin,ListPlugin,resourceTimelinePlugin ],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'title',
    center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    right: 'prev today next',
  },
  selectable: true,
  events: eventsList.value,
  themeSystem: 'bootstrap5',
  backgroundColor: 'rgb(0, 98, 255)',
  // select: handleSelect,
   eventClick: handleClick,

});


onMounted(async () => {
  try {
   await scheduleStore.setSchedules();
    schedulesList.value = scheduleStore.getSchedules;



    const eventsData =  schedulesList.value;

    const allEvents = eventsData
    .filter(event => {
        const me = event.interviewer._id
        // Log the interviewer value for each event during filtering
        console.log("Interviewer ID (Filter):", me);
        return me === interviewerId;
      })
    .map(event => {
      const startDate = new Date(event.date);
      const endDate = new Date(startDate.getTime() + event.duration * 60 * 1000);

      const eventData = {
        id: event._id,
        title: event.interviewType,
        start: startDate,
        end: endDate,
        allDay: false,
        // Add other properties as needed
      };

      return eventData;
    });
    scheduleStore.setEvents(allEvents);


    eventsList.value = scheduleStore.getEvents;
    isEventsListSet.value = true;
    console.log("isEventsListSetmount", isEventsListSet.value);
    calendarOptions.value.events = eventsList.value;
  } catch (error) {
    console.error('Error fetching events:', error);
  }


});
console.log("EventsList",  eventsList.value);
</script>

<template>
  <div class="px-10 bg-red ">
    <!-- <div class="flex justify-end ">
      <button @click="openPopup" class="p-2 mb-3 bg-orange-400 text-white">
        New Schedule
      </button>
    </div> -->

    <Fullcalendar v-if="isEventsListSet" :options="calendarOptions" ref="calendarRef"/>
    <PopUp v-show="showPopup" />
  </div>
</template>

<style scoped>
.fc-event {
  height: 50px ; /* adjust the value as needed */
}
.fc .fc-event-container {
  background-color: #000000;
  color: #ff0000;
}
</style>

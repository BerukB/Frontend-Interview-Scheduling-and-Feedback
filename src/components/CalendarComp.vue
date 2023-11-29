<script setup>
import axios from 'axios';
import Fullcalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Calendar } from '@fullcalendar/core';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { reactive, ref, onMounted, computed } from 'vue'
import { useScheduleStore } from '../stores/scheduleStore';

import PopUp from './PopUp.vue'

const scheduleStore = useScheduleStore();
const eventsList = ref([]);
const showPopup = computed(() => scheduleStore.getPopupValue);
const isEventsListSet = ref(false);

console.log("isEventsListSetbefore", isEventsListSet.value);

const openPopup = () =>{
 scheduleStore.setPopupValue(true);
 console.log("showpop",showPopup.value)
}


// const handleSelect = (arg) => {
//   console.log(arg);
//   scheduleStore.setEvents({
//     title: "something",
//     start: arg.start,
//     end: arg.end,
//     allDay: arg.allDay
//   })
// }


const calendarOptions = reactive({
  plugins:[DayGridPlugin,TimeGridPlugin,InteractionPlugin,ListPlugin,resourceTimelinePlugin,bootstrap5Plugin ],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'title',
    center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    right: 'prev today next',
  },
  selectable: false,
  events: eventsList.value = scheduleStore.getEvents,
  themeSystem: 'bootstrap5',
  backgroundColor: 'rgb(0, 98, 255)',
  // select: handleSelect,
  // eventClick: handleClick,

})


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/schedules');
    const eventsData = response.data.data; 
    
    const allEvents = eventsData.map(event => {
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
    isEventsListSet.value = true;

    eventsList.value = scheduleStore.getEvents;

    console.log("isEventsListSetmount", isEventsListSet.value);
    
  } catch (error) {
    console.error('Error fetching events:', error);
  }


});
console.log("EventsList",  eventsList.value);
</script>

<template>

    <div class="px-10 bg-red ">
      
      <div class="flex justify-end ">
        <button @click="openPopup" class="p-2 mb-3 bg-orange-400 text-white">New Schedule</button>
      </div>

      <Fullcalendar 
 v-if="isEventsListSet"
      :options="calendarOptions"

      />
      <PopUp v-show="showPopup"/>
    </div>
</template>



<style>

</style>
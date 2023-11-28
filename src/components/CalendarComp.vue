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

import { reactive, computed, ref, onMounted } from 'vue'
import { useScheduleStore } from '../stores/scheduleStore';

import PopUp from './PopUp.vue'

const scheduleStore = useScheduleStore();
// const calendarRef = ref(null);

const events = computed(() => scheduleStore.getEvents);
console.log("One:", events);
const showPopup = ref(false);

const handleSelect = (arg) => {
  console.log(arg);
  scheduleStore.setEvents({
    title: "something",
    start: arg.start,
    end: arg.end,
    allDay: arg.allDay
  })
}

const openPopup = () =>{
  showPopup.value = true;
}

console.log("I am here",events);

const calendarOptions = reactive({
  plugins:[DayGridPlugin,TimeGridPlugin,InteractionPlugin,ListPlugin,resourceTimelinePlugin,bootstrap5Plugin ],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'title',
    center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    right: 'prev today next',
  },
  selectable: false,
  events: events.value,
  themeSystem: 'bootstrap5',
  backgroundColor: 'rgb(0, 98, 255)',
  // select: handleSelect,
  // eventClick: handleClick,

})


onMounted(async () => {
  try {
    const response = await axios.get('/src/db.json');
    const eventsData = response.data; // Assuming it's an array

    // Map the response data to FullCalendar event format
    const allEvents = eventsData.map(event => (  scheduleStore.setEvents({
      id: event.id,
      title: event.title,
      start: new Date(event.startDateTime),
      end: new Date(event.endDateTime),
      allDay: false,
      // Add other properties as needed
    })));

    // Set the events in the store
    // scheduleStore.setEvents(allEvents);
    

    console.log("Events:", allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});
</script>

<template>

    <div class="px-10 bg-red ">
      
      <div class="flex justify-end ">
        <button @click="openPopup" class="p-2 mb-3 bg-orange-400 text-white">New Schedule</button>
      </div>

      <Fullcalendar 
      :options="calendarOptions"

      />
      <PopUp v-show="showPopup"/>
    </div>
</template>



<style>

</style>
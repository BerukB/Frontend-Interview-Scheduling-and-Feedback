<script setup>
import Fullcalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

import { ref, onMounted, computed } from 'vue'
import { useScheduleStore } from '../stores/scheduleStore';
import { useAuthStore } from '@/stores/auth'
import {useEventStore} from '../stores/eventStore';

const eventStore = useEventStore();
import PopUp from './PopUp.vue'

const scheduleStore = useScheduleStore();
const eventsList = ref([]);
const showPopup = computed(() => scheduleStore.getPopupValue);
const isEventsListSet = ref(false);
const schedulesList = ref([]);

const { user } = useAuthStore();
const interviewerId = user._id;

const handleClick = (arg) => {
    fetchSchedueById(arg.event.id)

    
};
const fetchSchedueById = async (id) => {
  try {
    await eventStore.setScheduleById(id);
    scheduleStore.setPopupValue(true);
    console.log("printing schedule", eventStore.getScheduleById);
  } catch (error) {
    console.error('Error in fetchScheduleById:', error);
  }
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
        candidate: event.candidate,
        client: event.client,
        interviewer: event.interviewer,
        interviewType: event.interviewType,
        // Add other properties as needed
      };

      return eventData;
    });
    scheduleStore.setEvents(allEvents);


    eventsList.value = scheduleStore.getEvents;
    isEventsListSet.value = true;
    calendarOptions.value.events = eventsList.value;
  } catch (error) {
    console.error('Error fetching events:', error);
  }


});

</script>

<template>
  <div class="px-10 bg-red ">
    <Fullcalendar v-if="isEventsListSet" :options="calendarOptions" ref="calendarRef"/>
    <PopUp v-if="showPopup" />
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

<script setup>

import Fullcalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { ref } from 'vue'

const calendarOptions = ref({
  plugins:[DayGridPlugin,TimeGridPlugin,InteractionPlugin,ListPlugin,resourceTimelinePlugin],
  initialView: 'dayGridMonth',
  header: {
    left: '',
    center: '',
    right: '',
  },

})
</script>

<template>
    <div>
    
      <Fullcalendar 
      :options="calendarOptions"
      
      />
      
    </div>
</template>



<style>

</style>
<script setup>

import Fullcalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

import { useScheduleStore } from '../stores/scheduleStore';

const scheduleStore = useScheduleStore();
const myEventsList = ref([]);

</script>

<template>
<div>
    
</div>
</template>
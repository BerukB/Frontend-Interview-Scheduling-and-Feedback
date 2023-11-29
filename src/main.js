import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHouse,
  faCommentDots,
  faUsers,
  faCalendarCheck,
  faEye,
  faCalendarPlus,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';


import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import App from './App.vue';
import router from './router';

const app = createApp(App);

library.add(
  faCalendar,
  faHouse,
  faCommentDots,
  faUsers,
  faCalendarCheck,
  faEye,
  faCalendarPlus,
  faCircleCheck
);



app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VCalendar, {})

app.use(createPinia());
app.use(router);

app.mount('#app');

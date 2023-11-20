import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCalendar,
  faHouse,
  faCommentDots,
  faUsers,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

const app = createApp(App);

library.add(faCalendar, faHouse, faCommentDots, faUsers, faCalendarCheck);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import ScheduleView from '@/views/ScheduleView.vue';
import FeedbackView from '@/views/FeedbackView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Schedule',
      component: ScheduleView,
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: FeedbackView,
    },
  ],
});

export default router;

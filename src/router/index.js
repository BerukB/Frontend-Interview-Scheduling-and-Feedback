import { createRouter, createWebHistory } from 'vue-router';
import ScheduleView from '@/views/ScheduleView.vue';
import FeedbackView from '@/views/FeedbackView.vue';
import CandidateView from '@/views/CandidateView.vue';
import CandidateDetailsView from '@/views/CandidateDetailsView.vue';

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
    {
      path: '/candidates',
      name: 'CandidateList',
      component: CandidateView,
    },
    {
      path: '/candidates/:id',
      name: 'CandidateDetails',
      component: CandidateDetailsView,
    },
  ],
});

export default router;

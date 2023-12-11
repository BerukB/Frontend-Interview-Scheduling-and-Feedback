import { createRouter, createWebHistory } from 'vue-router';
import ScheduleView from '@/views/ScheduleView.vue';
import FeedbackView from '@/views/FeedbackView.vue';
import CandidateView from '@/views/CandidateView.vue';
import CandidateDetailsView from '@/views/CandidateDetailsView.vue';
import LoginView from '@/views/LoginView.vue';
import MyScheduleView from '@/views/MyScheduleView.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: '',
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
    {
      path: '/schedules',
      name: 'Schedule',
      component: ScheduleView,
    },
    {
      path: '/schedules/me',
      name: 'MySchedule',
      component: MyScheduleView,
      meta: { requiresAuth: true },
    },
    {
      path: '/schedules/me',
      name: 'MySchedule',
      component: MyScheduleView,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;

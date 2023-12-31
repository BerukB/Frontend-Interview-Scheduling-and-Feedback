import { createRouter, createWebHistory } from 'vue-router';
import ScheduleView from '@/views/ScheduleView.vue';
import FeedbackView from '@/views/FeedbackView.vue';
import PhoneFeedbackView from '@/views/PhoneFeedbackView.vue';
import CandidateView from '@/views/CandidateView.vue';
import CandidateDetailsView from '@/views/CandidateDetailsView.vue';
import LoginView from '@/views/LoginView.vue';
import MyScheduleView from '@/views/MyScheduleView.vue';
import HomeView from '@/views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: FeedbackView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/phone-interview/:id',
      name: 'PhoneFeedback',
      component: PhoneFeedbackView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/candidates',
      name: 'CandidateList',
      component: CandidateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/candidates/:id',
      name: 'CandidateDetails',
      component: CandidateDetailsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/schedules',
      name: 'Schedule',
      component: ScheduleView,
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

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.token) {
    next('login');
  } else {
    next();
  }
});

export default router;

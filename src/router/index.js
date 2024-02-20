import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '@/components/RegistrationForm';
import Startseite from '@/views/Startseite';

const routes = [
  { path: '/', component: RegistrationForm },
  { path: '/startseite', component: Startseite }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



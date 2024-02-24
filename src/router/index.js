import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '@/components/RegistrationForm';
import Startseite from '@/views/Startseite';
import ThankYouView from '@/views/thankyou';


const routes = [
  { path: '/', component: RegistrationForm },
  { path: '/startseite', component: Startseite },
  { path: '/thankyou', component: ThankYouView}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



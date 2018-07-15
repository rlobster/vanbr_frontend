import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/layouts/Home'; // Home Layout
import Login from '@/layouts/Login';
import Pricing from '@/layouts/Pricing';
import Feedback from '@/layouts/Feedback';
import Profile from '@/layouts/Profile';
import History from '@/layouts/History';
import HistoryDetail from '@/layouts/HistoryDetail';

// Import all the Rider Layouts
import Register from '@/layouts/rider/Register';
import Booking from '@/layouts/rider/Booking';
import Ride from '@/layouts/rider/Ride';
import Payment from '@/layouts/rider/Payment';
import Reference from '@/layouts/rider/Reference';
import Routes from './routes';

Vue.use(Router);

const routes = [
  {
    path: Routes.Home,
    name: 'Home',
    component: Home,
  },
  {
    path: Routes.Pricing,
    name: 'Pricing',
    component: Pricing,
  },
  {
    path: Routes.Login,
    name: 'Login',
    component: Login,
  },
  {
    path: Routes.Register,
    name: 'Register',
    component: Register,
  },
  {
    path: Routes.Profile,
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Feedback,
    name: 'Feedback',
    component: Feedback,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Booking,
    name: 'Booking',
    component: Booking,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Reference,
    name: 'Reference',
    component: Reference,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Ride,
    name: 'Ride',
    component: Ride,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Payment,
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.History,
    name: 'History',
    component: History,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.HistoryDetail,
    name: 'HistoryDetail',
    component: HistoryDetail,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');

    if (!token) {
      next({ name: 'Login' });
      return;
    }
  }
  next();
});

export default router;

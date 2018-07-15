import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/layouts/Login';
import Pricing from '@/layouts/Pricing';
import History from '@/layouts/History';
import HistoryDetail from '@/layouts/HistoryDetail';

// Import all Driver Layouts
import DriverStatus from '@/layouts/driver/DriverStatus';
import Profile from '@/layouts/driver/Profile';

import Routes from './routes';

Vue.use(Router);

const routes = [
  {
    path: Routes.Pricing,
    name: 'Pricing',
    component: Pricing,
  },
  // Driver Routes
  {
    path: Routes.DriverStatus,
    name: 'DriverStatus',
    component: DriverStatus,
    meta: {
      requiresAuth: true,
    },
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
    path: Routes.Login,
    name: 'Login',
    component: Login,
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

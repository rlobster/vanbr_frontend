import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/layouts/Login';

// Import all Admin Layouts
import Dashboard from '@/layouts/admin/Dashboard';
import Users from '@/layouts/admin/Users';
import Riders from '@/layouts/admin/Riders';
import Drivers from '@/layouts/admin/Drivers';
import AddDriver from '@/layouts/admin/AddDriver';
import Email from '@/layouts/admin/Email';
import Feedbacks from '@/layouts/admin/Feedbacks';
import Rides from '@/layouts/admin/Rides';
import PaymentList from '@/layouts/admin/PaymentList';

import Routes from './routes';

Vue.use(Router);

const routes = [
  // Admin Routes
  {
    path: Routes.Login,
    name: 'Login',
    component: Login,
  },
  {
    path: Routes.Dashboard,
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Users,
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Riders,
    name: 'Riders',
    component: Riders,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Drivers,
    name: 'Drivers',
    component: Drivers,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.AddDriver,
    name: 'AddDriver',
    component: AddDriver,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Email,
    name: 'Email',
    component: Email,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Feedbacks,
    name: 'Feedbacks',
    component: Feedbacks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Rides,
    name: 'Rides',
    component: Rides,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.PaymentList,
    name: 'PaymentList',
    component: PaymentList,
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

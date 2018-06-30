import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/layouts/Home'; // Home Layout
import Login from '@/layouts/Login';
import Pricing from '@/layouts/Pricing';
import Feedback from '@/layouts/Feedback';
import Profile from '@/layouts/Profile';

// Import all the Rider Layouts
import Register from '@/layouts/rider/Register';
import Booking from '@/layouts/rider/Booking';
import Ride from '@/layouts/rider/Ride';
import Payment from '@/layouts/rider/Payment';

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
  },
  {
    path: Routes.Feedback,
    name: 'Feedback',
    component: Feedback,
  },
  {
    path: Routes.Booking,
    name: 'Booking',
    component: Booking,
  },
  {
    path: Routes.Ride,
    name: 'Ride',
    component: Ride,
  },
  {
    path: Routes.Payment,
    name: 'Payment',
    component: Payment,
  },
];

export default new Router({
  mode: 'history',
  routes,
});

import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/layouts/Home'; // Home Layout
import Login from '@/layouts/Login';

// Import all the Rider Layouts
import Register from '@/layouts/rider/Register';

import Routes from './routes';

Vue.use(Router);

const routes = [
  {
    path: Routes.Home,
    name: 'Home',
    component: Home,
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
];

export default new Router({
  mode: 'history',
  routes,
});

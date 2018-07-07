// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueSocketio from 'vue-socket.io';
import vuetable from 'vuetable-2';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCPXsZhEgbSDGOY2QVsJCBf3gq7D5Eggwk',
    libraries: 'places',
  },
});
Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(vuetable);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

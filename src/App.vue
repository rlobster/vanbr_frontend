<template>
  <div id="app">
    <Navbar></Navbar>
    <main>
          <router-view></router-view>
    </main>
</div>
</template>

<script>
  import vuetable from 'vuetable-2';
  import Navbar from '@/components/Navbar';

  export default {
    name: 'app',
    components: { Navbar, vuetablePagination: vuetable.VuetablePagination },
    created() {
      const token = localStorage.getItem('token');
      if (token) {
        this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      this.handlePermission();
    },
    mounted() {
      if (this.getRole() === 'driver') {
        this.$socket.emit('isOnline', false);
      }
    },
    methods: {
      handlePermission() {
        navigator.geolocation.watchPosition(
          (success) => {
            console.log(success.coords);
            const lat = success.coords.latitude;
            const long = success.coords.longitude;
            // eslint-disable-next-line
            this.$socket.emit('getLocation', OpenLocationCode.encode(lat,long));
            this.$socket.emit('isOnline', true);
          },
          (failure) => {
            console.log(failure);
            // window.location = 'https://google.com/';
          },
        );
      },
    },
    sockets: {
      connect() {
        const token = localStorage.getItem('token');
        if (token) {
          this.$socket.emit('join', token);
        }
        console.log('socket connected');
      },
      customEmit(val) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)', val);
      },
    },
  };
</script>

<style lang="scss">
  @import "styles/main";
</style>

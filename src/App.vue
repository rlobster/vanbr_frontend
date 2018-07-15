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
      this.$socket.emit('join', 'Yess');
    },
    sockets: {
      connect() {
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

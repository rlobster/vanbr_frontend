<template>
  <div id="app">
    <Navbar></Navbar>
    <main>
          <router-view></router-view>
    </main>
</div>
</template>

<script>
  import Navbar from '@/components/Navbar';

  export default {
    name: 'app',
    components: { Navbar },
    created() {
      const token = localStorage.getItem('token');
      if (token) {
        this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    },
  };
</script>

<style lang="scss">
  @import "styles/main";
</style>

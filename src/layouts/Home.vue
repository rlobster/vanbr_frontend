<template>
  <div class="home">
    <div class="title text-center">Home welcome</div>
    <router-link :to='Routes.Login'>Go to Login</router-link>
    <router-link :to='Routes.Register'>Go to Register</router-link>
    <router-link :to='Routes.Booking'>Book a Ride</router-link>

  </div>
</template>

<script>
  import Routes from '@/router/routes';

  export default {
    name: 'home',
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

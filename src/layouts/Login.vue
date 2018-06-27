<template>
  <div>
    <div class="title text-center">Login</div>
    <router-link :to='Routes.Home'>Go to Home</router-link>
    <router-link :to='Routes.Register'>Go to Register</router-link>
  </div>
</template>

<script>
  import Routes from '@/router/routes';

  export default {
    name: 'Login',
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style lang="scss" scoped>

</style>

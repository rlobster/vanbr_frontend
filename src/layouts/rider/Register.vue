<template>
    <div class="register">
      <div class="title text-center">Register</div>
      <router-link :to='Routes.Home'>Go to Home</router-link>
      <router-link :to='Routes.Login'>Go to Login</router-link>
    </div>
</template>

<script>
  import Routes from '@/router/routes';

  export default {
    name: 'Register',
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style scoped>

</style>

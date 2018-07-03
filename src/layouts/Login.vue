<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Login</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="email">Email:</label>
          <input type="email" id="email" class="form-control" placeholder="Email"/>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="password">Password:</label>
          <input type="email" id="password" class="form-control" placeholder="Password"/>
        </div>
        <div class="form-group main-app-section-md">
          <button type="submit" class="btn btn-custom btn-block" @click="login">Login</button>
        </div>
        <div class="main-app-section-xs">
          <router-link :to="Routes.Register">Don't have an account?</router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
  import axios from 'axios';
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Login',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
    methods: {
      async login(event) {
        event.preventDefault();
        try {
          const data = {
            email: 'abc@abc.abc',
            password: 'abc123',
          };
          const response = await axios.post('http://vanbr.ca/api/rider/login', data);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>



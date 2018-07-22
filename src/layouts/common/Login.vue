<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Login</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="email">Email:</label>
          <input type="email" id="email" class="form-control" placeholder="Email" v-model="email"/>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="password">Password:</label>
          <input type="password" id="password" class="form-control" placeholder="Password" v-model="password"/>
        </div>
        <div class="form-group main-app-section-md">
          <button type="submit" class="btn btn-custom btn-block" @click="login">Login</button>
        </div>
        <div class="main-app-section-xs">
          <router-link :to="Routes.ForgotPassword">Forgot Password?</router-link>
        </div>
        <div class="main-app-section-xs" v-if="role === 'rider'">
          <router-link :to="Routes.Register">Don't have an account?</router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import AppURL from '@/constants';

  export default {
    name: 'Login',
    components: { Card },
    data() {
      return {
        Routes,
        AppURL,
        role: '',
        email: '',
        password: '',
      };
    },
    mounted() {
      this.role = this.getRole();
    },
    methods: {
      async login(event) {
        event.preventDefault();
        try {
          const data = {
            email: this.email,
            password: this.password,
          };
          const response = await this.axios.post(`${this.AppURL}/${this.role}/login`, data);
          localStorage.setItem('token', response.data.token);
          this.$socket.emit('join', response.data.token);
          this.axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          if (this.role === 'rider') {
            this.$router.push(Routes.Booking);
          } else if (this.role === 'driver') {
            this.$router.push(Routes.DriverStatus);
          } else if (this.role === 'admin') {
            this.$router.push(Routes.Dashboard);
          }
        } catch (e) {
          console.warn(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>



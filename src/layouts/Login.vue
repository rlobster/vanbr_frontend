<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">{{ routeName }} Login</div>
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
          <router-link :to="Routes.Register">Don't have an account?</router-link>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Login',
    components: { Card },
    data() {
      return {
        Routes,
        email: '',
        password: '',
        routeName: '',
        api: '',
      };
    },
    beforeMount() {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = JSON.parse(window.atob(token.split('.')[1].replace('-', '+').replace('_', '/')));
        if (decodedToken.type === 'Driver') {
          this.$router.push({ name: 'DriverStatus' });
        } else if (decodedToken.type === 'Admin') {
          this.$router.push({ name: 'Admin' });
        } else if (decodedToken.type === 'Rider') {
          this.$router.push({ name: 'Booking' });
        } else {
          this.$router.push({ name: 'Home' });
        }
      }

      if (this.$route.name === 'DriverLogin') {
        this.routeName = 'Driver';
        this.api = 'driver';
      } else if (this.$route.name === 'AdminLogin') {
        this.routeName = 'Admin';
        this.api = 'admin';
      } else if (this.$route.name === 'RiderLogin') {
        this.api = 'rider';
      }
    },
    methods: {
      async login(event) {
        event.preventDefault();
        try {
          const data = {
            email: this.email,
            password: this.password,
          };
          const response = await this.axios.post(`http://vanbr.ca/api/${this.api}/login`, data);
          localStorage.setItem('token', response.data.token);
          this.axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          if (this.api === 'rider') {
            this.$router.push(Routes.Booking);
          } else if (this.api === 'driver') {
            this.$router.push(Routes.Status);
          } else if (this.api === 'admin') {
            this.$router.push(Routes.Admin);
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



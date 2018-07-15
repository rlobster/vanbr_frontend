<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Register</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input type="text" class="form-control" placeholder="Name" v-model="name" id="name"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" class="form-control" id="dob" v-model="dob"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Mobile Number:</label>
            <input type="number" class="form-control" id="mobile" v-model="mobile_no"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Gender:</label>
            <select v-model="gender" class="form-control">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input type="text" class="form-control" placeholder="Email" id="email" v-model="email"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="password">Password:</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password" id="password"/>
            <input type="checkbox" id="password-check" class="main-app-section-xs"/>
            <label for="password-check">Show/Hide Password</label>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block" @click="signup">Submit</button>
          </div>
          <div class="main-app-section-xs">
            <router-link :to="Routes.Login">Already have an account?</router-link>
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
    name: 'Register',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        name: '',
        dob: '',
        gender: '',
        mobile_no: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async signup(event) {
        event.preventDefault();
        try {
          const data = {
            email: this.email,
            password: this.password,
            name: this.name,
            mobile_no: this.mobile_no,
            dob: this.dob,
            gender: this.gender,
          };
          const response = await this.axios.post(`${this.AppURL}/rider/signup`, data);
          localStorage.setItem('token', response.data.token);
          this.axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          this.$router.push(Routes.Booking);
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
    },
  };
</script>

<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
</style>

<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Register</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input type="text" class="form-control" placeholder="Name" id="name"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" class="form-control" id="dob"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Gender:</label>
            <select class="form-control">
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input type="text" class="form-control" placeholder="Email" id="email"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="password">Password:</label>
            <input type="text" class="form-control" placeholder="Password" id="password"/>
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
  import axios from 'axios';
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Register',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
    methods: {
      async signup(event) {
        event.preventDefault();
        try {
          const data = {
            email: 'abc@abc.def',
            password: 'abc123',
            name: 'John Snow',
            mobile_no: '9090909090',
            dob: '1996-04-06',
            gender: 'Male',
          };
          const response = await axios.post('http://vanbr.ca/api/rider/signup', data);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>

</style>

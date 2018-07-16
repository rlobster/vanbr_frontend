<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Edit Profile</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input v-model="name" type="text" class="form-control" placeholder="Name" id="name"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" v-model="dob" class="form-control" id="dob"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Mobile Number:</label>
            <input v-model="mobile_no" type="number" class="form-control" placeholder="Mobile" id="mobile"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Gender:</label>
            <select class="form-control" v-model="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input type="text" v-model="email" class="form-control" placeholder="Email" id="email"/>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block" @click="profile">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  import Card from '@/components/Card';
  import Routes from '@/router/routes';
  import AppURL from '@/constants';

  export default {
    name: 'Profile',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        name: '',
        dob: '',
        gender: '',
        email: '',
        id: '',
        mobile_no: '',
        role: '',
      };
    },
    mounted() {
      if (this.$route.name === 'Profile') {
        this.api = 'rider';
      } else if (this.$route.name === 'ProfileView') {
        this.api = 'driver';
      }
      this.getProfile();
    },
    methods: {
      async getProfile() {
        try {
          const profile = await this.axios.get(`${this.AppURL}/${this.api}/profile`);
          this.id = profile.data.data.user.id;
          this.name = profile.data.data.name;
          this.email = profile.data.data.user.email;
          this.gender = profile.data.data.gender;
          this.dob = profile.data.data.dob;
          this.mobile_no = profile.data.data.mobile_no;
          this.role = profile.data.data.user.role;
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
      async profile(event) {
        event.preventDefault();
        try {
          const data = {
            name: this.name,
            email: this.email,
            mobile_no: this.mobile_no,
            dob: this.dob,
            gender: this.gender,
          };
          await this.axios.post(`${this.AppURL}/rider/profile`, data);
          alert('Your profile updated successfully!');
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
    },
  };
</script>

<style scoped>

</style>

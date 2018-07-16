<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">My Profile</div>
        <form>
          <div class="d-flex justify-content-between car-details">
            <div>Name:</div>
            <div v-bind="name"></div>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" v-model="dob" class="form-control" id="dob"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="mobile">Mobile Number:</label>
            <input v-model="mobile_no" type="number" class="form-control" placeholder="Mobile" id="mobile"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="gender">Gender:</label>
            <select class="form-control" v-model="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input type="text" v-model="email" class="form-control" placeholder="Email" id="email"/>
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
      this.getProfile();
    },
    methods: {
      async getProfile() {
        try {
          const profile = await this.axios.get(`${this.AppURL}/driver/profile`);
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
    },
  };
</script>

<style scoped>

</style>

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
            <button type="submit" class="btn btn-secondary btn-block" @click="logout">Logout</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  import Card from '@/components/Card';
  import Routes from '@/router/routes';

  export default {
    name: 'Profile',
    components: { Card },
    data() {
      return {
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
      async logout(event) {
        event.preventDefault();
        try {
          localStorage.removeItem('token');
          await this.axios.post('http://vanbr.ca/api/rider/logout');
          this.$router.push(Routes.Login);
        } catch (e) {
          console.log(e);
        }
      },
      async getProfile() {
        try {
          const profile = await this.axios.get('http://vanbr.ca/api/rider/profile');
          console.log(profile);
          this.id = profile.data.data.rider.user_id;
          this.name = profile.data.data.rider.name;
          this.email = profile.data.data.email;
          this.gender = profile.data.data.rider.gender;
          this.dob = profile.data.data.rider.dob;
          this.mobile_no = profile.data.data.rider.mobile_no;
          this.role = profile.data.data.role;
        } catch (e) {
          console.log(e);
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
          const responseData = await this.axios.post('http://vanbr.ca/api/rider/profile', data);
          console.log(responseData);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>

</style>

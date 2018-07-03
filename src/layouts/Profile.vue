<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Edit Profile</div>
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
            <label for="name">Gender:</label>
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
    methods: {
      async logout(event) {
        event.preventDefault();
        try {
          await this.axios.post('http://vanbr.ca/api/rider/logout');
          localStorage.removeItem('token');
          this.$router.push(Routes.Login);
        } catch (e) {
          console.log(e);
        }
      },
      async profile(event) {
        event.preventDefault();
        try {
          const data = {
            name: 'John Snow',
            email: 'abc@abc.abc',
            mobile_no: '9999999999',
            dob: '1996-09-09',
            gender: 'Female',
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

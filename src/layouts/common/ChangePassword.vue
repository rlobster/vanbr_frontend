<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Change Password</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="oldPassword">Old Password:</label>
          <input type="password" id="oldPassword" class="form-control" placeholder="Old Password" v-model="oldPassword"/>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="newPassword">New Password:</label>
          <input type="password" id="newPassword" class="form-control" placeholder="New Password" v-model="newPassword"/>
        </div>
        <div class="form-group main-app-section-md">
          <button type="submit" class="btn btn-custom btn-block" @click="changepassword">Change Password</button>
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
    name: 'ChangePassword',
    components: { Card },
    data() {
      return {
        Routes,
        AppURL,
        role: '',
        oldPassword: '',
        newPassword: '',
      };
    },
    mounted() {
      this.role = this.getRole();
    },
    methods: {
      async changepassword(event) {
        event.preventDefault();
        try {
          const data = {
            old_password: this.oldPassword,
            new_password: this.newPassword,
          };
          const response = await this.axios.post(`${this.AppURL}/change-password`, data);
          if (this.role === 'rider') {
            this.$router.push(Routes.Booking);
          } else if (this.role === 'driver') {
            this.$router.push(Routes.DriverStatus);
          } else if (this.role === 'admin') {
            this.$router.push(Routes.Dashboard);
          }
          console.log(response);
        } catch (e) {
          console.warn(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
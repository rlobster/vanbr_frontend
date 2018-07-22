<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Reset Password</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="newPassword">New Password:</label>
          <input type="password" id="newPassword" class="form-control" placeholder="New Password" v-model="newPassword"/>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" v-model="confirmPassword"/>
        </div>
        <div class="form-group main-app-section-md">
          <button type="submit" class="btn btn-custom btn-block" @click="resetpassword">Reset Password</button>
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
    name: 'ResetPassword',
    components: { Card },
    data() {
      return {
        Routes,
        AppURL,
        role: '',
        newPassword: '',
        confirmPassword: '',
        token: '',
      };
    },
    beforeMount() {
      this.role = this.getRole();
      const token = this.$route.params.token;
      if (token) {
        this.token = token;
      } else {
        this.$router.push(Routes.ForgotPassword);
      }
    },
    methods: {
      async resetpassword(event) {
        event.preventDefault();
        try {
          const data = {
            new_password: this.newPassword,
            confirm_password: this.confirmPassword,
            token: this.token,
          };
          await this.axios.post(`${this.AppURL}/${this.role}/reset-password`, data);
          this.$router.push(Routes.Login);
          // console.log(response);
        } catch (e) {
          console.warn(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
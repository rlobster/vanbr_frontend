<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Send Email</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Mail Id:</label>
            <input v-model="email" type="email" class="form-control" placeholder="Email Id" id="email"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Mail Subject:</label>
            <input v-model="subject" type="text" class="form-control" placeholder="Subject Name" id="Subject"/>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="feedback">Mail Body</label>
            <textarea row="4" class="form-control" name="body" id="body">
            </textarea>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block" @click="email">Send</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  import Card from '@/components/Card';
  // import Routes from '@/router/routes';
  import AppURL from '@/constants';

  export default {
    name: 'Email',
    components: { Card },
    data() {
      return {
        AppURL,
        email: '',
        subject: '',
        body: '',
      };
    },
    methods: {
      async email(event) {
        event.preventDefault();
        try {
          const data = {
            email: this.email,
            subject: this.subject,
            body: this.body,
          };
          const responseData = await this.axios.post(`${this.AppURL}/admin/send/email`, data);
          console.log(responseData);
        } catch (e) {
          this.checkError(e.response.status);
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>

</style>

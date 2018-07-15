<template>
    <div class="reference container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Add Reference</div>
        <form class="main-app-section-sm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" placeholder="Name of reference" id="name" v-model="name"/>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" class="form-control" placeholder="Email of reference" id="email" v-model="email"/>
          </div>
          <div class="form-group">
            <label for="contact">Contact Number:</label>
            <input type="text" class="form-control" placeholder="Contact of reference" id="contact" v-model="mobile_no"/>
          </div>
          <div class="form-group">
            <label for="relationship">Relationship:</label>
            <input type="text" class="form-control" placeholder="Relationship with reference" id="relationship" v-model="relationship"/>
          </div>
          <div class="row form-group main-app-section-md">
            <div class="col">
              <button class="btn btn-block btn-outline-danger btn-ride" @click="cancel">Cancel</button>
            </div>
            <div class="col">
              <button type="submit" class="btn btn-custom btn-block" @click="addReference">Add Reference</button>
            </div>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import AppURL from '@/constants';

  export default {
    name: 'Reference',
    components: { Card },
    data() {
      return {
        AppURL,
        name: '',
        email: '',
        mobile_no: '',
        relationship: '',
      };
    },
    methods: {
      async addReference(event) {
        event.preventDefault();
        try {
          const data = {
            name: this.name,
            email: this.email,
            mobile_no: this.mobile_no,
            relationship: this.relationship,
          };
          const response = await this.axios.post(`${this.AppURL}/rider/add-reference`, data);
          this.$router.push({name: 'Booking'});
          console.log(response.data);
          // if (response.data.success) {
          //   alert('Reference added Successfully');
          // } else {
          //   alert('Error Occurred');
          // }
        } catch (e) {
          console.log(e);
        }
      },
      cancel(event) {
        event.preventDefault();
        this.$router.push({name: 'Booking'});
      }
    },
  };
</script>

<style scoped>

</style>

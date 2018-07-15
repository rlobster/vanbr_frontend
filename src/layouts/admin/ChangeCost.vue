<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Change Costs</div>
        <form>
          <div class="main-app-section-sm"><strong>Sedan:</strong></div>
          <div class="form-group main-app-section-xs">
            <label for="name">Per Kilometer (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Km" v-model="sedanKm" id="sedanKm"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="smin">Per Minute (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Min" id="smin" v-model="sedanMin"/>
          </div>
          <div class="main-app-section-sm"><strong>Mini Van:</strong></div>
          <div class="form-group main-app-section-xs">
            <label for="perkm">Per Kilometer (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Km" v-model="vanKm" id="vanKm"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="vanmin">Per Minute (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Min" id="vanmin" v-model="vanMin"/>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block" @click="changeCost">Submit</button>
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
    name: 'AddDriver',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        sedanKm: '',
        sedanMin: '',
        vanKm: '',
        vanMin: '',
      };
    },
    methods: {
      async changeCost(event) {
        event.preventDefault();
        try {
          const data = {
            name: this.name,
            dob: this.dob,
            gender: this.gender,
            mobile_no: this.mobile_no,
            email: this.email,
            address: this.address,
            car_model: this.carModel,
            city: this.city,
            car_number: this.carNumber,
            license_number: this.licenseNumber,
            license_expiry_date: this.licenseExpiry,
            insurance_number: this.insuranceNo,
            insurance_expiry_date: this.insuranceExpiry,
          };
          const response = await this.axios.post(`${this.AppURL}/admin/driver/create`, data);
          console.log(response);
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

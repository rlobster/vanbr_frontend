<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Your Ride Info</div>
          <div class="d-flex main-app-section-sm">
              <div class="logo">
                <img src="@/assets/sedan.png" v-if="carType == 'Sedan'" />
                <img src="@/assets/van.png" v-else-if="carType == 'Mini Van'" />
              </div>
              <div class="ride-info">
                <div class="subtitle text-secondary">My Ride</div>
                <div class="main-app-section-xs">
                  <div class="d-flex justify-content-between">
                    <div><strong>Car type</strong>:</div>
                    <div>{{ carType }}</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div><strong>Pickup Location</strong>:</div>
                    <div>{{ pickup }}</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div><strong>Drop Location</strong>:</div>
                    <div>{{ drop }}</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div><strong>Driver</strong>:</div>
                    <div>{{ driver }}</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div><strong>Car No</strong>:</div>
                    <div>{{ carNumber }}</div>
                  </div>
                </div>
              </div>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-secondary btn-ride btn-custom">Cancel</button>
            <router-link :to="Routes.Booking" class="btn btn-ride btn-another">Book Another</router-link>
          </div>
      </Card>
    </div>
</template>

<script>
  import axios from 'axios';
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Ride',
    components: { Card },
    data() {
      return {
        Routes,
        carType: '',
        pickup: '',
        drop: '',
        driver: 'Searching...',
        carNumber: 'Searching...',
      };
    },
    mounted() {
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = await axios.get(`http://vanbr.ca/api/rider/get-single-ride?ride_id=${this.$route.params.id}`);
          this.carType = response.data.data.car.type;
          this.pickup = response.data.data.pick_up_point;
          this.drop = response.data.data.drop_point;
        } catch (e) {
          this.$router.push(Routes.Error404);
          console.log(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .ride-info {
    margin: 0 30px;
    width: 100%
  }
  .logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #ccc;
    padding: 8px;
    background-color: #F8F8F8;
    height: 70px;
    img {
      width: 52px;
    }
  }
  .btn-ride {
    width: 49%;
  }
</style>

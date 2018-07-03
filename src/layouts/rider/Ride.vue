<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Your Ride Info</div>
          <div class="d-flex main-app-section-sm">
              <div class="logo">
                <img src="@/assets/sedan.png" />
              </div>
              <div class="ride-info">
                <div class="subtitle text-secondary">My Ride</div>
                <div class="main-app-section-xs">
                  <div class="d-flex justify-content-between">
                    <div><strong>Seats</strong>:</div>
                    <div>10</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div><strong>Driver</strong>:</div>
                    <div>John Doe</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div><strong>Car No</strong>:</div>
                    <div>ABC XY 1234</div>
                  </div>
                </div>
              </div>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-secondary btn-ride btn-custom">Cancel</button>
            <button class="btn btn-ride btn-custom">Book</button>
          </div>
          <div class="form-group main-app-section-xs">
            <button class="btn btn-another btn-block">Book Another</button>
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
      };
    },
    mounted() {
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = axios.get('http://vanbr.ca/api/rider/get-single-ride?ride_id=1');
          console.log(response);
        } catch (e) {
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

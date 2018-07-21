<template>
  <div class="status container main-app-section-sm">
    <Card class="mx-auto mb-4" v-if="rideRequest.newRide">
      <div class="title text-center text-success">New Ride!!!!</div>
      <div class="d-flex justify-content-between main-app-section-sm">
        <div>Pickup Location:</div><strong><a :href="'https://plus.codes/' + rideRequest.pickupCode" target="_blank">{{ rideRequest.pickupLocation }}</a></strong>
      </div>
      <div class="d-flex justify-content-between main-app-section-sm">
        <div>Drop Location:</div><strong><a :href="'https://plus.codes/' + rideRequest.dropCode" target="_blank">{{ rideRequest.dropLocation }}</a></strong>
      </div>
      <div class="d-flex justify-content-between main-app-section-sm">
        <button class="btn btn-danger" @click="sendResponse(false)">Reject</button>
        <button class="btn btn-custom" @click="sendResponse(true)">Accept</button>
      </div>
    </Card>

    <Card class="mx-auto">
      <div class="title text-center">Current Status</div>
      <div class="d-flex justify-content-between main-app-section-sm">
        <div class="lead" :class="[status ? 'text-success' : 'text-danger']">{{ statusContent }}</div>
        <div>
          <label class="switch">
            <input type="checkbox" @change="changeStatus" :checked="status">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div class="main-app-section-xs">
        <div class="d-flex justify-content-between p-2">
          <div><strong>Name</strong>:</div>
          <div>{{ name }}</div>
        </div>
        <div class="d-flex justify-content-between p-2">
          <div><strong>Car Number</strong>:</div>
          <div>{{ carNumber }}</div>
        </div>
        <div class="d-flex justify-content-between p-2">
          <div><strong>Car Type</strong>:</div>
          <div>{{ carType }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import Card from '@/components/Card';
  import AppURL from '@/constants';

  export default {
    name: 'DriverStatus',
    data() {
      return {
        status: false,
        statusContent: 'You are currently Offline',
        AppURL,
        name: '',
        carNumber: '',
        carType: '',
        rideRequest: {
          newRide: false,
          rideId: '',
          pickupCode: '',
          pickupLocation: '',
          dropCode: '',
          dropLocation: '',
        },
      };
    },
    components: { Card },
    mounted() {
      this.getDriverProfile();
    },
    methods: {
      changeStatus() {
        this.status = !this.status;
        this.$socket.emit('isOnline', this.status);
        if (this.status) {
          this.statusContent = 'You are now Online';
        } else {
          this.statusContent = 'You are currently Offline';
        }
      },
      async getDriverProfile() {
        try {
          const response = await this.axios.get(`${this.AppURL}/driver/profile`);
          this.name = response.data.data.name;
          this.carNumber = response.data.data.car_number;
          this.carType = response.data.data.car_model;
        } catch (e) {
          console.log(e);
        }
      },
      sendResponse(response) {
        if (response) {
          this.$socket.emit('getDriverResponse', true, this.rideRequest.rideId);
          this.$socket.emit('isOnline', false);
          this.status = false;
          this.statusContent = 'You are currently Offline';
        } else {
          this.$socket.emit('getDriverResponse', false, this.rideRequest.rideId);
        }
        this.rideRequest.newRide = false;
      },
    },
    sockets: {
      rideConfirmation(data) {
        console.log(data);
        this.rideRequest.newRide = true;
        this.rideRequest.rideId = data.id;
        this.rideRequest.pickupCode = data.ride_meta_data.approx_start_point_code;
        this.rideRequest.dropCode = data.ride_meta_data.approx_end_point_code;
        this.rideRequest.pickupLocation = data.ride_meta_data.approx_start_point_address;
        this.rideRequest.dropLocation = data.ride_meta_data.approx_end_point_address;
      },
      confirmRide(value) {
        console.log(value);
        window.navigator.vibrate(200);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/constants";

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    input {
      display: none;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ddd;
    -webkit-transition: .4s;
    transition: .4s;
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
  }

  input {
    &:checked + .slider {
      background-color: $primary_color;
    }
    &:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    &:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }

  /* Rounded sliders */

  .slider.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }

  button {
    width: 49%;
  }
  a {
    color: black;
    text-decoration: underline;
  }
</style>

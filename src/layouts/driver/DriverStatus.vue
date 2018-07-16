<template>
  <div class="status container main-app-section-sm">
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
          console.log(response.data);
          this.name = response.data.data.name;
          this.carNumber = response.data.data.car_number;
          this.carType = response.data.data.car_model;
        } catch (e) {
          console.log(e);
        }
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
</style>

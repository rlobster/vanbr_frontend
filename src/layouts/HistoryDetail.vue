<template>
  <div class="pricing container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <Card class="mx-auto">
          <div class="title text-center">Ride History</div>
  
          <div class="main-app-section-sm">
            <div>Ride Pickup: <strong v-bind="historyItem.pick_up_point"></strong></div>
            <div>Ride Drop: <strong v-bind="historyItem.drop_point"></strong></div>
            <div>Date: <strong v-bind="historyItem.ride_create_time"></strong></div>
            <!-- <div>Kilometers: <strong v-bind="historyItem."></strong></div> -->
            <div>Ride Start Time: <strong v-bind="historyItem.ride_start_time"></strong></div>
            <div>Ride End Time: <strong v-bind="historyItem.ride_end_time"></strong></div>
  
            <hr />
  
            <div>Rider: <strong v-bind="historyItem.rider.name"></strong></div>
            <!-- <div>Ride Booked for: <strong v-bind="historyItem.rider."></strong></div> -->
            <div>Gender: <strong v-bind="historyItem.rider.gender"></strong></div>
            <div>Rider Contact: <strong v-bind="historyItem.rider.mobile_no"></strong></div>
            <div>Rider Rating: <strong v-bind="historyItem.feedback.rider_ratings"></strong></div>  
            <div>Rider Feedback: <strong v-bind="historyItem.feedback.rider_comments"></strong></div>                        
            <!-- <div>Rider Email: <strong v-bind="historyItem.rider."></strong></div> -->
  
            <hr />
  
            <div>Driver: <strong v-bind="historyItem.driver.name"></strong></div>
            <div>Car Type: <strong v-bind="historyItem.car.type"></strong></div>
            <div>Driver Contact: <strong v-bind="historyItem.driver.mobile_no"></strong></div>
            <div>Driver Rating: <strong v-bind="historyItem.feedback.driver_ratings"></strong></div>
            <div>Driver Feedback: <strong v-bind="historyItem.feedback.driver_comments"></strong></div>                        
            
            <!-- <div>Driver Email: <strong>abc@abc.abc</strong></div> -->
  
            <hr />
  
            <div class="d-flex justify-content-between">
              <div>Per Kilometers($):</div>
              <div v-bind="historyItem.car.cost_per_kilometer"></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Per Minute($):</div>
              <div v-bind="historyItem.car.cost_per_minute"></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Service charge($):</div>
              <div v-bind="historyItem.car.service_charges"></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Tax:</div>
              <div v-bind="historyItem.car.tax"></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Charges($):</div>
              <div v-bind="historyItem.car.vanbr_charges"></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Commission($):</div>
              <div v-bind="historyItem.car.vanbr_commission"></div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Total charge</strong></div>
              <div><strong v-bind="historyItem.cost"></strong></div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Payment status</strong></div>
              <div><strong v-bind="historyItem.payment_status"></strong></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/Card';
  import Routes from '@/router/routes';
  
  export default {
    name: 'HistoryDetail',
    components: {
      Card,
    },
    data() {
      return {
        Routes,
        historyItem: {},
      };
    },
    mounted() {
      console.log(this.$route.params.id);
      this.getHistoryDetail();
    },
    methods: {
      async getHistoryDetail() {
        try {
          const history = await this.axios.get(`http://vanbr.ca/api/rider/get-single-ride?ride_id=${this.$route.params.id}`);
          console.log(history);
          this.historyItem = history.data.data;
          console.log(this.historyItem);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .car-details {
    font-size: 18px;
  }
</style>

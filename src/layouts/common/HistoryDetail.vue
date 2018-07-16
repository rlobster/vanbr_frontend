<template>
  <div class="pricing container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <Card class="mx-auto">
          <div class="title text-center">Ride History</div>

          <div class="main-app-section-sm">
            <div class="d-flex justify-content-between">
              <div>Ride Pickup:</div><div><strong>{{ start_point_address }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Ride Drop:</div><div><strong>{{ end_point_address }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Ride Start Time:</div><div><strong>{{ this.idx(historyItem, _ => _.ride_start_time) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Ride End Time:</div><div><strong>{{ this.idx(historyItem, _ => _.ride_end_time) || '-' }}</strong></div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>Rider:</div><div><strong>{{ this.idx(historyItem, _ => _.rider.name) || '-' }}</strong></div>
            </div>
            <!-- <div>Ride Booked for: <strong v-bind="historyItem.rider."></strong></div> -->
            <div class="d-flex justify-content-between">
              <div>Gender:</div><div><strong>{{ this.idx(historyItem, _ => _.rider.gender) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Rider Contact:</div><div><strong>{{ this.idx(historyItem, _ => _.rider.mobile_no) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Rider Rating:</div><div><strong>{{ this.idx(historyItem, _ => _.feedback.rider_ratings) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Rider Feedback:</div><div><strong>{{ this.idx(historyItem, _ => _.feedback.rider_comments) || '-' }}</strong></div>
            </div>
            <!-- <div>Rider Email: <strong v-bind="historyItem.rider."></strong></div> -->

            <hr />

            <div class="d-flex justify-content-between">
              <div>Driver:</div><div><strong>{{ this.idx(historyItem, _ => _.driver.name) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Car Type:</div><div><strong>{{ this.idx(historyItem, _ => _.car.type) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver Contact:</div><div><strong>{{ this.idx(historyItem, _ => _.driver.mobile_no) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver Rating:</div><div><strong>{{ this.idx(historyItem, _ => _.feedback.driver_ratings) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver Feedback:</div><div><strong>{{ this.idx(historyItem, _ => _.feedback.driver_comments) || '-' }}</strong></div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>Per Kilometers($):</div>
              <div>{{ this.idx(historyItem, _ => _.cost_meta_data.cost_per_kilometer) || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Per Minute($):</div>
              <div>{{ this.idx(historyItem, _ => _.cost_meta_data.cost_per_minute) || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Service charge($):</div>
              <div>{{ this.idx(historyItem, _ => _.cost_meta_data.service_charges) || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Tax:</div>
              <div>{{ this.idx(historyItem, _ => _.cost_meta_data.tax) || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Charges($):</div>
              <div>{{ this.idx(historyItem, _ => _.cost_meta_data.vanbr_charges) || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Commission($):</div>
              <div>{{ this.idx(historyItem, _ => _.cost_meta_data.vanbr_commission) || '-' }}</div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Total charge</strong></div>
              <div><strong>{{ this.idx(historyItem, _ => _.cost) || '-' }}</strong></div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Payment status</strong></div>
              <div><strong>{{ this.idx(historyItem, _ => _.payment_status) || '-' }}</strong></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import Routes from '@/router/routes';
  import AppURL from '@/constants';

  export default {
    name: 'HistoryDetail',
    components: {
      Card,
    },
    data() {
      return {
        AppURL,
        Routes,
        historyItem: {},
        start_point_address: '',
        end_point_address: '',
        role: '',
      };
    },
    async mounted() {
      this.role = this.getRole();
      await this.getHistoryDetail();
    },
    methods: {
      async getHistoryDetail() {
        try {
          const history = await this.axios.get(`${this.AppURL}/${this.role}/get-single-ride?ride_id=${this.$route.params.id}`);
          this.historyItem = history.data.data;
          const ride_meta_data = this.historyItem.ride_meta_data;
          this.start_point_address = ride_meta_data.final_start_point_address ? ride_meta_data.final_start_point_address : ride_meta_data.approx_start_point_address;
          this.end_point_address = ride_meta_data.final_end_point_address ? ride_meta_data.final_end_point_address : ride_meta_data.approx_end_point_address;
        } catch (e) {
          this.checkError(e.response.status);
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

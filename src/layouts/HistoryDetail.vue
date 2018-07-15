<template>
  <div class="pricing container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <Card class="mx-auto">
          <div class="title text-center">Ride History</div>

          <div class="main-app-section-sm">
            <div class="d-flex justify-content-between">
              <div>Ride Pickup:</div><div><strong>{{ pickup || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Ride Drop:</div><div><strong>{{ drop || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Date:</div><div><strong>{{ historyItem.ride_create_time || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Date:</div><div><strong>{{ historyItem.ride_create_time || '-' }}</strong></div>
            </div>

            <!-- <div>Kilometers: <strong v-bind="historyItem."></strong></div> -->
            <div class="d-flex justify-content-between">
              <div>Ride Start Time:</div><div><strong>{{ historyItem.ride_start_time || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Ride End Time:</div><div><strong>{{ historyItem.ride_end_time || '-' }}</strong></div>
            </div>

            <hr />

            <div class="d-flex justify-content-between">
              <div>Rider:</div><div><strong>{{ historyItem.rider.name || '-' }}</strong></div>
            </div>
            <!-- <div>Ride Booked for: <strong v-bind="historyItem.rider."></strong></div> -->
            <div class="d-flex justify-content-between">
              <div>Gender:</div><div><strong>{{ historyItem.rider.gender || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Rider Contact:</div><div><strong>{{ historyItem.rider.mobile_no || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Rider Rating:</div><div><strong>{{ historyItem.feedback.rider_ratings || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Rider Feedback:</div><div><strong>{{ historyItem.feedback.rider_comments || '-' }}</strong></div>
            </div>
            <!-- <div>Rider Email: <strong v-bind="historyItem.rider."></strong></div> -->

            <hr />

            <div class="d-flex justify-content-between">
              <div>Driver:</div><div><strong>{{ historyItem.driver.name || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Car Type:</div><div><strong>{{ historyItem.car.type || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver Contact:</div><div><strong>{{ historyItem.driver.mobile_no || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver Rating:</div><div><strong>{{ historyItem.feedback.driver_ratings || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver Feedback:</div><div><strong>{{ historyItem.feedback.driver_comments || '-' }}</strong></div>
            </div>

            <!-- <div>Driver Email: <strong>abc@abc.abc</strong></div> -->

            <hr />

            <div class="d-flex justify-content-between">
              <div>Per Kilometers($):</div>
              <div>{{ historyItem.cost_meta_data.cost_per_kilometer || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Per Minute($):</div>
              <div>{{ historyItem.cost_meta_data.cost_per_minute || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Service charge($):</div>
              <div>{{ historyItem.cost_meta_data.service_charges || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Tax:</div>
              <div>{{ historyItem.cost_meta_data.tax || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Charges($):</div>
              <div>{{ historyItem.cost_meta_data.vanbr_charges || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Commission($):</div>
              <div>{{ historyItem.cost_meta_data.vanbr_commission || '-' }}</div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Total charge</strong></div>
              <div><strong>{{ historyItem.cost || '-' }}</strong></div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Payment status</strong></div>
              <div><strong>{{ historyItem.payment_status || '-' }}</strong></div>
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
        pickup: '',
        drop: '',
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
          console.log(history);
          this.historyItem = history.data.data;

          const pickupObj = OpenLocationCode.decode(this.historyItem.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);
          console.log(this.pickup);

          const dropObj = OpenLocationCode.decode(this.historyItem.drop_point);
          this.drop = await this.getLocation(dropObj);
          console.log(this.drop);

          console.log(this.historyItem);
        } catch (e) {
          this.checkError(e.response.status);
          console.log(e);
        }
      },
      getLocation(locationObj) {
        return new Promise( ( resolve => {
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({ location: { lat: locationObj.latitudeCenter, lng: locationObj.longitudeCenter } }, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                const address = `${results[0].formatted_address.split(',')[0]} , ${results[0].formatted_address.split(',')[1]}`;
                resolve(address);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        }));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .car-details {
    font-size: 18px;
  }
</style>

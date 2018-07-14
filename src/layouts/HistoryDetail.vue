<template>
  <div class="pricing container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <Card class="mx-auto">
          <div class="title text-center">Ride History</div>
  
          <div class="main-app-section-sm">
            <div>Ride Pickup: <strong>{{ pickup || '-' }}</strong></div>
            <div>Ride Drop: <strong>{{ drop || '-' }}</strong></div>
            <div>Date: <strong>{{ historyItem.ride_create_time || '-' }}</strong></div>
            <!-- <div>Kilometers: <strong v-bind="historyItem."></strong></div> -->
            <div>Ride Start Time: <strong>{{ historyItem.ride_start_time || '-' }}</strong></div>
            <div>Ride End Time: <strong>{{ historyItem.ride_end_time || '-' }}</strong></div>
  
            <hr />
  
            <div>Rider: <strong>{{ historyItem.rider.name || '-' }}</strong></div>
            <!-- <div>Ride Booked for: <strong v-bind="historyItem.rider."></strong></div> -->
            <div>Gender: <strong>{{ historyItem.rider.gender || '-' }}</strong></div>
            <div>Rider Contact: <strong>{{ historyItem.rider.mobile_no || '-' }}</strong></div>
            <div>Rider Rating: <strong>{{ historyItem.feedback.rider_ratings || '-' }}</strong></div>  
            <div>Rider Feedback: <strong>{{ historyItem.feedback.rider_comments || '-' }}</strong></div>                        
            <!-- <div>Rider Email: <strong v-bind="historyItem.rider."></strong></div> -->
  
            <hr />
  
            <div>Driver: <strong>{{ historyItem.driver.name || '-' }}</strong></div>
            <div>Car Type: <strong>{{ historyItem.car.type || '-' }}</strong></div>
            <div>Driver Contact: <strong>{{ historyItem.driver.mobile_no || '-' }}</strong></div>
            <div>Driver Rating: <strong>{{ historyItem.feedback.driver_ratings || '-' }}</strong></div>
            <div>Driver Feedback: <strong>{{ historyItem.feedback.driver_comments || '-' }}</strong></div>                        
            
            <!-- <div>Driver Email: <strong>abc@abc.abc</strong></div> -->
  
            <hr />
  
            <div class="d-flex justify-content-between">
              <div>Per Kilometers($):</div>
              <div>{{ historyItem.car.cost_per_kilometer || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Per Minute($):</div>
              <div>{{ historyItem.car.cost_per_minute || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Service charge($):</div>
              <div>{{ historyItem.car.service_charges || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Tax:</div>
              <div>{{ historyItem.car.tax || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Charges($):</div>
              <div>{{ historyItem.car.vanbr_charges || '-' }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Vanbr Commission($):</div>
              <div>{{ historyItem.car.vanbr_commission || '-' }}</div>
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
  
  export default {
    name: 'HistoryDetail',
    components: {
      Card,
    },
    data() {
      return {
        Routes,
        historyItem: {},
        pickup: '',
        drop: '',
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
          
          const pickupObj = OpenLocationCode.decode(this.historyItem.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);
          console.log(this.pickup);

          const dropObj = OpenLocationCode.decode(this.historyItem.drop_point);
          this.drop = await this.getLocation(dropObj);
          console.log(this.drop);
          
          console.log(this.historyItem);
        } catch (e) {
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

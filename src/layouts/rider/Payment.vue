<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md">
          <Card class="mx-auto">
            <div class="title text-center">Invoice</div>

            <div class="main-app-section-sm">
              <div>Source: <strong>{{pickup}}</strong></div>
              <div>Destination: <strong>{{drop}}</strong></div>
              <div>Kilometers: <strong>{{distance}}</strong></div>
              <div>Time: <strong>{{time}} minute</strong></div>
              <hr />
              <div class="d-flex justify-content-between">
                <div>Per Kilometers:</div>
                <div>${{cost_meta_data.cost_per_kilometer}} * {{distance}} = {{total_cost_per_kilometer}}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Per Minute:</div>
                <div>${{cost_meta_data.cost_per_minute}} * {{time}} = {{total_cost_per_minute}}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Vanbr charge:</div>
                <div>${{cost_meta_data.vanbr_charges}}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Service charge:</div>
                <div>${{cost_meta_data.service_charges}}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>{{cost_meta_data.tax}}% tax:</div>
                <div>${{total_tax}}</div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total</strong></div>
                <div><strong>${{Number(total_cost) + Number(total_tax)}}</strong></div>
              </div>
              <hr />
              <div class="form-group main-app-section-sm">
                <label>Enter Card details:</label>
                <StripeCard class='stripe-card'
                  :class='{ complete }'
                  stripe='pk_test_8wgmvT01TU27qZFaMbAny3UF'
                  :options='stripeOptions'
                  @change='complete = $event.complete'
                />
              </div>
              <div class="form-group main-app-section-md">
                <!--<button class="btn btn-custom btn-block">Pay</button>-->
                <button class='pay-with-stripe btn btn-custom btn-block' @click='pay' :disabled='!complete'>Pay with credit card</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios';
  import moment from 'moment';
  import { Card as StripeCard, createToken } from 'vue-stripe-elements-plus';
  import Card from '@/components/Card';
  import AppURL from '@/constants';

  export default {
    name: 'Payment',
    components: { Card, StripeCard },
    data() {
      return {
        AppURL,
        role: '',
        complete: false,
        pickup: '',
        drop: '',
        start_time: '',
        end_time: '',
        distance: 0,
        time: '',
        cost_meta_data: {},
        total_cost_per_kilometer: '',
        total_cost_per_minute: '',
        total_tax: '',
        total_cost: '',
        stripeOptions: {
          name: '',
          currency: 'cad',
        },
      };
    },
    mounted() {
      this.getRide();
      this.role = this.getRole();
    },
    methods: {
      async getRide() {
        try {
          const response = await axios.get(`${this.AppURL}/${this.role}/get-single-ride?ride_id=${this.$route.params.id}`);
          
          const ride_data = response.data.data;

          this.stripeOptions.name = ride_data.rider.name;

          console.log(this.stripeOptions)

          const pickupObj = OpenLocationCode.decode(ride_data.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);

          const dropObj = OpenLocationCode.decode(ride_data.drop_point);
          this.drop = await this.getLocation(dropObj);
          
          this.start_time = moment(ride_data.cost_meta_data.ride_start_time);
          this.end_time = moment(ride_data.cost_meta_data.ride_end_time);
          this.time = (this.start_time).diff(this.end_time, 'minutes');

          this.cost_meta_data = ride_data.cost_meta_data;
          
          this.total_cost_per_kilometer = (Number(this.cost_meta_data.cost_per_kilometer) * Number(this.distance)).toFixed(2);
          this.total_cost_per_minute = (Number(this.cost_meta_data.cost_per_minute) * Number(this.time)).toFixed(2);
          this.total_cost = Number(this.total_cost_per_kilometer) + Number(this.total_cost_per_minute) + Number(this.cost_meta_data.service_charges) + Number(this.cost_meta_data.vanbr_charges);
          this.total_tax = (Number(this.total_cost) * Number(this.cost_meta_data.tax) / 100).toFixed(2);

        } catch (e) {
          // this.$router.push(Routes.Error404);
          console.log(e);
        }
      },
      getLocation(locationObj) {
        return new Promise( ((resolve, reject) => {
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({'location': {lat: locationObj.latitudeCenter, lng: locationObj.longitudeCenter}}, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                const address = `${results[0].formatted_address.split(',')[0]} , ${results[0].formatted_address.split(',')[1]}`;
                resolve(address)
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        }));
      },
      // mapsAPICalculation(event) {
      //   event.preventDefault();
      //   if (!this.pickup || !this.drop || !this.carId) {
      //     alert('All fields are required');
      //     return false;
      //   }
      //   this.showCalculation = true;

      //   const url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
      //   const params = `units=imperial&origins=${this.pickupCoOrdinates.lat},${this.pickupCoOrdinates.long}&destinations=${this.dropCoOrdinates.lat},${this.dropCoOrdinates.long}&key=AIzaSyCPXsZhEgbSDGOY2QVsJCBf3gq7D5Eggwk`;

      //   let service = new google.maps.DistanceMatrixService;
      //   service.getDistanceMatrix({
      //     origins: [`${this.pickupCoOrdinates[0]},${this.pickupCoOrdinates[1]}`],
      //     destinations: [`${this.dropCoOrdinates[0]},${this.dropCoOrdinates[1]}`],
      //     travelMode: 'DRIVING',
      //     unitSystem: google.maps.UnitSystem.METRIC,
      //     avoidHighways: false,
      //     avoidTolls: false
      //   }, (response, status) => {
      //     this.distance = response.rows[0].elements[0].distance.text;
      //     this.approxTime = response.rows[0].elements[0].duration.text;
      //   });
      // },
      pay() {
        createToken().then(data => this.endRide(data.token));
      },
      async endRide(token) {
        const data = {
          token,
          ride_id: this.$route.params.id
        };
        const response = await this.axios.post(`${this.AppURL}/rider/end-ride`, data);
        this.$router.push({name: 'Feedback', params: {id: response.data.data.id}});
      },
    },
  };
</script>

<style lang="scss" scoped>

  .car-details {
    font-size: 18px;
  }
</style>

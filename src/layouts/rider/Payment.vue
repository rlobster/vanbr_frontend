<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md">
          <Card class="mx-auto">
            <div class="title text-center">Invoice</div>

            <div class="main-app-section-sm">
              <div class="d-flex justify-content-between">
                <div>Source:</div>
                <div><strong>{{pickup}}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Destination:</div>
                <div><strong>{{drop}}</strong></div>
              </div>
              <div v-if="is_ride_end">
                <div class="d-flex justify-content-between">
                  <div>Kilometers:</div>
                  <div><strong>{{distance}}</strong></div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>Time:</div>
                  <div><strong>{{time}} minute</strong></div>
                </div>
              </div>
              <hr />
              <div v-if="is_ride_end">
                <div class="d-flex justify-content-between">
                  <div>Per Kilometers:</div>
                  <div>{{cost_meta_data.cost_per_kilometer}} * {{distance}} = <strong>${{total_cost_per_kilometer}}</strong></div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>Per Minute:</div>
                  <div>{{cost_meta_data.cost_per_minute}} * {{time}} = <strong>${{total_cost_per_minute}}</strong></div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Vanbr charge:</div>
                <div><strong>${{cost_meta_data.vanbr_charges}}</strong></div>
              </div>
              <div v-if="is_ride_end">
                <div class="d-flex justify-content-between">
                  <div>Service charge:</div>
                  <div><strong>${{cost_meta_data.service_charges}}</strong></div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>{{cost_meta_data.tax}}% tax:</div>
                  <div><strong>${{total_tax}}</strong></div>
                </div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total</strong></div>
                <div><strong>${{(Number(total_cost) + Number(total_tax)).toFixed(2)}}</strong></div>
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
        is_ride_end: '',
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
    beforeMount() {
      this.role = this.getRole();
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = await this.axios.get(`${this.AppURL}/${this.role}/get-single-ride?ride_id=${this.$route.params.id}`);
          
          const ride_data = response.data.data;
          
          this.stripeOptions.name = ride_data.rider.name;
          
          if (ride_data.payment_status === 3) {
            this.$router.push(this.Routes.Booking);
          }

          const pickupObj = OpenLocationCode.decode(ride_data.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);

          const dropObj = OpenLocationCode.decode(ride_data.drop_point);
          this.drop = await this.getLocation(dropObj);
          
          this.cost_meta_data = ride_data.cost_meta_data;

          if (ride_data.ride_status === 3) {
            this.is_ride_end = true;
            this.start_time = this.moment(ride_data.ride_start_time);
            this.end_time = this.moment(ride_data.ride_end_time);
            this.time = (this.start_time).diff(this.end_time, 'minutes');
            
            this.total_cost_per_kilometer = (Number(this.cost_meta_data.cost_per_kilometer) * Number(this.distance)).toFixed(2);
            this.total_cost_per_minute = (Number(this.cost_meta_data.cost_per_minute) * Number(this.time)).toFixed(2);
            this.total_cost = Number(this.total_cost_per_kilometer) + Number(this.total_cost_per_minute) + Number(this.cost_meta_data.service_charges) + Number(this.cost_meta_data.vanbr_charges);
            this.total_tax = (Number(this.total_cost) * Number(this.cost_meta_data.tax) / 100).toFixed(2);
          } else {
            this.is_ride_end = false;
            this.total_cost = Number(this.cost_meta_data.vanbr_charges);
            this.total_tax = 0;
          }
        } catch (e) {
          this.checkError(e.response.status);
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

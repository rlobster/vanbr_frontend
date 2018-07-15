<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Give Feedback</div>
        <form name="book">
          <div class="form-group main-app-section-sm p-2">
            <div class="d-flex justify-content-between">
              <div><strong>Source</strong>:</div>
              <div>{{pickup}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Destination</strong>:</div>
              <div>{{drop}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Rider</strong>:</div>
              <div>{{rider}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Driver</strong>:</div>
              <div>{{driver}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Date</strong>:</div>
              <div>{{date}}</div>
            </div>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="rating">Rating</label>
            <star-rating id="rating" :show-rating="false" v-model="rating"></star-rating>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="feedback">Feedback</label>
            <textarea row="4" class="form-control" name="feedback" id="feedback" v-model="comment">
            </textarea>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-custom btn-block" @click="feedback">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import StarRating from 'vue-star-rating';
  import AppURL from '@/constants';

  export default {
    name: 'Payment',
    components: { Card, StarRating },
    data() {
      return {
        AppURL,
        role: '',
        pickup: '',
        drop: '',
        rider: '',
        driver: '',
        date: '',
        rating: null,
        comment: ''
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

          if (ride_data.ride_status === 3 && ride_data.payment_status === 3) {
            const pickupObj = OpenLocationCode.decode(ride_data.pick_up_point);
            this.pickup = await this.getLocation(pickupObj);

            const dropObj = OpenLocationCode.decode(ride_data.drop_point);
            this.drop = await this.getLocation(dropObj);

            this.rider = ride_data.rider.name;
            this.driver = ride_data.driver.name;
            
            this.date = this.moment(ride_data.cost_meta_data.ride_end_time).format('YYYY-MM-DD, HH:mm');
          } else {
            this.$router.push(this.Routes.Booking);
          }

        } catch (e) {
          this.checkError(e.response.status);
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
      async feedback(event) {
        event.preventDefault();
        try {
          const data = {
            ride_id: this.$route.params.id,
            rider_ratings: this.rating,
            rider_comments: this.comment,
          };
          const response = await this.axios.post(`${this.AppURL}/${this.role}/feedback`, data);
          this.$router.push({name: 'Booking'});
          console.log(response);
        } catch (e) {
          this.checkError(e.response.status);
          console.log(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>

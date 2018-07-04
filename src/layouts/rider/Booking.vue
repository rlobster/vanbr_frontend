<template>
    <div class="booking container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Book a Ride</div>
        <form name="book">
          <div class="form-group main-app-section-xs">
            <label for="pickup">Pickup Location:</label>
            <gmap-autocomplete
              class="form-control"
              id="pickup"
              placeholder="Search Location"
              :componentRestrictions="{ country: 'CA' }"
              @place_changed="setPickup" />
          </div>
          <div class="form-group main-app-section-xs">
            <label for="drop">Drop Location:</label>
            <gmap-autocomplete
              class="form-control"
              id="drop"
              placeholder="Search Location"
              :componentRestrictions="{ country: 'CA' }"
              @place_changed="setDrop" />
          </div>
          <div class="form-group main-app-section-xs">
            <label for="car">Select Car:</label>
            <select id="car" class="form-control" v-model="car_id">
              <option value="0" disabled="" selected>Select Type</option>
              <option value="1">Sedan (4 Seats)</option>
              <option value="2">Mini Van (6 Seats)</option>
            </select>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-custom btn-block" @click="book">Book</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios';
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Booking',
    components: { Card },
    data() {
      return {
        Routes,
        pickup: '',
        drop: '',
        car_id: '0',
      };
    },
    methods: {
      async book(event) {
        event.preventDefault();
        try {
          const data = {
            car_id: this.car_id,
            pick_up_point: this.pickup,
            drop_point: this.drop,
          };
          const response = await axios.post('http://vanbr.ca/api/rider/book-ride', data);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      },
      setPickup(place) {
        let lat = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        const plusCode = OpenLocationCode.encode(lat, long);
        this.pickup = plusCode
      },
      setDrop(place) {
        let lat = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        const plusCode = OpenLocationCode.encode(lat, long);
        this.drop = plusCode
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>

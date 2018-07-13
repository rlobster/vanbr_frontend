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
            <label for="select-member">Book for:</label>
            <select class="form-control" id="select-member" v-model="referenceId">
              <option value="0">Self</option>
            </select>
            <div class="d-flex justify-content-end mt-1">
              <router-link :to="Routes.Reference">+ Add Member</router-link>
            </div>
          </div>
          <div class="form-group">
            <label>Select Car:</label>
            <div class="section-container">
              <div>
                <label for="sedan" class="d-flex align-items-center car-type-label">
                  <div class="car-logo" :class="{ 'colored-image-div' : (carId == 1) }">
                    <img src="../../assets/sedan.png"/>
                  </div>
                  <div class="ml-4" :class="{ 'text-secondary' : (carId != 1) }">
                    Sedan - 4 Seats
                  </div>
                </label>
                <input type="radio" id="sedan" name="car-type" value="1" class="car-radio" v-model="carId"/>
              </div>
              <hr class="hr-spacing"/>
              <div>
                <label for="mini-van" class="d-flex align-items-center car-type-label">
                  <div class="car-logo" :class="{ 'colored-image-div' : (carId == 2) }">
                    <img src="../../assets/van.png"/>
                  </div>
                  <div class="ml-4" :class="{ 'text-secondary' : (carId != 2) }">
                    Mini Van - 6 Seats
                  </div>
                </label>
                <input type="radio" id="mini-van" name="car-type" value="2" class="car-radio" v-model="carId"/>
              </div>
            </div>
          </div>
          <div class="form-group main-app-section-sm section-container" v-if="showCalculation">
            <div>
              <label><strong>Distance:</strong> {{ distance }}</label>
            </div>
            <div>
              <label><strong>Approx time:</strong> {{ approxTime }}</label>
            </div>
            <div>
              <label><strong>Approx Cost:</strong></label>
            </div>
          </div>
          <div class="row form-group main-app-section-md">
            <div class="col">
              <button class="btn btn-block btn-primary" @click="mapsAPICalculation">Estimate</button>
            </div>
            <div class="col">
              <button class="btn btn-custom btn-block" @click="book" id="book">Book</button>
            </div>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Booking',
    components: { Card },
    data() {
      return {
        Routes,
        pickup: '',
        pickupCoOrdinates: [],
        dropCoOrdinates: [],
        drop: '',
        carId: '0',
        referenceId: '0',
        showCalculation: false,
        distance: '',
        approxTime: '',
        approxCost: '',
      };
    },
    methods: {
      async book(event) {
        event.preventDefault();
        document.querySelector("#book").disabled = true
        if (!this.pickup || !this.drop || !this.carId) {
          return false;
        }
        try {
          const data = {
            car_id: this.carId,
            pick_up_point: this.pickup,
            drop_point: this.drop,
            reference_id: this.referenceId
          };
          const response = await this.axios.post('http://vanbr.ca/api/rider/book-ride', data);
          console.log(response);
          this.$router.push({name: 'Ride', params: {id: response.data.data.id}});
        } catch (e) {
          console.log(e);
        } finally {
          document.querySelector("#book").disabled = false
        }
      },
      setPickup(place) {
        let lat = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        this.pickupCoOrdinates[0] = lat;
        this.pickupCoOrdinates[1] = long;
        this.pickup = OpenLocationCode.encode(lat, long);
      },
      setDrop(place) {
        let lat = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        this.dropCoOrdinates[0] = lat;
        this.dropCoOrdinates[1] = long;
        this.drop = OpenLocationCode.encode(lat, long);
      },
      mapsAPICalculation(event) {
        event.preventDefault();
        if (!this.pickup || !this.drop || !this.carId) {
          alert('All fields are required');
          return false;
        }
        this.showCalculation = true;

        const url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        const params = `units=imperial&origins=${this.pickupCoOrdinates.lat},${this.pickupCoOrdinates.long}&destinations=${this.dropCoOrdinates.lat},${this.dropCoOrdinates.long}&key=AIzaSyCPXsZhEgbSDGOY2QVsJCBf3gq7D5Eggwk`;

        let service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [`${this.pickupCoOrdinates[0]},${this.pickupCoOrdinates[1]}`],
          destinations: [`${this.dropCoOrdinates[0]},${this.dropCoOrdinates[1]}`],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
          this.distance = response.rows[0].elements[0].distance.text;
          this.approxTime = response.rows[0].elements[0].duration.text;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  label {
    cursor: pointer;
  }
  .section-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px 10px;
  }
  .car-radio {
    display: none;
  }
  .car-logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #CCC;
    padding: 8px;
    margin: 4px;
    background-color: #FFF;
    transition: 0.4s all ease;

    img {
      width: 32px;
      filter: grayscale(100%);
      transition: 0.4s all ease;
    }
  }
  .hr-spacing {
    margin: 4px 0;
  }
  .colored-image-div {
    background-color: #F8F8F8;
    img {
      filter: grayscale(0%);
    }
  }
  .car-type-label {
    margin-bottom: 0;
  }
</style>

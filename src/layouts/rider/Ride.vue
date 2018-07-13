<template>
    <div class="booking container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Your Ride Info</div>
          <div class="d-flex main-app-section-sm align-items-center justify-content-center">
              <div class="logo">
                <img src="@/assets/sedan.png" v-if="carType == 'Sedan'" />
                <img src="@/assets/van.png" v-else-if="carType == 'Mini Van'" />
              </div>
          </div>
        <div class="main-app-section-sm">
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td><strong>Car type</strong>:</td>
              <td class="text-right">{{ carType }}</td>
            </tr>
            <tr>
              <td><strong>Pickup</strong>:</td>
              <td class="text-right">{{ pickup }}</td>
            </tr>
            <tr>
              <td><strong>Drop</strong>:</td>
              <td class="text-right">{{ drop }}</td>
            </tr>
            <tr>
              <td><strong>Driver</strong>:</td>
              <td class="text-right">{{ driver }}</td>
            </tr>
            <tr>
              <td><strong>Car Detail</strong>:</td>
              <td class="text-right">{{ carDetail }}</td>
            </tr>
            </tbody>
          </table>
        </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-outline-danger btn-ride" @click="cancelRide">Cancel</button>
            <router-link :to="Routes.Booking" class="btn btn-ride btn-custom">Book Another</router-link>
          </div>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Ride',
    components: { Card },
    data() {
      return {
        Routes,
        carType: '',
        pickup: '',
        drop: '',
        driver: 'Searching...',
        carDetail: 'Searching...',
      };
    },
    mounted() {
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = await this.axios.get(`http://vanbr.ca/api/rider/get-single-ride?ride_id=${this.$route.params.id}`);
          this.carType = response.data.data.car.type;

          const pickupObj = OpenLocationCode.decode(response.data.data.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);

          const dropObj = OpenLocationCode.decode(response.data.data.drop_point);
          this.drop = await this.getLocation(dropObj);
        } catch (e) {
          // this.$router.push(Routes.Error404);
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
      async cancelRide() {
        try {
          const data = {
            ride_id: this.$route.params.id,
          }
          const response = await this.axios.post('http://vanbr.ca/api/rider/cancel-ride', data);
          console.log(response);
          if (response.data.success) {
            if (response.data.data.payment_status !== 3) {
              this.$router.push(Routes.Payment + '/' +response.data.data.id);
            } else {
              this.$router.push(Routes.Booking);
            }
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .ride-info {
    margin: 0 30px;
    width: 100%
  }
  .logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #ccc;
    padding: 8px;
    background-color: #F8F8F8;
    height: 70px;
    width: 70px;
    img {
      width: 52px;
    }
  }
  .btn-ride {
    width: 49%;
  }
  .table th, .table td {
    padding: 0.25rem 1rem;
  }
  .btn-custom {
    &:hover {
      color: #FFFFFF;
      background-color: #4D5EB8;
    }
  }
</style>

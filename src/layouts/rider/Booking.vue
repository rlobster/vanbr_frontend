<template>
    <div class="booking container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Book a Ride</div>
        <form name="book">
          <div class="form-group main-app-section-xs">
            <label for="from">From:</label>
            <input type="text" class="form-control" name="from" id="from">
          </div>
          <div class="form-group main-app-section-xs">
            <label for="to">To:</label>
            <input type="text" class="form-control" name="from" id="to">
          </div>
          <div class="form-group main-app-section-xs">
            <label for="car">Select Car:</label>
            <select id="car" class="form-control">
              <option disabled="" selected>Select Type</option>
              <option value="sedan">Sedan (4 Seats)</option>
              <option value="van">Mini Van (6 Seats)</option>
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
  import axios from 'axios';
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Booking',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
    methods: {
      async book(event) {
        event.preventDefault();
        try {
          const data = {
            name: 'abc def',
            mobile_no: '9090909090',
            email: 'abc@abc.def',
            relationship: 'Friend',
            car_id: '1',
            starting_point: 'IIM',
            destination: 'lorem ipsum qqwerty ffjfjf',
          };
          const response = await axios.post('http://vanbr.ca/api/rider/book-ride', data);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>

<template>
    <div class="booking container main-app-section-md">
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
              <option value="van">Mini Van (4 Seats)</option>
              <option value="sedan">Sedan (6 Seats)</option>
            </select>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-custom btn-block">Book</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
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
  };
</script>

<style lang="scss" scoped>

</style>

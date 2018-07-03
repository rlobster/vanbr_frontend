<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Give Feedback</div>
        <form name="book">
          <div class="form-group main-app-section-sm p-2">
            <div class="d-flex justify-content-between">
              <div><strong>Source</strong>:</div>
              <div>ABC</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Destination</strong>:</div>
              <div>XYZ</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Rider</strong>:</div>
              <div>John Doe</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Driver</strong>:</div>
              <div>Will Smith</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Date</strong>:</div>
              <div>1 Jan 2020, 12:30:00 PM</div>
            </div>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="rating">Rating</label>
            <star-rating id="rating" :show-rating="false"></star-rating>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="feedback">Feedback</label>
            <textarea row="4" class="form-control" name="feedback" id="feedback">
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
  import axios from 'axios';
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import StarRating from 'vue-star-rating';

  export default {
    name: 'Payment',
    components: { Card, StarRating },
    data() {
      return {
        Routes,
      };
    },
    methods: {
      async feedback(event) {
        event.preventDefault();
        try {
          const data = {
            ride_id: '1',
            rider_ratings: '5',
            rider_comments: 'lorem ipsum qqwerty ffjfjf',
          };
          const response = await axios.post('http://vanbr.ca/api/rider/feedback', data);
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

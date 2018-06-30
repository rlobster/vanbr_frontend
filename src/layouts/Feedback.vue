<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Give Feedback</div>
        <form name="book">
          <div class="form-group main-app-section-xs">
            <label for="from">Driver/ Rider Name</label>
            <input type="text" class="form-control" name="name" id="name">
          </div>
          <div class="form-group main-app-section-xs">
            <label for="to">Feedback</label>
            <textarea row="4" class="form-control" name="feedback" id="feedback">
            </textarea>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-custom btn-block">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Payment',
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

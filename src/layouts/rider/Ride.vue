<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Your Ride Info</div>
          <div class="d-flex main-app-section-sm">
              <div class="logo">
                <img src="@/assets/sedan.png" />
              </div>
              <div class="ride-info">
                <div class="subtitle text-secondary">My Ride</div>
                <div class="main-app-section-xs">
                  <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </div>
                <div class="main-app-section-xs">
                  <p><strong>Seats</strong>: 10</p>
                  <p><strong>Cost</strong>: $25</p>
                </div>
              </div>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-secondary btn-ride btn-custom">Cancel</button>
            <button class="btn btn-ride btn-custom">Book</button>
          </div>
          <div class="form-group main-app-section-xs">
            <button class="btn btn-another btn-block">Book Another</button>
          </div>
      </Card>
    </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Ride',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .ride-info {
    margin-left: 30px;
  }
  .logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #ccc;
    padding: 8px;
    background-color: #F8F8F8;
    height: 70px;
    img {
      width: 52px;
    }
  }
  .btn-ride {
    width: 49%;
  }
</style>

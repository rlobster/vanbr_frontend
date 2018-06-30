<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md main-app-section-sm">
          <Card class="mx-auto">
            <div class="d-flex justify-content-center">
              <div class="car-logo">
                <img src="@/assets/sedan.png" />
              </div>
            </div>
            <div class="subtitle text-center text-secondary">Sedan</div>

            <div class="main-app-section-sm">
              <div class="d-flex justify-content-between car-details">
                <div>Available seats:</div>
                <div>1-4</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Booking fees:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Service charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per kilometer:</div>
                <div>$0.80</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per minute:</div>
                <div>$0.20</div>
              </div>
            </div>
            <div class="main-app-section-sm car-details">
              <router-link :to="Routes.Booking">
                <button class="btn btn-custom btn-block">
                  Book Now
                </button>
              </router-link>
            </div>
          </Card>
        </div>
        <div class="col-md main-app-section-sm">
          <Card class="mx-auto">
            <div class="d-flex justify-content-center">
              <div class="car-logo">
                <img src="@/assets/van.png" />
              </div>
            </div>
            <div class="subtitle text-center text-secondary">Mini Van</div>

            <div class="main-app-section-sm">
              <div class="d-flex justify-content-between car-details">
                <div>Available seats:</div>
                <div>1-6</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Booking fees:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Service charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per kilometer:</div>
                <div>$0.80</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per minute:</div>
                <div>$0.20</div>
              </div>
              <div class="main-app-section-sm car-details">
                <router-link :to="Routes.Booking">
                  <button class="btn btn-custom btn-block">
                    Book Now
                  </button>
                </router-link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'Pricing',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style lang="scss" scoped>

  .car-logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #ccc;
    padding: 8px;
    background-color: #F8F8F8;

    img {
      width: 52px;
    }
  }

  .car-details {
    font-size: 18px;
    padding: 4px 20px;
  }

</style>

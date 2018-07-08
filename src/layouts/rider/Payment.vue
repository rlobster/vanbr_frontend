<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md">
          <Card class="mx-auto">
            <div class="title text-center">Invoice</div>

            <div class="main-app-section-sm">
              <div>Ride from <strong>XYZ</strong> to <strong>ABC</strong></div>
              <div>Kilometers: <strong>5</strong></div>
              <div>Time: <strong>10 minute</strong></div>

              <hr />

              <div class="d-flex justify-content-between">
                <div>Per Kilometers:</div>
                <div>$4.00</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Per Minute:</div>
                <div>$2.00</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Vanbr charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Service charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>13% tax:</div>
                <div>$1.45</div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total</strong></div>
                <div><strong>$12.45</strong></div>
              </div>
              <hr />
              <div class="form-group main-app-section-sm">
                <label>Enter Card details:</label>
                <StripeCard class='stripe-card'
                  :class='{ complete }'
                  stripe='pk_test_8wgmvT01TU27qZFaMbAny3UF'
                  :options='stripeOptions'
                  @change='complete = $event.complete'
                />
              </div>
              <div class="form-group main-app-section-md">
                <!--<button class="btn btn-custom btn-block">Pay</button>-->
                <button class='pay-with-stripe btn btn-custom btn-block' @click='pay' :disabled='!complete'>Pay with credit card</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
</template>

<script>
  import { Card as StripeCard, createToken } from 'vue-stripe-elements-plus';
  import Card from '@/components/Card';

  export default {
    name: 'Payment',
    components: { Card, StripeCard },
    data() {
      return {
        complete: false,
        stripeOptions: {
          name: 'Vanbr',
          currency: 'cad',
        },
      };
    },

    methods: {
      pay() {
        createToken().then(data => this.endRide(data.token));
      },
      endRide(token) {
        const data = {
          token,
          ride_id: 1,
          cost: 10.5,
        };
        const response = this.axios.post('http://vanbr.ca/api/rider/end-ride', data);
        console.log(response);
      },
    },
  };
</script>

<style lang="scss" scoped>

  .car-details {
    font-size: 18px;
  }
</style>

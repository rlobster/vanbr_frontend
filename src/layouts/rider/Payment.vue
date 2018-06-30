<template>
    <div class="pricing container main-app-section-sm">
      <div class="col-md main-app-section-sm">
          <Card class="mx-auto">
            <div class="title text-center">Invoice</div>

            <div class="main-app-section-sm">
              <p>Ride from XYZ to ABC</p>
              <p>Kilometers: 5</p>
              <p>Time: 10 minute</p>

              <div class="d-flex justify-content-between car-details">
                <div>Per Kilometers:</div>
                <div>5 * 0.80 = $4.00</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per Minute:</div>
                <div>10 * 0.20 = $2.00</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Vanbr charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Service charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>13% tax (approx):</div>
                <div>$1.45</div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total</strong></div>
                <div>$12.45</div>
              </div>
              <div class="form-group main-app-section-md">
                <button class="btn btn-custom btn-block">Pay</button>
              </div>
            </div>
          </Card>
        </div>
    </div>
</template>

<script>
  import Card from '@/components/Card';

  export default {
    name: 'Payment',
    components: { Card },
  };
</script>

<style lang="scss" scoped>

  .car-details {
    font-size: 18px;
    padding: 4px 20px;
  }

</style>

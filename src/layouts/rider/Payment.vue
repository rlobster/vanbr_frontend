<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md main-app-section-sm">
          <Card class="mx-auto">
            <div class="title text-center">Invoice</div>

            <div class="main-app-section-sm">
              <p>Ride from <strong>XYZ</strong> to <strong>ABC</strong></p>
              <p>Kilometers: 5</p>
              <p>Time: 10 minute</p>

              <div class="d-flex justify-content-between car-details">
                <div>Per Kilometers:</div>
                <div>$4.00</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per Minute:</div>
                <div>$2.00</div>
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
                <div>13% tax:</div>
                <div>$1.45</div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total</strong></div>
                <div><strong>$12.45</strong></div>
              </div>
              <div class="form-group main-app-section-md">
                <button class="btn btn-custom btn-block">Pay</button>
              </div>
            </div>
          </Card>
        </div>
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

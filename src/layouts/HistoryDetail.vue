<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md">
          <Card class="mx-auto">
            <div class="title text-center">Ride History</div>

            <div class="main-app-section-sm">
              <div>Ride Pickup: <strong>XYZ, CA 382525</strong></div>
              <div>Ride Drop: <strong>ABC, NYC 414145</strong></div>
              <div>Date: <strong>July 5, 2018</strong></div>              
              <div>Kilometers: <strong>5</strong></div>
              <div>Time: <strong>10 minute</strong></div>

              <hr />

              <div>Rider: <strong>John Snow</strong></div>
              <div>Ride Booked for: <strong>Self</strong></div>              
              <div>Gender: <strong>Male</strong></div>
              <div>Rider Contact: <strong>1234567890</strong></div>
              <div>Rider Email: <strong>john@abc.abc</strong></div>              

              <hr />

              <div>Driver: <strong>Max Karl</strong></div>
              <div>Car Type: <strong>Sedan</strong></div>
              <div>Driver Average Rating: <strong>3.5</strong></div>              
              <div>Driver Contact: <strong>999999999</strong></div>
              <div>Driver Email: <strong>abc@abc.abc</strong></div>              

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
                <div>Service charge:</div>
                <div>$2.5</div>
              </div>
              <div class="d-flex justify-content-between">
                <div>13% tax:</div>
                <div>$1.45</div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total charge</strong></div>
                <div><strong>$12.45</strong></div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Payment status</strong></div>
                <div><strong>Paid</strong></div>
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
    name: 'HistoryDetail',
    components: { Card },
  };
</script>

<style lang="scss" scoped>

  .car-details {
    font-size: 18px;
  }

</style>

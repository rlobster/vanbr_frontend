<template>
  <div class="admin container">
    <div class="row">
      <div class="col-md main-app-section-sm">
        <Card class="card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="@/assets/users.svg" class="icons"/>
            </div>
            <div>
              <div class="subtitle text-secondary">Users</div>
              <div class="title">100</div>
            </div>
          </div>
        </Card>
      </div>
      <div class="col-md main-app-section-sm">
        <Card class="card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="@/assets/add-user.svg" class="icons-sm"/>
            </div>
            <div>
              <div class="subtitle text-secondary">Add Driver</div>
            </div>
          </div>
        </Card>
      </div>
      <div class="col-md main-app-section-sm">
        <Card class="card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="@/assets/payment.svg" class="icons"/>
            </div>
            <div>
              <div class="subtitle text-secondary">Payment</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="row">
      <div class="col-md main-app-section-sm">
        <Card class="card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="@/assets/car.svg" class="icons"/>
            </div>
            <div>
              <div class="subtitle text-secondary">Rides</div>
            </div>
          </div>
        </Card>
      </div>
      <div class="col-md main-app-section-sm">
        <Card class="card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="@/assets/feedback.svg" class="icons-sm"/>
            </div>
            <div>
              <div class="subtitle text-secondary">Feedback</div>
            </div>
          </div>
        </Card>
      </div>
      <div class="col-md main-app-section-sm">
        <Card class="card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <img src="@/assets/email.svg" class="icons-sm"/>
            </div>
            <div>
              <div class="subtitle text-secondary">Send Email</div>
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
    name: 'Admin',
    components: { Card },
  };
</script>

<style lang="scss" scoped>
  .card {
    width: 280px;
    height: 120px;
    margin: 0 auto;
  }

  .icons {
    height: 80px;
    width: 80px;
  }

  .icons-sm {
    height: 60px;
    width: 60px;
    margin-top: 12px;
  }

  @media (max-width: 576px) {
    .card {
      width: 100%;
    }
  }
</style>

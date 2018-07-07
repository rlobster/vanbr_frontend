<template>
    <div class="main-app-section-sm container">

        <Card class="mx-auto">
          <div class="title">History</div>
          <div class="history-card">
            <router-link :to="Routes.HistoryDetail">
            <span>May 15, 2018</span>
            <span>10:13 AM</span>
            <span class="history-card-detail">$40.44</span>
            </router-link>
          </div>
          <div class="history-card">
            <router-link :to="Routes.HistoryDetail">
            <span>May 15, 2018</span>
            <span>10:13 AM</span>
            <span class="history-card-detail">$40.44</span>
            </router-link>
          </div>
          <div class="history-card">
            <router-link :to="Routes.HistoryDetail">
              <span>May 15, 2018</span>
              <span>10:13 AM</span>
              <span class="history-card-detail">$40.44</span>
            </router-link>
          </div>
        </Card>
      </router-link>
    </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'History',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .history-card {
    margin-top: 15px;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  }
  .history-card-detail { margin-left: 20px; }
</style>

<template>
  <div class="main-app-section-sm container">
    <Card class="mx-auto">
      <div class="title">History</div>
      <div v-for="history in historyItem">
        <div class="history-card">
          <router-link :to="Routes.HistoryDetail + history.id">
            <span>{{ history.ride_create_time }}</span>
            <span class="history-card-detail">{{ history.cost }}</span>
          </router-link>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  
  export default {
    name: 'History',
    components: {
      Card,
    },
    data() {
      return {
        Routes,
        historyItem: [],
      };
    },
    mounted() {
      this.getHistory();
    },
    methods: {
      async getHistory() {
        try {
          const history = await this.axios.get('http://vanbr.ca/api/rider/get-all-rides');
          console.log(history);
          this.historyItem = history.data.data;
        } catch (e) {
          console.log(e);
        }
      },
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
  
  .history-card-detail {
    margin-left: 20px;
  }
</style>

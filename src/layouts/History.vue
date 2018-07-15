<template>
  <div class="main-app-section-sm container">
    <Card class="mx-auto">
      <div class="title">History</div>
      <div v-for="history in historyItem" :key="history.id">
        <div class="history-card">
          <router-link :to="{name: 'HistoryDetail', params: {id: history.id}}" v-if="$route.name === 'History'">
            <div class="d-flex justify-content-between">
              <span>{{ history.ride_create_time }}</span>
              <span class="history-card-detail">${{ history.cost }}</span>
            </div>
          </router-link>
          <router-link :to="{name: 'DriverHistoryDetail', params: {id: history.id}}" v-else>
            <div class="d-flex justify-content-between">
              <span>{{ history.ride_create_time }}</span>
              <span class="history-card-detail">${{ history.cost }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import AppURL from '@/constants';

  export default {
    name: 'History',
    components: {
      AppURL,
      Card,
    },
    data() {
      return {
        AppURL,
        Routes,
        historyItem: [],
        role: '',
      };
    },
    mounted() {
      this.role = this.getRole();
      this.getHistory();
    },
    methods: {
      async getHistory() {
        try {
          const history = await this.axios.get(`${this.AppURL}/${this.role}/get-all-rides`);
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
    border-radius: 0.25rem;
    padding: 20px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  }

  .history-card-detail {
    text-align: right;
  }
  a {
    color: black;
  }
</style>

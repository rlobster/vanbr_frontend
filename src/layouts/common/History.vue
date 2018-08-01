<template>
  <div class="main-app-section-sm container">
    <Card class="mx-auto">
      <div class="title">History</div>
      <div class="history-card" v-if="role === 'driver'">
        <div class="d-flex justify-content-between">
          <span>Total Unpaid Amount:</span>
          <strong><span class="history-card-detail">${{ driverCost }}</span></strong>
        </div>
      </div>
      <div v-for="history in historyItem" :key="history.id">
        <div class="history-card">
          <!-- for 0 1 2 -->
          <router-link :to="{name: 'Ride', params: {id: history.id}}" v-if="history.ride_status === 0 || history.ride_status === 1 || history.ride_status === 2">
            <div class="d-flex justify-content-between">
              <div><span>{{ history.ride_create_time }}</span></div>
              <div><span class="history-card-detail">${{ history.cost }}</span></div>
              <div class="d-flex row status">
                <span class="history-card-detail">Ride Status:{{ history.ride_status }}</span>
                <span class="history-card-detail">Payment Status:{{ history.payment_status }}</span>
              </div>
            </div>
          </router-link>
          <router-link :to="{name: 'HistoryDetail', params: {id: history.id}}" v-if="role === 'rider' && (history.ride_status === 3 || history.ride_status === 4 || history.ride_status === 5)">
            <div class="d-flex justify-content-between">
              <span>{{ history.ride_create_time }}</span>
              <span class="history-card-detail">${{ history.cost }}</span>
              <div class="d-flex row status">
                <span class="history-card-detail">Ride Status:{{ history.ride_status }}</span>
                <span class="history-card-detail">Payment Status:{{ history.payment_status }}</span>
              </div>
            </div>
          </router-link>
          <router-link :to="{name: 'DriverHistoryDetail', params: {id: history.id}}" v-if="role === 'driver' && (history.ride_status === 3 || history.ride_status === 4 || history.ride_status === 5)">
            <div class="d-flex justify-content-between">
              <span>{{ history.ride_create_time }}</span>
              <span class="history-card-detail">${{ history.cost }}</span>
              <div class="d-flex row status">
                <span class="history-card-detail">Ride Status:{{ history.ride_status }}</span>
                <span class="history-card-detail">Payment Status:{{ history.payment_status }}</span>
              </div>
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
        driverCost: '',
      };
    },
    // mounted() {
    //   this.role = this.getRole();
    //   this.getHistory();
    // },
    beforeMount() {
      this.role = this.getRole();
      this.getHistory();
    },
    methods: {
      async getHistory() {
        try {
          if (this.role === 'driver') {
            const driverCost = await this.axios.get(`${this.AppURL}/${this.role}/get-driver-cost`);
            this.driverCost = driverCost.data.data.driver_cost;
          }
          const history = await this.axios.get(`${this.AppURL}/${this.role}/get-all-rides`);
          this.historyItem = history.data.data;
        } catch (e) {
          this.checkError(e.response.status);
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
  .status {
    margin-left: 10px;
  }
</style>

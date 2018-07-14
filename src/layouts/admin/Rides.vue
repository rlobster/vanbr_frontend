<template>
  <div class="users container main-app-section-sm">
    <div class="row">
      <div class="col-md">
         <template>
          <!-- <div class="filter-bar ui basic segment grid main-app-section-sm search-box">
            <div class="ui form">
              <div class="inline field">
                <label>Search for:</label>
                <input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="Text to filter">
                <button class="btn btn-primary" @click="setFilter(filterText)">Go</button>
                <button class="btn btn-secondary" @click="resetFilter(filterText)">Reset</button>
              </div>
            </div>
          </div> -->
        </template>

        <vuetable ref="vuetable"
          api-url="https://vanbr.ca/api/admin/rides/list"
          :css="css.table"
          :fields="fields"
          :sort-order="sortOrder"
          pagination-path=""
          :per-page="3"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"
          @vuetable:loaded="onLoaded">
          <template slot="actions" scope="props">
          <div class="table-button-container main-app-section-sm">
              <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
                <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
              <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
          </div>
          </template>
        </vuetable>
        <vuetable-pagination-bootstrap ref="pagination"
          @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination-bootstrap>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable
  import Vue from 'vue';
  import Card from '@/components/Card';
  import Vuetable from 'vuetable-2/src/components/Vuetable';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';

  export default {
    name: 'Users',
    components: {
      Card,
      Vue,
      Vuetable,
      VuetablePagination,
      VuetablePaginationBootstrap,
    },
    computed: {
      filteredList() {
        return this.postList.filter(function () {
          return this.rideObj.title.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
    data() {
      return {
        filterText: '',
        moreParams: {},
        rideObj: [
          {
            rider_name: 'John Doe',
            rider_id: 1,
            driver_name: 'Max Whalle',
            driver_id: 11,
            From: 'CA',
            To: 'CT',
            time: '10 min',
            Price: '$4.34',
            Status: 'Complete',
          },
          {
            rider_name: 'Donald Trump',
            rider_id: 2,
            driver_name: 'Max Whalle',
            driver_id: 11,
            From: 'DC',
            To: 'CT',
            time: '19 min',
            Price: '$24.34',
            Status: 'Complete',
          },
          {
            rider_name: 'Anna Watson',
            rider_id: 3,
            driver_name: 'Max Whalle',
            driver_id: 11,
            From: 'CA',
            To: 'Canada',
            time: '20 min',
            Price: '$34',
            Status: 'Complete',
          },
          {
            rider_name: 'John Snow',
            rider_id: 8,
            driver_name: 'Bob Sherlock',
            driver_id: 12,
            From: 'CA',
            To: 'CT',
            time: '10 min',
            Price: '$4.34',
            Status: 'Incomplete',
          },
          {
            rider_name: 'Raj Shekh',
            rider_id: 7,
            driver_name: 'Bob Sherlock',
            driver_id: 12,
            From: 'Office',
            To: 'Park',
            time: '10 min',
            Price: '$4.34',
            Status: 'Complete',
          },
        ],
        fields: [
          {
            name: 'rider_name',
            title: '<span class="orange glyphicon glyphicon-user"></span>Rider Name',
            sortField: 'rider_name',
          },
          {
            name: 'rider_id',
            title: 'Id',
            sortField: 'rider_id',
          },
          {
            name: 'driver_name',
            title: '<span class="orange glyphicon glyphicon-user"></span>Driver Name',
            sortField: 'driver_name',
          },
          {
            name: 'driver_id',
            title: 'Id',
            sortField: 'driver_id',
          },
          'From',
          'To',
          'time',
          'Price',
          {
            name: 'Status',
            title: 'Status',
            sortField: 'Status',
          },
          '__slot:actions',
        ],
        sortOrder: [
          {
            field: 'rider_name',
            direction: 'asc',
          },
        ],
        css: {
          table: {
            tableClass: 'table table-striped table-bordered table-hovered',
            loadingClass: 'loading',
            ascendingIcon: 'glyphicon glyphicon-chevron-up',
            descendingIcon: 'glyphicon glyphicon-chevron-down',
            handleIcon: 'glyphicon glyphicon-menu-hamburger',
          },
          pagination: {
            infoClass: 'pull-left',
            wrapperClass: 'vuetable-pagination pull-right',
            activeClass: 'btn-primary',
            disabledClass: 'disabled',
            pageClass: 'btn btn-border',
            linkClass: 'btn btn-border',
            icons: {
              first: '',
              prev: '',
              next: '',
              last: '',
            },
          },
        },
      };
    },
    // mounted() {
    //   this.$events.$on('filter-set', eventData => this.onFilterSet(eventData));
    //   this.$events.$on('filter-reset', () => this.onFilterReset());
    // },
    methods: {
      setFilter(filterText) {
        this.moreParams = {
          filter: filterText,
        };
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      },
      resetFilter() {
        this.moreParams = {};
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      },
      // onFilterSet(filterText) {
      //   this.moreParams = {
      //     filter: filterText,
      //   };
      //   console.log('fired');
      //   Vue.nextTick(() => this.$refs.vuetable.refresh());
      // },
      // onFilterReset() {
      //   this.moreParams = {};
      //   Vue.nextTick(() => this.$refs.vuetable.refresh());
      // },
      // doFilter() {
      //   console.log('doFilter:', this.filterText);
      //   this.$events.fire('filter-set', this.filterText);
      // },
      // resetFilter() {
      //   this.filterText = '';
      //   console.log('resetFilter');
      //   this.$events.fire('filter-reset');
      // },
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
      },
      onChangePage(page) {
        console.log(page);
        this.$refs.vuetable.changePage(page);
      },
      editRow(rowData) {
        alert(JSON.stringify(rowData));
      },
      deleteRow(rowData) {
        alert(JSON.stringify(rowData));
      },
      onLoading() {
        console.log('loading... show your spinner here');
      },
      onLoaded() {
        console.log('loaded! .. hide your spinner here');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .users {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ddd;
    padding: 20px;
  }
  .search-box {
    margin-bottom: 25px;
  }
  .orange.glyphicon {
    color: blue;
  }

  th.sortable {
    color: blue;
  }
</style>
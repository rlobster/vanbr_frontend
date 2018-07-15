<template>
  <div class="users container main-app-section-sm">
    <div class="row">
      <div class="col-md">
         <template>
          <div class="filter-bar ui basic segment grid main-app-section-sm search-box">
            <div class="ui form">
              <div class="inline field">
                <label>Search for:</label>
                <input type="text" v-model="search" class="three wide column" placeholder="Text to filter">
                <!-- <button class="btn btn-primary" @click="setFilter(filterText)">Go</button> -->
                <!-- <button class="btn btn-secondary" @click="resetFilter(filterText)">Reset</button> -->
              </div>
            </div>
          </div>
        </template>

        <vuetable ref="vuetable"
          :api-mode="false"
          :css="css.table"
          :data="rideObj"
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
  /* eslint-disable */
  import Vue from 'vue';
  import Card from '@/components/Card';
  import Vuetable from 'vuetable-2/src/components/Vuetable';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';
  import AppURL from '@/constants';

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
          return this.rideObj.driver.name.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
    data() {
      return {
        AppURL,
        filterText: '',
        moreParams: {},
        pickup: '',
        drop: '',
        rideObj: [],
        fields: [
          {
            name: 'rider.name',
            title: '<span class="orange glyphicon glyphicon-user"></span>Rider Name',
            sortField: 'rider_name',
          },
          {
            name: 'rider_user_id',
            title: 'Id',
            sortField: 'rider_user_id',
          },
          {
            name: 'driver.name',
            title: '<span class="orange glyphicon glyphicon-user"></span>Driver Name',
            sortField: 'driver_name',
          },
          {
            name: 'driver_user_id',
            title: 'Id',
            sortField: 'driver_user_id',
          },
          'pick_up_point',
          'drop_point',
          'ride_create_time',
          'cost',
          {
            name: 'ride_status',
            title: 'Status',
            sortField: 'Status',
          },
          '__slot:actions',
        ],
        sortOrder: [
          {
            field: 'rider.name',
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
    mounted() {
      this.getRides();
    },
    methods: {
      async getRides() {
        try {
          const ride = await this.axios.get(`${this.AppURL}/admin/rides/list`);
          console.log(ride);
          this.rideObj = ride.data.data;

          const pickupObj = OpenLocationCode.decode(this.rideObj.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);
          this.rideObj.pick_up_point = this.pickup;
          console.log(this.rideObj.pick_up_point);

          const dropObj = OpenLocationCode.decode(this.rideObj.drop_point);
          this.drop = await this.getLocation(dropObj);
          console.log(this.drop);
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
      getLocation(locationObj) {
        return new Promise( ( resolve => {
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({ location: { lat: locationObj.latitudeCenter, lng: locationObj.longitudeCenter } }, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                const address = `${results[0].formatted_address.split(',')[0]} , ${results[0].formatted_address.split(',')[1]}`;
                resolve(address);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        }));
      },
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
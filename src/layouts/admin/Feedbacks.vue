<template>
  <div class="users container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <template>
          <div class="filter-bar ui basic segment grid main-app-section-sm search-box">
            <div class="ui form">
              <div class="inline field">
                <label>Search for:</label>
                <input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="Text to filter">
                <button class="btn btn-primary" @click="doFilter">Go</button>
                <button class="btn btn-secondary" @click="resetFilter">Reset</button>
              </div>
            </div>
          </div>
        </template>
        <vuetable ref="vuetable"
          :api-mode="false"
          :css="css.table"
          :data="feedbackObj"
          :fields="fields"
          :sort-order="sortOrder"
          pagination-path=""
          :per-page="3"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"
          @vuetable:loaded="onLoaded">
          <template slot="actions" scope="props">
            <div class="table-button-container">
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
  import vuetable from 'vuetable-2';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import Card from '@/components/Card';
  import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';
  import AppURL from '@/constants';

  export default {
    name: 'Feedbacks',
    components: { Card, vuetable, VuetablePagination, VuetablePaginationBootstrap },
    data() {
      return {
        AppURL,
        feedbackObj: [
          // {
          //   id: 1,
          //   name: 'John Doe',
          //   role: 'Rider',
          //   feedback: 'Fine',
          //   rating: 5,
          // },
          // {
          //   id: 2,
          //   name: 'John Snow',
          //   role: 'Driver',
          //   feedback: 'Best ride of my life',
          //   rating: 5,
          // },
          // {
          //   id: 3,
          //   name: 'Anna Doe',
          //   role: 'Rider',
          //   feedback: 'Keep it up',
          //   rating: 3,
          // },
          // {
          //   id: 4,
          //   name: 'Bob Dan',
          //   role: 'Rider',
          //   feedback: 'Nice facility and nature of the driver',
          //   rating: 4,
          // },
        ],
        filterText: '',
        fields: [
          {
            name: 'id',
            title: '#',
            sortField: 'id',
          },
          {
            name: 'name',
            title: '<span class="orange glyphicon glyphicon-user"></span> Name',
            sortField: 'name',
          },
          'role',
          'feedback',
          {
            name: 'rating',
            title: 'Rating',
            sortField: 'rating',
          },
          '__slot:actions',
        ],
        sortOrder: [
          {
            field: 'name',
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
      this.getFeedbacks();
    },
    methods: {
      async getFeedbacks() {
        try {
          const feedback = await this.axios.get(`${this.AppURL}/admin/feedbacks/list`);
          console.log(feedback);
        } catch (e) {
          console.log(e);
        }
      },
      doFilter() {
        console.log('doFilter:', this.filterText);
        this.$events.fire('filter-set', this.filterText);
      },
      resetFilter() {
        this.filterText = '';
        console.log('resetFilter');
        this.$events.fire('filter-reset');
      },
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

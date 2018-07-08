<template>
  <div class="users container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <vuetable ref="vuetable"
          api-url="https://vuetable.ratiw.net/api/users"
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
        <vuetable-pagination ref="pagination"
          @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable
  import vuetable from 'vuetable-2';
  import Card from '@/components/Card';

  export default {
    name: 'Feedbacks',
    components: { Card, vuetable },
    data() {
      return {
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
          'Feedback',
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
    methods: {
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
  .orange.glyphicon {
    color: blue;
  }

  th.sortable {
    color: blue;
  }
</style>

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
      <div class="col-md">
        <table class="table table-striped">
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Role</th>
            <th>Reg. Date</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Apal Shah</td>
              <td>apal@shah.com</td>
              <td>987654321</td>
              <td>Rider</td>
              <td>1-1-1999 12:34:56</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Apal Shah</td>
              <td>apal@shah.com</td>
              <td>987654321</td>
              <td>Rider</td>
              <td>1-1-1999 12:34:56</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Apal Shah</td>
              <td>apal@shah.com</td>
              <td>987654321</td>
              <td>Rider</td>
              <td>1-1-1999 12:34:56</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable
  import vuetable from 'vuetable-2';
  import Card from '@/components/Card';

  export default {
    name: 'Users',
    components: { Card, vuetable },
    data() {
      return {
        fields: [
          {
            name: 'name',
            title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
            sortField: 'name',
          },
          {
            name: 'email',
            title: 'Email',
            sortField: 'email',
          },
          'birthdate',
          'nickname',
          {
            name: 'gender',
            title: 'Gender',
            sortField: 'gender',
          },
          '__slot:actions',
        ],
        sortOrder: [
          {
            field: 'name',
            direction: 'asc',
          },
        ],
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
</style>

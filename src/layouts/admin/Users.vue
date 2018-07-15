<template>
  <div class="admin container">
    <div class="row">
        <div class="col-md main-app-section-sm">
          <router-link :to="Routes.Riders">
            <Card class="card">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <img src="@/assets/users.svg" class="icons"/>
                </div>
                <div>
                  <div class="subtitle text-secondary">Riders</div>
                </div>
              </div>
            </Card>
          </router-link>
        </div>

      <div class="col-md main-app-section-sm">
        <router-link :to="Routes.Drivers">
          <Card class="card">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <img src="@/assets/users.svg" class="icons-sm"/>
              </div>
              <div>
                <div class="subtitle text-secondary">Drivers</div>
              </div>
            </div>
          </Card>
        </router-link>
      </div>
    </div>  
  </div>
</template>


<script>
  import Card from '@/components/Card';
  import Routes from '@/router/routes';

  export default {
    name: 'Users',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
    // data() {
    //   return {
    //     filterText: '',
    //     fields: [
    //       'name', 'email', 'mobile_no', 'dob', 'gender', '__slot:actions',
    //       // {
    //       //   name: 'name',
    //       //   title: '<span class="orange glyphicon glyphicon-user"></span> Name',
    //       //   sortField: 'name',
    //       // },
    //       // {
    //       //   name: 'email',
    //       //   title: 'Email',
    //       //   sortField: 'email',
    //       // },
    //       // 'mobile',
    //       // 'role',
    //       // {
    //       //   name: 'reg. date',
    //       //   title: 'Reg. Date',
    //       //   sortField: 'reg. date',
    //       // },
    //       // '__slot:actions',
    //     ],
    //     sortOrder: [
    //       {
    //         field: 'name',
    //         direction: 'asc',
    //       },
    //     ],
    //     css: {
    //       table: {
    //         tableClass: 'table table-striped table-bordered table-hovered',
    //         loadingClass: 'loading',
    //         ascendingIcon: 'glyphicon glyphicon-chevron-up',
    //         descendingIcon: 'glyphicon glyphicon-chevron-down',
    //         handleIcon: 'glyphicon glyphicon-menu-hamburger',
    //       },
    //       pagination: {
    //         infoClass: 'pull-left',
    //         wrapperClass: 'vuetable-pagination pull-right',
    //         activeClass: 'btn-primary',
    //         disabledClass: 'disabled',
    //         pageClass: 'btn btn-border',
    //         linkClass: 'btn btn-border',
    //         icons: {
    //           first: '',
    //           prev: '',
    //           next: '',
    //           last: '',
    //         },
    //       },
    //     },
    //   };
    // },
    // methods: {
    //   doFilter() {
    //     console.log('doFilter:', this.filterText);
    //     this.$events.fire('filter-set', this.filterText);
    //   },
    //   resetFilter() {
    //     this.filterText = '';
    //     console.log('resetFilter');
    //     this.$events.fire('filter-reset');
    //   },
    //   onPaginationData(paginationData) {
    //     this.$refs.pagination.setPaginationData(paginationData);
    //   },
    //   onChangePage(page) {
    //     console.log(page);
    //     this.$refs.vuetable.changePage(page);
    //   },
    //   editRow(rowData) {
    //     alert(JSON.stringify(rowData));
    //   },
    //   deleteRow(rowData) {
    //     alert(JSON.stringify(rowData));
    //   },
    //   onLoading() {
    //     console.log('loading... show your spinner here');
    //   },
    //   onLoaded() {
    //     console.log('loaded! .. hide your spinner here');
    //   },
    // },
  };
</script>

<style lang="scss" scoped>
  .users {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ddd;
    padding: 20px;
  }
  a {
    &:hover {
      text-decoration: none;
    }
  }
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

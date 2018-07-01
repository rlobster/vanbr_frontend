<template>
  <div class="users container main-app-section-sm">
    <div class="row">
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
  import Card from '@/components/Card';

  export default {
    name: 'Users',
    components: { Card },
  };
</script>

<style lang="scss" scoped>
  .users {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ddd;
    padding: 20px;
  }
</style>

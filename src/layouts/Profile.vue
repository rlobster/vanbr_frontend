<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Edit Profile</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input type="text" class="form-control" placeholder="Name" id="name"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" class="form-control" id="dob"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Gender:</label>
            <select class="form-control">
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input type="text" class="form-control" placeholder="Email" id="email"/>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  import Card from '@/components/Card';

  export default {
    name: 'Profile',
    components: { Card },
  };
</script>

<style scoped>

</style>

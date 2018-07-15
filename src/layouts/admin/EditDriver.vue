<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Edit Driver</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input type="text" class="form-control" placeholder="First Name" v-model="name" id="name"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" class="form-control" id="dob" v-model="dob"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Phone Number:</label>
            <input type="number" placeholder="Phone Number" class="form-control" id="mobile" v-model="mobile_no"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Gender:</label>
            <select v-model="gender" class="form-control">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input type="email" class="form-control" placeholder="Email" id="email" v-model="email"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Address:</label>
            <input type="text" class="form-control" v-model="address" placeholder="Address" id="address"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Car Model:</label>
            <input type="text" class="form-control" v-model="carModel" placeholder="Car Model" id="model"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Car Number:</label>
            <input type="text" class="form-control" v-model="carNumber" placeholder="Car Number" id="number"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>License Number:</label>
            <input type="text" class="form-control" v-model="licenseNumber" placeholder="License Number" id="license"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>License Expiry Date:</label>
            <input type="date" class="form-control" v-model="licenseExpiry" placeholder="License Expiry" id="expiry"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Insurance Number:</label>
            <input type="text" class="form-control" v-model="insuranceNo" placeholder="Insurance Number" id="insuranceNo"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Insurance Expiry Date:</label>
            <input type="date" class="form-control" v-model="insuranceExpiry" placeholder="Insurance Expiry Date" id="insuranceExpiry"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Driver Image:</label>
            <input type="file" class="form-control" @change="onFileChange" id="driverImage" name="driverimage" accept="image/png, image/jpg, image/jpeg, image/svg"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Driver's Car Image:</label>
            <input type="file" class="form-control" @change="onFileChange" id="driverCarImage" name="driverCarImage" accept="image/png, image/jpg, image/jpeg, image/svg"/>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block" @click="editDriver">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>

  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import AppURL from '@/constants';

  export default {
    name: 'EditDriver',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        name: '',
        dob: '',
        gender: '',
        mobile_no: '',
        email: '',
        address: '',
        carModel: '',
        carNumber: '',
        licenseNumber: '',
        licenseExpiry: '',
        insuranceNo: '',
        insuranceExpiry: '',
      };
    },
    async mounted() {
      await this.getDriverDetail();
    },
    methods: {
      async getDriverDetail() {
        try {
          const driver = await this.axios.get(`${this.AppURL}/admin/users/Driver/${this.$route.params.id}`);
          console.log(driver);
          this.name = driver.data.data.driver.name;
          this.dob = driver.data.data.driver.dob;
          this.gender = driver.data.data.driver.gender;
          this.mobile_no = driver.data.data.driver.mobile_no;
          this.email = driver.data.data.email;
          this.address = driver.data.data.driver.address;
          this.carModel = driver.data.data.driver.car_model;
          this.carNumber = driver.data.data.driver.car_number;
          this.licenseNumber = driver.data.data.driver.license_number;
          this.licenseExpiry = driver.data.data.driver.license_expiry_date;
          this.insuranceNo = driver.data.data.driver.insurance_number;
          this.insuranceExpiry = driver.data.data.driver.insurance_expiry_date;
        } catch (e) {
          this.checkError(e.response.status);
          console.log(e);
        }
      },
      async onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        console.log(files);
        if (files && files.length) {
          const reader = new FileReader();
          reader.onload = (event) => {
            console.log(event.target.result);
            if (event.target.result) {
              console.log('happened');
              this.createImage(event.target.result);
              const output = reader.readAsDataURL(event.target.result);
              console.log(output);
            }
          };
        }
      },
      createImage(file) {
        console.log(file);
        // const image = new Image();
        const reader = new FileReader();

        // reader.onload = (e) => {
        //   const image = e.target.result;
        // };
        const output = reader.readAsDataURL(file);
        console.log(output);
      },
      async editDriver(event) {
        event.preventDefault();
        try {
          const data = {
            name: this.name,
            dob: this.dob,
            gender: this.gender,
            mobile_no: this.mobile_no,
            email: this.email,
            address: this.address,
            car_model: this.carModel,
            car_number: this.carNumber,
            license_number: this.licenseNumber,
            license_expiry_date: this.licenseExpiry,
            insurance_number: this.insuranceNo,
            insurance_expiry_date: this.insuranceExpiry,
          };
          const response = await this.axios.put(`${this.AppURL}/admin/driver/${this.$route.params.id}/update`, data);
          console.log(response);
        } catch (e) {
          this.checkError(e.response.status);
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>

</style>

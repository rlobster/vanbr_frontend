<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Add Driver</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">First Name:</label>
            <input type="text" class="form-control" placeholder="First Name" v-model="firstName" id="fname"/>
          </div>
           <div class="form-group main-app-section-xs">
            <label for="name">Last Name:</label>
            <input type="text" class="form-control" placeholder="Last Name" v-model="lastName" id="lname"/>
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
            <input type="text" class="form-control" placeholder="Email" id="email" v-model="email"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>Address:</label>
            <input type="text" class="form-control" v-model="address" placeholder="Address" id="address"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>City:</label>
            <input type="text" class="form-control" v-model="city" placeholder="City" id="city"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label>PinCode:</label>
            <input type="number" class="form-control" v-model="pincode" placeholder="Pincode" id="pincode"/>
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
            <button type="submit" class="btn btn-custom btn-block" @click="addDriver">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>

  import Routes from '@/router/routes';
  import Card from '@/components/Card';

  export default {
    name: 'AddDriver',
    components: { Card },
    data() {
      return {
        Routes,
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        mobile_no: '',
        email: '',
        address: '',
        pincode: '',
        carModel: '',
        city: '',
        carNumber: '',
        licenseNumber: '',
        licenseExpiry: '',
        insuranceNo: '',
        insuranceExpiry: '',
        driverImage: '',
        driverCarImage: '',
      };
    },
    methods: {
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        console.log(files);
        if (files && files.length) {
          const reader = new FileReader();
          // this.createImage(files[0]);
          const output = reader.readAsDataURL(files[0]);
          console.log(output);
        }
        // this.createImage(files[0]);
      },
      // createImage(file) {
      //   // const image = new Image();
      //   const reader = new FileReader();
      //   const vm = this;

      //   reader.onload = (e) => {
      //     vm.image = e.target.result;
      //   };
      //   const output = reader.readAsDataURL(file);
      //   console.log(output);
      // },
      async addDriver(event) {
        event.preventDefault();
        try {
          const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            dob: this.dob,
            gender: this.gender,
            mobile_no: this.mobile_no,
            email: this.email,
            address: this.address,
            pincode: this.pincode,
            model: this.carModel,
            city: this.city,
            car: this.carNumber,
            license: this.licenseNumber,
            licenseExpiry: this.licenseExpiry,
            insuranceNo: this.insuranceNo,
            insuranceExpiry: this.insuranceExpiry,
            driverImage: this.driverImage,
            driverCarImage: this.driverCarImage,
          };
          const response = await this.axios.post('http://vanbr.ca/api/rider/signup', data);
          localStorage.setItem('token', response.data.token);
          this.axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          this.$router.push(Routes.Booking);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>

</style>

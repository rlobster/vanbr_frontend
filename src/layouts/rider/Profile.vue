<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Edit Profile</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input v-validate="'required|alpha'" name="name" v-model="name" type="text" class="form-control" placeholder="Name" id="name"/>
            <p class="error-msg">{{ errors.first('name') }}</p>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input type="date" v-validate="'required'" v-model="dob" name="dob" class="form-control" id="dob"/>
            <p class="error-msg">{{ errors.first('dob') }}</p>            
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Mobile Number:</label>
            <input v-validate="'required|length:10'" name="mobile" v-model="mobile_no" type="number" class="form-control" placeholder="Mobile" id="mobile"/>
            <p class="error-msg">{{ errors.first('mobile') }}</p>          
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Gender:</label>
            <select class="form-control" v-model="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input v-validate="'required|email'" name="email" type="text" v-model="email" class="form-control" placeholder="Email" id="email"/>
            <p class="error-msg">{{ errors.first('email') }}</p>
          </div>
          <router-link :to="Routes.ChangePassword" class="d-flex align-items-center justify-content-left">
            Change Password
          </router-link>
          <div class="form-group main-app-section-sm">
            <button type="submit" class="btn btn-custom btn-block" @click="profile">Submit</button>
          </div>
          <hr />
          <div class="form-group main-app-section-xs">
            <label><strong>Payment Card Details:</strong></label>
            <div class="d-flex justify-content-between">
              <div>Card Type:</div>
              <div><strong>{{paymentCard.brand}}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Card Number:</div>
              <div><strong>XXXX XXXX XXXX {{paymentCard.last4}}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Card Expiry:</div>
              <div><strong>{{paymentCard.exp_month}}/{{paymentCard.exp_year}}</strong></div>
            </div>
          </div>
          <div v-if="isEditCard">
            <div class="form-group main-app-section-sm">
              <label><strong>Enter Card details:</strong></label>
              <StripeCard class='stripe-card'
                :class='{ complete }'
                stripe='pk_test_8wgmvT01TU27qZFaMbAny3UF'
                :options='stripeOptions'
                @change='complete = $event.complete'
              />
            </div>
            <div class="row form-group main-app-section-sm">
              <div class="col">
                <button class="btn btn-block btn-outline-danger" @click="editCardDetails">Cancel</button>
              </div>
              <div class="col">
                <button class="btn btn-custom btn-block" v-if="isEditCard" @click="updateCardDetails" :disabled='!complete'>Update Card Details</button>
              </div>
            </div>
          </div>
          <div class="form-group main-app-section-sm" v-else>
            <button type="submit" class="btn btn-custom btn-block" @click="editCardDetails">Edit Card Details</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  import Card from '@/components/Card';
  import { Card as StripeCard, createToken } from 'vue-stripe-elements-plus';
  import Routes from '@/router/routes';
  import AppURL from '@/constants';

  export default {
    name: 'Profile',
    components: { Card, StripeCard },
    data() {
      return {
        AppURL,
        Routes,
        name: '',
        dob: '',
        gender: '',
        email: '',
        id: '',
        mobile_no: '',
        role: '',
        paymentCard: {},
        isEditCard: false,
        complete: false,
        stripeOptions: {
          name: '',
          currency: 'cad',
        },
      };
    },
    mounted() {
      if (this.$route.name === 'Profile') {
        this.api = 'rider';
      } else if (this.$route.name === 'ProfileView') {
        this.api = 'driver';
      }
      this.getProfile();
    },
    methods: {
      async getProfile() {
        try {
          const profile = await this.axios.get(`${this.AppURL}/${this.api}/profile`);
          const cardResponse = await this.axios.get(`${this.AppURL}/${this.api}/get-payment-card`);
          this.paymentCard = cardResponse.data.card.sources.data[0];
          this.id = profile.data.data.user.id;
          this.name = profile.data.data.name;
          this.email = profile.data.data.user.email;
          this.gender = profile.data.data.gender;
          this.dob = profile.data.data.dob;
          this.mobile_no = profile.data.data.mobile_no;
          this.role = profile.data.data.user.role;
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
      async profile(event) {
        event.preventDefault();
        try {
          const data = {
            name: this.name,
            email: this.email,
            mobile_no: this.mobile_no,
            dob: this.dob,
            gender: this.gender,
          };
          await this.axios.post(`${this.AppURL}/rider/profile`, data);
          alert('Your profile updated successfully!');
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
      async editCardDetails(event) {
        event.preventDefault();
        this.isEditCard = !this.isEditCard;
      },
      async updateCardDetails(event) {
        event.preventDefault();
        const stripeToken = await createToken();
        console.log(stripeToken);
        if (!stripeToken) {
          alert('Enter Valid Card Details');
        }
        if (stripeToken.error) {
          alert(stripeToken.error.message);
        }
        this.isEditCard = false;
        try {
          const data = {
            token: stripeToken.token,
          };
          const cardResponse = await this.axios.post(`${this.AppURL}/rider/update-payment-card`, data);
          this.paymentCard = cardResponse.data.card.sources.data[0];
          alert('Your Payment Card updated successfully!');
        } catch (e) {
          this.checkError(e.response.status);
        }
      },
    },
  };
</script>

<style scoped>
  .error-msg {
    color: #a30015;
    font-size: 12px;
    margin-top: 5px;
  }
</style>

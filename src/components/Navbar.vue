<template>
    <nav class="d-flex">
      <div class="logo">
        <router-link :to="Routes.Home">
          <img src="@/assets/logo.png" class="logo-image"/>
        </router-link>
      </div>
      <Desktop class="ml-auto">
        <div class="nav-menus d-flex">
          <router-link :to="Routes.Pricing" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">Pricing</div>
          </router-link>
          <router-link :to="Routes.Booking" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">Book</div>
          </router-link>
          <router-link :to="Routes.History" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">History</div>
          </router-link>
          <router-link :to="Routes.Profile" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">Profile</div>
          </router-link>
        </div>
      </Desktop>
      <MobileTablet class="d-flex ml-auto align-items-center">
        <img src="@/assets/bars.svg" class="nav-bars" @click="toggleNav"/>
      </MobileTablet>

      <MobileTablet class="nav-slide" :class="{'active': isActive}">
        <div class="nav-slide-menus">
          <router-link :to="Routes.Pricing" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">Pricing</div>
          </router-link>
          <router-link :to="Routes.Booking" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">Book</div>
          </router-link>
          <router-link :to="Routes.History" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">History</div>
          </router-link>
          <router-link :to="Routes.Profile" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">Profile</div>
          </router-link>
        </div>
      </MobileTablet>

    </nav>
</template>

<script>
  import Routes from '@/router/routes';
  import MobileTablet from '@/components/MediaQuery/MobileTablet';
  import Desktop from '@/components/MediaQuery/Desktop';

  export default {
    name: 'Navbar',
    components: { Desktop, MobileTablet },
    data() {
      return {
        Routes,
        isActive: false,
      };
    },
    methods: {
      toggleNav() {
        this.isActive = !this.isActive;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/constants';
  nav {
    position: sticky;
    top: 0;
    z-index: 10;
    height: 72px;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ccc;
    padding: 0 32px;
  }
  .logo {
    .logo-image {
      height: 52px;
      width: auto;
      margin-top: 8px;
    }
  }
  .nav-menus a {
    font-size: 18px;
    height: 100%;
    width: 80px;

    &:hover {
      background: #F8F8F8;
      text-decoration: none;
    }

    &.active {
      background: #FAFAFA;
      text-decoration: none;
    }
  }

  .nav-bars {
    height: 32px;
    cursor: pointer;
  }

  .nav-slide {
    position: fixed;
    top: 73px;
    bottom: 0;
    width: 100%;
    right: -100%;
    padding: 4px 20px;
    background-color: $white_color;
    transition: 0.4s all ease;

    &.active {
      right: 0;
    }

    .nav-slide-menus a {
      font-size: 20px;
      color: $primary_color;
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 0 16px;
    }
  }
</style>

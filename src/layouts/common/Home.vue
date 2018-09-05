<template>
  <div class="home main-app-section-sm">
    <!-- <div class="d-flex justify-content-between main-app-section-sm">
      <router-link :to='Routes.Login'>Go to Login</router-link>
      <router-link :to='Routes.Register'>Go to Register</router-link>
      <router-link :to='Routes.Feedback'>Give Feedback</router-link>
      <router-link :to='Routes.Ride'>View Ride Info</router-link>
      <router-link :to='Routes.Payment'>Pay a Ride</router-link>
    </div> -->
    <header class="business-header">
      <div style="background:#aaa">
        <h1 class="display-3 text-center text-white pt-5 pb-5 mb-5">Welcome to Vanbr.</h1>
      </div>
    </header>

    <!-- Page Content -->
    <div class="container">

      <div class="row">
        
        <div class="col-sm-12">
          <h2 class="mt-4 mb-2">What We Do</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt neque tempore recusandae animi soluta quasi? Asperiores rem dolore eaque vel, porro, soluta unde debitis aliquam laboriosam. Repellat explicabo, maiores!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis optio neque consectetur consequatur magni in nisi, natus beatae quidem quam odit commodi ducimus totam eum, alias, adipisci nesciunt voluptate. Voluptatum.</p>
          <p>
            <a class="btn btn-primary btn-lg" href="/terms">Terms and Conditions &raquo;</a>
          </p>
        </div>

      </div>
      <!-- /.row -->


      <div class="row mt-4 pt-4">

        <div class="col-sm-6 my-4">
          <div class="card">
            <img class="card-img-top" src="@/assets/sedan.jpeg" alt="Vanbr sedan" height="300" width="200">
            <div class="card-body">
              <h4 class="card-title">Vanbr Sedan</h4>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus.</p>
            </div>
            <div class="card-footer">
              <a href="/login" class="btn btn-primary">Login</a>
            </div>
          </div>
        </div>

        <div class="col-sm-6 my-4">
          <div class="card">
            <img class="card-img-top" src="@/assets/mini_van.jpeg" alt="Vanbr Mini van" height="300" width="200">
            <div class="card-body">
              <h4 class="card-title">Vanbr Mini Van</h4>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>
            <div class="card-footer">
              <a href="https://driver.vanbr.ca" target="_blank" class="btn btn-primary">Login</a>
            </div>
          </div>
        </div>

      </div>
    <!-- /.row -->
    </div>
    
    <!-- Footer -->
    <footer class="py-3 bg-dark mt-5">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Vanbr 2018</p>
      </div>
      <!-- /.container -->
    </footer>

  </div>
</template>

<script>
import Routes from '@/router/routes';

export default {
  name: 'home',
  data() {
    return {
      Routes,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

<template>
<div>
  <footer class="text-center text-lg-start border-top mx-5">
    <div class="container p-4">
      <div class="row my-4">

        <div class="col-lg-3 col-md-6 mb-4 me-5 mb-md-0">

          <div class="d-flex align-items-center mb-2 justify-content-center mx-auto">
            <img src="/img/png-transparent-rideride-cycle-workshop-bicycle-shop-logo-brand-bicycle-repair-text-service-bicycle.png" height="70" alt=""
                 loading="lazy" />
          </div>

          <p class="text-center">Продажа велосипедов в России</p>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 me-5 mb-md-0">
          <h5 class="text-uppercase mb-4">Главная</h5>

          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/home" class="nav-link">Домашняя страница</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/catalog" class="nav-link">Каталог товаров</router-link>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Контакты</h5>

          <ul class="list-unstyled">
            <li>
              <p>Телефон: +7 (934) 483 32 45</p>
            </li>
            <li>
              <p>Почта: <a href="/" >bikemarket@gmail.com</a></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
    export default{
        name: "Footer_",
        computed:{
          loggedIn(){
            return this.$store.state.status.loggedIn;
          }
        }
    }
</script>
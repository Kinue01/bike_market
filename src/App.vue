<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
            <a class="" href="/">
                <img src="/img/png-transparent-rideride-cycle-workshop-bicycle-shop-logo-brand-bicycle-repair-text-service-bicycle.png" height="40" class="me-3" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link text-white">Домашняя страница</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catalog" class="nav-link text-white">Каталог товаров</router-link>
                    </li>
                    <li v-show="role_id === 'Admin'" class="nav-item">
                        <router-link to="/admin" class="nav-link text-white">Панель администратора</router-link>
                    </li>
                    <li v-if="role_id === 'Moderator'" class="nav-item">
                        <router-link to="/mod" class="nav-link text-white">Панель модератора</router-link>
                    </li>
                </ul>
                <div v-if="!loggedIn">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/register" class="nav-link text-white">Регистрация</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link text-white">Вход</router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="loggedIn">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/profile" class="nav-link text-white">{{ currentUser.user_login }}</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" style="cursor: pointer;" @click.prevent="logOut">Выход</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <div>
        <router-view />
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer
  },
  computed:{
    currentUser(){
        return this.$store.state.auth.user;
    },
    loggedIn(){
        return this.$store.state.auth.status.loggedIn;
    },
    role_id(){
        if(this.$store.state.auth.user !== null){
            return this.$store.state.auth.user.user_role;
        }
        else{
            return 0;
        }
    }
  },
  methods:{
    logOut(){
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
    }
  }
}
</script>


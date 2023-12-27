<template>
    <div class="container bg-white mt-5">
        <header class="jumbotron">
            <h3 class="text-center">
                Профиль <strong>{{ currentUser.user_login }}</strong>
            </h3>
        </header>
        <div class="d-flex my-5 align-items-center">
            <div class="text-center">
                <img src="/img/default.png" class="w-25">
                <p><strong>Аватар</strong></p>
            </div>
            <div>
                <p>
                    <strong>ID:</strong>
                    {{ currentUser.user_id }}
                </p>
                <p>
                    <strong>Роль:</strong>
                    {{ currentUser.user_role }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Profile-comp',
    computed:{
        currentUser(){
            return this.$store.state.auth.user;
        }
    },
    mounted(){
        if(!this.currentUser){
            this.$router.push('/login');
        }
    }
};
</script>
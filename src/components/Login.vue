<template>
    <div class="container bg-white p-5 shadow my-5">
        <p class="text-center fs-1">Вход</p>
        <Form @submit="handleLogin" :validation-schema="schema">
            <div class="form-group mt-3">
                <label for="user_login" class="form-label">Логин</label>
                <Field name="user_login" type="text" class="form-control" v-model="user.user_login" />
                <ErrorMessage name="user_login" class="error-feedback" />
            </div>
            <div class="form-group mt-3">
                <label for="user_password" class="form-label">Пароль</label>
                <Field name="user_password" type="password" class="form-control" v-model="user.user_password" />
                <ErrorMessage name="user_password" class="error-feedback" />
            </div>

            <div class="form-group mt-3">
                <button class="btn btn-primary btn-block" :disabled="loading" >
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>

            <div class="form-group mt-3">
                <div v-if="message" role="alert" class="alert alert-danger">
                    {{ message }}
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'Login-comp',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data(){
        const schema = yup.object().shape({
            user_login: yup.string().required("Username is required!"),
            user_password: yup.string().required("Password is required!"),
        });
        return{
            loading: false,
            message: "",
            schema,
            user: {
                user_login: "",
                user_password: ""
            }
        };
    },
    computed:{
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created(){
        if(this.loggedIn){
            this.$router.push('/profile');
        }
    },
    methods:{
        handleLogin() {
            this.loading = true;

            if (this.user.user_login != "" && this.user.user_password != ""){
                this.$store.dispatch("auth/login", this.user)
                .then((data) => {
                        if (data != null && data != undefined)
                    this.$router.push('/profile');
                        else
                    this.message = "Пользователя не существует";
                },
                error => {
                this.loading = false;
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                });
            }
            else {
                this.loading = false;
            }
            
        }
    }
}
</script>
<template>
    <div class="container bg-white my-5 p-5 shadow">
        <p class="text-center fs-1">Регистрация</p>
        <Form @submit="handleRegister" :validation-schema="schema">
            <div v-if="!successful">
                <div class="form-group mt-3">
                    <label for="username" class="form-label">Логин</label>
                    <Field name="username" type="text" class="form-control" v-model="user.user_login" />
                    <ErrorMessage name="username" class="error-feedback" v-model="err1" />
                </div>
                <div class="form-group mt-3">
                    <label for="email" class="form-label">Почта</label>
                    <Field name="email" type="email" class="form-control" v-model="user.user_email" />
                    <ErrorMessage name="email" class="error-feedback" v-model="err2" />
                </div>
                <div class="form-group mt-3">
                    <label for="password" class="form-label">Пароль</label>
                    <Field name="password" type="password" class="form-control" v-model="user.user_password" />
                    <ErrorMessage name="password" class="error-feedback" v-model="err3" />
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        Зарегестрироваться
                    </button>
                </div>
            </div>
        </Form>
        <div v-if="message" class="alert mt-3" :class="successful ? 'alert-success' : 'alert-danger'">
            {{ message }}
        </div>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from 'vee-validate';

export default{
    name: 'Register-comp',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data(){
        const schema = yup.object().shape({
            username: yup
                .string()
                .required("Username is required!")
                .min(3, "Must be at least 3 characters!")
                .max(20, "Must be maximum 20 characters!"),
            email: yup
                .string()
                .required("Email is required!")
                .email("Email is invalid!")
                .max(50, "Must be maximum 50 characters!"),
            password: yup
                .string()
                .required("Password is required!")
                .min(6, "Must be at least 6 characters!")
                .max(40, "Must be maximum 40 characters!")
        });
        return{
            successful: false,
            loading: false,
            message: "",
            schema,
            user: {
                user_login: "",
                user_password: "",
                user_email: ""
            },
            err1: "",
            err2: "",
            err3: "",
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted(){
        if(this.loggedIn){
            this.$router.push('/profile');
        }
    },
    methods:{
        handleRegister(){
            this.message = "";
            this.successful = false;
            this.loading = true;

            if (this.err1 === "" && this.err2 === "" && this.err3 === "") {
                this.$store.dispatch('auth/register', this.user)
                .then(data => {
                    this.message = data.message;
                    this.successful = true;
                    this.loading = false;
                    this.$router.push('/login');
                },
                error => {
                    this.message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                    this.successful = false;
                    this.loading = false;
            });
            }
            else {
                this.successful = false;
                this.loading = false;
            }
            

        }
    }
}
</script>
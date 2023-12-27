import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Paginate from "vuejs-paginate-next";
import router from './router';
import store from './store';

var app = createApp(App);

app.component(Paginate);

app.use(router).use(store).mount('#app');

<template>
    <div class="container my-5">
        <p class="fs-1 text-center">Пользователи с базы данных</p>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Логин</th>
                    <th scope="col">Роль</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.user_id">
                    <td>{{ user.user_id }}</td>
                    <td>{{ user.user_login }}</td>
                    <td>{{ user.user_role }}</td>
                </tr>
            </tbody>
        </table>
        <p class="mt-5 fs-1 text-center">Товары с базы данных</p>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Тип</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.item_id">
                    <td>{{ item.item_id }}</td>
                    <td>{{ item.item_name }}</td>
                    <td>{{ item.item_description }}</td>
                    <td>{{ item.item_type }}</td>
                </tr>
            </tbody>
        </table>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import UserService from "../services/user.service";
import ItemService from "@/services/item.service";

export default {
    name: "Adm-Board",
    data(){
        return{
            message: "",
            users: {},
            items: {}
        }
    },
    mounted() {
        UserService.getUsers()
        .then(response => {
            this.users = response.data;
        },
        error => {
            this.message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        });

        ItemService.getItems()
        .then(response => {
            this.items = response.data;
        },
        error => {
            this.message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        });
    }
}
</script>
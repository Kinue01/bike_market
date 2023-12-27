<template>
    <div class="my-5 container">
        <p class="mt-5 fs-1 text-center">Товары из базы данных</p>
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

        <p class="mt-5 fs-1 text-center ">Добавление продукта</p>
        <form>
            <div class="mt-3">
                <label for="item_name" class="form-label">Название товара</label>
                <input type="text" name="item_name" class="form-control" v-model="item_name">
                <label name="item_name" class="error-feedback" />
            </div>
            <div class="mt-3">
                <label for="item_desc" class="form-label">Описание товара</label>
                <textarea name="item_desc" class="form-control" v-model="item_desc" />
                <label name="item_desc" class="error-feedback" />
            </div>
            <div class="mt-3">
                <label for="item_type" class="form-label">Тип товара</label>
                <select class="form-select" v-model="item_type">
                    <option v-for="typ in types" :key="typ.type_id">{{ typ.type_name }}</option>
                </select>
            </div>
            <div class="mt-3">
                <button class="btn btn-primary btn-block" :disabled="loading" @click="addItem" >
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Добавить продукт</span>
                </button>
            </div>
            <p>{{ message }}</p>
        </form>
    </div>
</template>

<script>
import ItemService from '@/services/item.service';
import Item from '@/models/item';

export default {
    name: "Mod-Board",
    data(){
        return{
            item_name: "",
            item_desc: "",
            item_type: "",
            message: "",
            items: {},
            types: {},
            loading: false
        }
    },
    methods: {
        addItem(){
            this.loading = true;
            let item = new Item(this.item_name, this.item_desc, this.item_type);

            ItemService.addItem(item)
            .then(response => {
                if(response.status === 201){
                    this.message = "Товар добавлен";
                    this.loading = false;
                }
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
    },
    mounted() {
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

        ItemService.getItemTypes()
        .then(response => {
            this.types = response.data;
        },
        error => {
            this.message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        })
    }
}
</script>
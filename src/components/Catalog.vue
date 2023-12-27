<template>
    <div class="mb-5">
        <div class="container rounded p-5 mt-5 shadow">
            <p class="text-center fs-1">Каталог товаров</p>

        <div class="text-center mt-5">
            <div class="row row-cols-3 gx-5 gy-4">
                <div v-for="item in items_pag" :key="item.item_id" class="col">
                    <img :src="`${item.item_image}`" class="w-75 rounded">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.item_name }}</h5>
                        <p class="card-text">{{ item.item_description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <paginate 
            :page-count="4"
            :prev-text="'<'"
            :next-text="'>'"
            :clickHandler="clickHandlerBikes"
            class="mt-5 justify-content-center"
        >
        </paginate>
        </div>
    </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import ItemService from "@/services/item.service";

export default {
    name: "Catalog-comp",
    components:{
        paginate: Paginate
    },
    data(){
        return{
            items: [],
            items_pag: [],
            images: []
        }
    },
    methods:{
        clickHandlerBikes(pageNum){
            if (pageNum == 1) {
                this.items_pag = this.items.slice(0, 6);
            }
            else if (pageNum == 2) {
                this.items_pag = this.items.slice(6, 12);
            }
            else if (pageNum == 3) {
                this.items_pag = this.items.slice(12, 18);
            }
            else {
                this.items_pag = this.items.slice(18, 24);
            }
        },
        getImage(index){
            return require(`${this.items[index].item_image}`)
        }
    },
    mounted(){

        ItemService.getItems()
        .then(response => {
            this.items = response.data;
            this.items_pag = this.items.slice(0, 6);
            for (let i = 0; i < this.items.length; i++){
                this.images.push(this.items[i].item_image);
            }
        }, 
        error => {
            this.message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        });

    }
}
</script>
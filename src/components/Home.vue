<template>
    <div>

        <div id="carousel" class="carousel slide">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="/img/bike-shop-concept-with-bicycles.jpg" class="img-fluid w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h3>Только лучшие велосипеды</h3>
                    <h5>Наши велосипеды обладают наивысшим качеством за свою цену.</h5>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/img/90d170eb7f4854e09ae11eefba4abb4e.jpeg" class="img-fluid w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h3>Распространённость</h3>
                    <h5>Наши центры расположены во многих городах России.</h5>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/img/7d94dab80f4dc0f09434fcb1fe690e2a.jpg" class="img-fluid w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h3>Широкий выбор товаров</h3>
                    <h5>Гигантские склады с разнообразными велосипедами и расходниками.</h5>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
        </div>

<div class="bg-white p-5">
    <p class="text-center fs-1">Лучшие товары</p>

    <div class="text-center mt-5">
        <div class="row row-cols-3 g-5">
            <div class="col" v-for="bike in bikes" :key="bike.item_id">
                <img :src="`${bike.item_image}`" class="w-75 rounded">
                <div class="card-body">
                    <h5 class="card-title">{{ bike.item_name }}</h5>
                    <p class="card-text">{{ bike.item_description }}</p>
                </div>
            </div>
        </div>
        <p>{{ message }}</p>
    </div>
</div>

</div>
</template>

<script>
import ItemService from '@/services/item.service';

export default {
    name: 'Home-comp',
    data(){
        return{
            items: [],
            bikes: [],
            message: ""
        };
    },
    mounted(){

        ItemService.getItems()
        .then(response => {
            this.items = response.data;
            for (let i = 0; i < this.items.length; i++){
                if (this.items[i].item_type === "Велосипед") {
                    this.bikes.push(this.items[i]);
                }
            }

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
};
</script>
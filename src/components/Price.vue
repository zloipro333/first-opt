<script setup>
import { RouterView, useRoute } from 'vue-router'
import catalog from '../catalog'
import Good from './Good.vue'
// import { priceModal } from '../Good';

// import env from "../_config"

// import payment from '../payment'

import Tumbler from "../components/ui/Tumbler.vue"

// import(`../../public/test.js`/* @vite-ignore */).then(file => {
//   console.log(file.a)
// })
const route = useRoute()

</script>

<template>
  <Good class="Price-AbsMatchedPosition" v-if="catalog.AbsMatchedGood" :positioin="catalog.AbsMatchedGood"/>

  <!-- otlivants hack -->
  <div class="Price-otlivants" v-if="route.name === 'welcome' && catalog.search.length >= 3">
      <Tumbler :active="catalog.enableOtlivants" @toggle="catalog.enableOtlivants = !catalog.enableOtlivants"/> 
      <span @click="catalog.enableOtlivants = !catalog.enableOtlivants">Показать отливанты</span>
      <!-- <button @click="catalog.enableOtlivants = !catalog.enableOtlivants">Отливанты {{ catalog.enableOtlivants }}</button>   -->
  </div>
  <!-- //otlivants hack -->
  <div class="Price-caption" v-if="!catalog.goods.length">
    <RouterView :catalog="catalog"/>
  </div>
  <div class="Price-caption" v-if="catalog.goods.length">
    Нашлось {{catalog.goods.length}} позиций
    <span v-if="catalog.goods.length > 2300">, <b>уточните запрос</b> чтобы найти именно то что нужно</span>
  </div>

  <div class="Price" v-if="catalog.goods.length < 2300">
    <Good class="Price-positioin" v-for="good in catalog.goods" :key="good.id" :positioin="good"/>   
  </div>
  <br><br><br>
</template>

<style lang="scss" scoped>

@import '@/mixins.scss';

.Price-caption
{
    /* hack */
    max-width: 580px;
    
    padding: 15px 0;
    @include unselected;
    font-size: 16px;
    // line-height: 35px;
    
}
.Price-caption > b
{
    font-weight: 600;
}

.Price-caption > a.button
    {
      // box-sizing: border-box;
      display: inline-block;
      background-color: #fff;
      padding: 3px 10px 4px 10px;
      border-radius: 8px;
      margin: 0 4px;
      color: #181818; //rgb(42, 97, 92)
      font-weight: 500;
      height: 32px;
    }

.Price-otlivants
{
  display: flex;
  align-items: center;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
            cursor: pointer;
}

.nowrap
{
  white-space: nowrap;
}

.Price-AbsMatchedPosition
{
  border-radius: 8px;
  border: 2px solid #fff;
}
</style>


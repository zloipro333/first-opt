<script setup>
import * as v from 'vue'
import { basket } from '../catalog.js';
import Logo from '../components/graphics/Logo.vue'
import Search from '../components/Search.vue'
import BasketIcon from "../components/graphics/BasketIcon.vue"
import Loading from "../components/graphics/Loading.vue"
import { ref } from 'vue';

import Price from "../components/Price.vue"

import catalog from '../catalog'

import { priceModal } from '../Good';
import env from "../_config"
import payment from '../payment'

import { RouterLink } from 'vue-router'

// const Price = v.defineAsyncComponent(() => import('../components/Price.vue'));

//const search = v.reactive({reqest: ""})
const viewBanner = ref(true)

function find(value) {
  search.reqest = value
}

</script>

<template>
  <div style="max-width: calc(100vw - 32px);">
  <!-- 
  <div style="height: 80px;" v-if="viewBanner"></div>
  <div class="Catalog-banner" v-if="viewBanner">
    <div class="Catalog-banner-close" @click="viewBanner=false">✕</div>
    <h2>‼️ Мы ушли в отпуск ‼️</h2>
    До 6 октября без связи, заказы не принимаются.<br>
С 6 октября в обычном режиме
  </div> -->

    <!-- <div style="height: 8px;"></div>
    C 19.04.2024 по 12.05.2024 не принимаем и не отгружаем заказы.
    <div style="height: 8px;"></div>
    13.05.2024 возобновим работу в обычном режиме. 
    
    <h2>⚠️ Внимание</h2>
    Мы собираемся в отпуск.<br>
    Пожалуйста, ознакомьтесь с <a href="https://t.me/c/1656960287/2452">информацией</a> в канале!
    
    -->
  <!-- </div> -->
<!-- @click='catalog.search = ""' -->
  <div class="Catalog-header">
    <RouterLink to='/' style="background: none;" > 
      <Logo @click='catalog.search = ""'/>
    </RouterLink>

    <!-- <div class="Catalog-menu">

          <a href="https://wiki-prfm.onrender.com/about">
            <nobr>Условия</nobr>
          </a> •
          <a class="button" href="#" @click="priceModal.open()">Способы оплаты</a> •
          <a class="button" :href="`${env.server}price/PRFM_${catalog._category}_${payment.currentMethod.name}.xlsx`">Скачать прайс</a>
    </div> -->
  </div>

 
  <Search @request="find"/>
  
  <!-- Price -->
  <div class="Catalog-loading" v-if="catalog.loading">
    <Loading />
      <div>Загружаем свежий прайс...</div>
  </div>
  <Price v-if="!catalog.loading"/>

  <!-- basket button -->
  <div class="Catalog-basket" v-if="basket.all.length > 0">
    <router-link to="/basket">
    <div class="Catalog-basketBadge">
      {{basket.all.length}}
    </div>
    <BasketIcon />
    </router-link>
  </div>

  </div>

</template>

<style lang="scss" scoped>
  @import '@/mixins.scss';
  .Catalog-header
  {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .Catalog-menu
  {
    /* position: absolute; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
    margin-bottom: 10px;
    font-size: 25px;
    color: #777;
    a {
      font-size: 18px;
      padding: 8px 12px;
      margin: 0 5px;
      color: #fff;
      border-radius: 4px;
    }
  }

  @media (max-width: 600px) {
    .Catalog-menu {
      margin-top: -45px;
      font-size: 25px;
      a {
        padding: 8px 2px;
        font-size: 14px;
      }
    }
  }

  .Catalog-banner
  {
    position: fixed;
    z-index: 100;
    top: 12px;
    width: 300px;
    left: 50%;
    margin-left: -150px;
    background: #ffd92f;
    color: #111;
    border-radius: 8px;
    padding: 6px 12px;
    
  }
  .Catalog-banner-close
  {
    position: absolute;
    z-index: 101;
    right: 0;
    top: 0;
    padding: 6px 12px 6px 12px;
    cursor: pointer;
    
  }
  .Catalog-loading
  {
    display: flex;
    align-items: center;
  }

  .Catalog-loading > svg
  {
    width: 50px;
    height: 50px;
    margin: 20px 20px 20px 0;

  }

  .Catalog-basket {
    position: fixed;
    bottom: 15px;
    right: 20px;
    animation: blub .5s;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $color-space;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      padding: 5px;
    }
  }
  .Catalog-basketBadge
  {
    position: absolute;
    top: -8px;
    left: -8px;
    color: $color-content-accent;
    background: white;
    padding: 1px 9px;
    border-radius: 999px;
    font-weight: 800;
    min-width: 20px;
    z-index: 1;
  }

  @keyframes blub {
    0% {
      transform: translateY(100px) scale(0);
    }
    80%
    {
      transform: translateY(-30px) scale(1.2);
    }
    100%
    {
      transform: translateY(0) scale(1);
    }
  }

</style>

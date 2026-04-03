<script setup>
import { ref } from 'vue'
import { basket } from '../catalog.js'
import Logo from '../components/graphics/Logo.vue'
import Search from '../components/Search.vue'
import BasketIcon from "../components/graphics/BasketIcon.vue"
import Price from "../components/Price.vue"

import catalog from '../catalog'

import { priceModal } from '../Good';
import env from "../_config"
import payment from '../payment'

import { RouterLink } from 'vue-router'
import { infoModal } from '../main'

// const Price = v.defineAsyncComponent(() => import('../components/Price.vue'));

const viewBanner = ref(true)

const infoModalText = `
  Добавили новый мессенджер Google Chat со всем необходимым функционалом, работает без и с VPN,  и есть веб-версия и приложение на разные устройства и ПО. <br>
  Скачать ⏩ <br><a href="https://chat.google.com/download/" target="_blank" rel="noopener noreferrer">https://chat.google.com/download/</a><br><br>
  После скачивания нажмите кнопку "Новый чат" и вставьте в строку поиска наш контакт ⏩<br>
  <span style="cursor:pointer;text-decoration:underline;text-underline-offset:2px" title="Нажмите, чтобы скопировать" onclick="navigator.clipboard.writeText('a.timofeev.alexandr@gmail.com')">a.timofeev.alexandr@gmail.com</span>
`

</script>

<template>
  <div style="max-width: calc(100vw - 32px);">

  <div style="height: 80px;" v-if="viewBanner"></div>
  <div class="Catalog-banner" v-if="viewBanner">
    <div class="Catalog-banner-close" @click="viewBanner=false">✕</div>
    Добавили новый <br>мессенджер <a @click="infoModal.open(infoModalText, 'Дорогие Партнеры,')">
      Google Chat
    </a>.<br>
    Работает без VPN ✅
  </div>

  <div class="Catalog-header">
    <RouterLink to='/' style="background: none;" > 
      <Logo @click='catalog.search = ""'/>
    </RouterLink>

    <div class="Catalog-menu">
      <a class="button" href="#" @click="priceModal.open()">Cпособ оплаты</a> •
      <a class="button" :href="`${env.server}price/file/first-opt_${payment.currentMethod.name}.xlsx`">Скачать прайс</a>
    </div> 
  </div>

 
  <Search />
  
  <Price />

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
    margin-top: -20px;
    margin-bottom: 0px;
    font-size: 25px;
    color: $color-content;
    a {
      font-size: 18px;
      padding: 8px 12px;
      background: none;
      margin: 0 5px;
      color: $color-content;
      border-radius: 4px;
    }
    a:hover
    {
      background: $color-interface;
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
    background: #e75a4c;
    color: #fff;
    border-radius: 8px;
    padding: 6px 12px;

    a {
      color: #fff;
      text-decoration: underline;
      cursor: pointer;
    }
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

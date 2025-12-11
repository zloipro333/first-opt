<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { basket } from '../catalog.js';
import Good from '../components/Good.vue';

import { round } from '../helpers';

import payment from '../payment'

import BackIcon from "../components/graphics/BackIcon.vue"

const router = useRouter()

const basketCode = ref(null)

const hasMissingItems = ref(false)

const copy = () =>
{
  basketCode.value.focus();
  document.execCommand('copy');
  basketCode.value.blur();
  basket.sendOrder().then(isAccept => { 
    if (isAccept)
      router.push('order') 
    else
      hasMissingItems.value = true
  })
}

</script>

<template>
  <router-link to="/" class="link">
     <BackIcon /> Вернуться в каталог
  </router-link>

  <div class="Basket-favorites" v-if="basket.favorites.length != 0">
    <h1>Избранное</h1>
    <div class="Basket-content">
      <Good class="Basket-position" v-for="good in basket.favorites" :key="good.id" :positioin="good" />
    </div>
  </div>

  <div class="Basket-order">
    <h1>Заказ</h1>
    <div class="Basket-content">
      <Good class="Basket-position" v-for="good in basket.order" :key="good.id" :positioin="good" />
      <div class="Basket-empty" v-if="basket.order.length == 0 && !basket.hasLastOrder">
        Вы не добавили в корзину ни одной позиции
      </div>
      <div class="Basket-empty" v-if="basket.order.length == 0 && basket.hasLastOrder">
        Корзина пуста, <a href="#" @click="basket.repeatLastOrder()">повторить последний заказ</a>?
      </div>
      
    </div>

    <!-- <div class="Basket-price" v-if="basket.order.length">
      Сумма: {{payment.priceFormat(basket.amount)}} 
      <span v-if="basket.sale.next">
        , до скидки {{ basket.sale.next.percent }}% не хватает {{ payment.priceFormat(round(basket.sale.next.amount - basket.amount, 2)) }}
      </span>
    </div> -->

    <div class="Basket-price" v-if="basket.order.length" style="font-weight: bold;">
      Итого: {{payment.priceFormat(basket.totalPrice)}} 
      <!-- <span v-if="basket.sale.percent">
        (с учетом скидки {{ basket.sale.percent }}%)
      </span> -->
    </div>

    <div class="Basket-message" v-if="hasMissingItems">
      Некоторых позиций в заказе на данный момент нет в наличии.<br>
      Вы можете перенести их в Избранное, нажав ❤. <br>Когда они появится в наличии вы увидите актуальную цену.
    </div>

    <div class="Basket-bye" @click="copy" v-if="basket.order.length">Оформить заказ</div>
  </div>

  <!-- hidden -->
  <textarea class="Basket-code"
    ref="basketCode"
    v-on:focus="$event.target.select()"
  >{{basket.code}}</textarea>
  <!-- END hidden -->

</template>

<style lang="scss" scoped>
  @import '@/mixins.scss';

  .Basket-order, .Basket-favorites
  {
    margin: 10px 0;
    & h1
    {
      margin-top: -5px;
      padding-bottom: 10px;
    }
  }
  .Basket-order
  {
    background: rgba(255,255,255, .05);
    border-radius: 8px;
    padding: 20px 0;
  }
  .Basket-code 
  {
    /* display: none; */
    position: fixed;
    top: -999px;
    left: -999px;
  }

  .Basket-price {
    font-size: 20px;
    margin: 20px 0 10px 0;
  }

  .Basket-bye
  {
    display: block;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
    font-weight: 600;
    color: $color-space;
    background-color: $color-interface-accent;
    transition: all ease .3s;
    border-radius: 8px;
    margin-top: 20px;
    padding: 10px 0;
  }

  .Basket-bye:hover{
    background-color: $color-contrast;
    color: $color-interface-accent;
  }

  .Basket-message
  {
    background: rgb(255, 153, 0);
    color: #232323;
    padding: 5px 15px;
    border-radius: 8px;
  }

</style>

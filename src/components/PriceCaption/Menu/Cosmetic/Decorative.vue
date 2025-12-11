<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Декоративная косметика
      </template>
      <template #backlink>
        <RouterLink to="/cosmetic" class="link">
            <BackIcon /> Все виды
        </RouterLink>
      </template>
      <template #default>
        <!-- <a href="#" class="tag" @click='catalog.search = "тушь бров"'>Тушь для бровей</a> -->
        <!-- <a href="#" class="tag" @click='catalog.search = "блеск губ"'>Блеск для губ</a> -->
        <!-- <a href="#" class="tag" @click='catalog.search = "тинт губ"'>Тинт для губ</a> -->
        <!-- <a href="#" class="tag" @click='catalog.search = "хайлайтер"'>Хайлайтер</a> -->
        <!-- <a href="#" class="tag" @click='catalog.search = "тональный крем"'>Тональный крем</a> -->
        <!-- <a href="#" class="tag" @click='catalog.search = "скульптор"'>Скульптор</a> -->
        <!-- <a href="#" class="tag" @click='catalog.search = "консиллер"'>Консиллер</a> -->
       
        <RouterLink class="tag" to="/?search=бровей">Для бровей</RouterLink>
        <RouterLink class="tag" to="/?search=тушь ресниц">Тушь для ресниц</RouterLink>
        <RouterLink class="tag" to="/?search=тен век">Тени для век</RouterLink>
        <RouterLink class="tag" to="/?search=подводка">Подводка для глаз</RouterLink>
        <RouterLink class="tag" to="/?search=карандаш глаз">Карандаш для глаз</RouterLink>
        <RouterLink class="tag" to="/?search=карандаш губ">Карандаш для губ</RouterLink>
        <RouterLink class="tag" to="/?search=помада губ">Помада для губ</RouterLink>
        <RouterLink class="tag" to="/?search=румяна">Румяна</RouterLink>
        <RouterLink class="tag" to="/?search=пудра лица">Пудра</RouterLink>
        <RouterLink class="tag" to="/?search=тонал">Тональное средство</RouterLink>
        <RouterLink class="tag" to="/?search=корректор">Корректор</RouterLink>
        <RouterLink class="tag" to="/?search=праймер">Праймер</RouterLink>

      </template>
    </PriceCaption>
</template>



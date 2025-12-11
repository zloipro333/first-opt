<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Косметика для тела
      </template>
      <template #backlink>
        <RouterLink to="/cosmetic" class="link">
            <BackIcon /> Все виды
        </RouterLink>
      </template>
      <template #default>
        <RouterLink class="tag" to="/?search=лосьон тела">Лосьон</RouterLink>
        <RouterLink class="tag" to="/?search=крем тела">Крем</RouterLink>
        <RouterLink class="tag" to="/?search=спрей тела">Спрей</RouterLink>
        <RouterLink class="tag" to="/?search=бальзам тела">Бальзам</RouterLink>
        <RouterLink class="tag" to="/?search=молочко тела">Молочко</RouterLink>
        <RouterLink class="tag" to="/?search=скраб тела">Скраб</RouterLink>
        <RouterLink class="tag" to="/?search=масло тела">Масло</RouterLink>
        <RouterLink class="tag" to="/?search=дезодорант">Дезодорант</RouterLink>
        <RouterLink class="tag" to="/?search=дымка тела">Дымка</RouterLink>
        <RouterLink class="tag" to="/?search=мыло">Мыло</RouterLink>
        <RouterLink class="tag" to="/?search=гель душа">Гель для душа</RouterLink>
        <RouterLink class="tag" to="/?search=крем душа">Крем для душа</RouterLink>
        <RouterLink class="tag" to="/?search=масло душа">Масло для душа</RouterLink>
      </template>
    </PriceCaption>
</template>



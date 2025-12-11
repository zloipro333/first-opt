<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #default>
        <RouterLink class="tag" to="/?search=хит продаж">Xит продаж</RouterLink>
        <RouterLink class="tag" to="/?search=аналог">Aналог</RouterLink>
        <RouterLink class="tag" to="/?search=набор">Наборы</RouterLink>
        <RouterLink class="tag" to="/?search=атомайзер">Aтомайзеры</RouterLink>
        <RouterLink class="tag" to="cosmetic">Косметика</RouterLink>
        <RouterLink class="tag" to="household">Для дома</RouterLink>
        <RouterLink class="tag" to="accessories">Аксессуары</RouterLink>
        <RouterLink class="tag" to="/?search=автопарфюм">Aвтопарфюм</RouterLink>
        <br><br>

        Всего <b>{{catalog.positions.length}}</b> актуальных позиций<br>
      </template>
    </PriceCaption>
</template>


<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Косметика для волос
      </template>
      <template #backlink>
        <RouterLink to="/cosmetic" class="link">
            <BackIcon /> Все виды
        </RouterLink>
      </template>
      <template #default>
        <RouterLink class="tag" to="/?search=шампунь">Шампунь</RouterLink>
        <RouterLink class="tag" to="/?search=кондиционер">Кондиционер</RouterLink>
        <RouterLink class="tag" to="/?search=маска волос">Маска</RouterLink>
        <RouterLink class="tag" to="/?search=дымка волос">Дымка</RouterLink>
        <RouterLink class="tag" to="/?search=масло волос">Масло</RouterLink>
        <RouterLink class="tag" to="/?search=спрей волос">Спрей</RouterLink>
        <RouterLink class="tag" to="/?search=сыворотка волос">Сыворотка</RouterLink>
        <RouterLink class="tag" to="/?search=лосьон волос">Лосьон</RouterLink>
        <RouterLink class="tag" to="/?search=воск волос">Воск</RouterLink>
      </template>
    </PriceCaption>
</template>



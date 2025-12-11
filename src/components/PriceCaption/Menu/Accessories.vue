<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../PriceCaptionLayout.vue"
</script>


<template>
    <PriceCaption>
      <template #category>
        Аксессуары
      </template>
      <template #backlink>
        <RouterLink to="/" class="link">
            <BackIcon /> Другие категории
        </RouterLink>
      </template>
      <template #default>
        <!-- <RouterLink class="tag" to="/?search=фигура">Домашний декор</RouterLink> -->
        <RouterLink class="tag" to="/?search=пакет">Пакеты</RouterLink>
        <RouterLink class="tag" to="/?search=кофр">Кофры</RouterLink>
      </template>
    </PriceCaption>
</template>



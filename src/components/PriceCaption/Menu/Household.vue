<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Товары для дома
      </template>
      <template #backlink>
        <RouterLink to="/" class="link">
            <BackIcon /> Другие категории
        </RouterLink>
      </template>
      <template #default>
        <RouterLink class="tag" to="/?search=свеча">Свечи</RouterLink>
        <RouterLink class="tag" to="/?search=диффузор">Диффузоры</RouterLink>
        <RouterLink class="tag" to="/?search=спрей дом">Спреи</RouterLink>
        <RouterLink class="tag" to="/?search=ламп">Лампы</RouterLink>
        <RouterLink class="tag" to="/?search=капсул">Капсулы</RouterLink>
        <RouterLink class="tag" to="/?search=текстил">Для текстиля</RouterLink>
      </template>
    </PriceCaption>
</template>



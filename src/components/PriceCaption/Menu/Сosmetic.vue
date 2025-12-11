<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Косметика
      </template>
      <template #backlink>
        <RouterLink to="/" class="link">
            <BackIcon /> Другие категории
        </RouterLink>
      </template>
      <template #default>
        <RouterLink class="tag" to="decorative-cosmetic">Декоративная</RouterLink>
        <RouterLink class="tag" to="cosmetic-for-face">Для лица</RouterLink>
        <RouterLink class="tag" to="cosmetic-for-body">Для тела</RouterLink>
        <RouterLink class="tag" to="cosmetic-for-hands">Для рук/ног</RouterLink>
        <RouterLink class="tag" to="cosmetic-for-hair">Для волос</RouterLink>
      </template>
    </PriceCaption>
</template>



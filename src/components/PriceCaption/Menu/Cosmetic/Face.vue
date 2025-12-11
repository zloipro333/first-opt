<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Косметика для лица
      </template>
      <template #backlink>
        <RouterLink to="/cosmetic" class="link">
            <BackIcon /> Все виды
        </RouterLink>
      </template>
      <template #default>
        <RouterLink class="tag" to="/?search=крем лица">Крем</RouterLink>
        <RouterLink class="tag" to="/?search=сыворотка лица">Сыворотка</RouterLink>
        <RouterLink class="tag" to="/?search=тоник лица">Тоник</RouterLink>
        <RouterLink class="tag" to="/?search=гель лица">Гель</RouterLink>
        <RouterLink class="tag" to="/?search=масло лица">Масло</RouterLink>
        <RouterLink class="tag" to="/?search=мыло лица">Мыло</RouterLink>
        <RouterLink class="tag" to="/?search=маска лица">Маска</RouterLink>
        <RouterLink class="tag" to="/?search=лосьон лица">Лосьон</RouterLink>
        <RouterLink class="tag" to="/?search=пенка лица">Пенка</RouterLink>
        <RouterLink class="tag" to="/?search=бальзам лица">Бальзам</RouterLink>
        <RouterLink class="tag" to="/?search=спрей лица">Спрей</RouterLink>
        <RouterLink class="tag" to="/?search=скраб лица">Скраб</RouterLink>
        <RouterLink class="tag" to="/?search=флюид лица">Флюид</RouterLink>
        <RouterLink class="tag" to="/?search=мицелляр лица">Мицеллярная вода</RouterLink>
      </template>
    </PriceCaption>
</template>



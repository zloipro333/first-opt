<script setup>
import { RouterLink } from 'vue-router'
import catalog from '#/catalog';
import BackIcon from "#/components/graphics/BackIcon.vue"

import PriceCaption from "../../PriceCaptionLayout.vue"

</script>


<template>
    <PriceCaption>
      <template #category>
        Косметика для рук и ног
      </template>
      <template #backlink>
        <RouterLink to="/cosmetic" class="link">
            <BackIcon /> Все виды
        </RouterLink>
      </template>
      <template #default>
        <RouterLink class="tag" to="/?search=крем рук">Крем</RouterLink>
        <RouterLink class="tag" to="/?search=мыло рук">Мыло</RouterLink>
        <RouterLink class="tag" to="/?search=лосьон рук">Лосьон</RouterLink>
        <RouterLink class="tag" to="/?search=гель рук">Гель</RouterLink>
        <RouterLink class="tag" to="/?search=спрей рук">Спрей</RouterLink>
        <RouterLink class="tag" to="/?search=скраб рук">Скраб</RouterLink>
        <RouterLink class="tag" to="/?search=бальзам ног">Бальзам для ног</RouterLink>
      </template>
    </PriceCaption>
</template>



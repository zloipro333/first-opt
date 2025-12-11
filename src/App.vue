<script setup>
import { useRouter, useRoute, RouterView } from 'vue-router'
import catalog from './catalog';
import PriceModal from "./components/PriceModal.vue"
import SaleModal from "./components/SaleModal.vue"

const router = useRouter()
const route = useRoute()



const VApp = {
  beforeMount: () => {
    setTimeout(() => {
      // console.log(route.query.search);
      catalog.useRouter(router, route.query.search || "");
    }, 50
    )
  }
}

</script>

<template>
  <div v-app>
    <PriceModal />
    <SaleModal />

    <RouterView />
</div>
</template>

<style scoped>

</style>

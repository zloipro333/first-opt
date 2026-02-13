<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import catalog from '../catalog'
import Good from './Good.vue'
import notFoundIcon from './graphics/NotFoundIcon.svg'

const loadMoreSentinel = ref(null)

const goodsToShow = computed(() => {
  if (!catalog.AbsMatchedGood) return catalog.goods
  const absId = catalog.AbsMatchedGood.id
  return catalog.goods.filter((g) => g.id !== absId)
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [e] = entries
      if (!e?.isIntersecting) return
      if (catalog.searchLoading) return
      if (catalog.goods.length >= catalog.searchTotal) return
      if (catalog.search.length > 2) catalog.loadMoreSearch()
      else catalog.loadMoreNovelty()
    },
    { rootMargin: '200px', threshold: 0 }
  )
})

watch(loadMoreSentinel, (el, oldEl) => {
  if (oldEl && observer) observer.unobserve(oldEl)
  if (el && observer) observer.observe(el)
}, { flush: 'post' })

onUnmounted(() => {
  if (observer && loadMoreSentinel.value) observer.unobserve(loadMoreSentinel.value)
})
</script>

<template>
  <Good class="Price-AbsMatchedPosition" v-if="catalog.AbsMatchedGood" :positioin="catalog.AbsMatchedGood"/>

  <div class="Price-empty" v-else-if="catalog.search.length >= 3 && !catalog.searchLoading && catalog.searchTotal === 0">
    <img class="Price-emptyIcon" :src="notFoundIcon" alt="" width="120" height="120" />
    <div class="Price-emptyTitle">Ничего не найдено</div>
    <div class="Price-emptyHint">Попробуйте изменить запрос или проверьте написание</div>
  </div>

  <div class="Price" v-if="catalog.goods.length">
    <Good class="Price-positioin" v-for="good in goodsToShow" :key="good.id" :positioin="good"/>
    <div ref="loadMoreSentinel" class="Price-loadMoreSentinel" v-if="catalog.goods.length && catalog.goods.length < catalog.searchTotal"/>
  </div>
</template>

<style lang="scss" scoped>
@import '@/mixins.scss';

.Price {
  margin-top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.Price :deep(.Price-positioin:not(:has(~ .Price-positioin))) {
  border-bottom-left-radius: $rounding;
  border-bottom-right-radius: $rounding;
}

.Price-AbsMatchedPosition {
  margin-top: 15px;
  border-radius: 8px;
  border: 2px solid #fff;
}

.Price-loadMoreSentinel {
  height: 1px;
  pointer-events: none;
}

.Price-empty {
  margin-top: 24px;
  padding: 32px 24px;
  text-align: center;
  background: rgb(255, 232, 175);
  border: none;
  border-radius: $rounding;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.Price-emptyIcon {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 12px;
  opacity: 0.9;
  border-radius: 12px;
}

.Price-emptyTitle {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.Price-emptyHint {
  font-size: 15px;
  color: #000;
  max-width: 280px;
  margin: 0 auto;
  line-height: 1.5;
}
</style>

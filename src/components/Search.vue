<script setup>
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { RouterView } from 'vue-router'
import env from '../_config'
import catalog from '../catalog'
import SearchIcon from './graphics/SearchIcon.vue'
import UpIcon from './graphics/UpIcon.vue'
import Loading from './graphics/Loading.vue'
import SortIcon from './graphics/SortIcon.vue'
import SortIconUp from './graphics/SortIconUp.vue'
import FilterIcon from './graphics/FilterIcon.vue'

const COUNTER_DURATION_MS = 600
const easeOutCubic = t => 1 - (1 - t) ** 3

const input = ref(null)
const isDebouncing = ref(false)
const isFixed = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1000)
const scrollY = ref(0)
const maxScrollYWhenFixed = ref(0)
const fixedWrapperStyle = ref({})
const inputValue = ref(catalog.search || '')
const displayTotal = ref(0)
const displayFoundTotal = ref(0)
let searchDebounceTimer = null
let counterAnimationId = null
let counterFoundAnimationId = null
let appResizeObserver = null

const searchValue = computed({
  get: () => inputValue.value,
  set: (v) => {
    const normalized = (v || '').replace(/\n/g, '')
    inputValue.value = normalized
    clearTimeout(searchDebounceTimer)
    const delay = (env.searchDebounceMs != null ? env.searchDebounceMs : 400)
    isDebouncing.value = true
    searchDebounceTimer = setTimeout(() => {
      searchDebounceTimer = null
      isDebouncing.value = false
      catalog.search = normalized
    }, delay)
  }
})

const isSearchPending = computed(() => isDebouncing.value || catalog.searchLoading)
const searchTotalReal = computed(() => catalog.searchTotal > 0 ? catalog.searchTotal : catalog.goods.length)
const showToTopButton = computed(() =>
  isFixed.value && (maxScrollYWhenFixed.value - scrollY.value >= 300)
)
const isMobile = computed(() => windowWidth.value < 550)

const sortOpen = ref(false)
const filterOpen = ref(false)
const sortTriggerRef = ref(null)
const filterTriggerRef = ref(null)
const sortListRef = ref(null)
const filterListRef = ref(null)

const SORT_OPTIONS = [
  { label: 'Дешевые', value: 'price_asc' },
  { label: 'Дорогие', value: 'price_desc' },
  { label: 'От А до Я', value: 'name_asc' },
  { label: 'От Я до A', value: 'name_desc' }
]

const FILTER_OPTIONS = [
  { label: 'Все', value: '' },
  { label: 'Без отливантов', value: '!отливант' },
  { label: 'Только отливанты', value: 'отливант' },
  { label: 'Определенный объем', value: 'vol@30' },
  { label: 'Диапазон объема', value: 'vol@30-50' }
]

const FILTER_WORDS_EXACT = ['отливант', '!отливант']
const VOL_PATTERN = /^vol@[\d.]+(?:-[\d.]+)?$/

function isFilterToken(token) {
  if (FILTER_WORDS_EXACT.includes(token)) return true
  return VOL_PATTERN.test(token)
}

function stripFilterWords(text) {
  const t = (text || '').trim()
  if (!t) return ''
  const tokens = t.split(/\s+/)
  const filtered = tokens.filter(token => !isFilterToken(token))
  return filtered.join(' ').trim()
}

const VOL_RANGE_PATTERN = /^vol@[\d.]+-[\d.]+$/

function currentFilterFromSearch(searchStr) {
  const tokens = (searchStr || '').trim().split(/\s+/)
  for (const token of tokens) {
    if (token === 'отливант') return 'отливант'
    if (token === '!отливант') return '!отливант'
    if (VOL_RANGE_PATTERN.test(token)) return 'vol@30-50'
    if (VOL_PATTERN.test(token)) return 'vol@30'
  }
  return ''
}

const sortLabel = computed(() =>
  SORT_OPTIONS.find(o => o.value === catalog.sortBy)?.label ?? 'Дешевые'
)
const isSortDesc = computed(() => {
  const s = catalog.sortBy
  return s === 'price_desc' || s === 'name_desc'
})
const currentFilter = computed(() => currentFilterFromSearch(catalog.search))
const filterLabel = computed(() =>
  FILTER_OPTIONS.find(o => o.value === currentFilter.value)?.label ?? 'Фильтр'
)

function closeSort() { sortOpen.value = false }
function closeFilter() { filterOpen.value = false }

function toggleSort(e) {
  e?.stopPropagation()
  filterOpen.value = false
  sortOpen.value = !sortOpen.value
}
function toggleFilter(e) {
  e?.stopPropagation()
  sortOpen.value = false
  filterOpen.value = !filterOpen.value
}

function pickSort(value) {
  catalog.sortBy = value
  sortOpen.value = false
}
function pickFilter(value) {
  clearTimeout(searchDebounceTimer)
  searchDebounceTimer = null
  isDebouncing.value = false
  const stripped = stripFilterWords(inputValue.value)
  const newSearch = value ? (stripped + (stripped ? ' ' : '') + value).trim() : stripped.trim()
  inputValue.value = newSearch
  catalog.search = newSearch
  filterOpen.value = false
}

function onClickOutsideSort(event) {
  const el = sortTriggerRef.value
  const list = sortListRef.value
  if (sortOpen.value && el && list && !el.contains(event.target) && !list.contains(event.target)) closeSort()
}
function onClickOutsideFilter(event) {
  const el = filterTriggerRef.value
  const list = filterListRef.value
  if (filterOpen.value && el && list && !el.contains(event.target) && !list.contains(event.target)) closeFilter()
}

watch(() => catalog.search, (v) => {
  if (v !== inputValue.value) inputValue.value = v || ''
})

watch(searchTotalReal, (total) => {
  runCounterAnimation(displayTotal.value, total)
  runFoundCounterAnimation(displayFoundTotal.value, total)
}, { immediate: true })

function onClearSearch() {
  clearTimeout(searchDebounceTimer)
  searchDebounceTimer = null
  isDebouncing.value = false
  inputValue.value = ''
  catalog.search = ''
}

const inputFontSize = computed(() => {
  const len = (inputValue.value || '').length
  const length = len > 20 ? len - 20 : 0
  const narrow = windowWidth.value < 490
  const maxPx = narrow ? 20 : 28
  const minPx = narrow ? 14 : 18
  const k = narrow ? 0.3 : 0.5
  return Math.max(minPx, Math.round(maxPx - k * length))
})

function resizeTextarea() {
  const el = input.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

function positionWord(n) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'позиции'
  return 'позициям'
}

function foundPhraseWithDisplay(displayN, realN) {
  const mod10 = realN % 10
  const mod100 = realN % 100
  const one = mod10 === 1 && mod100 !== 11
  const few = (mod10 === 2 || mod10 === 3 || mod10 === 4) && (mod100 < 10 || mod100 >= 20)
  const verb = one ? 'Нашлась' : 'Нашлось'
  const noun = one ? 'позиция' : few ? 'позиции' : 'позиций'
  return `${verb} ${displayN} ${noun}`
}

function runCounterAnimation(from, to) {
  if (counterAnimationId != null) cancelAnimationFrame(counterAnimationId)
  const startTime = performance.now()
  const startValue = from
  const diff = to - from
  const tick = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / COUNTER_DURATION_MS, 1)
    const eased = easeOutCubic(progress)
    displayTotal.value = Math.round(startValue + diff * eased)
    if (progress < 1) counterAnimationId = requestAnimationFrame(tick)
    else counterAnimationId = null
  }
  counterAnimationId = requestAnimationFrame(tick)
}

function runFoundCounterAnimation(from, to) {
  if (counterFoundAnimationId != null) cancelAnimationFrame(counterFoundAnimationId)
  const startTime = performance.now()
  const startValue = from
  const diff = to - from
  const tick = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / COUNTER_DURATION_MS, 1)
    const eased = easeOutCubic(progress)
    displayFoundTotal.value = Math.round(startValue + diff * eased)
    if (progress < 1) counterFoundAnimationId = requestAnimationFrame(tick)
    else counterFoundAnimationId = null
  }
  counterFoundAnimationId = requestAnimationFrame(tick)
}

function searchPlaceholder() {
  const total = searchTotalReal.value
  return `Поиск по ${displayTotal.value} ${positionWord(total)}`
}

onMounted(() => {
  setTimeout(() => {
    input.value?.focus()
    resizeTextarea()
  }, 500)
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onResize)
  document.addEventListener('scroll', () => {
    const top = document.documentElement.scrollTop
    scrollY.value = top
    if (top > document.documentElement.clientHeight) {
      isFixed.value = true
      maxScrollYWhenFixed.value = Math.max(maxScrollYWhenFixed.value, top)
    } else {
      isFixed.value = false
    }
  })
  const app = document.getElementById('app')
  if (app && typeof ResizeObserver !== 'undefined') {
    appResizeObserver = new ResizeObserver(() => syncFixedWrapperStyle())
    appResizeObserver.observe(app)
  }
  document.addEventListener('click', onClickOutsideSort)
  document.addEventListener('click', onClickOutsideFilter)
})

function onResize() {
  windowWidth.value = window.innerWidth
  syncFixedWrapperStyle()
}

function syncFixedWrapperStyle() {
  if (!isFixed.value || typeof document === 'undefined') return
  const app = document.getElementById('app')
  if (!app) return
  const r = app.getBoundingClientRect()
  fixedWrapperStyle.value = { width: r.width + 'px', left: r.left + 'px' }
}

function scrollToEndOfCatalogHeader() {
  const header = document.querySelector('.Catalog-header')
  if (!header) return
  const top = header.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top: top + header.offsetHeight, behavior: 'auto' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(inputValue, (v) => {
  if (isFixed.value && (v || '').length > 0) {
    nextTick(scrollToEndOfCatalogHeader)
  }
})

watch(() => catalog.search, () => nextTick(resizeTextarea))
watch(isFixed, (v) => {
  if (v) nextTick(syncFixedWrapperStyle)
  else maxScrollYWhenFixed.value = 0
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  appResizeObserver?.disconnect()
  document.removeEventListener('click', onClickOutsideSort)
  document.removeEventListener('click', onClickOutsideFilter)
  clearTimeout(searchDebounceTimer)
  if (counterAnimationId != null) cancelAnimationFrame(counterAnimationId)
  if (counterFoundAnimationId != null) cancelAnimationFrame(counterFoundAnimationId)
})
</script>

<template>
  <div class="Search-placeholder">
    <div class="Search-row-slot">
      <div :class="{'Search-wrapper': isFixed}" class="Search-row-wrapper" :style="isFixed ? fixedWrapperStyle : undefined">
        <div class="Search">
          <div class="Search-button">
            <Loading v-if="isSearchPending" class="Search-loading" />
            <SearchIcon v-else />
          </div>
          <textarea
            class="Search-input"
            ref="input"
            v-model="searchValue"
            :placeholder="searchPlaceholder()"
            :style="{ fontSize: inputFontSize + 'px' }"
            rows="1"
            @input="resizeTextarea"
            @keydown.enter.prevent
          />
          <div class="Search-clear" v-if="inputValue" @click="onClearSearch">✕</div>
        </div>
      </div>
    </div>
    <div class="Search-below" v-if="catalog.search.length < 3">
      <RouterView :catalog="catalog" />
    </div>
    <div class="Search-options" v-else-if="searchTotalReal > 0">
      <div class="Search-dropdowns">
        <div class="Search-dropdown" ref="filterTriggerRef">
          <button type="button" class="Search-dropdown-trigger" @click="toggleFilter" aria-haspopup="listbox" :aria-expanded="filterOpen" aria-label="Фильтр">
            <FilterIcon class="Search-dropdown-icon" />
            <span v-if="!isMobile" class="Search-dropdown-label">{{ filterLabel }}</span>
          </button>
          <div v-show="filterOpen" ref="filterListRef" class="Search-dropdown-list" role="listbox">
            <button v-for="opt in FILTER_OPTIONS" :key="opt.value || '_'" type="button" class="Search-dropdown-item" :class="{ active: currentFilter === opt.value }" role="option" :aria-selected="currentFilter === opt.value" @click="pickFilter(opt.value)">
              {{ opt.label }}
            </button>
          </div>
        </div>
        <div class="Search-dropdown" ref="sortTriggerRef">
          <button type="button" class="Search-dropdown-trigger" @click="toggleSort" aria-haspopup="listbox" :aria-expanded="sortOpen" aria-label="Сортировка">
            <SortIconUp v-if="isSortDesc" class="Search-dropdown-icon" />
            <SortIcon v-else class="Search-dropdown-icon" />
            <span v-if="!isMobile" class="Search-dropdown-label">{{ sortLabel }}</span>
          </button>
          <div v-show="sortOpen" ref="sortListRef" class="Search-dropdown-list" role="listbox">
            <button v-for="opt in SORT_OPTIONS" :key="opt.value" type="button" class="Search-dropdown-item" :class="{ active: catalog.sortBy === opt.value }" role="option" :aria-selected="catalog.sortBy === opt.value" @click="pickSort(opt.value)">
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="Search-total">{{ foundPhraseWithDisplay(displayFoundTotal, searchTotalReal) }}</div>
    </div>

    <button
      v-show="showToTopButton"
      type="button"
      class="Search-toTop"
      aria-label="Наверх"
      @click="scrollToTop"
    >
      <UpIcon class="Search-toTop-icon" />
      <span class="Search-toTop-label">Наверх</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/mixins.scss';

  .Search-placeholder { min-height: 60px; }
  .Search-row-slot { min-height: 54px; }
  .Search-wrapper {
    position: fixed;
    top: 0;
    padding: 20px 1rem 12px 1rem;
    z-index: 999;
  }
  .Search {
    width: 100%;
    display: flex;
    align-items: stretch;
    border: 3px solid $color-interface-accent;
    border-radius: $rounding;
    overflow: hidden;
    background: rgb(255,232,175);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    .Search-wrapper & {
      box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.6), 0 -40px 12px rgba(0, 0, 0, 0.7);
    }
  }
  .Search-below { margin-top: 15px; }
  .Search-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    gap: 12px;
  }
  .Search-dropdowns {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .Search-dropdown { position: relative; }
  .Search-dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 2px solid $color-interface-accent;
    border-radius: $rounding;
    background: rgb(255,232,175);
    color: $color-interface-accent;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    transition: opacity 0.2s;
    &:hover { opacity: 0.9; }
  }
  .Search-dropdown-icon { flex-shrink: 0; }
  .Search-dropdown-label { white-space: nowrap; font-weight: 700; }
  @media (max-width: 549px) {
    .Search-dropdown-trigger { padding: 8px; }
  }
  .Search-dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    min-width: 100%;
    border: 2px solid $color-interface-accent;
    border-radius: $rounding;
    background: rgb(255,232,175);
    z-index: 100;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    max-height: 280px;
    overflow-y: auto;
  }
  .Search-dropdown-item {
    display: block;
    width: 100%;
    padding: 8px 12px;
    text-align: left;
    border: none;
    background: none;
    color: $color-interface-accent;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
    &:hover { background: rgba(0, 0, 0, 0.06); }
    &.active { font-weight: 700; }
  }
  .Search-total { display: flex; align-items: center; }
  .Search-input {
    flex: 1;
    min-width: 0;
    min-height: 1px;
    padding: 10px 0;
    color: $color-interface-accent;
    border: none;
    outline: none;
    resize: none;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    @include placeholder-color($color-content-accent);
    background: rgb(255,232,175);
    line-height: 1.3;
    vertical-align: middle;
    align-self: center;
    transition: font-size 0.25s ease;
  }
  .Search-button {
    flex-shrink: 0;
    width: 52px;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .Search-loading { width: 28px; height: 28px; }
  .Search-clear {
    flex-shrink: 0;
    width: 52px;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #666;
    cursor: pointer;
    transition: 0.2s;
    &:hover { color: #333; }
  }
  .Search-toTop {
    position: fixed;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    z-index: 998;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 2px solid $color-interface-accent;
    border-radius: $rounding;
    background: rgb(255,232,175);
    color: $color-interface-accent;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: opacity 0.2s, transform 0.2s;
    &:hover {
      opacity: 0.95;
      transform: translateX(-50%) translateY(-2px);
    }
  }
  .Search-toTop-icon { flex-shrink: 0; }
  .Search-toTop-label { font-weight: 500; }
</style>

import { reactive } from 'vue'
import env from "./_config"
import Basket from './basket'

/** Поиск через серверное API */
function fetchSearch(query, page = 1, perPage = 50, sort = '') {
  const base = (env.server || '').replace(/\/$/, '')
  const q = (query || '').trim()
  let url = `${base}/price/search?q=${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`
  if (sort) url += `&sort=${encodeURIComponent(sort)}`
  return fetch(url).then(r => r.json())
}

/** Новинки при пустом поиске */
function fetchNovelty(page = 1, perPage = 50, sort = '') {
  const base = (env.server || '').replace(/\/$/, '')
  let url = `${base}/price/novelty?page=${page}&per_page=${perPage}`
  if (sort) url += `&sort=${encodeURIComponent(sort)}`
  return fetch(url).then(r => r.json())
}

class Catalog {
  constructor() {
    this.basket = new Basket(this)
    this._reqest = ""
    this.updateRoute = () => {}

    this._sortBy = 'price_asc'
    this.AbsMatchedGood = false
    this.goods = reactive([])
    this.searchLoading = false
    this.searchTotal = 0
    this.searchPage = 1
    this.searchPerPage = 50
  }

  get sortBy() {
    return this._sortBy
  }

  set sortBy(value) {
    this._sortBy = value || 'price_asc'
    this._refreshGoods()
  }

  get search() {
    return this._reqest
  }

  set search(reqest) {
    this._reqest = reqest
    this.updateRoute(reqest)
  }

  /** Для совместимости с UI; данные только через API */
  get positions() {
    return []
  }

  _refreshGoods() {
    this.AbsMatchedGood = false
    if (this.search.length > 2) {
      const query = this.search.trim()
      this.searchPage = 1
      this.searchLoading = true
      fetchSearch(query, 1, this.searchPerPage, this._sortBy)
        .then((data) => {
          const items = Array.isArray(data) ? data : (data.items ?? data.data ?? [])
          this.searchTotal = data.total ?? items.length
          const goodsList = items.map((position) => {
            position.category = position.category || "perfume"
            return this.basket.get(position)
          })
          this.goods = reactive(goodsList)
          if (this.search.length >= 2 && goodsList.length > 0) {
            const norm = (s) => (s || '').trim().toLowerCase().replace(/\s+/g, ' ')
            const normQuery = norm(query)
            const exact = goodsList.find((g) => norm(g.name) === normQuery)
            this.AbsMatchedGood = exact || (goodsList.length === 1 ? goodsList[0] : false)
          }
        })
        .catch((err) => {
          console.error('Search API error:', err)
          this.goods = reactive([])
          this.searchTotal = 0
        })
        .finally(() => {
          this.searchLoading = false
        })
    } else {
      this.searchPage = 1
      this.searchLoading = true
      fetchNovelty(1, this.searchPerPage, this._sortBy)
        .then((data) => {
          const items = Array.isArray(data) ? data : (data.items ?? data.data ?? [])
          this.searchTotal = data.total ?? items.length
          const goodsList = items.map((position) => {
            position.category = position.category || "perfume"
            return this.basket.get(position)
          })
          this.goods = reactive(goodsList)
        })
        .catch((err) => {
          console.error('Novelty API error:', err)
          this.goods = reactive([])
          this.searchTotal = 0
        })
        .finally(() => {
          this.searchLoading = false
        })
    }
  }

  loadMoreNovelty() {
    if (this.search.length > 2 || this.searchLoading) return
    if (this.goods.length >= this.searchTotal) return
    const nextPage = this.searchPage + 1
    this.searchLoading = true
    fetchNovelty(nextPage, this.searchPerPage, this._sortBy)
      .then((data) => {
        const items = Array.isArray(data) ? data : (data.items ?? data.data ?? [])
        const total = data.total
        if (total != null) this.searchTotal = total
        const newGoods = items.map((position) => {
          position.category = position.category || "perfume"
          return this.basket.get(position)
        })
        this.goods.push(...newGoods)
        this.searchPage = nextPage
      })
      .catch((err) => {
        console.error('Novelty API load more error:', err)
      })
      .finally(() => {
        this.searchLoading = false
      })
  }

  loadMoreSearch() {
    if (this.search.length <= 2 || this.searchLoading) return
    if (this.goods.length >= this.searchTotal) return
    const query = this.search.trim()
    const nextPage = this.searchPage + 1
    this.searchLoading = true
    fetchSearch(query, nextPage, this.searchPerPage, this._sortBy)
      .then((data) => {
        const items = Array.isArray(data) ? data : (data.items ?? data.data ?? [])
        const total = data.total
        if (total != null) this.searchTotal = total
        const newGoods = items.map((position) => {
          position.category = position.category || "perfume"
          return this.basket.get(position)
        })
        this.goods.push(...newGoods)
        this.searchPage = nextPage
      })
      .catch((err) => {
        console.error('Search API load more error:', err)
      })
      .finally(() => {
        this.searchLoading = false
      })
  }

  useRouter(router, currentReqest) {
    this._reqest = currentReqest
    this.updateRoute = (request) => {
      if (request)
        router.push({ query: { search: request } })
      else
        router.push({ query: {} })
    }
  }
}

const catalog = reactive(new Catalog())

export const basket = catalog.basket
export default catalog

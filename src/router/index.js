import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../views/Catalog.vue'
import Basket from '../views/Basket.vue'
import Order from '../views/Order.vue'
// import Wiki from './views/Wiki.vue'

// import devSales from '../views/devOnly/Sales.vue'

// import wiki from "../wiki"
import catalog from '../catalog'

import categories from "./categories"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: Catalog,
      children: categories
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    // {
    //   path: '/wiki/:page?',
    //   name: 'wiki',
    //   component: Wiki
    // },

    // dev
    // {
    //   path: '/dev/sales',
    //   name: 'devSales',
    //   component: devSales
    // },


    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})


router.beforeEach((to, from) => {
  if (to.name === 'catalog' || to.path === '/') {
    const query = (to.query && to.query.search) ? to.query.search : ""
    catalog._reqest = query
    catalog._refreshGoods()
  }
  return true
})

export default router

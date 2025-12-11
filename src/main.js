import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.scss'

import {init} from './payment'

// init.then(msg => {

    const app = createApp(App)

    app.use(router)

    app.mount('#app')

// })

// export const search = reactive({reqest: '', category: 'parfum'})

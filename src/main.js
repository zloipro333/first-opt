import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.scss'

import {init} from './payment'

/* Crutch for info modal */
class InfoModal {
    isOpen = false
    text = ""
    title = ""

    open(text, title = "") {
        this.text = text
        this.title = title
        this.isOpen = true
    }

    close() {
        this.isOpen = false
    }
}

const infoModal = reactive(new InfoModal())

export { infoModal }
/* Crutch for info modal */

// init.then(msg => {

    const app = createApp(App)

    app.use(router)

    app.mount('#app')

// })

// export const search = reactive({reqest: '', category: 'parfum'})

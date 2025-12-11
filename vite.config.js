import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import basicSsl from '@vitejs/plugin-basic-ssl'
//import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  //server: { https: true }, // Not needed for Vite 5+
  //plugins: [ mkcert(), vue() ],
  plugins: [ 
    vue(),
    // basicSsl({
    //   /** name of certification */
    //   name: 'yakoroleff.online',
    //   /** custom trust domains */
    //   domains: ["*.yakoroleff.online", "yakoroleff.online"],
    //   /** custom certification directory */
    //   certDir: '/Users/yakoroleff_mac/.cert'
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '#': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

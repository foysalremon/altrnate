import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import '@/assets/main.css'

const queryClient = new QueryClient()

createApp(App).use(createPinia()).use(VueQueryPlugin, { queryClient }).mount('#app')

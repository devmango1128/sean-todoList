import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' //index.js는 생략가능
import store from './store'

createApp(App).use(store).use(router).mount('#app')
